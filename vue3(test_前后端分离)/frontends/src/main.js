import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'

import router from './router/index'
const app=createApp(App)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })

const whileList=['/']
router.beforeEach((to,from,next)=>{
    if(whileList.includes(to.path) || localStorage.getItem("token")){
        next()
    }else{
        next("/")
    }
})


app.use(router)
app.mount('#app')
