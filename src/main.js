import Vue from 'vue'
import router from './router'
import App from './App.vue'

// Global Components
import Loading from './components/Loading.vue'

// Register component
Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
