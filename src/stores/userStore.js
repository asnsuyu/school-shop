import {loginAPI} from '@/apis/userAPI.js'
import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useCartStore} from '@/stores/cartStore.js'
import {mergeCartAPI} from '@/apis/cartAPI.js'

export const useUserStore = defineStore('user', () => {
  // 外部store
  const cartStore = useCartStore()

  // state
  const userInfo = ref({})

  // action
  // 获取用户信息
  const getUserInfo = async ({account, password}) => {
    const res = await loginAPI({account, password})
    console.log(res)
    userInfo.value = res.result
    // 登录时调用接口，将本地和服务器的购物车数据合并
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }
    }))
    // 拉取最新的购物车列表数据
    await cartStore.updateCartList()
  }
  // 退出登录时清除用户的所有相关数据
  const clearUserInfo = () => {
    // 清除用户账号数据
    userInfo.value = {}
    // 清除购物车数据
    cartStore.clearCart()
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
  }
}, {
  persist: true,
})