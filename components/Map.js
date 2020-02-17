import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList,
    ImageBackground, Animated, Alert,CheckBox
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../hepper/sqlite.helper';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import BottomDrawer from 'rn-bottom-drawer';
let uniqueId = DeviceInfo.getUniqueId();
import DeviceInfo from 'react-native-device-info';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
    DotIndicator,
    BallIndicator,
} from 'react-native-indicators';
SqliteHelper.openDB();
const TAB_BAR_HEIGHT = 6;
console.disableYellowBox = true;
var tempCheckValues = [];
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            value: '',
            deviceId: null,
            latitude: 16.0282069,
            longitude: 108.2090777,
            latitudenew: 0,
            longitudenew: 0,
            error: '',
            title: '',
            FlatListTitle: [],
            loader: false,
            Images: [],
            isModalVisible: false,
            checkBoxChecked: [],
            region: {
                latitude: 16.0282069,
                longitude: 108.2090777,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        }
        this.create = this.create.bind(this)
        this.onMapPress = this.onMapPress.bind(this)
        setInterval(() => {
            this.checklocation()
        }, 1000);
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    checkBoxChanged(id, value) {
        this.setState({
            checkBoxChecked: tempCheckValues
        })
        var tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[id] = !value;
        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        })
        console.log(value + id)
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
    UNSAFE_componentWillMount() {
        this.setState({
            loader: true,
            deviceId: uniqueId
        })
        SqliteHelper.createTableTitleWaring();
        SqliteHelper.createTableMapWarning();
        this.getTitleWaring();
        this.getImage();
        this.getDate()
        this.location();

    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getTitleWaring();
            this.getImage()
        });

    }
    getDate() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        this.setState({
            time:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
    }
    getTitleWaring = async () => {
        let listTemps = [];
        let temp = await SqliteHelper.getTitleWaring();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemps.push(temp.rows.item(i));
        };
        this.setState({
            FlatListTitle: listTemps
        });

    }
    getImage = async () => {
        let listTempp = [];
        let tempp = await SqliteHelper.getImage();
        for (let i = 0; i < tempp.rows.length; i++) {
            listTempp.push(tempp.rows.item(i));
        };
        this.setState({
            Images: listTempp,
            loader: false,
        });
    }
    checklocation() {

        Geolocation.getCurrentPosition(position => {
            if (this.state.latitude != position.coords.latitude) {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            }
        },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
        );
    }
    location() {
        Geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }
            });
        },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
        );
    }
    onMapPress(e) {
        this.setState({
            latitudenew: e.nativeEvent.coordinate.latitude,
            longitudenew: e.nativeEvent.coordinate.longitude,
            region: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        });
    }
    create() {
        const { FlatListItems } = this.state;
        const { latitude } = this.state;
        const { value } = this.state;
        if (value == null || value == '') {
            this.getDate()
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng chọn cảnh báo',
            )

        } else if (this.state.latitudenew == 0) {
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng chọn vị trí cần cảnh báo trên bản đồ',
            )

        } else {
            Alert.alert(
                'Thông báo',
                'Bạn có chắc chắn muốn thêm cảnh báo',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.getDate(),
                                SqliteHelper.addMapWarning(this.state.time, this.state.deviceId, this.state.value, this.state.latitudenew, this.state.longitudenew)
                            this.setState({
                                latitudenew: 0,
                                longitudenew: 0,
                            })
                            this.UNSAFE_componentWillMount();
                        }
                    },
                ],
                { cancelable: false },
            );

        }
    }
    renderHeader = () => (
        <View style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, height: 34, alignItems: "center", justifyContent: "center" }}>
            <Feather
                raised
                name='minus'
                color='black'
                size={26}
                onPress={() => {
                    this.location()
                }}
            />

        </View>
    )
    renderContent = () => {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>

                <View style={{ width: '8%', height: 30 }}>
                    <MaterialIcons
                        raised
                        name='my-location'
                        type='font-awesome'
                        color='black'
                        size={26}
                        onPress={() => {
                            this.location()
                        }}
                    />
                </View>
                <View style={{ width: '92%' }}>
                    <View style={{ alignItems: 'center', height: 28, flexDirection: 'row' }}>
                        <View style={{ flex: 15, alignItems: "center", justifyContent: 'center' }}>
                            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20 }}>Thêm cảnh báo mới</Text>
                        </View>
                        <View style={{ flex: 1.6, paddingTop: 5 }}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('TitleWarning')
                                }
                                style={{ height: 28, width: 28 }}
                            >
                                <Feather
                                    raised
                                    name='plus-circle'
                                    type='font-awesome'
                                    color='red'
                                    size={21}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: 20, marginRight: 34 }}>
                        <View style={{ flexDirection: 'row', height: 80 }}>
                            <View style={{ flex: 11 }}>
                                <Dropdown
                                    label='Chọn cảnh báo phù hợp'
                                    data={this.state.FlatListTitle}
                                    onChangeText={value => this.setState({ value })}
                                    value={this.state.value}
                                    baseColor='#191616'
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 20, width: 100, marginLeft: 210 }}>
                            <Button title="Lưu"
                                onPress={this.create} />
                        </View>
                        <View style={{ marginTop: -30, width: 180 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'blue'
                                }}
                                onPress={() =>
                                    this.props.navigation.navigate('Warning')}
                                // onPress={this.toggleModal}
                            >
                                Danh sách cảnh báo
                                </Text>
                        </View>
                    </View>
                </View>

            </View>
        )
    }


    render() {
        var imagebackgroud = {
            uri: "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg"
        };

        const { latitude } = this.state;
        const { longitude } = this.state;
        const { FlatListTitle } = this.state;
        const { Images } = this.state;
        if (this.state.loader) {
            return (
                <ImageBackground source={imagebackgroud} style={{ width: '100%', height: '100%' }} >
                    <BallIndicator color='white' />
                </ImageBackground>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3, backgroundColor: 'white' }}>
                    <MapView
                        style={{ flex: 1 }}
                        region={this.state.region}
                        onPress={this.onMapPress}
                    >
                        <Marker coordinate={this.state} title={"Vị trí của bạn"} >
                            <Icon
                                raised
                                name='circle'
                                type='font-awesome'
                                color='#1D50CE'
                                size={16}
                                onPress={() => {
                                    this.location()
                                }}
                            />
                        </Marker>

                        <Marker coordinate={{
                            latitude: this.state.latitudenew,
                            longitude: this.state.longitudenew
                        }}
                        />
                        {Images.length > 0 && Images.map(marker => (
                            <Marker
                                coordinate={marker}
                                title={marker.value}
                            >
                                <Image source={{ uri: marker.IconName }} style={{ width: 20, height: 20 }} />
                            </Marker>
                        ))}
                    </MapView>
                </View>
                <BottomDrawer
                    containerHeight={280}
                    offset={TAB_BAR_HEIGHT}
                    startUp={false}
                >
                    {this.renderHeader()}
                    {this.renderContent()}
                </BottomDrawer>

                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <ImageBackground source={imagebackgroud} style={{ width: '100%', height: '100%' }} >
                            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'blue' }} >Danh sách cảnh báo</Text>
                            </View>
                            <View style={{ flex: 0.6, width: 70, marginLeft: 260 }}>
                                <TouchableOpacity style={{ width: 70, backgroundColor: '#2089dc', borderRadius: 3, height: 36, paddingLeft: 6, paddingTop: 4 }}>
                                    <AntDesign
                                        raised
                                        name='filter'
                                        color='#f8fbfe'
                                        size={26}

                                    />
                                    <Text style={{ marginLeft: 30, marginTop: -22, marginBottom: 5, color: '#f8fbfe' }}>Lọc</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 8.4 }}>
                                {FlatListTitle.map((val) => {
                                    { tempCheckValues[val.value] = false }
                                    return (
                                        <View key={val.value} style={{ height: 30, flexDirection: 'row', paddingLeft: 30 }}>
                                            <ScrollView>
                                                <View style={{ height: 30, flexDirection: 'column' }}>
                                                    <CheckBox
                                                        value={this.state.checkBoxChecked[val.value]}
                                                        onValueChange={() => this.checkBoxChanged(val.value, this.state.checkBoxChecked[val.value])}
                                                    />
                                                    <Text style={{ paddingLeft: 40, marginTop: -26 }}>{val.value}</Text>
                                                </View>
                                            </ScrollView>
                                        </View >
                                    )
                                }
                                )}
                            </View>
                            <Button title="Quay trở về map" onPress={this.toggleModal} />
                        </ImageBackground>

                    </View>
                </Modal>
            </View>
        )
    }

}