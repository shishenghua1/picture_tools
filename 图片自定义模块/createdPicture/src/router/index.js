/**
 * Created by 2019-04-11.
 */
import Vue from 'vue'
import Router from 'vue-router'
import axios from "axios"
import VueCookies from 'vue-cookies'
import PictureCustom from "@/app/modules/tools/components/pictureCustom.vue"
Vue.use(Router)

// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/pictureCustom',
      name: 'pictureCustom',
      component:PictureCustom
    }//图标路由
  ]
});


router.afterEach((to,from,next)=>{
  window.scrollTo(0,0)
})

axios.interceptors.request.use(
  config => {
    config.withCredentials = false// 允许携带token ,这个是解决跨域产生的相关问题
    config.timeout = 15000
    let token = VueCookies.get('websit_token')
    if (token) {
      config.headers = {
        'websit_token': token
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default router
