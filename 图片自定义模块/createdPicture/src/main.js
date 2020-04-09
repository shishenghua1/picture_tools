// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/app/base/App' 
import router from './router/index.js'
import ElementUI from 'element-ui'
import axios from "axios"
import bro from './app/global'
import VueCookies from 'vue-cookies'
import md5 from 'js-md5';

import 'element-ui/lib/theme-chalk/index.css'
import '@/app/base/assets/css/style.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(bro)
Vue.use(VueCookies)
Vue.prototype.$md5 = md5;
Vue.prototype.$ajax=axios;
var ruleUrl = "",pictureUrl = "",n_dev="",excelUrl=""
Vue.prototype.iconSrcBase="http://10.32.1.46:8004/pictureCustom/pictureMarket/";
if(process.env.NODE_ENV==="production"){
  if(process.env.VUE_APP_FLAG=="pro"){
    //生产环境
    console.log("生产环境")
    Vue.prototype.baseAjax = "http://49.233.205.151:8002"
    axios.defaults.baseURL="http://49.233.205.151:8002"
    ruleUrl = "http://rule.eomspro.com/menu0_1?website"
    pictureUrl = "http://image.eomspro.com/picture_custom/picture/pictureCustom?websit_token="
    excelUrl = "http://excel.eomspro.com/hotMain"
    n_dev = "pro"
  }else {
    //测试环境
    console.log("测试环境")
    Vue.prototype.baseAjax = "http://10.91.0.122:8002"
    axios.defaults.baseURL="http://10.91.0.122:8002"
    ruleUrl = "http://10.91.0.122:8888/menu0_1?website"
    pictureUrl = "http://10.91.0.122:8004/picture_custom/picture/pictureCustom?websit_token="
    n_dev = "textpro"
    excelUrl = "http://10.91.0.122:9088/hotMain"
  }
}else{
    //开发环境
    console.log("开发环境")
    Vue.prototype.baseAjax ="http://10.32.1.46:8004/pictureCustom" ;
    axios.defaults.baseURL="http://10.32.1.46:8004/pictureCustom";
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    ruleUrl = "http://10.91.0.122:8888/menu0_1?website"
    pictureUrl = "http://10.91.0.122:8004/picture_custom/picture/pictureCustom?websit_token="
    n_dev = "dev"
    excelUrl = "http://10.91.0.122:9088/hotMain"
}

Vue.prototype.ruleUrl = ruleUrl
Vue.prototype.pictureUrl = pictureUrl
Vue.prototype.n_dev = n_dev
Vue.prototype.excelUrl  = excelUrl

/* axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = 'http://10.50.12.32:8095'  */

Vue.filter('formatDateTime', function (value) {
  if (!value) return ''
  let date = new Date(value);
  let y = date.getFullYear() + '/';
  let mon = (date.getMonth() + 1) + '/';
  let d = date.getDate();
  return y + mon + d;
});

export default  new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

