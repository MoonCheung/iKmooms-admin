import request from '@/utils/request'

export function insertArticle(param) {
  return request({
    url: '/api/article/insart',
    method: 'post',
    data: param
  })
}

export function articleList(param) {
  return request({
    url: '/api/article/artlist',
    method: 'post',
    data: param
  })
}

export function editArticle(param) {
  return request({
    url: '/api/article/editart',
    method: 'put',
    data: param
  })
}

export function getArtDetl(param) {
  return request({
    url: '/api/article/getartdetl',
    method: 'post',
    data: param
  })
}
