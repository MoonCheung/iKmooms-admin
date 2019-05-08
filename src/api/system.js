import request from '@/utils/request'

export function getSystemList() {
  return request({
    url: '/api/system',
    method: 'post'
  })
}
