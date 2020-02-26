import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import Home from './Home';
import TitleWarning from './TitleWarning';
const AppNavi = createStackNavigator({
  Home: {
      screen: Home,
      navigationOptions: () => ({
        headerShown:false
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
    initialRouteName: 'Home'
  });

const AppContainer = createAppContainer(AppNavi);
export default class AppNavigator extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}