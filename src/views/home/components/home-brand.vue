<!-- 热门品牌组件 -->
<template>
  <div class="home-brand">
    <!-- 标题 -->
    <HomePanel title="热门品牌" subTitle="国际经典 品质保证">
      <!-- 右上角具名插槽 -->
      <template #right>
        <!-- toggle点击事件加减 index控制disabled的css样式的按钮 -->
        <a @click="toggle(-1)" :class="{ disabled: index === 0 }" href="javascript:;"
          class="iconfont icon-angle-left prev"></a>
        <a @click="toggle(1)" :class="{ disabled: index === 1 }" href="javascript:;"
          class="iconfont icon-angle-right next"></a>
      </template>
      <!-- 面板内容 -->
      <div class="box" ref="target">
        <!-- 动画 只能显示一个模块 -->
        <Transition name="fade">
          <!-- `translateX(${-index * 1240}px)` 当index=1时沿X轴平移-1240px -->
          <ul v-if="brands.length" class="list" :style="{ transform: `translateX(${-index * 1240}px)` }">
            <li v-for="item in brands" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="">
              </RouterLink>
            </li>
          </ul>
          <!-- 骨架 -->
          <div v-else class="skeleton">
            <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px" />
          </div>
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>
<script>
import HomePanel from './home-panel.vue';
import { findBrand } from '@/api/home';
import { useLazyData } from '@/hooks';
import { ref } from 'vue';

export default {
  name: "home-brand",
  components: { HomePanel },
  setup() {
    // useLazyData需要的是api函数 , 如果要传参 , 写个函数在函数中调用api传参
    // const { target, result } = useLazyData(() => findBrand(10))
    // 懒加载请求接口数据
    const { target, result } = useLazyData(findBrand)
    const index = ref(0)
    // 上一页下一页点击事件
    const toggle = (num) => {
      const newIndex = index.value + num
      // 小于0或者大于1 return执行下一句
      if (newIndex < 0 || newIndex > 1) return
      // 赋值给index
      index.value = newIndex
    }
    return { target, brands: result, index, toggle }
  }
}
</script>
<style scoped lang='less'>
.home-panel {
  background: #f5f5f5
}

.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;

  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }

  .skeleton {
    width: 100%;
    display: flex;

    .item {
      margin-right: 10px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
