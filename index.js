/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './components/Login'
import AppNavigator from './components/AppNavigator'
import Warning from './components/Warning'
import Test from './components/Test'
AppRegistry.registerComponent(appName, () => AppNavigator);

