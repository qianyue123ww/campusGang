import React, {Component} from 'react';
import {View, StyleSheet,} from 'react-native';
import {WebView} from 'react-native-webview';
import {getArticleContent, getContentStyle, getArticles} from '../../api/api';

export default class ArtcleContent extends Component {
  // static navigationOptions = {
  //   headerTitle instead of title
  //   header: null,
  // };
  constructor(props) {
    super(props);
    this.state = {html: ''};
  }
  componentDidMount() {
    const {articleId} = this.props.navigation.state.params;
    getArticleContent(articleId).then(res => {
      getContentStyle().then(css => {
        let cssLink = '<style>' + css + '</style>',
          imgLink =
            '<div class="img-wrap"><h1 class="headline-title">' +
            res.title +
            '</h1><span class="img-source"></span><img src="' +
            res.image +
            '" alt=""><div class="img-mask"></div></div>',
          meta =
            '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>';
        let article = res.body
          .replace(/<div class=\"img-place-holder\"><\/div>/, imgLink)
          .replace(/<div class=\"view-more\">.*查看知乎讨论.*<\/div>/, '');
        this.setState({
          html: meta + cssLink + article,
        });
      });
    });
  }
  render() {
    console.log(this.state.html);
    return (
      <View style={styles.container}>
        <WebView
          style={{flex: 1}}
          source={{html: this.state.html}}
          javaScriptEnable={false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
