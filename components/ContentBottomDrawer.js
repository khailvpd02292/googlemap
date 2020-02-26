import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-material-dropdown';

export class ContentBottomDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
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
                                    data={this.props.FlatListTitle}
                                    onChangeText={value => this.setState({ value })}
                                    value={this.props.value}
                                    baseColor='#191616'
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 20, width: 100, marginLeft: 210 }}>
                            <Button title="Lưu"
                                onPress={this.props.create} />
                        </View>
                        <View style={{ marginTop: -30, width: 180 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'blue'
                                }}
                                onPress={this.props.toggleModal}
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

export default ContentBottomDrawer
