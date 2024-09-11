// 支付页面 相关接口
import request from '@/utils/http.js'

// 获取订单详情以及支付结果
export const getOrderAPI = (id) => {
  return request({
    url: `/member/order/${id}`,
  })
}