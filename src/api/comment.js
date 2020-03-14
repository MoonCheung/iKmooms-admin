/*
 * @Description: 文章评论API
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-03-14 23:01:32
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-14 23:12:09
 */

import request from '@/utils/request';

export function getAllCmts() {
  return request({
    url: '/api/cmt/getallcmt',
    method: 'get'
  })
}
