export default class WeatherDataUtils {
  static getWeatherPartData(index, weatherData) {
    switch (index) {
      case 0:
      default:
        return {
          forecast15: weatherData.forecast15,
          observe: weatherData.observe,
        };
      case 1:
        const hourfc = weatherData.hourfc;
        const hourMaxAndMinTempObj = this.calHourMaxAndMinTemp(hourfc);
        return {
          hourfc: hourfc,
          hourMaxTemp: hourMaxAndMinTempObj.hourMaxTemp,
          hourMinTemp: hourMaxAndMinTempObj.hourMinTemp,
        };
      case 2:
        const forecast15 = weatherData.forecast15;
        const dailyMaxAndMinTempObj = this.calDailyMaxAndMinTemp(forecast15);
        return {
          forecast15: forecast15,
          dailyDayMaxTemp: dailyMaxAndMinTempObj.dailyDayMaxTemp,
          dailyDayMinTemp: dailyMaxAndMinTempObj.dailyDayMinTemp,
          dailyNightMaxTemp: dailyMaxAndMinTempObj.dailyNightMaxTemp,
          dailyNightMinTemp: dailyMaxAndMinTempObj.dailyNightMinTemp,
        };
      case 3:
        return {
          evnBean: weatherData.evn,
        };
      case 4:
        const indexes = weatherData.indexes;
        const normalIndexes = this.getNormalIndexes(indexes);
        return {
          indexes: indexes,
          normalIndexes: normalIndexes,
        };
      case 5:
        return {
          currentDateBean: weatherData.forecast15[1],
        };
    }
  }
  static calHourMaxAndMinTemp(hourfc) {
    let hourMaxTemp = 0,
      hourMinTemp = 0;
    if (hourfc) {
      hourMaxTemp = hourfc[0].wthr;
      hourMinTemp = hourMaxTemp;
      hourfc.forEach(item => {
        if (item.wthr > hourMaxTemp) {
          hourMaxTemp = item.wthr;
        }
        if (item.wthr < hourMinTemp) {
          hourMinTemp = item.wthr;
        }
      });
    }
    return {
      hourMaxTemp: hourMaxTemp,
      hourMinTemp: hourMinTemp,
    };
  }
  static calDailyMaxAndMinTemp(forecast15) {
    let dailyDayMaxTemp = 0,
      dailyDayMinTemp = 0,
      dailyNightMaxTemp = 0,
      dailyNightMinTemp = 0;
    if (forecast15) {
      dailyDayMaxTemp = forecast15[0].high;
      dailyDayMinTemp = dailyNightMaxTemp;

      dailyNightMaxTemp = forecast15[0].low;
      // console.log('low', dailyNightMaxTemp);
      dailyNightMinTemp = dailyNightMaxTemp;

      forecast15.forEach(item => {
        const temp1 = item.high;
        const temp2 = item.low;
        if (temp1 > dailyDayMaxTemp) {
          dailyDayMaxTemp = temp1;
        }
        if (temp1 < dailyDayMinTemp) {
          dailyDayMinTemp = temp1;
        }

        if (temp2 > dailyNightMaxTemp) {
          dailyNightMaxTemp = temp2;
        }
        if (temp2 < dailyNightMinTemp) {
          dailyNightMinTemp = temp2;
        }
      });
    }
    return {
      dailyDayMaxTemp: dailyDayMaxTemp,
      dailyDayMinTemp: dailyDayMinTemp,
      dailyNightMaxTemp: dailyNightMaxTemp,
      dailyNightMinTemp: dailyNightMinTemp,
    };
  }
  static getNormalIndexes(indexes) {
    const NORMAL_INDEXES_SIZE = 6;
    return indexes.slice(0, NORMAL_INDEXES_SIZE);
  }
}
