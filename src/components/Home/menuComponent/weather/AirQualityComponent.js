import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import screen from '../../../../utils/common/screen';
import AirQualityWidget from '../../../../utils/widget/AirQualityWidget';

export default class WeatherHeaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  renderAirQualityItem(title, desc, value) {
    return (
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  }
  render() {
    const {evnBean} = this.props;
    // eslint-disable-next-line curly
    if (!evnBean) return null;
    return (
      <View style={styles.container}>
        <Text style={styles.topic}>空气质量</Text>
        <AirQualityWidget evnBean={evnBean} />
        <View style={styles.wrap}>
          {this.renderAirQualityItem('PM2.5', '细颗粒物', evnBean.pm25)}
          {this.renderAirQualityItem('PM10', '可吸入颗粒物', evnBean.pm10)}
          {this.renderAirQualityItem('O3', '臭氧', evnBean.o3)}
          {this.renderAirQualityItem('SO2', '二氧化硫', evnBean.so2)}
          {this.renderAirQualityItem('NO2', '二氧化氮', evnBean.no2)}
          {this.renderAirQualityItem('CO', '一氧化碳', evnBean.co)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  topic: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 24,
  },
  wrap: {
    width: screen.width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 16,
  },
  message: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 16,
  },
  row: {
    width: screen.width * 0.5,
    flexDirection: 'row',
    marginTop: 12,
  },
  left: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
  },
  desc: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  value: {
    color: '#FFF',
    fontSize: 26,
    marginEnd: 16,
  },
});
