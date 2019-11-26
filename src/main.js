import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import store from "./store"
import axios from 'axios'
import VantConfig from "./vant-config"  // 引入vant组件库
import VueLazyload from "vue-lazyload"  // 图片懒加载
// import { Field  } from 'vant';

// Vue.use(Field );

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VantConfig) // use方法会自动调用 对象中的install函数并将自身作为参数传入
Vue.use(VueLazyload, {  // 图片懒加载配置
  preLoad: 1.3,  // 预加载高度比,默认1.3
  error: require('../public/images/滤镜背景02.png'),
  loading: require('../public/images/滤镜背景01.png'),
  attempt: 3  // 尝试加载图片数量，默认3
})

import 'swiper/dist/css/swiper.css'  // 轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import Viewer from "v-viewer"  // 图片预览插件
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": false, "title": false, "toolbar": false, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": false, "keyboard": false, "url": "data-source" }
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

