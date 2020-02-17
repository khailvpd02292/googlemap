import React, { Component } from 'react'
import {
    Text, StyleSheet, View, ImageBackground, Image, TextInput,
    Alert, Platform, CheckBox,
    ScrollView, FlatList
} from 'react-native'
import SqliteHelper from '../hepper/sqlite.helper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'
// import CheckBox from 'react-native-check-box'
SqliteHelper.openDB();
var tempCheckValues = [];
export default class Warning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FlatListTitle: [],
            checkBoxChecked: [],
            Images: [],
        }
    }
    getImage = async () => {
        let listTempp = [];
        let tempp = await SqliteHelper.getImage();
        for (let i = 0; i < tempp.rows.length; i++) {
            listTempp.push(tempp.rows.item(i));
        };
        this.setState({
            Images: listTempp,
            loader: false,

        });
    }
    checkBoxChanged(id, value) {
        this.setState({
            checkBoxChecked: tempCheckValues
        })
        var tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[id] = !value;
        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        })
        console.log(value + id)
    }
    UNSAFE_componentWillMount = async () => {
        let listTemp = [];
        let temp = await SqliteHelper.getTitleWaring();
        for (let i = 0; i < temp.rows.length; i++) {
            listTemp.push(temp.rows.item(i));
        };
        this.setState({
            FlatListTitle: listTemp
        });
    }
    render() {
        var imagebackgrouds = {
            uri: "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg"
        };
        const { FlatListTitle } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={imagebackgrouds} style={{ width: '100%', height: '100%' }} >
                    <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                        <Text style={{ fontSize: 24, color: 'blue' }} >Danh sách cảnh báo</Text>
                    </View>
                    <View style={{ flex: 0.6, width: 70, marginLeft: 300 }}>
                        <TouchableOpacity style={{ width: 70, backgroundColor: '#2089dc', borderRadius: 3, height: 36, paddingLeft: 6, paddingTop: 4 }}>
                            <AntDesign
                                raised
                                name='filter'
                                color='#f8fbfe'
                                size={26}
                            />
                            <Text style={{ marginLeft: 30, marginTop: -22, marginBottom: 5, color: '#f8fbfe' }}>Lọc</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 8.4 }}>
                        {FlatListTitle.map((val) => {
                            { tempCheckValues[val.value] = false }
                            return (
                                <View key={val.value} style={{ height: 30, flexDirection: 'row', paddingLeft: 30 }}>
                                    <ScrollView>
                                        <View style={{ height: 30, flexDirection: 'column' }}>
                                            <CheckBox
                                                value={this.state.checkBoxChecked[val.value]}
                                                onValueChange={() => this.checkBoxChanged(val.value, this.state.checkBoxChecked[val.value])}
                                            />
                                            <Text style={{ paddingLeft: 40, marginTop: -26 }}>{val.value}</Text>
                                        </View>
                                    </ScrollView>
                                </View >
                            )
                        }
                        )}
                    </View>

                </ImageBackground>
            </View>
        )
    }
}

