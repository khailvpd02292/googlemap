import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList,
    ImageBackground, Animated, Alert, Dimensions, StyleSheet
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import HeaderBottomDrawer from './HeaderBottomDrawer'
import MapViews from './MapViews'
import ContentBottomDrawer from './ContentBottomDrawer'
import ModalScreen from './ModalScreen'
import {
    DotIndicator,
    BallIndicator,
} from 'react-native-indicators';
import Loading from './Loading';
const TAB_BAR_HEIGHT = 6;
console.disableYellowBox = true;
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            deviceId: null,
            latitude: 16.0282069,
            longitude: 108.2090777,
            latitudenew: 0,
            longitudenew: 0,
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
            },
        }
        this.create = this.create.bind(this)
        this.onMapPress = this.onMapPress.bind(this)
        this.location = this.location.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        setInterval(() => {
            this.checklocation();
        }, 500);
    }
    toggleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
    };
    componentWillUnmount() {
        this.focusListener.remove();
    }
    UNSAFE_componentWillMount() {
        this.setState({
            loader: true,
            deviceId: uniqueId
        })
        this.location();
        this.getTitleWaring();
        this.getWarning();

    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getTitleWaring();
            this.getWarning()
        });
    }
    getTitleWaring = async () => {
        fetch('http://192.168.56.1:3000/title', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    FlatListTitle: [...responseJson]
                })
            })
            .catch(error => console.log(error))
    }
    addWarning(deviceId, value, latitude, longitude) {
        var dataToSend = { deviceId: deviceId, value: value, latitude: latitude, longitude: longitude };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('http://192.168.56.1:3000/warning', {
            method: "POST",
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getWarning = async (keyword) => {
        var http = `http://192.168.56.1:3000/warning`;
        const { checkBoxChecked } = this.state;
        var keyword = checkBoxChecked;
        if (keyword && keyword.length > 0) {
            http += `?${keyword.map(t => `value=${t}`).join("&")}`
        }
        fetch(http, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    Images: [...responseJson],
                    loader: false
                })
            })
            .catch(error => console.log(error))
    }
    checklocation() {
        Geolocation.getCurrentPosition(position => {
            if (this.state.latitude != position.coords.latitude) {
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
        const item = this.state;
        if (item.value == null || item.value == '') {
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng chọn cảnh báo',
            )
        } else if (item.latitudenew == 0) {
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
                            this.addWarning(item.deviceId, item.value, item.latitudenew, item.longitudenew)
                            this.setState({
                                latitudenew: 0,
                                longitudenew: 0,
                            })
                            this.getWarning();
                        }
                    },
                ],
                { cancelable: false },
            );
        }
    }
    onclickcb = (value) => {
        const { checkBoxChecked } = this.state;
        const isInclude = checkBoxChecked.includes(value);
        if (!isInclude) {
            this.setState(state => ({
                checkBoxChecked: [...state.checkBoxChecked, ...[value]],
            }));
        } else {
            this.setState(state => ({
                checkBoxChecked: state.checkBoxChecked.filter(item => item !== value),
            }));
        }
    }
    closeModal() {
        this.getWarning();
        this.toggleModal();
    }
    render() {
        const item = this.state;
        if (item.loader) {
            return (
                <Loading />
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3, backgroundColor: 'white' }}>
                    <MapViews
                        Images={item.Images}
                        region={item.region}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        latitudenew={item.latitudenew}
                        longitudenew={item.longitudenew}
                        onMapPress={this.onMapPress}
                    />
                </View>
                <BottomDrawer
                    containerHeight={280}
                    offset={TAB_BAR_HEIGHT}
                    startUp={false}
                >
                    <HeaderBottomDrawer />
                    {this.renderContent()}
                    {/* <ContentBottomDrawer
                        FlatListTitle={item.FlatListTitle}
                        create={this.create}
                        a={item.value}
                        toggleModal={this.toggleModal}
                        location={this.location}
                        navigation={this.props.navigation}
                    /> */}
                </BottomDrawer>           
                <Modal isVisible={item.isModalVisible} style={{ margin: 0, padding: 0 }}
                    backdropOpacity={1}
                    animationIn={'zoomInDown'}
                    animationOut={'zoomOutUp'}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                >
                    <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 3 }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                            <Text style={{ fontSize: 28, color: 'blue' }} >Danh sách cảnh báo</Text>
                        </View>
                        <View style={{ flex: 0.8, width: '96%', alignItems: "flex-end" }}>
                            <TouchableOpacity style={{ width: 88, backgroundColor: '#2089dc', borderRadius: 3, height: 44, paddingLeft: 6, paddingTop: 4 }}
                                onPress={this.closeModal}
                            >
                                <AntDesign
                                    raised
                                    name='filter'
                                    color='#f8fbfe'
                                    size={28}
                                />
                                <Text style={{ marginLeft: 30, marginTop: -25, marginBottom: 5, color: '#f8fbfe', fontSize: 20 }}>Lọc</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 8.3, marginTop: 10 }}>
                            <ScrollView>
                                {item.FlatListTitle.map((val) => {
                                    return (
                                        <View key={val.value} style={{ height: 50, paddingLeft: 20 }}>
                                            <CheckBox
                                                containerStyle={{ backgroundColor: 'white', borderWidth: 0, width: 250 }}
                                                textStyle={{ fontWeight: "normal", fontSize: 22 }}
                                                onPress={() => this.onclickcb(val.value)}
                                                checked={item.checkBoxChecked.includes(val.value)}
                                                title={val.value}
                                            />
                                        </View >
                                    )
                                }
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
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
                        onPress={this.location}
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
                                onPress={this.toggleModal}
                            >
                                Danh sách cảnh báo
                                </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

