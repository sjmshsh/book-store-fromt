import request from '@/utils/request'

export function getBookList(bookName, pageNo, pageSize) {
  return request({
    url: `/book/find?bookName=${bookName}&pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function addShopCart(data) {
  return request({
    url: `/shop_cart/add`,
    method: 'post',
    data
  })
}
