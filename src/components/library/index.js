// 图片懒加载失败显示
import defaultImg from "@/assets/images/200.png";

// 骨架 单独注册全局组件
// import XtxSkeleton from "./xtx-skeleton.vue";
// // 轮播图
// import XtxCarousel from "./xtx-carousel.vue";
// //查看更多
// import XtxMore from "./xtx-more.vue";
// // 面包屑
// import XtxBread from "./xtx-bread.vue";
// //面包屑item
// import XtxBreadItem from "./xtx-bread-item.vue";

// 使用require提供的函数context加载某一目录下所有.vue后缀的文件 , 然后context会返回一个importFn函数 有一个属性keys()获取所有的文件路径
// 第一个参数是路径 第二个是否访问子文件 第三个是加载的正则匹配
const importFn = require.context("./", false, /\.vue$/);

// 插件 导出一个对象 , 有install函数 , 默认传入了app应用实例 app基础之上扩展全局组件 自定义指令 挂载原型方法
export default {
  install(app) {
    // 在app上扩展 , app提供了component directive函数 单独注册全局组件
    // app.component(XtxSkeleton.name, XtxSkeleton);
    // app.component(XtxCarousel.name, XtxCarousel);
    // app.component(XtxMore.name, XtxMore);
    // app.component(XtxBread.name, XtxBread);
    // app.component(XtxBreadItem.name, XtxBreadItem);

    // 批量注册全局组件
    importFn.keys().forEach((item) => {
      // 导入组件
      const component = importFn(item).default;
      // 注册组件
      app.component(component.name, component);
    });
    // 定义指令
    defineDirective(app);
  },
};
// 自定义指令
const defineDirective = (app) => {
  // 挂载在app 在img上使用v-lazy值为图片地址 不设置src
  app.directive("lazy", {
    // 选项式API mounted
    // el观察的dom元素 , binding绑定的东西
    mounted(el, binding) {
      // 创建一个观察对象 , 来观察当前使用指令的元素
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          // 判断是否进入可视区
          if (isIntersecting) {
            // 进入可视区之后停止观察
            observe.unobserve(el);
            // 图片加载失败显示的图片
            el.onerror = () => {
              el.src = defaultImg;
            };
            // 指令的值给el的src , binding.value就是指令的值
            el.src = binding.value;
          }
        },
        // 相交比例
        {
          threshold: 0.01,
        }
      );
      // 开启观察
      observe.observe(el);
    },
  });
};
