import {AppRegistry} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginPage from './src/components/Login/LoginPage';
import RegisterPage from './src/components/Login/RegisterPage';
import FindAccountPage from './src/components/Login/FindAccountPage';
import TabNav from './src/components/Tabbar/TabNav';

const App = createStackNavigator(
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
    initialRouteName: 'Main',
  },
);
export default createAppContainer(App);

AppRegistry.registerComponent('campusGang', () => createAppContainer);
