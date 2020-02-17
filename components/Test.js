import React, { Component } from 'react'
import { View, Text, CheckBox } from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';
import SqliteHelper from '../hepper/sqlite.helper'
var tempCheckValues = [];
const TAB_BAR_HEIGHT = 20;
SqliteHelper.openDB();
export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkBoxChecked: [],
      FlatListTitle: [],
    }
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
  checkBoxChanged(value, valu) {

    this.setState({
      checkBoxChecked: tempCheckValues
    })

    var tempCheckBoxChecked = this.state.checkBoxChecked;
    tempCheckBoxChecked[value] = !valu;

    this.setState({
      checkBoxChecked: tempCheckBoxChecked
    })

    console.log(valu)

  }

  render() {



    return (

      this.state.FlatListTitle.map((val) => {

        { tempCheckValues[val.value] = false }

        return (

          <View key={val.value} style={{ flexDirection: 'column' }}>

            <CheckBox

              value={this.state.checkBoxChecked[val.value]}

              onValueChange={() => this.checkBoxChanged(val.value, this.state.checkBoxChecked[val.value])}

            />
            

          </View >

        )

      }

      )

    );
  }
}

// const styles = StyleSheet.create({})
