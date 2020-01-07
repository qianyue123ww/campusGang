import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginPage from './src/components/Login/LoginPage';
import RegisterPage from './src/components/Login/RegisterPage';
import FindAccountPage from './src/components/Login/FindAccountPage';
import TabNav from './src/components/Tabbar/TabNav';
import SplashScreen from 'react-native-splash-screen';
import {storage} from './src/utils/common/storage';
global.storage = storage;

const nav = createStackNavigator(
  {
    Login: LoginPage,
    Register: RegisterPage,
    FindAccount: FindAccountPage,
    Main: {
      screen: TabNav,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Login',
  },
);
const AppContainer = createAppContainer(nav);
export default class CampusGang extends Component {
  componentDidMount() {
    // setTimeout(() => {
    //   SplashScreen.hide(); //隐藏启动屏
    // }, 1000);
    SplashScreen.hide(); //隐藏启动屏
    // global.storage = storage; //全局注册storage
  }
  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent('campusGang', () => CampusGang);
