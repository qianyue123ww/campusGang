import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import WeatherIconUtils from '../../../../utils/common/WeatherIconUtils';

export default class WeatherHeaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const forecast15 = this.props.forecast15;
    const observe = this.props.observe;
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Image
            source={WeatherIconUtils.getWeatherIconByType(observe.type, false)}
            style={styles.icon}
          />
          <View style={styles.row}>
            <Text style={styles.temp} includeFontPadding={false}>
              {observe.temp}
            </Text>
            <Text style={styles.symbol}>°</Text>
          </View>
        </View>
        <Text style={styles.desc}>
          {forecast15[1].high +
            '°/' +
            forecast15[1].low +
            '°  体感温度 ' +
            observe.tigan +
            '°'}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 72,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  icon: {
    width: 58,
    height: 58,
    resizeMode: 'cover',
  },
  temp: {
    fontSize: 78,
    color: '#fff',
    fontFamily: 'Roboto',
  },
  symbol: {
    fontSize: 38,
    fontFamily: 'Roboto',
    color: '#fff',
    marginTop: 8,
  },
  desc: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginTop: -8,
  },
});
