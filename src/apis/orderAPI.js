import request from '@/utils/http.js'

export const getUserOrderAPI = ({ page, pageSize, orderState = 0 }) => {
  return request({
    url: '/member/order',
    params: { page, pageSize, orderState },
  })
}