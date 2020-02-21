import React, { Component } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList,
    ImageBackground, Animated, Alert, Dimensions, StyleSheet } from 'react-native'
// import Modal from "react-native-modal";
import { CheckBox } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
export class ModalScreen extends Component {
    render() {
        return (
                        <View style={{ flex: 8.3, marginTop: 10 }}>
                            <ScrollView>
                                {this.props.FlatListTitle.map((val) => {
                                    return (
                                        <View key={val.value} style={{ height: 50, paddingLeft: 20 }}>
                                            <CheckBox
                                                containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                                textStyle={{ fontWeight: "normal", fontSize: 22 }}
                                                onPress={() => this.props.onclickcb(val.value)}
                                                checked={this.props.checkBoxChecked.includes(val.value)}
                                                title={val.value}
                                            />
                                        </View >
                                    )
                                }
                                )}
                            </ScrollView>
                        </View>
                  
        )
    }
}

export default ModalScreen
