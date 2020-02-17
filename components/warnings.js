import React, { Component } from 'react'
import {
    Text, StyleSheet, View, ImageBackground, Image, TextInput,
    Alert, FlatList,
    Button, Modal, TouchableHighlight, TouchableOpacity, ScrollView
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../hepper/sqlite.helper'
import DeviceInfo from 'react-native-device-info';
SqliteHelper.openDB();
console.disableYellowBox = true;
// let deviceIds = DeviceInfo.getDeviceId();
let uniqueId = DeviceInfo.getUniqueId();
export default class warnings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            latitude: 0,
            longitude: 0,
            FlatListTitle: [],
            FlatListItems: [],
            title: '',
            time: '',
            region: {
                latitude: 16.0282069,
                longitude: 108.2090777,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            latitudenew: 0,
            longitudenew: 0,
            deviceId: null,
        };
        this.create = this.create.bind(this)
        this.onMapPress = this.onMapPress.bind(this)
    }

    getMapWarning = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getImage();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemp.push(temp.rows.item(i));
        };
        this.setState({
            FlatListItems: listTemp
        });
    }
    getTitleWaring = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getTitleWaring();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemp.push(temp.rows.item(i));
        };
        this.setState({
            FlatListTitle: listTemp
        });
    }
    UNSAFE_componentWillMount() {
        this.location()
        this.getTitleWaring()
        this.getMapWarning()
        this.getDate()
        this.setState({
            deviceId: uniqueId
        })
    }
    componentWillUnmount() {
        this.focusListener.remove();
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
    componentDidMount() {
        this.location();
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getTitleWaring();
            this.getMapWarning();
        });
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
                'Vui lòng chọn vị trí',
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
                                message: false
                            })
                            this.props.navigation.navigate('Map')
                        }
                    },
                ],
                { cancelable: false },
            );

        }
    }


    render() {
        var imagebackgrouds = "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg";

        const { FlatListItems } = this.state;
        const { FlatListTitle } = this.state;
        const { latitude } = this.state;
        const { longitude } = this.state;
        return (
            <ImageBackground source={{ uri: imagebackgrouds }} style={{ width: '100%', height: '100%' }} >
                <View style={{
                    flex: 1, width: '100%',
                    marginTop: 0,
                    marginRight: 'auto',
                    marginBottom: 0,
                    marginLeft: 'auto'
                }}>
                    <View style={{ flex: 1, marginTop: 26, width: '90%', marginRight: 'auto', marginLeft: 'auto' }}>
                        <View style={{ flexDirection: 'row', height: 80 }}>
                            <View style={{ flex: 11 }}>
                                <Dropdown
                                    label='Chọn cảnh báo phù hợp'
                                    data={this.state.FlatListTitle}
                                    onChangeText={value => this.setState({ value })}
                                    value={this.state.value}
                                />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 32 }}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate('TitleWarning')
                                    }
                                    style={{ height: 28, width: '100%', alignItems: "flex-end" }}
                                >
                                    <Icon
                                        raised
                                        name='plus'
                                        type='font-awesome'
                                        color='red'
                                        size={28}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, width: 100, marginLeft: 240 }}>
                            <Button title="Lưu"
                                onPress={this.create} />

                        </View>

                    </View>
                    <View style={{ flex: 3, marginTop: 9, width: '98%', marginRight: 'auto', marginLeft: 'auto' }}>
                        <Text style={{ width: '100%', paddingLeft: 50, fontSize: 20, color: 'red', marginBottom: 5 }}>Chọn vị trí bạn muốn cảnh báo </Text>

                        <MaterialIcons style={{ marginTop: -26, marginBottom: 4 }}
                            raised
                            name='my-location'
                            color='back'
                            size={26}
                            onPress={() => {
                                this.location()
                            }}
                        />
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
                            {FlatListItems.length > 0 && FlatListItems.map(marker => (
                                <Marker key={marker.id}
                                    coordinate={marker}
                                    pinColor='blue'
                                    title={marker.value}
                                >
                                    <Image source={{ uri: marker.IconName }} style={{ width: 20, height: 20 }}  />
                                </Marker>
                            ))}
                        </MapView>
                    </View>

                </View>
            </ImageBackground>
        )
    }
}


