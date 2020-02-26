import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList,
    ImageBackground, Animated, Alert, Dimensions, StyleSheet
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
export class MapViews extends Component {
    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                region={this.props.region}
                onPress={this.props.onMapPress}
                minZoomLevel={15}
                maxZoomLevel={19}
            >
                <Marker coordinate={{
                     latitude: this.props.latitude,
                     longitude: this.props.longitude
                }}
                 title={"Vị trí của bạn"}
                >
                    <Icon
                        raised
                        name='circle'
                        type='font-awesome'
                        color='#1D50CE'
                        size={16}

                    />
                </Marker>
                <Marker coordinate={{
                    latitude: this.props.latitudenew,
                    longitude: this.props.longitudenew
                }}
                />
                {this.props.Images.length > 0 && this.props.Images.map(marker => (
                    <Marker
                        coordinate={marker}
                        title={marker.value}
                    >
                        <Image source={{ uri: marker.Icon }} style={{ width: 20, height: 20 }} />
                    </Marker>
                ))}
            </MapView>
        )
    }
}

export default MapViews