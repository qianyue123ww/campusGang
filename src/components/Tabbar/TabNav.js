import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomePage from '../Home/HomePage';
import SetAsidePage from '../SetAside/SetAsidePage';
import MinePage from '../Mine/MinePage';
import TaskPage from '../Task/TaskPage';
import {createStackNavigator} from 'react-navigation-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

const tabNav = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({Home: HomePage}),
      navigationOptions: () => ({
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (
          <AntDesign name={'home'} size={25} color={tintColor} />
        ),
      }),
    },
    Task: {
      screen: createStackNavigator({Task: TaskPage}),
      navigationOptions: () => ({
        tabBarLabel: '待定',
        tabBarIcon: ({tintColor}) => (
          <AntDesign name={'rest'} size={25} color={tintColor} />
        ),
      }),
    },
    SetAside: {
      screen: createStackNavigator({SetAside: SetAsidePage}),
      navigationOptions: () => ({
        tabBarLabel: '闲置',
        tabBarIcon: ({tintColor}) => (
          <AntDesign name={'rocket1'} size={25} color={tintColor} />
        ),
      }),
    },
    Mine: {
      screen: createStackNavigator({Mine: MinePage}),
      navigationOptions: () => ({
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor}) => (
          <AntDesign name={'user'} size={25} color={tintColor} />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);
export default tabNav;
