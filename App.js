import React from 'react';
import { FlatList, Text, View, Button, Alert } from 'react-native';
// import { openDatabase } from 'react-native-sqlite-storage';
// var db = openDatabase({ name: 'mapwarning.db' });
import SQLite from 'react-native-sqlite-storage';
// var db = SQLite.openDatabase({ name: 'mapwarning.db', createFromLocation: 1 });
var db = null;
import SqlHepper from './sqlite.helper'

// a.openDB();
// SQLite.DEBUG(true);

export default class App extends React.Component {
  errorCB(err) {
    console.log("SQL Error: " + err);
    alert('SQL Error:' + err)
  }

  successCB() {
    console.log("SQL executed fine");
    alert('SQL executed fine')
  }

  openCB() {
    console.log("Database OPENED");
    // alert('Database OPENED')
  }
  
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };

  
    db = SQLite.openDatabase({ name:'mapwarning', createFromLocation: "~data/mapwarning.db"}, this.openCB, this.errorCB);
    db.transaction((tx) => {      
        tx.executeSql('SELECT * FROM map', [], (tx, results) => {
          console.log("Query completed");
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          this.setState({
            FlatListItems: temp,
          });
        });
      });
  }

  // UNSAFE_componentWillMount = async () =>{
  //   console.log('hello1');
  //   let listTemp = [];
  //   const { keyword } = this.state;
  //   console.log('hello3');
  //   let temp = await a.getHospital(keyword);
  //   console.log(temp);
  //   console.log('hello2');
  //   for (let i = 0; i < temp.rows.length; i++) {
  //     const item = temp.rows.item(i);
  //     listTemp.push(item);
  //   };
  //   this.setState({
  //     FlatListItems: listTemp
  //   });
  //   console.log(this.state.listHospital); 
  //    console.log('hello');
  // }

  async componentWillMount() {
    
    const results = await a.getHospital();
    alert(results)
  }


  // ListViewItemSeparator = () => {
  //   return (
  //     <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
  //   );
  // };
  
  render() {
    return (
      <View>
       <Button title='click' onPress={() =>
         Alert.alert(this.state.FlatListItems[0])
         }></Button>
        <FlatList
          data={this.state.FlatListItems}
          // ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={{ backgroundColor: 'red', padding: 20 }}>
              <Text>Id: {item.id}</Text>
              <Text>Title: {item.title}</Text>
              <Text>Latitude: {item.latitude}</Text>
              <Text>Longitude: {item.longitude}</Text>
            </View>
          )}
        />
      </View>
    );
  }

}