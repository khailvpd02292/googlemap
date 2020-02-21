import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from '@react-native-community/geolocation';
export class HeaderBotomDrawer extends Component {
    render() {
        return (
            <View style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, height: 34, alignItems: "center", justifyContent: "center" }}>
                <Feather
                    raised
                    name='minus'
                    color='black'
                    size={26}
                />

            </View>
        )
    }
}

export default HeaderBotomDrawer
