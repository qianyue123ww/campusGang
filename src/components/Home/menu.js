import screen from '../../utils/common/screen';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
// import {HOME_MENUINFO} from '../../constants/data';

export default class RenderMenuInfo extends Component {
  constructor(props) {
    super(props);
  }
  onPress = () => {};
  render() {
    const data = this.props.list;
    let menuItems = data.map((item, i) => (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress(item.screen);
        }}
        key={i}
        style={styles.item}>
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
    width: screen.width / 12,
    height: screen.width / 12,
    margin: 5,
  },
});
