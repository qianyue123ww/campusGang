// home
export const HOME_MENUINFO = [
  {
    title: '签到',
    screen: 'SignIn',
    icon: require('../assets/img/home/signIn.png'),
  },
  {
    title: '天气',
    screen: 'Weather',
    icon: require('../assets/img/home/weather.png'),
  },
  {
    title: '课表',
    screen: 'Timetable',
    icon: require('../assets/img/home/timetable.png'),
  },

  // {title: '待定', screen: '', icon: require('../assets/img/home/planet.png')},
];
//mine
export const Mine_ITEMS = [
  [
    {title: '我的信息', icon: require('../assets/img/mine/info.png')},
    // {title: '我的点赞', icon: require('../assets/img/mine/like.png')},
    {title: '我的收藏', icon: require('../assets/img/mine/collection.png')},
  ],
  [
    {title: '我的发布', icon: require('../assets/img/mine/Release.png')},
    {title: '我的订单', icon: require('../assets/img/mine/order.png')},
    {title: '我的通知', icon: require('../assets/img/mine/notice.png')},
  ],
];
export const titleBar = {
  icon: require('../assets/img/home/bar.png'),
};

export const weatherComponents = {
  // 天气头部
  WEATHER_TYPE_HEADER: 0,
  // 小时天气
  WEATHER_TYPE_HOUR_WEATHER: 1,
  // 每日天气
  WEATHER_TYPE_DAILY_WEATHER: 2,
  //空气质量
  WEATHER_TYPE_AIR_QUALITY: 3,
  //生活指数
  WEATHER_TYPE_LIFT_INDEX: 4,
  //日出和日落
  WEATHER_TYPE_SUNRISE_AND_SUNSET: 5,
  //总数
  WEATHER_TYPE_COUNT: 6,
};
