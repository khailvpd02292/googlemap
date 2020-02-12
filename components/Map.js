import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList,
    ImageBackground, Animated, TouchableHighlight, Modal
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../hepper/sqlite.helper';
import { Dropdown } from 'react-native-material-dropdown';
import {
    DotIndicator,
    BallIndicator,
} from 'react-native-indicators';
SqliteHelper.openDB();
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 16.0282069,
            longitude: 108.2090777,
            latitudenew: 0,
            longitudenew: 0,
            error: '',
            title: '',
            FlatListItems: [],
            FlatListTitle: [],
            loader: false,
            modalVisible: false,
            region: {
                latitude: 16.0282069,
                longitude: 108.2090777,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        }
        setInterval(() => {
            this.checklocation()
        }, 1000);
        // this.onMapPress = this.onMapPress.bind(this)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
    UNSAFE_componentWillMount() {
        // this.setState({
        //     loader: true
        // })
        SqliteHelper.createTableTitleWaring();
        SqliteHelper.createTableMapWarning();
        this.getTitleWaring();
        this.getMapWarning();
        this.location();
    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getTitleWaring();
            this.getMapWarning();
        });
    }

    getMapWarning = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getMapWarning();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemp.push(temp.rows.item(i));
        };
        this.setState({
            FlatListItems: listTemp,
        });
        this.setState({
            loader: false,
        });
        // setTimeout(() => {
        //     this.setState({
        //         loader: false,
        //     });
        // }, 500)
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


    render() {
        var imagebackgroud = {
            uri: "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg"
        };
        const { FlatListItems } = this.state;
        const { latitude } = this.state;
        const { longitude } = this.state;
        const { FlatListTitle } = this.state;
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
                        <Marker coordinate={this.state} title={"Vị trí của bạn"} />

                        <Marker coordinate={{
                            latitude: this.state.latitudenew,
                            longitude: this.state.longitudenew
                        }}
                            pinColor={'blue'}
                        />
                        {FlatListItems.length > 0 && FlatListItems.map(marker => (
                            <Marker key={marker.id}
                                coordinate={marker}
                                pinColor='blue'
                                title={marker.value}
                                // image={require('../image/video_camera.png')}
                                image={marker.image}
                            />
                        ))}
                    </MapView>
                </View>

                <View style={{ flex: 0.8, flexDirection: "row" }}>
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
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>Biểu tượng cảnh báo</Text>
                            </View>

                            <View style={{ flex: 2, paddingTop: 5 }}>
                                <TouchableOpacity
                                    // onPress={() =>
                                    //     this.props.navigation.navigate('Warning')
                                    // }
                                    onPress={() => {
                                        this.setModalVisible(true);
                                    }}

                                    style={{ height: 28, width: 28 }}
                                    >
                                    <Icon
                                        raised
                                        name='plus'
                                        type='font-awesome'
                                        color='red'
                                        size={20}
                                    />
                                </TouchableOpacity>


                                {/* <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Text>Show Modal</Text>
                    </TouchableHighlight> */}
                            </View>
                        </View>
                        <FlatList
                            data={FlatListTitle}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <ScrollView>
                                    <View style={{ height: 22, flexDirection: 'row' }}>
                                        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon
                                                raised
                                                name='video-camera'
                                                type='font-awesome'
                                                color='red'
                                                size={16} />
                                        </View>
                                        <View style={{ flex: 9.5, justifyContent: 'center' }}>
                                            <Text style={{ alignItems: "center" }}>{item.value}</Text>
                                            {/* <Text style={{ alignItems: "center" }}>{item.image}</Text> */}
                                        </View>

                                    </View>
                                </ScrollView>
                            )}
                        />
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View style={{ marginTop: 22 }}>
                                <View>
                                    <Text>Hello World!</Text>
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}>
                                        <Text>Hide Modal</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
                    </View>

                </View>

            </View>
        )
    }

}