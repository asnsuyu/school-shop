import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore.js'
import index from '@/router/index.js'
import { BASE_URL } from '@/constants/index.js'

/**
 * axios实例
 */
const httpInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

/**
 * axios请求拦截器
 */
httpInstance.interceptors.request.use(config => {
  // 在拦截器中统一在 Header 中携带 token
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

/**
 * axios响应式拦截器
 */
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  console.log(token === '')

  // 接口调用失败的统一错误提示
  ElMessage({
    message: e.response ? e.response.data.message : e.message,
    type: 'warning',
    plain: true,
  })
  // 401 (token失效，鉴权错误)
  if (e.response?.status === 401) {
    // token失效退出登录，清除用户信息
    userStore.clearUserInfo()
    // 跳转回登录页
    index.push('/login')  // 非 setup 下直接导入 index
  }
  return Promise.reject(e)
})

export default httpInstance