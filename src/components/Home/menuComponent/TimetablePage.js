import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {timetable} from '../../../constants/data';
import {fontSize, color} from '../../../utils/common/style';
import {TextInput} from 'react-native-gesture-handler';

import {getTimetable, updateOrSaveTimetable} from '../../../api/api';

export default class TimetablePage extends Component {
  static navigationOptions = {
    title: '课表',
  };
  constructor(props) {
    super(props);
    this.state = {
      timetable: timetable,
      ableUpdate: false,
      id: '5e8bf0e111e92015200e3c01',
    };
    // this.state = {}
  }
  upDateTimetable = () => {
    this.setState(preState => ({ableUpdate: !preState.ableUpdate}));
  };
  updateItem = (text, r, c) => {
    this.setState(preState => {
      let {timetable} = preState;
      timetable[r][c] = text;
      return {
        timetable: timetable,
      };
    });
  };
  componentDidMount() {
    const {id} = this.state;
    getTimetable(id).then(data => {
      this.setState({
        timetable: data.timetable || timetable,
      });
    });
    // this.setState({
    //   timetable: data || timetable,
    // });
  }
  componentDidUpdate() {
    const data = {
      id: this.state.id,
      timetable: this.state.timetable,
    };
    if (!this.state.ableUpdate) {
      //向服务器发送数据
      updateOrSaveTimetable(data).then(res => console.log(res));
      //手动还原一下课表
      // updateOrSaveTimetable({
      //   id: this.state.id,
      //   timetable: timetable,
      // });
    }
  }
  render() {
    const day = ['星期一', '星期二', '星期三', '星期四', '星期五'];
    const time = [
      ['7:50', '8:30'],
      ['8:40', '9:20'],
      ['9:30', '10:10'],
      ['10:30', '11:10'],
      ['11:20', '12:00'],
      ['2:20', '3:10'],
      ['3:30', '4:00'],
    ];
    const color = [
      'color1',
      'color2',
      'color3',
      'color4',
      'color5',
      'color6',
      'color7',
    ];
    return (
      <View>
        <View style={styles.timetable}>
          <View style={styles.dirC}>
            <Text style={styles.tableHeadItem}>time</Text>
            {time.map(item => (
              <View style={styles.item}>
                <Text style={[styles.text, styles.pad10]}>
                  {item[0]}-{'\n'}
                  {item[1]}
                </Text>
              </View>
            ))}
          </View>
          <View style={{flex: 1}}>
            <View style={styles.tableHead}>
              {Array.from(Array(5), (item, i) => i).map(item => (
                <View style={styles.wrapCol}>
                  <Text style={styles.tableHeadItem}>{day[item]}</Text>
                </View>
              ))}
            </View>
            <View style={styles.container}>
              {/* <View style={styles.dirC}>
            <View style={styles.item}>
              <Text style={styles.text}>233</Text>
            </View>
          </View> */}
              {this.state.timetable.map((dataList, r) => (
                <View style={styles.wrapCol}>
                  {dataList.map((item, c) => (
                    <View style={[styles.item, item && styles[color[c]]]}>
                      {this.state.ableUpdate ? (
                        <TextInput
                          style={styles.text}
                          onChangeText={text => this.updateItem(text, r, c)}>
                          {item}
                        </TextInput>
                      ) : (
                        <Text style={styles.text}>{item}</Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={this.upDateTimetable} style={styles.btnWrap}>
          {/* <Text style={styles.btn}>修改</Text> */}
          <Text style={styles.btn}>
            {this.state.ableUpdate ? '确定' : '修改'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timetable: {
    flexDirection: 'row',
    // flex: 1,
  },
  tableHead: {
    flexDirection: 'row',
  },
  dirC: {
    flexDirection: 'column',
  },
  tableHeadItem: {
    textAlign: 'center',
    height: 40,
    lineHeight: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: fontSize.small,
    borderRadius: 5,
  },
  container: {
    flexDirection: 'row',
  },
  wrapCol: {
    flex: 1,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: fontSize.small,
    borderRadius: 2,
  },
  text: {
    textAlign: 'center',
    height: 40,
    marginTop: 10,
    fontSize: fontSize.small,
  },
  btnWrap: {
    position: 'absolute',
    right: 10,
    bottom: -40,
  },
  btn: {
    height: 30,
    lineHeight: 30,
    width: 50,
    textAlign: 'center',
    borderRadius: 8,
    // position: 'absolute',
    // right: 10,
    // top: 10,
    backgroundColor: '#DC143C',
    color: 'white',
  },
  pad10: {
    padding: 3,
  },
  color1: {
    backgroundColor: '#FFFF00',
  },
  color2: {
    backgroundColor: '#FF69B4',
  },
  color3: {
    backgroundColor: '#A020F0',
  },
  color4: {
    backgroundColor: '#32CD32',
  },
  color5: {
    backgroundColor: '#FF8C00',
  },
  color6: {
    backgroundColor: '#5CACEE',
  },
  color7: {
    backgroundColor: '#EE7AE9',
  },
});
