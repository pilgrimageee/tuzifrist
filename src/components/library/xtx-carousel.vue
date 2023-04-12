<!-- 轮播图全局组件 -->
<template>
  <div class='xtx-carousel' @mouseenter="stop" @mouseleave="start">
    <!-- 图片 -->
    <ul class="carousel-body">
      <!-- fade控制图片的显示与隐藏 -->
      <li class="carousel-item " v-for="(item, i) in sliders" :key="item.id" :class="{ fade: index === i }">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张下一张 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active高亮    把i的值赋值给index点击切换 -->
      <span @click="index = i" v-for="(item, i) in sliders" :key="item.id" :class="{ active: index === i }"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue';

export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    // 父组件传参控制自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 轮播间隔时间 不穿默认2秒
    duration: {
      type: Number,
      default: 1500
    }
  },
  setup(props) {
    // 默认显示的图片下标
    const index = ref(0)

    // 1.自动轮播  定时
    let timer = null
    const autoPlayFn = () => {
      // 开启之前清除 防止重复添加轮播效果
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) return index.value = 0
      }, props.duration)
    }
    // 监听数据
    watch(() => props.sliders, (newValue) => {
      // 有数据并且父组件控制播放传参为true时
      if (newValue.length && props.autoPlay) {
        // 开始时重置第一张
        index.value = 0
        // 开启轮播
        autoPlayFn()
      }
      // immediate立即执行 , 静态图片也可以监听
    }, { immediate: true })

    // 2.鼠标移动暂停开启
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    // 3.上一张下一张
    const toggle = (step) => {
      const newIndex = index.value + step
      // 点击下一张大于数据长度-1的时候 重新回到第一张
      if (newIndex > props.sliders.length - 1) return index.value = 0
      // 点击上一张小于0时去到最后一张
      if (newIndex < 0) return index.value = props.sliders.length - 1
      // 正常情况写赋值
      index.value = newIndex
    }
    // 组件卸载 , 清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { index, stop, start, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, .2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>