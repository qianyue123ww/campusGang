/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, FlatList} from 'react-native';
import screen from '../../../../utils/common/screen';
import WeatherTimeUtils from '../../../../utils/common/WeatherTimeUtils';
import WeatherIconUtils from '../../../../utils/common/WeatherIconUtils';
import WeatherLinerWidget from '../../../../utils/widget/WeatherLinearWidget';

export default class WeatherHeaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {hourfc} = this.props;
    if (!hourfc) {return null;}
    return (
      <View style={styles.containter}>
        <Text style={styles.title}>每小时</Text>
        <FlatList
          data={hourfc}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          renderItem={({item, index}) => this.convert(item, index)}
        />
      </View>
    );
  }
  convert(item, index) {
    const {hourfc} = this.props;
    const currentTemp = item.wthr;
    const len = hourfc.length;

    let WeatherLineBean;
    if (index === 0) {
      WeatherLineBean = this.generateWeatherLineBean(currentTemp, -1, hourfc[1].wthr);
    } else if (index === len - 1) {
      WeatherLineBean = this.generateWeatherLineBean(currentTemp ,hourfc[len - 2].wthr, -1);
    } else {
      WeatherLineBean = this.generateWeatherLineBean(currentTemp, hourfc[index - 1].wthr, hourfc[index + 1].wthr);
    }

    return (
      <View style={styles.wrap}>
        <Text style={styles.time}>
          {WeatherTimeUtils.getWeatherTime(item.time)}
        </Text>
        <Image
          source={WeatherIconUtils.getWeatherIconByType(item.type)}
          style={styles.icon}
        />
        <Text style={styles.desc}>
          {item.type_desc}
        </Text>
        <WeatherLinerWidget WeatherLineBean={WeatherLineBean} index={index} />
      </View>
    );
  }
  generateWeatherLineBean(currentTemp, preTemp, nextTemp) {
    return {
      maxTemp: this.props.hourMaxTemp,
      minTemp: this.props.hourMinTemp,
      currentTemp: currentTemp,
      preTemp: preTemp,
      nextTemp: nextTemp,
    };
  }
}
const styles = StyleSheet.create({
  containter: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  wrap: {
    width: screen.width / 6,
    paddingBottom: 16,
    alignItems: 'center',
  },
  time: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
    marginTop: 4,
  },
  desc: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
