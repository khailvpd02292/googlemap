import React, { Component } from 'react'
import {
    Text, StyleSheet, View, ImageBackground, Image, TextInput,
    Alert,FlatList,
    Button, Modal, TouchableHighlight, TouchableOpacity
} from 'react-native'
// import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import Geolocation from '@react-native-community/geolocation';
import SqliteHelper from '../sqlite.helper'
SqliteHelper.openDB();
export default class Warning extends Component {
    UNSAFE_componentWillMount = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getTitleWarning();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemp.push(temp.rows.item(i));
        };
        this.setState({
            FlatListTitle: listTemp
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            latitude: '',
            longitude: '',
            FlatListTitle: [],
        };
        this.create =  this.create.bind(this)

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
    create() {
        if (this.state.value == null || this.state.value == '') {
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng chọn cảnh báo',
            )
        } else {
            SqliteHelper.addWarning(this.state.value, this.state.latitude, this.state.longitude),
                this.props.navigation.navigate('Map')
        }
    }

    render() {
        var imagebackgrouds = {
            uri: "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg"
        };
        return (
            <ImageBackground source={imagebackgrouds} style={{ width: '100%', height: '100%' }} >
                <View style={{
                    flex: 1, width: '90%',
                    marginTop: 0,
                    marginRight: 'auto',
                    marginBottom: 0,
                    marginLeft: 'auto'
                }}>
                    <View style={{ flex: 1, marginTop: 26 }}>
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
                                onPress={this.create} ></Button>
                        </View>

                        {/* <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={this.state.FlatListTitle}
                                    // ItemSeparatorComponent={this.ListViewItemSeparator}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View>
                                            <Text>Title: {item.value}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </View> */}
                    </View>
                </View>


            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    inputs: {
        height: 40,
        borderColor: '#c3c9c9',
        borderWidth: 1,
        borderRadius: 2,
        width: '90%',
        backgroundColor: '#cdd1d1',
        marginLeft: 20,
        marginBottom: 20
    }
})