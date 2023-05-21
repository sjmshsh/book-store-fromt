import request from '@/utils/request'

export function getShoCartList(pageNo, pageSize) {
  return request({
    url: `/shop_cart/user_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function updateShopCart(id, data) {
  return request({
    url: `/shop_cart/update?cartId=${id}`,
    method: 'put',
    data
  })
}

export function deleteShopCart(id) {
  return request({
    url: `/shop_cart/delete?cartId=${id}`,
    method: 'delete'
  })
}

