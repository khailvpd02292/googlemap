import React, { Component } from 'react';

import { Alert, Image, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import PropTypes from 'prop-types';

class Selected_Items_Array {
  constructor() {
    selectedItemsArray = [];
  }

  pushItem(option) {
    selectedItemsArray.push(option);
  }

  getArray() {
    return selectedItemsArray;
  }
}

class Checkbox extends Component {

  constructor() {

    super();

    this.state = { checked: null }
  }

  componentWillMount() {

    if (this.props.checked) {
      this.setState({ checked: true }, () => {
        this.props.selectedArrayObject.pushItem({
          'key': this.props.keyValue,
          'label': this.props.label,
          'value': this.props.value
        });
      });
    }
    else {
      this.setState({ checked: false });
    }
  }

  toggleState(key, label, value) {
    this.setState({ checked: !this.state.checked }, () => {
      if (this.state.checked) {
        this.props.selectedArrayObject.pushItem({ 'key': key, 'label': label, 'value': value });
      }
      else {
        this.props.selectedArrayObject.getArray().splice(this.props.selectedArrayObject.getArray().findIndex(x => x.key == key), 1);
      }
    });
  }

  render() {
    return (

      <TouchableHighlight
        onPress={this.toggleState.bind(this, this.props.keyValue, this.props.label, this.props.value)}
        underlayColor="transparent"
        style={{ marginVertical: 10 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ width: this.props.size, height: this.props.size, backgroundColor: this.props.color, padding: 3 }}>
            {
              (this.state.checked)
                ?
                (<View style={styles.checkedView}>
                  <Image source={require('./image/police.png')} style={styles.checkBoxImage} />
                </View>)
                :
                (<View style={styles.uncheckedView} />)
            }

          </View>

          <Text style={[styles.checkBoxLabelText, { color: this.props.labelColor }]}>{this.props.label}</Text>

        </View>

      </TouchableHighlight>
    );
  }
}

export default class App extends Component {

  constructor() {

    super();

    selectedArrayOBJ = new Selected_Items_Array();
    this.state = { selectedItems: '' }

  }

  getSelectedItems = () => {

    if (selectedArrayOBJ.getArray().length == 0) {

      Alert.alert('No Items Selected!');
    }
    else {
      // console.log(selectedArrayOBJ.getArray().map(item => item.label).join());
      this.setState(() => {
        return {
          selectedItems: selectedArrayOBJ.getArray().map(item => item.value).join()
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.MainContainer}>

        <Checkbox size={30}
          keyValue={1}
          selectedArrayObject={selectedArrayOBJ}
          checked={true}
          color="#0091EA"
          labelColor="#0091EA"
          label="Item #1"
          value="item_1" />

        <Checkbox size={35}
          keyValue={2}
          selectedArrayObject={selectedArrayOBJ}
          checked={true}
          color="#1B5E20"
          labelColor="#1B5E20"
          label="Item #2"
          value="item_2" />

        <Checkbox size={40}
          keyValue={3}
          selectedArrayObject={selectedArrayOBJ}
          checked={true}
          color="#FF6F00"
          labelColor="#FF6F00"
          label="Item #3"
          value="item_3" />

        <TouchableHighlight underlayColor="#000" style={styles.selectedItemsButton} onPress={this.getSelectedItems}>

          <Text style={styles.selectedItemsButton_Text}>Get Selected Items</Text>

        </TouchableHighlight>

        <Text style={{ fontSize: 20, color: "#000", marginTop: 20 }}> {this.state.selectedItems} </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    MainContainer:
    {
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },

    selectedItemsButton:
    {
      marginTop: 25,
      padding: 8,
      backgroundColor: '#2962FF',
      alignSelf: 'stretch'
    },

    selectedItemsButton_Text:
    {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'stretch',
      fontSize: 18
    },

    checkedView:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    checkBoxImage:
    {
      height: '80%',
      width: '80%',
      tintColor: 'white',
      resizeMode: 'contain'
    },

    uncheckedView:
    {
      flex: 1,
      backgroundColor: 'white'
    },

    checkBoxLabelText:
    {
      fontSize: 16,
      paddingLeft: 10
    }
  });

Checkbox.propTypes =
  {
    size: PropTypes.number,
    keyValue: PropTypes.number.isRequired,
    selectedArrayObject: PropTypes.object.isRequired,
    color: PropTypes.string,
    label: PropTypes.string,
    labelColor: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool
  }

Checkbox.defaultProps =
  {
    size: 30,
    color: '#636c72',
    labelColor: '636c72',
    label: 'Default',
    checked: false,
    value: 'Default'
  }