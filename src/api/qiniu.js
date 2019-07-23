/*
 * @Description: 七牛云API
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-16 00:40:12
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-05-30 20:13:19
 */

import request from '@/utils/request';

export function getQNToken() {
  return request({
    url: '/api/getQNToken',
    method: 'get'
  });
}
