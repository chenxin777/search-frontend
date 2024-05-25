import { createApp } from 'vue';
import router from '@/router';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.use(Antd).use(router).mount('#app');
