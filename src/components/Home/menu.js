import screen from '../../utils/common/screen';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {HOME_MENUINFO} from '../../constants/data';
import {shadow1} from '../../utils/common/style';

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
        <View style={[styles.wrap, styles.shadow1]}>
          <Image source={item.icon} resizeMode="contain" style={styles.icon} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
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
    width: screen.width / HOME_MENUINFO.length,
    height: screen.width / HOME_MENUINFO.length,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: screen.width / 12,
    height: screen.width / 12,
    margin: 5,
    borderRadius: 20,
  },
  wrap: {
    backgroundColor: '#F0FFFF',
    borderRadius: 10,
    marginBottom: 5,
  },
  shadow1,
  title: {
    fontSize: 13,
    letterSpacing: 1,
  },
});
