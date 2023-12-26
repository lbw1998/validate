// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import  { i18n, setCompiler } from '../../../dist/virtai-validate.js'

const app = createApp(App)

i18n.changeLanguage('en-GB')
setCompiler('ELE')

app.use(ElementPlus)
app.mount('#app')