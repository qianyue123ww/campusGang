import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Surface, Shape, Path, Group} from '@react-native-community/art';

const CIRCLE = Math.PI * 2;
/**
 * 空气污染指数取值范围 0-500
 */
const AIR_QUALITY_MAX_INDEX = 500;
const AIR_QUALITY_LEVEL = [
  '#58bc14',
  '#d0ba09',
  '#fd7e01',
  '#f70001',
  '#98004c',
  '#7d0023',
];
export default class AirQualityWidget extends Component {
  static defaultProps = {
    widthAndHeight: 180,
    trackWidth: 12,
    trackColor: 'rgba(255, 255, 255, 0.3)',
  };
  getAirQualityLevel(aqi) {
    if (aqi >= 0 && aqi <= 50) {
      return {
        levelAndColor: 0,
        desc: '优',
      };
    } else if (aqi > 50 && aqi <= 100) {
      return {
        levelAndColor: 1,
        desc: '良',
      };
    } else if (aqi > 100 && aqi <= 150) {
      return {
        levelAndColor: 2,
        desc: '轻度污染',
      };
    } else if (aqi > 150 && aqi <= 200) {
      return {
        levelAndColor: 3,
        desc: '中度污染',
      };
    } else if (aqi > 200 && aqi <= 300) {
      return {
        levelAndColor: 4,
        desc: '重度污染',
      };
    } else {
      return {
        levelAndColor: 5,
        desc: '严重污染',
      };
    }
  }
  makeArcPath(x, y, startAngleArg, endAngleArg, radius, direction) {
    let startAngle = startAngleArg;
    let endAngle = endAngleArg;
    if (endAngle - startAngle >= CIRCLE) {
      endAngle = CIRCLE + (endAngle % CIRCLE);
    } else {
      endAngle = endAngle % CIRCLE;
    }
    startAngle = startAngle % CIRCLE;
    const angle =
      startAngle > endAngle
        ? CIRCLE - startAngle + endAngle
        : endAngle - startAngle;

    if (angle >= CIRCLE) {
      return new Path()
        .moveTo(x + radius, y)
        .arc(0, radius * 2, radius, radius)
        .arc(0, radius * -2, radius, radius)
        .close();
    }
    const directionFactor = direction === 'counter-clockwise' ? -1 : 1;
    endAngle *= directionFactor;
    startAngle *= directionFactor;

    const startSine = Math.sin(startAngle);
    const startCosine = Math.cos(startAngle);
    const endSine = Math.sin(endAngle);
    const endCosine = Math.cos(endAngle);

    const arcFlag = angle > Math.PI ? 1 : 0;
    const reverseFlag = direction === 'counter-clockwise' ? 0 : 1;
    // console.log(`M${x+radius*(1+startSine)} ${y+radius-radius*startCosine}`)
    return `M${x + radius * (1 + startSine)} ${y +
      radius -
      radius * startCosine}
      A${radius} ${radius} 0 ${arcFlag} ${reverseFlag} ${x +
      radius * (1 + endSine)} ${y + radius - radius * endCosine}`;
  }

  render() {
    const {evnBean} = this.props;
    if (!evnBean) return null;
    let {aqi} = evnBean;
    const AirQualityLevel = this.getAirQualityLevel(aqi);
    const {levelAndColor, desc} = AirQualityLevel;

    const progressColor = AIR_QUALITY_LEVEL[levelAndColor];
    const percent = parseFloat(aqi / AIR_QUALITY_MAX_INDEX);
    const endAngle = -CIRCLE * 0.375 + CIRCLE * 0.375 * 2 * percent;

    const {widthAndHeight, trackWidth, trackColor} = this.props;
    const radius = widthAndHeight * 0.5;
    // 这个是100%进度条
    const trackPath = this.makeArcPath(
      trackWidth * 0.5,
      trackWidth * 0.5,
      -CIRCLE * 0.375,
      CIRCLE * 0.375,
      radius - trackWidth * 0.5,
      'clockwise',
    );
    // 这个污染程度占比进度条
    const circleProgressPath = this.makeArcPath(
      trackWidth * 0.5,
      trackWidth * 0.5,
      -CIRCLE * 0.375,
      endAngle,
      radius - trackWidth * 0.5,
      'clockwise',
    );
    return (
      <View style={{width: widthAndHeight, height: widthAndHeight}}>
        <Surface width={widthAndHeight} height={widthAndHeight}>
          <Group>
            <Shape d={trackPath} stroke={trackColor} strokeWidth={trackWidth} />
            <Shape
              d={circleProgressPath}
              stroke={progressColor}
              strokeWidth={trackWidth}
            />
          </Group>
        </Surface>
        <View style={styles.wrap}>
          <Text style={styles.aqi}>{aqi}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  aqi: {
    color: 'white',
    fontSize: 30,
  },
  desc: {
    color: 'white',
    fontSize: 14,
  },
});
