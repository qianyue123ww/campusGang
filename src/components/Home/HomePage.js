import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RenderMenuInfo from './menu';
import RenderBanners from './banner';

export default class HomePage extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    header: null,
  };
  render() {
    return (
      <View>
        <Text>Home</Text>
        <RenderMenuInfo />
        {/* <RenderBanners /> */}
      </View>
    );
  }
}
