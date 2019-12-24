import screen from '../../utils/common/screen';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {HOME_MENUINFO} from '../../constants/data';

export default class RenderMenuInfo extends Component {
  constructor(props) {
    super(props);
  }
  onPress = () => {};
  render() {
    const data = HOME_MENUINFO;
    let menuItems = data.map((item, i) => (
      <TouchableOpacity onPress={this.onPress} key={i} style={styles.item}>
        <Image source={item.icon} resizeMode="contain" style={styles.icon} />
        <Text>{item.title}</Text>
      </TouchableOpacity>
    ));
    return (
      <View>
        <View style={styles.menu}>{menuItems}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: screen.width / 4,
    height: screen.width / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: screen.width / 10,
    height: screen.width / 10,
    margin: 5,
  },
});
