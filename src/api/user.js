/*
 * @Description: 用户API
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-01 14:22:03
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-06-28 19:26:15
 */

import request from '@/utils/request';

export function login({ username, password }) {
  const data = {
    username,
    password
  };
  return request({
    url: '/api/login',
    method: 'post',
    data
  });
}

export function getInfo(token) {
  return request({
    url: '/api/info',
    method: 'post',
    params: {
      token
    }
  });
}

export function logout(token) {
  return request({
    url: '/api/logout',
    method: 'post',
    data: token
  });
}

export function updateUserInfo(param) {
  return request({
    url: '/api/upduser',
    method: 'patch',
    data: param
  });
}
