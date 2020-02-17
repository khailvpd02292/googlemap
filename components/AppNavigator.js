import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import Map from './Map';
import Warning from './Warning';
import TitleWarning from './TitleWarning';
const AppNavi = createStackNavigator({
  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },
 
  Map: {
      screen: Map,
      navigationOptions: () => ({
        headerShown:false
      })
    },
  Warning: {
    screen: Warning,
    navigationOptions: () => ({
      title: '',
      headerStyle: {
        backgroundColor: 'gray',
        height: 40,
      },
    })
  },
  TitleWarning: {
    screen: TitleWarning,
    navigationOptions: () => ({
      title: 'Thêm mới loại cảnh báo',
      headerStyle: {
        backgroundColor: 'gray',
        height: 40,
      },
    })
  },
},
  {
    initialRouteName: 'Map'
  });

const AppContainer = createAppContainer(AppNavi);
export default class AppNavigator extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}