import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import {shadow1, shadow2, color} from '../../../utils/common/style';

console.disableYellowBox = true;
// 日历组件 中文替换
LocaleConfig.locales['fr'] = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: [
    '周天.',
    '周一.',
    '周二.',
    '周三.',
    '周四.',
    '周五.',
    '周六.',
  ],
};
LocaleConfig.defaultLocale = 'fr';

export default class SignInPage extends Component {
  static navigationOptions = {
    title: '签到',
  };
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      signIn: false,
      storage: {},
    };
  }
  getMarkedDates(storage) {
    console.log(storage);
    storage &&
      storage
        .load({
          key: 'signIn',
        })
        .then(res => {
          console.log('找到了', res);
          if (Object.keys(this.state.markedDates).length === 0) {
            this.setState({
              markedDates: JSON.parse(res.markedDates),
            });
          }
        })
        .catch(err => console.log('没找到', err));
  }
  UNSAFE_componentWillMount() {
    let {storage} = global;
    this.setState({
      storage: storage,
    });
    this.getMarkedDates(storage);
  }
  setMarkDate() {
    const date = new Date()
      .toLocaleDateString()
      .replace(/\/(\d+)/g, (s, $1) => {
        let num = $1 < 10 ? '0' + $1 : $1;
        return '-' + num;
      });
    const marked = {[date]: {selected: true, selectedColor: color.pink}};
    this.state.storage
      .save({
        key: 'signIn',
        data: {
          markedDates: JSON.stringify(
            Object.assign({}, this.state.markedDates, marked),
          ),
        },
      })
      .catch(err => console.log('保存失败', err));
    return marked;
  }
  render() {
    console.log(this.state.markedDates);
    return (
      <View style={styles.container}>
        <View style={[styles.calWrap, styles.shadow2]}>
          <Calendar
            // Handler which gets executed on day press. Default = undefined
            monthFormat={'yyyy MM'}
            hideExtraDays={true}
            // hideArrows={true}
            disableMonthChange={true}
            firstDay={1}
            markedDates={this.state.markedDates}
          />
        </View>
        <View style={styles.wrap}>
          <TouchableOpacity
            style={[styles.btn, styles.shadow1]}
            activeOpacity={0.8}
            onPress={() => {
              console.log('save');
              this.setState(
                prevState => ({
                  signIn: true,
                  markedDates: Object.assign(
                    {},
                    prevState.markedDates,
                    this.setMarkDate(),
                  ),
                }),
                () => {
                  console.log(this.state.signIn);
                  console.log(this.state.markedDates);
                },
              );
            }}>
            <Text style={styles.btnIn}>签到</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  calWrap: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 20,
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  btn: {
    backgroundColor: color.pink,
    width: 120,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 25,
  },
  btnIn: {
    textAlign: 'center',
    color: color.white,
  },
  shadow1,
  shadow2,
});
