import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-material-dropdown';
export class ContentBottomDrawer extends Component {
    render() {
        return (
                 <View style={{ width: '8%', height: 30 }}>
                    <MaterialIcons
                        raised
                        name='my-location'
                        type='font-awesome'
                        color='black'
                        size={26}
                        onPress={this.props.location}
                    />
                </View>
        )
    }
}

export default ContentBottomDrawer
