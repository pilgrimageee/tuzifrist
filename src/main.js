import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// yarn add下载引入重置样式的库
import "normalize.css";
// 自己项目的重置样式和共用样式
import "@/assets/styles/common.less";

createApp(App).use(store).use(router).mount("#app");
