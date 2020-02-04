import React, { Component } from 'react'
import {
    Text, StyleSheet, View, ImageBackground, Image, TextInput,
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import validator from 'validator';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SqliteHelper from '../sqlite.helper'
import { FlatList } from 'react-native-gesture-handler';
SqliteHelper.openDB();
let title =null;
export default class TitleWarning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            FlatListTitle: [],
        },
            this.create = this.create.bind(this);
    }
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

    getTitle() {  
        console.log(this.state.FlatListTitle.length)
        for (let i = 0; i < this.state.FlatListTitle.length; i++) {
            if (this.state.FlatListTitle[i].value === this.state.value) {
                title =this.state.FlatListTitle[i].value;
                break;
            }
    }   
}
create() {
    this.getTitle();
    if (validator.isEmpty(this.state.value)) {
        Alert.alert(
            'Thêm thất bại',
            'Vui lòng không để trống trường cảnh báo',
        )
    }else if(title == this.state.value){      
        Alert.alert(
            'Thêm thất bại',
            'Dữ liệu đã tồn tại',
        )
    } else {
        // SqliteHelper.addTitleWarning(this.state.value)
        // this.props.navigation.navigate('Warning')
        console.log('a')
    }
}

render() {
    var imagebackgrouds = {
        uri: "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg"
    };
    return (
        <View>
            <ImageBackground source={imagebackgrouds} style={{ width: '100%', height: '100%' }} >
                <TouchableWithoutFeedback style={{ flex: 1, flexDirection: 'column' }} onPress={Keyboard.dismiss} >
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 2, marginTop: 40 }}>
                            <TextInput style={styles.inputs}
                                placeholder="Nhập cảnh báo của bạn"
                                placeholderTextColor="gray"
                                returnKeyType='next'
                                onChangeText={value => this.setState({value})}
                                value={this.state.value}
                            ></TextInput>
                            <View style={styles.buttons}>
                                <Button
                                    onPress={this.create}
                                    title="Thêm mới"></Button>
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </ImageBackground>
        </View>
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
        marginBottom: 20,
        paddingLeft: 20
    },
    buttons: {
        height: 40,
        borderRadius: 2,
        width: '90%',
        marginLeft: 20,
        marginBottom: 10
    }
})
