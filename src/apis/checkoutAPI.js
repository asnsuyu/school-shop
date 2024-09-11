// 订单结算 相关接口
import request from '@/utils/http.js'

// 获取订单结算信息
export const getCheckoutInfoAPI = () => {
  return request({
    url: '/member/order/pre',
  })
}

// 创建需要支付的订单
export const createOrderAPI = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data,
  })
}