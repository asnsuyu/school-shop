/* home 相关接口 */
import httpInstance from '@/utils/http.js'

// 获取轮播图
export const getBannerAPI = (params = {}) => {
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite,
    },
  })
}

// 获取新鲜好物列表
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new',
  })
}

// 获取人气推荐列表
export const getHotAPI = () => {
  return httpInstance({
    url: 'home/hot',
  })
}

// 获取所有商品模块列表
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods',
  })
}