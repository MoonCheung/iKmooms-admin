import request from '@/utils/request'

export function addTags(param) {
  return request({
    url: '/api/tag/addtag',
    method: 'post',
    data: param
  })
}

export function getTags(param) {
  return request({
    url: '/api/tag/gettag',
    method: 'post',
    data: param
  })
}

export function editTags(param) {
  return request({
    url: '/api/tag/edittag',
    method: 'post',
    data: param
  })
}

export function delTags(param) {
  return request({
    url: '/api/tag/deltag',
    method: 'post',
    data: param
  })
}

export function getAllTags() {
  return request({
    url: '/api/tag/getalltag',
    method: 'get',
  })
}
