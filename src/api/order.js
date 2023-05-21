import request from '@/utils/request'

export function createOrder() {
  return request({
    url: '/order/create',
    method: 'post'
  })
}

export function getUserOrderList() {
  return request({
    url: '/order/user_order',
    method: 'get'
  })
}
