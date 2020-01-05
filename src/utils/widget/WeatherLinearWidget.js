/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Surface, Shape, Path} from '@react-native-community/art';
import screen from '../common/screen';

// 圆圈到顶部最大间距
const MAX_TOP_GAP = 24;
const CIRCLE_RADIUS = 1.5;

export default class WeatherLinerWidget extends Component {
  static defaultProps = {
    WeatherLineBean: {
      maxTemp: -1,
      minTemp: -1,
      currentTemp: -1,
      preTemp: -1,
      nextTemp: -1,
    },
    width: screen.width / 6,
    height: 60,
    lineWidth: 0.8,
    lineColor: 'rgba(255, 255, 255, 0.5)',
  };
  render() {
    const {width, height, WeatherLineBean, lineWidth, lineColor} = this.props;
    const path = Path();
    const tempYAxis = this.calTempYAxis(WeatherLineBean.currentTemp);
    const preTemp = WeatherLineBean.preTemp;
    if (preTemp !== -1) {
      // 前一天有温度
      const preTempYAxis = this.calTempYAxis(preTemp);
      if (preTempYAxis <= tempYAxis) {
        //前一天的y值小于当前的y值
        path.moveTo(0, (tempYAxis - preTempYAxis) * 0.5 + preTempYAxis);
      } else {
        path.moveTo(0, preTempYAxis - (preTempYAxis - tempYAxis) * 0.5);
      }
      path.lineTo(width * 0.5, tempYAxis);
    } else {
      // 前一天没有温度
      path.moveTo(width * 0.5, tempYAxis);
    }
    const nextTemp = WeatherLineBean.nextTemp;
    if (nextTemp !== -1) {
      // 下一天有温度
      const nextTempYAxis = this.calTempYAxis(nextTemp);
      if (nextTempYAxis <= tempYAxis) {
        // 下一天的y值小于当前的y值
        path.lineTo(width, (tempYAxis - nextTempYAxis) * 0.5 + nextTempYAxis);
      } else {
        path.lineTo(width, nextTempYAxis - (nextTempYAxis - tempYAxis) * 0.5);
      }
    }

    return (
      <View style={{width: width, height: height}}>
        <Surface width={width} height={height}>
          <Shape d={path} stroke={lineColor} strokeWidth={lineWidth} />
        </Surface>
        <View
          style={{
            position: 'absolute',
            width: CIRCLE_RADIUS * 2,
            height: CIRCLE_RADIUS * 2,
            borderRadius: CIRCLE_RADIUS,
            backgroundColor: 'white',
            top: tempYAxis - CIRCLE_RADIUS,
            left: width * 0.5 - CIRCLE_RADIUS,
          }}
        />
        <Text
          style={styles.symbol}
          ref={ref => (this.tempText = ref)}
          onLayout={e => {
            const textWidth = e.nativeEvent.layout.width;
            const textHeight = e.nativeEvent.layout.height;
            this.tempText.setNativeProps({
              style: {
                top: tempYAxis - textHeight - CIRCLE_RADIUS,
                left: width * 0.5 - textWidth * 0.5 + 2,
              },
            });
          }}>
          {WeatherLineBean.currentTemp}°
        </Text>
      </View>
    );
  }
  calTempYAxis(temp) {
    const {WeatherLineBean} = this.props;
    const diff = WeatherLineBean.maxTemp - temp;
    const diffTemp = WeatherLineBean.maxTemp - WeatherLineBean.minTemp;
    //误差计算
    const percent = parseFloat(diff / diffTemp);
    const distance = this.props.height - MAX_TOP_GAP - CIRCLE_RADIUS;
    // console.log(diff,diffTemp,percent,distance)
    return MAX_TOP_GAP + distance * percent;
  }
}

const styles = StyleSheet.create({
  symbol: {
    fontSize: 12,
    color: '#fff',
    position: 'absolute',
  },
});
