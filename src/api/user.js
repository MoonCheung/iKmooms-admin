import request from '@/utils/request'

export function login({
  username,
  password
}) {
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

export function getInfo(token) {
  return request({
    url: '/api/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout(name) {
  return request({
    url: '/api/logout',
    method: 'post',
    data: name
  })
}
