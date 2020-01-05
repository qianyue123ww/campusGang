import Toast from 'react-native-simple-toast';

export default class ToastUtils {
  static show(message, duration = Toast.SHORT) {
    Toast.show(message, duration);
  }
}
