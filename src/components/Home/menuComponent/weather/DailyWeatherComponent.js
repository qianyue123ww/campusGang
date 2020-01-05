/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, FlatList} from 'react-native';
import screen from '../../../../utils/common/screen';
import WeatherTimeUtils from '../../../../utils/common/WeatherTimeUtils';
import WeatherIconUtils from '../../../../utils/common/WeatherIconUtils';

import WeatherLinerWidget from '../../../../utils/widget/WeatherLinearWidget';

const SCREEN_WIDTH = screen.width;
export default class WeatherHeaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const forecast15 = this.props.forecast15;
    if (!forecast15) {return null;}
    return (
        <View style={styles.container}>
            <Text style={styles.title}>每日</Text>
            <FlatList
                data={forecast15}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => this.convert(item, index)}
                horizontal={true}/>
        </View>
    );
  }
  getDay(day) {
    switch (day) {
      case 'Monday':
        return '周一';
      case 'Tuesday':
        return '周二';
      case 'Wednesday':
        return '周三';
      case 'Thursday':
        return '周四';
      case 'Friday':
        return '周五';
      case 'Saturday':
        return '周六';
      case 'Sunday':
        return '周日';
    }
  }

  convert = (item, index) => {
    const forecast15 = this.props.forecast15;
    let weekText;
    if (index === 0) {
        weekText = '昨天';
    } else if (index === 1) {
        weekText = '今天';
    } else {
        const day = WeatherTimeUtils.getWeatherDay(item.date);
        weekText = this.getDay(day);
    }

    let wd = item.day.wd;
    if (wd === '无持续风向')
        {wd = '风向不定';}

    const {dailyDayMaxTemp, dailyDayMinTemp, dailyNightMaxTemp, dailyNightMinTemp} = this.props;
    const currentDayTemp = item.high;
    const currentNightTemp = item.low;
    let WeatherDayLineBean, WeatherNightLineBean;
    if (index === 0) {
        WeatherDayLineBean = this.generateWeatherLineBean(dailyDayMaxTemp, dailyDayMinTemp,
            currentDayTemp, -1, forecast15[1].high);
        WeatherNightLineBean = this.generateWeatherLineBean(dailyNightMaxTemp, dailyNightMinTemp,
            currentNightTemp, -1, forecast15[1].low);
    } else if (index === forecast15.length - 1) {
        WeatherDayLineBean = this.generateWeatherLineBean(dailyDayMaxTemp, dailyDayMinTemp,
            currentDayTemp, forecast15[forecast15.length - 2].high, -1);
        WeatherNightLineBean = this.generateWeatherLineBean(dailyNightMaxTemp, dailyNightMinTemp,
            currentNightTemp, forecast15[forecast15.length - 2].low, -1);
    } else {
        WeatherDayLineBean = this.generateWeatherLineBean(dailyDayMaxTemp, dailyDayMinTemp,
            currentDayTemp, forecast15[index - 1].high, forecast15[index + 1].high);
        WeatherNightLineBean = this.generateWeatherLineBean(dailyNightMaxTemp, dailyNightMinTemp,
            currentNightTemp, forecast15[index - 1].low, forecast15[index + 1].low);
    }

    return (
        <View style={styles.wrap}>
            <Text style={styles.weekText}>{weekText}</Text>
            <Text style={styles.date}>{WeatherTimeUtils.getWeatherDate(item.date)}</Text>
            <Text style={styles.wthr}>{item.day.wthr}</Text>
            <Image source={WeatherIconUtils.getWeatherIconByType(item.day.type, false)} style={styles.icon} />
            <WeatherLinerWidget
                WeatherLineBean={WeatherDayLineBean}/>
            <WeatherLinerWidget
                WeatherLineBean={WeatherNightLineBean}/>
            <Image source={WeatherIconUtils.getWeatherIconByType(item.night.type, true)} style={styles.icon} />
            <Text style={styles.wthr}>{item.night.wthr}</Text>
            <Text style={styles.date}>{wd}</Text>
            <Text style={styles.date}>{item.day.wp}</Text>
        </View>
    );
};

  generateWeatherLineBean = (maxTemp, minTemp, currentTemp, preTemp, nextTemp) => {
    return {
        maxTemp: maxTemp,
        minTemp: minTemp,
        currentTemp: currentTemp,
        preTemp: preTemp,
        nextTemp: nextTemp,
    };
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  wrap: {
    width: SCREEN_WIDTH / 6,
    paddingBottom: 16,
    alignItems: 'center',
  },
  weekText: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
  },
  date: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
    marginTop: 4,
  },
  wthr: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
    marginTop: 4,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
    marginTop: 4,
  },
});
