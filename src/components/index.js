// 定义全局组件插件
import ImageView from '@/components/ImageView/index.vue'
import Sku from '@/components/Sku/index.vue'

export const componentPlugin = {
  install: (app) => {
    app.component('ImageView', ImageView)
    app.component('Sku', Sku)
  }
}