import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Layout from '@/pages/Layout/Layout.vue'
import Login from '@/pages/Login/Login.vue'
import Home from '@/pages/Home/Home.vue'
import Category from '@/pages/Category/Category.vue'
import SubCategory from '@/pages/SubCategory/SubCategory.vue'
import Detail from '@/pages/Detail/Detail.vue'
import CartList from '@/pages/CartList/CartList.vue'
import Checkout from '@/pages/Checkout/Checkout.vue'
import Pay from '@/pages/Pay/Pay.vue'
import PayBack from '@/pages/Pay/PayBack.vue'
import Member from '@/pages/Member/Member.vue'
import MemberInfo from '@/pages/Member/component/MemberInfo.vue'
import MemberOrder from '@/pages/Member/component/MemberOrder.vue'

const routes = [
  // 主体布局页（一级）
  {
    path: '/',
    component: Layout,
    children: [
      // 首页（二级）
      { path: '', component: Home },
      // 一级分类页（二级）
      { path: 'category/:id', component: Category },
      // 二级分类页（二级）
      { path: 'category/:parentId/sub/:childrenId', component: SubCategory },
      // 商品详情页（二级）
      { path: 'detail/:id', component: Detail },
      // 购物车列表展示页（二级）
      { path: 'cartlist', component: CartList },
      // 结算页（二级）
      { path: 'checkout', component: Checkout },
      // 待支付页（二级）
      { path: 'pay', component: Pay },
      // 支付完成后的回跳页（二级）
      { path: 'paycallback', component: PayBack },
      // 会员中心页（二级）
      {
        path: 'member/',
        component: Member,
        children: [
          // 个人中心（三级）
          { path: '', component: MemberInfo },
          // 我的订单（三级）
          { path: 'order', component: MemberOrder },
        ],
      },
    ],
  },
  // 登录页（一级）
  { path: '/login', component: Login },
  // 404
]

const index = createRouter({
  history: createWebHashHistory(), // hash 路由模式
  // history: createWebHistory(), // history 路由模式
  routes,
  // 路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

// 在 Vue Router 中添加一个全局守卫，处理 URL 中的查询参数，将其解析为路径
index.beforeEach((to, from, next) => {
  if (to.query.redirect) {
    next(to.query.redirect)
  } else {
    next()
  }
})

export default index
