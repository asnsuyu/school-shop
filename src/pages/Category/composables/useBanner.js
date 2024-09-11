/**
 * @description: 封装 获取轮播图 的业务逻辑
 */
import { onMounted, ref } from 'vue'
import { getBannerAPI } from '@/apis/homeAPI.js'

export const useBanner = () => {
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2',
    })
    bannerList.value = res.result
  }
  onMounted(() => getBanner())

  return {
    bannerList,
  }
}