import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueLazyload from 'vue-lazyload'
import '@/styles/common.scss' // 初始化样式
import { lazyPlugin } from '@/directives/index.js' // 自定义全局指令插件
import { componentPlugin } from '@/components/index.js' // 自定义全局组件插件

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 官方的
app.use(pinia)
app.use(router)
app.use(VueLazyload)

// 自定义的
app.use(lazyPlugin)
app.use(componentPlugin)

// 使用cdn外链导入vue和vue-demi时，无法使用element-plus的按需导入
// 因此生产环境下需要使用全局导入，然后使用element-plus的cdn外链
// import ElementPlus from 'element-plus'
//
// app.use(ElementPlus)

app.mount('#app')
