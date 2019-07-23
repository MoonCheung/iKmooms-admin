/*
 * @Description: os模块API
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-07 22:10:24
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-05-26 00:18:18
 */

import request from '@/utils/request';

export function getSystemList() {
  return request({
    url: '/api/system',
    method: 'get'
  });
}
