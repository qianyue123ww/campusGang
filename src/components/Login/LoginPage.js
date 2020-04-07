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

import {color, fontSize} from '../../utils/common/style';

import {saveUserInfo, checkUserInfo} from '../../api/api';

export default class Login extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true,
      name: '',
      password: '',
    };
  }
  // componentDidMount() {
  //   this.props.navigation.push('Main');
  // }
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
  changeStatus = () => {
    this.setState(preState => ({
      isSignIn: !preState.isSignIn,
    }));
  };
  register = data => {
    saveUserInfo(data).then(res => console.log(res));
  };
  signIn = data => {
    checkUserInfo(data).then(res => {
      if (res.mes === 'success') {
        console.log('登陆成功');
        this.props.navigation.push('Main');
      } else {
        console.log('登陆失败');
      }
    });
  };
  submit = () => {
    const data = {
      username: this.state.name,
      password: this.state.password,
    };
    this.state.isSignIn ? this.signIn(data) : this.register(data);
  };
  render() {
    return (
      <LinearGradient
        colors={['#FFF68F', '#FFD700', '#FFA500']}
        style={styles.container}>
        <TouchableOpacity style={styles.register} onPress={this.changeStatus}>
          <Text style={styles.registerText}>
            {this.state.isSignIn ? '注册' : '登录'}
          </Text>
        </TouchableOpacity>
        <View>
          <View style={styles.iconWrap}>
            <Image
              source={
                this.state.isSignIn
                  ? require('../../assets/img/signIn/signIn.png')
                  : require('../../assets/img/signIn/smile.png')
              }
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
            secureTextEntry={true}
            placeholderTextColor={color.simpleGray}
            onChangeText={password => this.setState({password})}
          />
          <TouchableOpacity style={styles.btn} onPress={this.submit}>
            <Text style={styles.btnTxt}>
              {this.state.isSignIn ? '登录' : '注册'}
            </Text>
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
  register: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 20,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#FF7F24',
  },
  registerText: {
    color: color.white,
    fontSize: fontSize.normal,
  },
});
