import { createRouter, createWebHashHistory } from "vue-router";

// 路由懒加载定义函数
const Layout = () => import("@/views/Layout");
// 首页一级二级路由
const TopCategory = () => import("@/views/category");
const SubCategory = () => import("@/views/category/sub");
// 路由规则
const routes = [
  {
    // 首页布局容器 1级
    path: "/",
    component: Layout,
    children: [
      // 首页 2级
      { path: "/", component: () => import("@/views/home") },
      // 一级分类 2级 :id前要加/
      { path: "/category/:id", component: TopCategory },
      // 二级分类 2级
      { path: "/category/sub/:id", component: SubCategory },
      // 商品详情
      { path: "/product/:id", component: () => import("@/views/goods") },
    ],
  },
];
// vue3创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // vuerouter路由滚动行为
  // vue2是通过x y  vue3是通过left top
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
