import request from '@/utils/request'

export function getQNToken() {
  return request({
    url: '/api/getQNToken',
    method: 'get'
  })
}

export function uploadToQN(path, param) {
  return request({
    url: path,
    method: 'post',
    params: param
  })
}
