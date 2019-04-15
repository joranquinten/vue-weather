import Vue from 'vue'
import Router from 'vue-router'
import Weather from '../components/Weather.vue'

Vue.use(Router)

export default new Router({
  routes: [{ path: '/:forecastType?', name: 'Weather', component: Weather }]
})
