import React, {Component} from 'react';
export function getArticles() {
  return fetch('http://news-at.zhihu.com/api/4/news/latest')
    .then(response => response.json())
    .catch(err => console.err(err));
}
export function getArticleContent(id) {
  return fetch(`http://news-at.zhihu.com/api/4/news/${id}`)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function getContentStyle() {
  return fetch('http://daily.zhihu.com/css/share.css?v=5956a')
    .then(res => res.text())
    .catch(err => console.log('err', err));
}
/**
 * 腾讯定位api
 * @param latitude 纬度
 * @param longitude 经度
 */
export function fetchLocation(latitude, longitude) {
  const key = 'E4DBZ-MKZW3-QSC3L-YNQNK-IQI3K-ERBDW';
  const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`;
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => console.log(err));
}
export function searchCity(address) {
  const searchCityUrl =
    'http://zhwnlapi.etouch.cn/Ecalender/api/city?lon=&app_ts=1502957830998&app_key=99817749&foreign=true&device_id=29c82fbe10331817eb2ba134d575d541&ver_name=6.9.6&ver_code=716&uid=&keyword=' +
    address.district +
    '&channel=own&auth_token=eyJhY2N0ayI6IiIsInVwIjoiQU5EUk9JRCIsImRldmljZSI6IlNNLUc5NTUwMzUyNTYyMDc3MjY0MzM0In0%3D&lat=&type=search&devid=a47cc0669be48a6b49aba18d1c42e200&os_version=70';
  return fetch(searchCityUrl).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}
//根据cityid获取天气信息
export function fetchWeatherData(cityid) {
  const url = `http://zhwnlapi.etouch.cn/Ecalender/api/v2/weather?
  date=20170817&app_key=99817749&citykey=${cityid}`;
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => console.log(err));
}

//获取热门城市列表
export function fetchHotCity() {
  const url =
    'http://zhwnlapi.etouch.cn/Ecalender/api/city?lon=&app_ts=1502957577098&app_key=99817749&device_id=29c82fbe10331817eb2ba134d575d541&city_key=101210101&ver_name=6.9.6&uid=&keyword=&ver_code=716&channel=own&auth_token=eyJhY2N0ayI6IiIsInVwIjoiQU5EUk9JRCIsImRldmljZSI6IlNNLUc5NTUwMzUyNTYyMDc3MjY0MzM0In0%3D&lat=&type=hotV2&devid=a47cc0669be48a6b49aba18d1c42e200&os_version=70';
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => console.log(err));
}

//本地数据库请求
//要用本地服务器真实的ip地址---ipv4地址
const localUrl = 'http://192.168.201.2:3000';

export function saveUserInfo(data) {
  return fetch(`${localUrl}/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function checkUserInfo(data) {
  return fetch(`${localUrl}/signin  `, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}
