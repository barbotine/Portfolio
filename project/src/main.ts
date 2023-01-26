import App from './App.vue'
import Vue, { VueConstructor, createApp } from 'vue'
import store from './store'
import router from './router'
import  { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { createWrapper } from '@vue/test-utils'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

// createApp(App).use(router).mount('#app')


