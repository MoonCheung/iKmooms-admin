import request from '@/utils/request'

export function insertArticle(param) {
  return request({
    url: '/api/article/insfront',
    method: 'post',
    data: param
  })
}

export function frontList(param) {
  return request({
    url: '/api/article/frontList',
    method: 'get',
    params: param
  })
}
