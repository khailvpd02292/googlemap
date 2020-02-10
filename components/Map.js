import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList,
    ImageBackground, Animated
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../sqlite.helper';
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
            error: '',
            FlatListItems: [],
            FlatListTitle: [],
            loader: false,
        }
        setInterval(() => {
            this.checklocation()
        }, 1000);
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }
    UNSAFE_componentWillMount() {
        this.setState({
            loader: true
        })
        SqliteHelper.createTableWarning();
        SqliteHelper.createTableMapWarning();
        this.getTitle();
        this.getWarning();
    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getTitle();
            this.getWarning();
        });
    }

    getWarning = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getWarning();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemp.push(temp.rows.item(i));
        };
        this.setState({
            FlatListItems: listTemp,
        });
        setTimeout(() => {
            this.setState({
                loader: false,
            });
        }, 500)
    }
    getTitle = async () => {
        let listTemps = [];
        let temp = await SqliteHelper.getTitle();
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
                error: null
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
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker coordinate={this.state} title={"Vị trí của bạn"} >
                        </Marker>
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
                    <View style={{ flex: 1 }}>
                        <Icon
                            raised
                            name='compass'
                            type='font-awesome'
                            color='gray'
                            size={26}
                            onPress={() => {
                                this.location()
                            }}
                        />
                    </View>
                    <View style={{ flex: 1.5 }}>
                        <View style={{ alignItems: 'center', height: 28, flexDirection: 'row' }}>
                            <View style={{ flex: 15, alignItems: "center", justifyContent: 'center'}}>
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>Biểu tượng cảnh báo</Text>
                            </View>

                            <View style={{ flex: 2, paddingTop: 5}}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate('Warning')
                                    }
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
                            </View>
                        </View>
                        <FlatList
                            data={FlatListTitle}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <ScrollView>
                                    <View style={{ height: 21, flexDirection: 'row' }}>
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
                    </View>

                </View>
            </View>
        )
    }

}