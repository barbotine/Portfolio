import Vue from 'vue'
import App from './App.vue'
import store from './store'
import  { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Landscape from './components/landscape.vue'
import Scene from './components/scene.vue'
import Cv from './components/cv.vue'
import Model from './components/model.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.use(VueRouter)

const router = new VueRouter({
  mode : 'history', 
  routes : [
      { path :'/Landscape', name : 'Landscape', component : Landscape },
      { path : '/', name : 'Scene', component : Scene },
      { path : '/Cv', name : 'Cv', component : Cv }, 
      { path : '/Model', name : 'Model', component : Model }
  ]
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')









