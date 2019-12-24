import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {color, fontSize} from '../../utils/common/style';
import {Mine_ITEMS} from '../../constants/data';

export default class Login extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: () => (
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require('../../assets/img/mine/setting.png')}
          style={styles.headerRight}
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: color.primary,
      elevation: 0,
    },
  });
  constructor(props) {
    super(props);
  }
  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          <Image
            style={styles.avatar}
            source={require('../../assets/img/mine/avatar.png')}
          />
          <Text>DW</Text>
        </View>
      </View>
    );
  }
  renderItems() {
    let allRows = [];
    Mine_ITEMS.forEach((lists, i) => {
      let data = lists.reduce((list, item) => {
        let row = (
          <View key={item.title}>
            <TouchableOpacity style={styles.row}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.bg}>
                <Text style={styles.rightIcon}>></Text>
              </View>
            </TouchableOpacity>
          </View>
        );
        list.push(row);
        return list;
      }, []);
      allRows = allRows.concat(data);
      allRows.push(
        <View style={{height: 10, backgroundColor: color.gray}} key={i} />,
      );
    });
    allRows.pop();
    return <View>{allRows}</View>;
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        <ScrollView>{this.renderItems()}</ScrollView>
      </View>
    );
    // return <View>{this.renderHeader()}</View>;
  }
}

const styles = StyleSheet.create({
  headerRight: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  header: {
    backgroundColor: color.primary,
    paddingBottom: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: color.white,
  },
  avatarWrap: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: color.white,
    padding: 5,
    marginBottom: 8,
    borderWidth: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderWidth: 1,
    borderColor: color.gray,
  },
  title: {
    fontSize: fontSize.small,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  bg: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  rightIcon: {
    fontSize: fontSize.normal,
    color: color.deepGray,
  },
});
