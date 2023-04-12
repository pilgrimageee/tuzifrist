import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入自己的ui组件库
import UI from "@/components/library";

// yarn add下载引入重置样式的库
import "normalize.css";
// 自己项目的重置样式和共用样式
import "@/assets/styles/common.less";

// 在main中使用app.use插件
createApp(App).use(store).use(router).use(UI).mount("#app");
