/* 分类 相关接口 */
import httpInstance from '@/utils/http.js'

/**
 * @description: 获取 一级分类 列表数据
 * @param {String} id - 轮播图类型 '1'或者'2'
 * @return {*}
 */
export const getTopCategoryAPI = (id) => {
  return httpInstance({
    url: '/category',
    params: {
      id,
    },
  })
}

/**
 * @description: 获取 二级分类 列表数据
 * @param {String} id - 一级分类id '100500'
 * @return {*}
 */
export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url: '/category/sub/filter',
    params: {
      id,
    },
  })
}

/**
 * @description: 获取导航数据
 * @param {Object} data - 请求导航数据需要发送的参数对象
 * @data {
 *   categoryId: 1005000 ,
 *   pages: 1,
 *   pageSize: 20,
 *   sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
 * }
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return httpInstance({
    url: '/category/goods/temporary',
    method: 'POST',
    data,
  })
}