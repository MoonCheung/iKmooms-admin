import request from '@/utils/request'

export function insertArticle(path, param) {
  return request({
    url: `/api/article/ins${path}`,
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
