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
            error :'',
            FlatListItems: [],
            FlatListTitle: [],
        }
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
      componentWillUnmount() {
        this.focusListener.remove();
      }   
      getTitle = async() => {
        let listTemps = [];
        let temp = await SqliteHelper.getTitle();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemps.push(temp.rows.item(i));
        };
        this.setState({
            FlatListTitle: listTemps
        });
      }
      location(){
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
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
          this.getTitle();  
          this.getWarning();     
        });
        this.location();
    }

    render() {
        const logo = {
            uri: "https://www.paracelsoft.com/images/cmssite/img/PPE.png"
        };
        const { FlatListItems } = this.state;
        const { latitude } = this.state;
        const { longitude } = this.state;
        const { FlatListTitle } = this.state;
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
                                size={20}
                                onPress={()=>{
                                    this.location()
                                }}
                            />
                    </View>
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
                                            <Text style={{ alignItems: "center" }}>{item.value.substring(0, 1).toUpperCase() + item.value.substring(1)}</Text>
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