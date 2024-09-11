import request from './config.js';

/**
 * 登录请求 post
 * @param   username     用户名
 * @param   userPassword 用户密码
 * @returns {*}
 */
export function loginRequest({ username, userPassword }) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username: username,
      userPassword: userPassword,
    },
  });
}
/**
 * 注册请求 post
 * @param   data 用户注册填写的所有信息
 * @returns {*}
 */
export function registerRequest(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}
/**
 * 退出请求 post
 * @returns {*}
 */
export function logoutRequest() {
  return request({
    url: '/login',
    method: 'post',
  });
}
