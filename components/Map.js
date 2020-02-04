import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../sqlite.helper'
SqliteHelper.openDB();
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            FlatListItems: [],
            FlatListTitle: [],
        }
    }
    UNSAFE_componentWillMount = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getWarning();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemp.push(temp.rows.item(i));
        };
        this.setState({
            FlatListItems: listTemp
        });
    }
    componentWillMount= async () => {
        let listTemps = [];
        let temp = await SqliteHelper.getTitle();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemps.push(temp.rows.item(i));
        };
        this.setState({
            FlatListTitle: listTemps
        });
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

    }

    componentWillUpdate= async()=>{
       await this.UNSAFE_componentWillMount();
    }

    render() {
        const logo = {
            uri: "https://www.flaticon.com/authors/smashicons"
        };
        const { FlatListItems } = this.state;
        const { latitude } = this.state;
        const { longitude } = this.state;
        const {FlatListTitle} = this.state;
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
                        <Marker coordinate={this.state} title={"Vị trí của bạn"} ></Marker>
                        {FlatListItems.length > 0 && FlatListItems.map(marker => (
                            <Marker
                                coordinate={marker}
                                pinColor='blue'
                                title={marker.value}
                            />
                        ))}
                    </MapView>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>

                    {/* <View style={{ flex: 1 }}>
                        <Button title="Vị trí của bạn"
                            onPress={() =>
                                this.componentDidMount()
                            } ></Button>
                    </View> */}
                    <View style={{ flex: 1.5 }}>
                        <View style={{ alignItems: 'center', height: 28, flexDirection: 'row' }}>
                            <View style={{ flex: 16, alignItems: "center", justifyContent: 'center' }}>
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>Biểu tượng cảnh báo</Text>
                            </View>
                            <View style={{ flex: 1, paddingTop: 5 }}>
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