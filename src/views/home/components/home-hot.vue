<!-- 人气推荐组件 -->
<template>
  <div class="home-hot">
    <!-- 标题 -->
    <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
      <!-- 面板内容   动画的父容器需要是定位，防止定位跑偏-->
      <div ref="target" style="position: relative;height: 426px;">
        <Transition name="fade">
          <ul class="goods-list" v-if="goods.length">
            <li v-for="item in goods" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="">
                <p class="name">{{ item.title }}</p>
                <p class="desc">{{ item.alt }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton v-else />
        </Transition>
      </div>
    </HomePanel>

  </div>
</template>
<script>
import HomePanel from './home-panel.vue';
import { findHot } from '@/api/home'
import { onMounted, ref } from 'vue';
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hooks/index'

export default {
  name: "home-hot",
  components: { HomePanel, HomeSkeleton },
  setup() {
    // 绑定dom
    // const target = ref(null)
    // 调用组件懒加载方法 传参
    const { target, result } = useLazyData(findHot)
    return { target, goods: result }
  }
}
</script>
<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>