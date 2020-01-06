/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Picker from 'react-native-picker';
import moment from 'moment';
import screen from '../../../../utils/common/screen';

import {fetchHotCity} from '../../../../api/api';
const APP_BAR_HEIGHT = 44;

export default class WeatherTarBar extends Component {
  constructor(props) {
    super(props);
  }
  getCityList() {
    return fetchHotCity().then(res => {
      const dataList = res.data.hot_national;
      return dataList;
    });
  }
  pickInit() {
    this.getCityList().then(data => {
      let hash = {};
      hash['南通市'] = {
        cityid: '101190505',
        upper: '南通市',
        name: '崇川区',
        prov: '江苏',
      };
      const dataList = data.reduce(
        (list, item, index) => {
          hash[item.name] = {...item};
          return [...list, item.name];
        },
        ['南通市'],
      );
      // console.log(2333,hash);
      Picker.init({
        pickerTitleText: '地区选择',
        pickerCancelBtnText: '取消',
        pickerConfirmBtnText: '确定',
        pickerData: dataList,
        pickerCancelBtnColor: [255, 255, 255, 1],
        pickerConfirmBtnColor: [255, 255, 255, 1],
        pickerTitleColor: [255, 255, 255, 1],
        pickerToolBarBg: [84, 126, 169, 1],
        pickerBg: [255, 255, 255],
        onPickerConfirm: data => {
          let [cityname] = data;
          let {cityid, upper, name, prov} = hash[cityname];
          this.props.callback(cityid, upper, name, prov);
        },
      });
      Picker.show();
    });
  }
  render() {
    const {weatherHeaderInfo, city} = this.props;
    console.log(weatherHeaderInfo, city);
    const cityName = city
      ? city.district
        ? city.district
        : city.cityName
      : '-';
    const desc = weatherHeaderInfo.updateTime
      ? '已更新 ' + moment().format('M/D') + ' ' + weatherHeaderInfo.updateTime
      : '正在加载';

    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.pickInit();
            }}>
            <View style={styles.row}>
              <View style={styles.container2}>
                <Text style={styles.cityName}>{cityName}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    flex: 1,
    alignItems: 'center',
  },
  wrap: {
    flex: 1,
    height: APP_BAR_HEIGHT,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  cityName: {
    color: '#fff',
    fontSize: 17,
  },
  tempOrDesc: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 8,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    padding: 4,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
