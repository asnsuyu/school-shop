// 购物车 相关接口
import request from '@/utils/http.js'

// 添加到购物车
export const addCartAPI = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}

// 获取购物车列表
export const getCartListAPI = () => {
  return request({
    url: '/member/cart',
  })
}

// 删除选定的购物车商品
// ids - 有skuId组成的数组
export const delCartAPI = (ids) => {
  return request({
    url: '/member/cart', 
    method: 'DELETE',
    data: {
      ids,
    },
  })
}

// 合并本地和线上的购物车数据
export const mergeCartAPI = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data,
  })
}