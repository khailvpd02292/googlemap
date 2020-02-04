import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import Map from './Map';
import Warning from './Warning';
import TitleWarning from './TitleWarning';
const AppNavi = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
  Map: {
    screen: Map,
    navigationOptions: () => ({
      title: 'Map',
      // headerTitleAlign:"center",
      headerStyle: {
        backgroundColor: 'gray',
        height: 40,
      },
    })
  },

  Warning: {
    screen: Warning,
    navigationOptions: () => ({
      title: 'Thêm cảnh báo',
      headerStyle: {
        backgroundColor: 'gray',
        height: 40,
      },
    })
  },
  TitleWarning: {
    screen: TitleWarning,
    navigationOptions: () => ({
      title: 'Thêm mới cảnh báo',
      headerStyle: {
        backgroundColor: 'gray',
        height: 40,
      },
    })
  },
},
  {
    initialRouteName: 'Login'
  });

const AppContainer = createAppContainer(AppNavi);
export default class AppNavigator extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}