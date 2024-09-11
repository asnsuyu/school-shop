<script setup>
import LayoutNav from './component/LayoutNav.vue'
import LayoutHeader from './component/LayoutHeader.vue'
import LayoutFooter from './component/LayoutFooter.vue'
import LayoutFixed from './component/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/categoryStore.js'
// import { useCartStore } from '@/stores/cartStore.js'

// 在layout父级组件中调用请求并将数据存在pinia中，之后子组件需要数据时，只需要从pinia中拿即可
// 这样保证一级分类这个「可复用的数据」只被请求了1次
const categoryStore = useCategoryStore()
// const cartStore = useCartStore()
categoryStore.getCategory()
// cartStore.updateCartList()
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 通过添加key防止组件复用（默认情况下，出于性能考虑，复用会使得生命周期钩子无法正常调用，因此数据更新后不会及时渲染） -->
  <!-- 但是这种方式过于粗暴，频繁销毁重建组件会导致组件中可复用数据的重复请求 -->
  <!-- 所以使用「onBeforeRouteUpdate」这个官方提供的路由钩子在页面刷新时再次发送请求以达到刷新页面数据及时更新的预期结果 -->
  <!--<RouterView :key="$route.fullPath"/>-->
  <RouterView />
  <LayoutFooter />
</template>