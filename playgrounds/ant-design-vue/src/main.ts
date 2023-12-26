import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import  { i18n } from '../../../dist/virtai-validate.js'
// import { FormItem } from "ant-design-vue";

// FormItem.props.validateFirst.default = true

const app = createApp(App);
// i18n.changeLanguage('en-GB')


app.use(Antd).mount('#app');