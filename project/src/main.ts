import Vue from 'vue'
import App from './App.vue'
import store from './store'
import  { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Creation from './components/creation.vue'
import Scene from './components/scene.vue'
import Cv from './components/cv.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.use(VueRouter)

const router = new VueRouter({
  mode : 'history', 
  routes : [
      { path :'/Creation', name : 'Creation', component : Creation },
      { path : '/', name : 'Scene', component : Scene },
      { path : '/Cv', name : 'Cv', component : Cv }
  ]
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')









