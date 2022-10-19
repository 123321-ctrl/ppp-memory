import { createApp, h } from 'vue'
import './style.css'
import App from './App.vue'
import './plugin/font/iconfont.css'
import 'element-plus/theme-chalk/el-message.css'

import mymemory from './plugin/index'

const app = createApp({
    render: () => h(App),
})

app.use(mymemory)

app.mount('#app')

// createApp(App).mount('#app')
