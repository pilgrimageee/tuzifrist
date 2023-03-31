import { createRouter, createWebHashHistory } from "vue-router";

// 路由懒加载定义函数
const Layout = () => import("@/views/Layout");
// 路由规则
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: () => import("@/views/home"),
      },
    ],
  },
];
// vue3创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
