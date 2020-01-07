import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {color} from '../../utils/common/style';

export default class Login extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
  }
  check() {
    const name = 'dw';
    const password = '123456';
    let bool = false;
    const inputName = this.state.name;
    const inputPassword = this.state.password;
    if (inputName === name) {
      if (inputPassword === password) {
        bool = true;
      }
    }
    return bool;
  }
  render() {
    return (
      <LinearGradient
        colors={['#FFF68F', '#FFD700', '#FFA500']}
        style={styles.container}>
        <View>
          <View style={styles.iconWrap}>
            <Image
              source={require('../../assets/img/signIn/signIn.png')}
              style={styles.icon}
            />
          </View>
          <TextInput
            style={[styles.input, styles.userName]}
            placeholder="用户名"
            placeholderTextColor={color.simpleGray}
            onChangeText={name => this.setState({name})}
          />
          <View style={styles.line} />
          <TextInput
            style={[styles.input, styles.passWord]}
            placeholder="密码"
            placeholderTextColor={color.simpleGray}
            onChangeText={password => this.setState({password})}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              const signIn = this.check();
              if (signIn) {
                this.props.navigation.navigate('Main');
              }
            }}>
            <Text style={styles.btnTxt}>登录</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(100, 143, 237, 0.8)',
  },
  iconWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    borderWidth: 2,
    backgroundColor: '#FF7F24',
    borderRadius: 24,
    padding: 5,
    height: 48,
    width: 48,
  },
  input: {
    height: 40,
    width: 220,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    color: '#333333',
  },
  line: {
    height: 1,
    width: 220,
    backgroundColor: '#eef0f1',
  },
  userName: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: 'transparent',
  },
  passWord: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'transparent',
  },
  btn: {
    height: 36,
    width: 220,
    backgroundColor: '#FF7F24',
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: color.white,
  },
});
