/**
 * @description: 封装了获取一级分类数据的业务逻辑
 */
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getTopCategoryAPI } from '@/apis/categoryAPI.js'

export const useCategory = () => {
  const route = useRoute()
  const categoryData = ref({})
  const getTopCategory = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => getTopCategory())

  // 需要在路由变化时进行监听 然后重新发送请求更新数据渲染
  // 轮播图不需要重复请求 分类数据需要重新请求
  onBeforeRouteUpdate((to) => {
    getTopCategory(to.params.id)
  })

  return {
    categoryData,
  }
}
