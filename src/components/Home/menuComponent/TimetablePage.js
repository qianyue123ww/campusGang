import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class TimetablePage extends Component {
  static navigationOptions = {
    title: '课表',
  };
  constructor(props) {
    super(props);
    // this.state = {}
  }
  render() {
    return (
      <View>
        <Text>课表zzss</Text>
      </View>
    );
  }
}
