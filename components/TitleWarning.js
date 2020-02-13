import React, { Component } from 'react'
import {
    Text, StyleSheet, View, ImageBackground, Image, TextInput,
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback, TouchableOpacity
} from 'react-native'
import validator from 'validator';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SqliteHelper from '../hepper/sqlite.helper'
import { FlatList } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
SqliteHelper.openDB();
const options = {
    title: 'Chọn hình ảnh',
    takePhotoButtonTitle: 'Máy ảnh',
    chooseFromLibraryButtonTitle: 'Chọn từ thư viện ảnh',
};
export default class TitleWarning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            FlatListTitle: [],
            title: '',
            IconName: '',
        },
            this.create = this.create.bind(this);

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

    clearText = () => {
        this._textInput.setNativeProps({ text: '' });
    }
    create() {
        let strims = this.state.value.trim();
        let cutspace = (strims.substring(0, 1).toUpperCase() + strims.substring(1).toLowerCase());
        for (let i = 0; i < this.state.FlatListTitle.length; i++) {
            if (this.state.FlatListTitle[i].value == cutspace) {
                return (Alert.alert(
                    'Thêm thất bại',
                    'Dữ liệu đã tồn tại',
                ),
                    this.clearText());
            }
        }
        if (validator.isEmpty(cutspace) || cutspace == '') {
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng không để trống trường cảnh báo',
            )
        
        }else if(this.state.IconName ==''){
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng chọn hình ảnh phù hợp',
            )
        } else {
            Alert.alert(
                'Thông báo',
                'Bạn có chắc chắn muốn thêm dữ liệu',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                       
                        text: 'OK', onPress: () => {
                            SqliteHelper.addTitleWaring(cutspace, this.state.IconName)
                            this.props.navigation.navigate('Warning')
                        }
                    },
                ],
                { cancelable: false },
            );
        }
    }
    myfuc = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                alert('error'+response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response.uri;
                // const source =  'data:image/jpeg;base64,' + response.data ;

                this.setState({
                    IconName: source,
                });
            }
        });
    }

    render() {
        var imagebackgrouds = {
            uri: "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg"
        };
        const { showAlert } = this.state;
        return (
            <View>
                <ImageBackground source={imagebackgrouds} style={{ width: '100%', height: '100%' }} >
                    <TouchableWithoutFeedback style={{ flex: 1, flexDirection: 'column' }} onPress={Keyboard.dismiss} >
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 1, marginTop: 40 }}>
                                <TextInput style={styles.inputs}
                                    placeholder="Nhập cảnh báo của bạn"
                                    placeholderTextColor="gray"
                                    returnKeyType='next'
                                    onChangeText={value => this.setState({ value })}
                                    value={this.state.value}
                                    ref={component => this._textInput = component}
                                ></TextInput>
                                <View style={styles.buttons}>
                                    <Button
                                        onPress={this.create}
                                        title="Thêm mới"></Button>
                                    <Button title="Chọn ảnh"
                                        onPress={() => this.myfuc()} />
                                </View>
                            </View>
                            <View style={{ flex: 2.4,margin:'auto'}}>
                                <Image source={{uri : this.state.IconName}} style={{ width: '80%', height: '100%',marginLeft:40}} />
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