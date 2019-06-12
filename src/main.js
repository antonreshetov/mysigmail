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
import SocialSharing from 'vue-social-sharing'
import SvgIcon from './components/SvgIcon'
Vue.component('svg-icon', SvgIcon)

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA || 'XX-XXXXXXXX-X',
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
Vue.use(SocialSharing)
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
