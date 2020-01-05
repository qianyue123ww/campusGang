import {PermissionsAndroid} from 'react-native';

export default class PermissionUtils {
  /**
   * 检查权限
   * @param permission 需要检查的权限
   * @param success 有该权限产生的回调
   * @param error 没有该权限产生的回调
   */
  static checkPermission(permission, success, error) {
    try {
      PermissionsAndroid.check(permission)
        .then(granted => {
          if (granted) {
            success();
          } else {
            error();
          }
        })
        .catch(err => {
          error(err);
        });
    } catch (err) {
      error();
    }
  }
  /**
   * 请求某个权限
   * @param permmission 需要请求的权限
   * @param success 请求成功后的回调
   * @param error 请求失败产生的回调
   * @param successInfo 产生回调的信息
   * @param errorInfo 产生回调的信息
   */
  static requestPermission(permission, success, error, successInfo, errorInfo) {
    try {
      PermissionsAndroid.request(permission).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          success(successInfo);
        } else {
          error(errorInfo);
        }
      });
    } catch (err) {
      error(err.toString());
    }
  }
}
