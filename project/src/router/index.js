import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";
import Creation from "../components/creation.vue"; 

const routes = [{
    path :'/3DCreation', 
    name : '3DCreation',
    component : Creation, 
}
]

const router = createRouter({
    history: createWebHashHistory(), 
    router
})

export default router