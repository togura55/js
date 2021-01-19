import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// routes配列にルーティングするパスオブジェクトを列挙
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/count',
    // nameは名前付きルートのためのオプションなので無くても良い
    component: () => import(/* webpackChunkName: "count" */ '@/views/Count.vue')
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  // 動的ルートマッチングの追加
  // ページ番号が付いたページ
  {
    // ":"で始まるディレクトリは、$route.params下にバインドされる
    path: '/paging/:page',
    component: () => import(/* webpackChunkName: "paging" */ '@/views/Paging.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
