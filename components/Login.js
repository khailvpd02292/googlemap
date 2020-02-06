import React, { Component } from 'react'
import {
    Text, StyleSheet, View, ImageBackground, Image, TextInput,
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Login extends Component {
    render() {
        var imagebackgrouds = {
            uri: "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg"
        };
        const logo = {
            uri: "https://www.paracelsoft.com/images/cmssite/img/PPE.png"
        };
        const resizeMode = 'center';
        return (
            <View>
                <ImageBackground source={imagebackgrouds} style={{ width: '100%', height: '100%' }} >
                    <TouchableWithoutFeedback style={{ flex: 1, flexDirection: 'column' }} onPress={Keyboard.dismiss} >
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 1,justifyContent:"flex-end"}}>
                                <Image source={logo} style={{ width: '60%', height: '60%', marginLeft:80}}></Image>
                            </View>
                            <View style={{ flex: 2,marginTop:40 }}>
                                <TextInput style={styles.inputs}
                                    placeholder="Nhập email của bạn"
                                    placeholderTextColor="gray"
                                    returnKeyType='next'
                                ></TextInput>
                                <TextInput style={styles.inputs}
                                    placeholder="Nhập password của bạn"
                                    placeholderTextColor="gray"
                                    secureTextEntry={true}
                                ></TextInput>
                                <View style={styles.buttons}>
                                    <Button
                                        onPress={() =>
                                            this.props.navigation.navigate('Map')
                                        }
                                        title="Đăng nhập"></Button>
                                </View>
                                <View style={styles.buttons}>
                                    <Button color="red"
                                        onPress={() => {
                                            alert("Chua tao form")
                                        }}
                                        title="Đăng ký"></Button>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    inputs: {
        paddingLeft:10,
        height: 40,
        borderColor: '#c3c9c9',
        borderWidth: 1,
        borderRadius: 2,
        width: '90%',
        backgroundColor: '#cdd1d1',
        marginLeft: 20,
        marginBottom: 20
    },
    buttons: {
        height: 40,
        borderRadius: 2,
        width: '90%',
        marginLeft: 20,
        marginBottom: 10
    }
})
