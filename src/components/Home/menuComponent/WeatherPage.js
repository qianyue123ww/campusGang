import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  StyleSheet,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PermissionUtils from '../../../utils/common/PermissionsUtils';
import ToastUtils from '../../../utils/common/ToastUtils';
import WeatherDataUtils from '../../../utils/common/WeatherDataUtils';

import {fetchLocation, searchCity, fetchWeatherData} from '../../../api/api';

import {weatherComponents} from '../../../constants/data';

//天气头部：0，小时天气：1，每日天气：2，空气质量：3，生活指数：4，日出和日落：5，count:6
import WeatherHeaderComponent from './weather/WeatherHeaderComponent';
import HourWeatherComponent from './weather/HourWeatherComponent';
import DailyWeatherComponent from './weather/DailyWeatherComponent';
import AirQualityComponent from './weather/AirQualityComponent';
import LifeIndexComponent from './weather/LifeIndexComponent';
import SunriseAndSunsetComponent from './weather/SunriseAndSunsetComponent';

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const APP_BAR_HEIGHT = 44;
/**
 * 南通
 * @param 31.98 纬度，latitude
 * @param 120.88 经度，longtitude
 */

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      requestLocation: true, //正在请求中
      weatherHeaderInfo: {},
      dataList: [],
    };
  }
  static navigationOptions = ({navigation, screenPrpos}) => ({
    headerStyle: {
      height: 44,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderBottomWidth: 0,
    },
    headerTransparent: true,
  });
  componentDidMount() {
    this.locationRequestSuccess();
    //检查是否有定位权限
    PermissionUtils.checkPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      () => {
        this.locationRequestSuccess();
      },
      () => {
        this.requestLocationPermission();
      },
    );
  }
  //请求定位权限
  requestLocationPermission() {
    PermissionUtils.requestPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      successInfo => {
        console.log(1);
        ToastUtils.show(successInfo);
        this.locationRequestSuccess();
      },
      errorInfo => {
        console.log(2);
        ToastUtils.show(errorInfo);
      },
      '权限申请成功',
      '权限申请失败',
    );
  }

  /**获取地理信息
   * 生成一个城市item
   * @param cityId 城市id
   * @param cityName 城市名称
   * @param district 城市区域
   * @param province 城市所属省份
   * @param temp 当前温度
   * @param max 城市天气最高温度
   * @param min 城市天气最低温度
   * @param weatherDesc 天气描述(多云)
   * @param weatherType type图标
   * @param isLocation 是否是定位地址
   * @returns {{cityId: *, cityName: *, district: *, province: *, max: *, min: *, isLocation: *}}
   */
  // eslint-disable-next-line prettier/prettier
  renderOrUpdataCity(cityId, cityName, district, province, temp, max, min, weatherDesc, weatherType, isLocation){
    return {
      cityId: cityId,
      cityName: cityName,
      district: district,
      province: province,
      temp: temp,
      max: max,
      min: min,
      weatherDesc: weatherDesc,
      weatherType: weatherType,
      isLocation: isLocation,
    };
  }

  locationRequestSuccess() {
    fetchLocation(31.98, 120.88).then(data => {
      const address = data.result.address_component;
      // let {city, province, district} = address;
      searchCity(address).then(res => {
        const [location] = res.data;
        const {cityid, upper, name, prov} = location;
        // eslint-disable-next-line prettier/prettier
        const city = this.renderOrUpdataCity(cityid, upper, name, prov, -1, -1, -1, null, -1, true);
        this.setState(
          {
            city: city,
            // requestLocation: false,
          },
          () => {
            this.getWeatherData();
          },
        );
      });
    });
  }
  getWeatherData() {
    const {cityId, cityName, district, province} = this.state.city;
    if (cityId) {
      fetchWeatherData(cityId).then(data => {
        const {forecast15, observe} = data;
        const city = this.renderOrUpdataCity(
          cityId,
          cityName,
          district,
          province,
          observe.temp,
          forecast15[1].high,
          forecast15[1].low,
          observe.wthr,
          observe.type,
          false,
        );
        // this.setState({
        //   city: city,
        //   weatherHeaderInfo: {
        //     currentTemp: observe.temp,
        //     weatherDesc: observe.wthr,
        //     updateTime: observe.up_time,
        //   },
        // });
        let dataList = [];
        for (let i = 0; i < weatherComponents.WEATHER_TYPE_COUNT; i++) {
          dataList.push({
            itemType: i,
            weatherData: WeatherDataUtils.getWeatherPartData(i, data),
          });
        }
        // console.log(dataList);
        this.setState({
          city: city,
          weatherHeaderInfo: {
            currentTemp: observe.temp,
            weatherDesc: observe.wthr,
            updateTime: observe.up_time,
          },
          dataList: dataList,
          requestLocation: false,
        });
      });
    }
  }
  //根据itemType渲染部分组件
  renderPartCompents(item) {
    const {itemType, weatherData} = item;
    const {
      WEATHER_TYPE_HEADER,
      WEATHER_TYPE_HOUR_WEATHER,
      WEATHER_TYPE_DAILY_WEATHER,
      WEATHER_TYPE_AIR_QUALITY,
      WEATHER_TYPE_LIFT_INDEX,
      WEATHER_TYPE_SUNRISE_AND_SUNSET,
    } = weatherComponents;
    if (!weatherData) return null;
    switch (itemType) {
      case WEATHER_TYPE_HEADER:
      default:
        return (
          <WeatherHeaderComponent
            forecast15={weatherData.forecast15}
            observe={weatherData.observe}
          />
        );
      case WEATHER_TYPE_HOUR_WEATHER:
        return (
          <HourWeatherComponent
            hourfc={weatherData.hourfc}
            hourMaxTemp={weatherData.hourMaxTemp}
            hourMinTemp={weatherData.hourMinTemp}
          />
        );
      case WEATHER_TYPE_DAILY_WEATHER:
        return (
          <DailyWeatherComponent
            forecast15={weatherData.forecast15}
            dailyDayMaxTemp={weatherData.dailyDayMaxTemp}
            dailyDayMinTemp={weatherData.dailyDayMinTemp}
            dailyNightMaxTemp={weatherData.dailyNightMaxTemp}
            dailyNightMinTemp={weatherData.dailyNightMinTemp}
          />
        );
      case WEATHER_TYPE_AIR_QUALITY:
        return <AirQualityComponent evnBean={weatherData.evnBean} />;
      case WEATHER_TYPE_LIFT_INDEX:
        return (
          <LifeIndexComponent
            indexes={weatherData.indexes}
            normalIndexes={weatherData.normalIndexes}
          />
        );
      case WEATHER_TYPE_SUNRISE_AND_SUNSET:
        return (
          <SunriseAndSunsetComponent
            currentDateBean={weatherData.currentDateBean}
          />
        );
    }
  }
  renderWeatherPage() {
    return (
      <FlatList
        data={this.state.dataList}
        renderItem={({item}) => this.renderPartCompents(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
  render() {
    return (
      <LinearGradient
        colors={['#464e96', '#547ea9', '#409aaf']}
        style={{flex: 1}}>
        <StatusBar
          barStyle={'light-content'}
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0)'}
        />
        <View style={{flex: 1}}>
          {this.state.requestLocation ? (
            <View style={styles.wrapIndicator}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <View style={styles.container}>{this.renderWeatherPage()}</View>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  wrapIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: STATUS_BAR_HEIGHT + APP_BAR_HEIGHT,
  },
  container: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
  },
});
