import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Screen from '../../utils/common/screen';
import RenderMenuInfo from './menu';
import {HOME_MENUINFO} from '../../constants/data';

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
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.artileImg} source={{uri: img}} />
      </TouchableOpacity>
    );
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        {this.renderCarousel()}
        <View>
          <RenderMenuInfo list={this.state.menuList} />
        </View>
        <FlatList
          data={this.state.artiles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderArticlesItem(item, navigation)}
          ItemSeparatorComponent={ItemDivideComponent}
        />
      </View>
    );
  }
}
function ItemDivideComponent() {
  return <View style={{height: 1, backgroundColor: '#ccc'}} />;
}

const styles = StyleSheet.create({
  wrapper: {
    height: 180,
    backgroundColor: 'transparent',
    marginBottom: -20,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    height: 160,
  },
  image: {
    width: Screen.width,
    height: 160,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 9,
    height: 9,
    borderRadius: 9,
    marginLeft: 7,
    marginRight: 7,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  title: {
    flex: 1,
  },
  artileImg: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
});
