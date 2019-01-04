import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import './assets/scss/element-ui.scss'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-56182454-5',
  debug: {
    enabled: false,
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

Vue.mixin({
  methods: {
    gaEventClick (label, value = 1) {
      this.$ga.event('click', 'click', label, value)
    }
  }
})

Vue.use(ElementUI)
locale.use(lang)
NProgress.configure({ showSpinner: false })

Vue.config.productionTip = false

Vue.directive('page-loading', (el, binding) => {
  if (binding.value) {
    NProgress.start()
    el.style.display = 'none'
  } else {
    NProgress.done()
    el.style.display = 'grid'
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
