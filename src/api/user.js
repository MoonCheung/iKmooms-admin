/*
 * @Description: 用户API
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-01 14:22:03
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-05-30 17:27:55
 */

import request from '@/utils/request'

export function login ({ username, password }) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/api/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout (token) {
  return request({
    url: '/api/logout',
    method: 'post',
    data: token
  })
}
