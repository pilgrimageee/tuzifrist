<!-- 图片放大镜组件 -->
<template>
  <div class="goods-image">
    <!-- 商品大图 -->
    <div v-if="show" class="large" :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"></div>
    <!-- 商品图片 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩层 -->
      <div v-if="show" class="layer" :style="layerPosition"></div>
    </div>
    <!-- 五个小图 -->
    <ul class="small">
      <!-- 遍历images父组件传递的数据  -->
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <!-- 鼠标 时索引赋值图片数组的下标 -->
        <img @mouseenter="currIndex = i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // 记录当前预览图的索引
    const currIndex = ref(0)

    const target = ref(null)
    // 是否显示遮罩层和大图
    const show = ref(true)
    // 遮罩层的坐标(样式)
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    // 大图背景定位(样式)
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    // 使用useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    // watch监听多个值
    watch([elementX, elementY, isOutside], () => {
      // console.log('坐标和是否进入target区域', elementX.value, elementY.value, isOutside.value);
      // 根据数据设置自己的样式和是否显示数据 是否显示遮罩层和大图
      show.value = !isOutside.value
      // 鼠标位置移动遮罩层计算坐标 如果鼠标移动的位置小于100移动的位置就是0 大于300移动的位置就是200 否则位置移动的数就-100
      const position = reactive({ x: 0, y: 0 })
      if (elementX.value < 100) position.x = 0
      else if (elementX.value > 300) position.x = 200
      else position.x = elementX.value - 100

      if (elementY.value < 100) position.y = 0
      else if (elementY.value > 300) position.y = 200
      else position.y = elementY.value - 100
      // 给样式赋值 遮罩层和大图的定位样式
      layerPosition.left = position.x + 'px'
      layerPosition.top = position.y + 'px'
      // 大图的定位样式 因为获取的是-值
      largePosition.backgroundPositionX = -2 * position.x + 'px'
      largePosition.backgroundPositionY = -2 * position.y + 'px'
    })


    return { currIndex, show, layerPosition, largePosition, target }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    // 鼠标箭头变成十字架
    cursor: move;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, .2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>