import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import quillEditor from "vue-quill-editor";

import '@/styles/index.scss' // global css
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 权限控制

Vue.config.productionTip = false

/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 */
// import { mockXHR } from '../mock'
// mockXHR()

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})
Vue.use(quillEditor)


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
})
