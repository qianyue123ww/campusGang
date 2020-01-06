import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Screen from '../../utils/common/screen';
import RenderMenuInfo from './menu';
import {HOME_MENUINFO, titleBar} from '../../constants/data';
import {color, fontSize} from '../../utils/common/style';

import {getArticles} from '../../api/api';

export default class HomePage extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      menuList: HOME_MENUINFO,
      artiles: [],
    };
  }
  componentDidMount() {
    getArticles().then(res => {
      const {stories, top_stories} = res;
      let articlesList = [...stories, ...top_stories];
      articlesList = articlesList.reduce((list, item) => {
        let id = item.id;
        if (list.every(i => i.id !== id)) {
          list.push(item);
        }
        return list;
      }, []);
      this.setState({artiles: articlesList});
    });
  }
  renderCarousel() {
    return (
      <View style={styles.wrapper}>
        <Swiper
          style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={4}
          activeDot={<View style={styles.activeDot} />}>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/img/home/carousel/1.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/img/home/carousel/2.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/img/home/carousel/3.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/img/home/carousel/4.jpg')}
              style={styles.image}
            />
          </View>
        </Swiper>
      </View>
    );
  }
  renderArticlesItem(item, navigation) {
    const {title} = item;
    const img = item.images ? item.images[0] : item.image;
    return (
      <TouchableOpacity
        style={styles.listItem}
        key={item.id}
        onPress={() => {
          navigation.push('Content', {articleId: item.id});
        }}>
        <View style={styles.title}>
          <Text>{title}</Text>
          <Text style={styles.time}>
            {new Date().toLocaleDateString().replace(/\//g, '-')}
          </Text>
        </View>
        <Image style={styles.artileImg} source={{uri: img}} />
      </TouchableOpacity>
    );
  }
  renderTitleBar() {
    return (
      <View style={styles.titleBar}>
        <Image source={titleBar.icon} style={styles.barICon} />
        <Text style={styles.barColor}>热门推荐</Text>
      </View>
    );
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        {this.renderCarousel()}
        <View>
          <RenderMenuInfo
            list={this.state.menuList}
            onPress={screen => {
              navigation.push(screen);
            }}
          />
        </View>
        <FlatList
          data={this.state.artiles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderArticlesItem(item, navigation)}
          ItemSeparatorComponent={ItemDivideComponent}
          ListHeaderComponent={this.renderTitleBar}
          style={{marginLeft: 20, marginRight: 20}}
        />
      </View>
    );
  }
}
function ItemDivideComponent() {
  return <View style={{height: 1, backgroundColor: color.gray}} />;
}

const styles = StyleSheet.create({
  wrapper: {
    height: 220,
    backgroundColor: 'transparent',
    marginBottom: -20,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: Screen.width,
    height: 200,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 9,
    height: 9,
    borderRadius: 9,
    marginLeft: 7,
    marginRight: 7,
  },
  titleBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
  },
  barColor: {
    color: color.red,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  barICon: {
    width: 22,
    height: 22,
    marginRight: 6,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    height: 80,
  },
  time: {
    color: color.deepGray,
    fontSize: fontSize.small,
  },
  title: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  artileImg: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 3,
  },
});
