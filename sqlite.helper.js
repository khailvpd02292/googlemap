import SQLite from 'react-native-sqlite-storage';

var db = null;
export default class SqliteHelper {

  static okCallback = () => {
    // console.log('success')
  }

  static errorCallback = (error) => {
    alert('errorCallback: ' +  error)
  }

  static openDB() {
    db = SQLite.openDatabase({name: "dulieu2", createFromLocation: "~data/mapwarning.db"}, this.okCallback, this.errorCallback);
    return db;
  }

  static getWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT * FROM map";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getTitle = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT DISTINCT value FROM map";
        // console.log('completed')
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getTitleWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT * FROM warnings";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
  static async addWarning(value,latitude,longitude)  {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO map (value,latitude,longitude) VALUES (?,?,?)";
        tx.executeSql(sql, [value,latitude,longitude], (tx, results) => {
          resolve(results);
        });
      })
    });
  };

  static async addTitleWarning(value)  {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO warnings (value) VALUES (?)";
        console.log('success')
        tx.executeSql(sql, [value], (tx, results) => {
          resolve(results);
        });
      })
    });
  };


  static async query(sql) {
    return await new Promise(function (resolve, reject) {
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
}













// import React, { Component } from 'react'
// import {
//     Text, StyleSheet, View, ImageBackground, Image, TextInput,
//     Alert,
//     Button, Modal, TouchableHighlight, FlatList
// } from 'react-native'
// import { Dropdown } from 'react-native-material-dropdown';
// import Geolocation from '@react-native-community/geolocation';
// import SqliteHelper from '../sqlite.helper'
// SqliteHelper.openDB();
// export default class Warning extends Component {

//     UNSAFE_componentWillMount = async () => {
//         let listTemp = [];
//         let temp = await SqliteHelper.getTitleWarning();
//         for (let i = 0; i < temp.rows.length; i++) {
//             listTemp.push(temp.rows.item(i));
//         };
//         this.setState({
//             FlatListTitle: listTemp
//         });
//         console.log('a')
//         console.log(this.state.FlatListTitle)
//     }
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: '',
//             latitude:'',
//             longitude:'',
//             FlatListTitle: [],
//         };

//     }

//     // componentWillUpdate= async()=>{
//     //     await this.UNSAFE_componentWillMount();
//     //  }

//     create() {
//         SqliteHelper.addWarning(this.state.value,this.state.latitude,this.state.longitude)
//         this.props.navigation.navigate('Map')
//     }

//     render() {
//         var imagebackgrouds = {
//             uri: "https://redpithemes.com/Documentation/assets/img/page_bg/page_bg_blur02.jpg"
//         };
//         // let data = [{
//         //     value: 'Nơi thường xuyên bắn tốc độ',
//         // }, {
//         //     value: 'Đường gấp khúc dễ xảy ra tai nạn',
//         // }, {
//         //     value: 'Công an',
//         // }, {
//         //     value: 'Cầu gãy',
//         // }, {
//         //     value: 'Đường đang thi công',
//         // }];

//         return (
//             <ImageBackground source={imagebackgrouds} style={{ width: '100%', height: '100%' }} >
//                 <View style={{
//                     flex: 1, width: '90%',
//                     marginTop: 0,
//                     marginRight: 'auto',
//                     marginBottom: 0,
//                     marginLeft: 'auto'
//                 }}>
//                     <View style={{ flex: 1, marginTop: 24 }}>
//                         <Dropdown
//                             label='Chọn cảnh báo phù hợp'
//                             data={this.state.FlatListTitle}
//                             onChangeText={value => this.setState({value})}
//                             value={this.state.value}
//                         />
//                         <View style={{ width: 100, marginTop: 40, marginLeft: 250 }}>
//                             <Button title="Lưu"
//                                 onPress={() =>
//                                     this.create()
//                                 } ></Button>
//                         </View>
//                         <TextInput style={styles.inputs}
//                             placeholder="Enter your email or phone"
//                             placeholderTextColor="gray"
//                             returnKeyType='next'
//                         editable={false}
//                         ></TextInput>
//                          {/* <FlatList
//                             data={this.state.FlatListTitle}
//                             ItemSeparatorComponent={this.ListViewItemSeparator}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={({ item }) => (
//                                 <View>

//                                     <Text>Title: {item.value}</Text>
                                  
//                                 </View>
//                             )}
//                         /> */}
//                     </View>
//                     {/* <View style={{flex:1 }}>
//                         <Modal
//                             animationType="slide"
//                             transparent={false}
//                             visible={this.state.modalVisible}
//                             onRequestClose={() => {
//                                 Alert.alert('Modal has been closed.');
//                             }}
//                             >
//                             <View style={{ marginTop: 22 }}>
//                                 <View>
//                                     <Text>Hello World!</Text>

//                                     <TouchableHighlight
//                                         onPress={() => {
//                                             this.setModalVisible(!this.state.modalVisible);
//                                         }}>
//                                         <Text>Hide Modal</Text>
//                                     </TouchableHighlight>
//                                 </View>
//                             </View>
//                         </Modal>

//                         <TouchableHighlight
//                             onPress={() => {
//                                 this.setModalVisible(true);
//                             }}>
                                
//                             <Text>Show Modal</Text>
//                         </TouchableHighlight>
//                     </View> */}
//                 </View>


//             </ImageBackground>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     inputs: {
//         height: 40,
//         borderColor: '#c3c9c9',
//         borderWidth: 1,
//         borderRadius: 2,
//         width: '90%',
//         backgroundColor: '#cdd1d1',
//         marginLeft: 20,
//         marginBottom: 20
//     }
// })
