import request from '@/utils/request'

export function addCategory(param) {
  return request({
    url: '/api/category/addcatg',
    method: 'post',
    data: param
  })
}

export function getCategory(param) {
  return request({
    url: '/api/category/getcatg',
    method: 'post',
    data: param
  })
}

export function editCategory(param) {
  return request({
    url: '/api/category/editcatg',
    method: 'post',
    data: param
  })
}

export function delCategory(param) {
  return request({
    url: '/api/category/delcatg',
    method: 'post',
    data: param
  })
}

export function getAllCatgs() {
  return request({
    url: '/api/category/getallcatg',
    method: 'get'
  })
}
