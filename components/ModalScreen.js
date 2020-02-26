import React, { Component } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList,
    ImageBackground, Animated, Alert, Dimensions, StyleSheet } from 'react-native'
import Modal from "react-native-modal";
import { CheckBox } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
export class ModalScreen extends Component {
    render() {
        return (
            <Modal isVisible={this.props.isModalVisible} style={{ margin: 0, padding: 0 }}
            backdropOpacity={1}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
        >
            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 3 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{ fontSize: 28, color: 'blue' }} >Danh sách cảnh báo</Text>
                </View>
                <View style={{ flex: 0.8, width: '96%', alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ width: 88, backgroundColor: '#2089dc', borderRadius: 3, height: 44, paddingLeft: 6, paddingTop: 4 }}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign
                            raised
                            name='filter'
                            color='#f8fbfe'
                            size={28}
                        />
                        <Text style={{ marginLeft: 30, marginTop: -25, marginBottom: 5, color: '#f8fbfe', fontSize: 20 }}>Lọc</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 8.3, marginTop: 10 }}>
                    <ScrollView>
                        {this.props.FlatListTitle.map((val) => {
                            return (
                                <View key={val.value} style={{ height: 50, paddingLeft: 20 }}>
                                    <CheckBox
                                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, width: 250 }}
                                        textStyle={{ fontWeight: "normal", fontSize: 22 }}
                                        onPress={this.props.onclickcb(val.value)}
                                        checked={this.props.checkBoxChecked.includes(val.value)}
                                        title={val.value}
                                    />

                                </View >
                            )
                        }
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
                  
        )
    }
}

export default ModalScreen
