<script setup>
import {useIntersectionObserver} from '@vueuse/core'
import {onMounted, ref, watch} from 'vue'

const props = defineProps({
  good: {
    type: Object,
    default: () => {
    },
  },
})

// 图片懒加载过程会闪动，配合加载动画过渡一下会更加自然
const itemRef = ref(null)
const loading = ref(false)
const lazyLoading = () => {
  const {stop} = useIntersectionObserver(
      itemRef,
      ([{isIntersecting}]) => {
        if (isIntersecting) {
          loading.value = isIntersecting
          stop()
        }
      },
  )
}
onMounted(() => lazyLoading())
</script>

<template>
  <RouterLink ref="itemRef" v-loading="!loading" to="/" class="goods-item">
    <img v-lazy="good.picture" src="" alt=""/>
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">{{ good.desc }}</p>
    <p class="price">&yen;{{ good.price }}</p>
  </RouterLink>
</template>

<style scoped lang="scss">

.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>