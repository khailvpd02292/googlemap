import React, { Component } from 'react'
import {
    Text, StyleSheet, View, ImageBackground, Image, TextInput,
    Alert, FlatList,
    Button, Modal, TouchableHighlight, TouchableOpacity, ScrollView
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../sqlite.helper'
import ImagePicker from 'react-native-image-picker';
SqliteHelper.openDB();
console.disableYellowBox = true;
const options = {
    title: 'Chọn hình ảnh',
    takePhotoButtonTitle: 'Máy ảnh',
    chooseFromLibraryButtonTitle: 'Chọn từ thư viện ảnh',
};
export default class Warning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            latitude: 0,
            longitude: 0,
            FlatListTitle: [],
            FlatListItems: [],
            title: '',
            avatarSource: null
        };
        this.create = this.create.bind(this)
        this.onMapPress = this.onMapPress.bind(this)
    }
    getWarning = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getWarning();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemp.push(temp.rows.item(i));
        };
        this.setState({
            FlatListItems: listTemp
        });
    }
    getTitleWarning = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getTitleWarning();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemp.push(temp.rows.item(i));
        };
        this.setState({
            FlatListTitle: listTemp
        });
    }
    UNSAFE_componentWillMount() {
        this.getTitleWarning(),
            this.getWarning()
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }
    componentDidMount() {
        Geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            });
        },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
        );
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getTitleWarning();
            this.getWarning();
        });
    }
    onMapPress(e) {
        this.setState({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
        });
    }
    myfuc = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // console.log('anh')
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    create() {
        const { FlatListItems } = this.state;
        const { latitude } = this.state;
        const { value } = this.state;

        for (let i = 0; i < FlatListItems.length; i++) {
            if (FlatListItems[i].value == value && latitude == FlatListItems[i].latitude) {
                return Alert.alert(
                    'Thêm thất bại',
                    'Vị trí đã được đánh dấu',
                );
            }
        }
        if (value == null || value == '') {
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng chọn cảnh báo',
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
                            console.log('*********************************************************')
                            console.log('add :' + JSON.stringify(this.state.avatarSource))
                            SqliteHelper.addWarning(this.state.value, this.state.latitude, this.state.longitude, this.state.avatarSource),
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
            <ImageBackground source={{uri:imagebackgrouds}} style={{ width: '100%', height: '100%' }} >
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
                            <Button title="Chọn ảnh"
                                onPress={() => this.myfuc()} />
                        </View>
                        <Image source={this.state.avatarSource} style={{ width: '100%', height: 20 }} />
                    </View>
                    <View style={{ flex: 3, marginTop: 3, width: '98%', marginRight: 'auto', marginLeft: 'auto' }}>
                        <Text style={{ width: '100%', paddingLeft: 50, fontSize: 20, color: 'red', marginBottom: 5 }}>Chọn vị trí bạn muốn cảnh báo </Text>

                        <MapView
                            style={{ flex: 1 }}
                            region={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            onPress={this.onMapPress}
                        >
                            <Marker coordinate={this.state} title={"Vị trí của bạn"} />

                            {FlatListItems.length > 0 && FlatListItems.map(marker => (
                                <Marker key={marker.id}
                                    coordinate={marker}
                                    pinColor='blue'
                                    title={marker.value}
                                />
                            ))}

                        </MapView>
                    </View>

                </View>
            </ImageBackground>
        )
    }
}
