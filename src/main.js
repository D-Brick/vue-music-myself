import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

Vue.config.productionTip = false
fastClick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

// 错误监控
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err)
  console.log(vm)
  console.log(info)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
