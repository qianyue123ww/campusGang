import React, {Component} from 'react';
import {Text, Image, View, TouchableOpacity, StyleSheet} from 'react-native';

export default class LifeIndexComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 生活指数是否展开
      isExpand: false,
    };
  }
  getDataList() {
    const {indexes, normalIndexes} = this.props;
    if (!indexes || !normalIndexes) return null;
    const isExpand = this.state.isExpand;
    const dataList = isExpand ? indexes : normalIndexes;
    return dataList;
  }
  renderLifeIndex() {
    const dataList = this.getDataList();
    const renderList = [];
    dataList.forEach((item, index) => {
      renderList.push(this.renderLifeIndexItem(item, index));
    });
    return renderList;
  }
  renderLifeIndexItem(item, index) {
    return (
      <View style={styles.item} key={index}>
        <Image style={styles.icon} source={this.getIconRes(index)} />
        <View style={styles.wrap}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
        </View>
      </View>
    );
  }
  render() {
    const isExpand = this.state.isExpand;
    return (
      <View style={styles.container}>
        <Text style={styles.topic}>生活指数</Text>
        {this.renderLifeIndex()}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.setState(prev => ({
              isExpand: !prev.isExpand,
            }));
            console.log(this.state.isExpand);
          }}>
          <Text style={styles.btn}>{isExpand ? '收起' : '展开'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  getIconRes = index => {
    let iconRes;
    switch (index) {
      case 0:
      default:
        iconRes = require('../../../../assets/img/weather/images/ic_chenlian.png');
        break;
      case 1:
        iconRes = require('../../../../assets/img/weather/images/ic_chuanyi.png');
        break;
      case 2:
        iconRes = require('../../../../assets/img/weather/images/ic_shushidu.png');
        break;
      case 3:
        iconRes = require('../../../../assets/img/weather/images/ic_ganmao.png');
        break;
      case 4:
        iconRes = require('../../../../assets/img/weather/images/ic_ziwaixian.png');
        break;
      case 5:
        iconRes = require('../../../../assets/img/weather/images/ic_lvyou.png');
        break;
      case 6:
        iconRes = require('../../../../assets/img/weather/images/ic_xiche.png');
        break;
      case 7:
        iconRes = require('../../../../assets/img/weather/images/ic_liangshai.png');
        break;
      case 8:
        iconRes = require('../../../../assets/img/weather/images/ic_diaoyu.png');
        break;
      case 9:
        iconRes = require('../../../../assets/img/weather/images/ic_huazhuang.png');
        break;
      case 10:
        iconRes = require('../../../../assets/img/weather/images/ic_yundong.png');
        break;
      case 11:
        iconRes = require('../../../../assets/img/weather/images/ic_yusan.png');
        break;
      case 12:
        iconRes = require('../../../../assets/img/weather/images/ic_yuehui.png');
        break;
    }
    return iconRes;
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  topic: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  btn: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    padding: 8,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    marginLeft: 16,
    marginRight: 16,
  },
  wrap: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    color: '#fff',
    fontSize: 14,
  },
  desc: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
});
