// hooks钩子组件
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

// 封装组件懒加载函数(钩子) 响应式监听目标元素的可见性
export const useLazyData = (apiFn) => {
  const result = ref([]);
  // 调用这个方法传入的dom
  const target = ref(null);
  // stop停止观察
  const { stop } = useIntersectionObserver(
    // 观察的对象(dom)
    target,
    // 是否观察到出现
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop();
        // then方法请求接口
        apiFn().then((data) => {
          // console.log(target, data.result);
          result.value = data.result;
        });
      }
    },
    // 第三个参数相交比例 , 因为盒子太大所以设置只要相交(观察到)就加载 可以设置0-1之间的数
    { threshold: 0 }
  );
  return { target, result };
};
