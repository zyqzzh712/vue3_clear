import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
    path: "/",
    name: "Login",
    component: () => import("../components/login.vue")
},
{
    path: "/user",
    name: "User",
    component: () => import("../components/index.vue")
}]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router