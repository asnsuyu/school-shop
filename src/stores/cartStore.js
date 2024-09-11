import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {useUserStore} from '@/stores/userStore.js'
import {addCartAPI, delCartAPI, getCartListAPI} from '@/apis/cartAPI.js'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  // state
  // 存放购物车列表数据
  const cartList = ref([])

  // action
  // 更新，拉取服务器最新购物车数据
  const updateCartList = async () => {
    const res = await getCartListAPI()
    cartList.value = res.result
  }
  // 添加，向购物车列表添加数据
  const addCart = async (goods) => {
    const {skuId, count} = goods
    // 用户已登录，调用接口
    if (isLogin.value) {
      await addCartAPI({ skuId, count })
      await updateCartList()
    }
    // 用户未登录，数据存在本地
    else {
      const item = cartList.value.find(item => goods.skuId === item.skuId)
      // 如果购物车列表中已有该商品，则数量加一
      if (item) {
        item.count += goods.count
      }
      // 如果购物车列表中没有该商品，则将该商品添加到列表中
      else {
        cartList.value.push(goods)
      }
    }
  }
  // 删除，将购物车列表中指定商品删除
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 如果是登录状态，则调用接口删除
      await delCartAPI([skuId])
      // 拉取最新的购物车列表数据
      await updateCartList()
    } else {
      // 使用filter方法删除本地购物车列表中的商品
      // cartList.value = cartList.value.filter(item => item.skuId !== skuId)
      // 使用findIndex+splice方法删除本地购物车列表中的商品
      const index = cartList.value.findIndex(item => item.skuId === skuId)
      cartList.value.splice(index, 1)
    }
  }
  // 清空，退出登录时清除购物车列表数据
  const clearCart = () => {
    cartList.value = []
  }
  // 单选，修改各个单选框的选中状态
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }
  // 全选控制单选，根据全选状态影响所有单选状态
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // getter
  // 计算所有商品的数量
  const allCount = computed(() => cartList.value.reduce((p, c) => p + c.count, 0))
  // 计算所有商品的总价
  const allPrice = computed(() => cartList.value.reduce((p, c) => p + c.count * c.price, 0))
  // 计算选中商品的数量
  const selectedCount = computed(() => cartList.value.reduce((p, c) => p + (c.selected ? c.count : 0), 0))
  // 计算选中商品的总价
  const selectedPrice = computed(() => cartList.value.reduce((p, c) => p + (c.selected ? c.count * c.price : 0), 0))
  // 计算全选框的选中状态
  const isAll = computed(() => cartList.value.length > 0 ? cartList.value.every(item => item.selected) : false)

  return {
    // state
    cartList,
    // action
    updateCartList,
    addCart,
    delCart,
    clearCart,
    singleCheck,
    allCheck,
    // getter
    allCount,
    allPrice,
    selectedCount,
    selectedPrice,
    isAll,
  }
}, {
  persist: true,
})