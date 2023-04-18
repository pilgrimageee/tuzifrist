<!-- 无限加载组件 加载更多 -->
<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

export default {
  name: 'xtxInfiniteLoading',
  props: {
    // 正在加载
    loading: {
      type: Boolean,
      default: false
    },
    // 加载完成
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const target = ref(null)
    // 监听进入可视区
    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }], observerElement) => {
        // 进入可视区
        if (isIntersecting) {
          // 触发加载事件条件  请求加载完成 数据加载完毕
          if (props.loading === false && props.finished === false) {
            // 事件是子组件自己的事件 是在请求加载完成数据加载完毕之后触发的 事件原则谁绑定谁触发
            emit('infinite')
          }
        }
        // 相交比例
      }, {
      threshold: 0
    })
    return { target }
  }
}

</script>

<style scoped lang='less'>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }

  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
