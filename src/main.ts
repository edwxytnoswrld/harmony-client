import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import { AVPlugin } from 'vue-audio-visual'

const app = createApp(App)
    app.use(VuePlyr, {
    plyr: {}
})

app.use(router)
app.use(AVPlugin)

app.mount('#app')
