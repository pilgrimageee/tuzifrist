<!-- 首页 -->
<template>
  <div class="home-entry">
    <!-- 首页入口(分类+广告区) -->
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategroy />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew></HomeNew>
  <!-- 人气推荐 -->
  <HomeHot></HomeHot>
  <!-- 热门品牌 -->
  <HomeBrand />
  <!-- 居家美食服饰母婴 -->
  <HomeProduct />
  <!-- 最新专题 -->
  <HomeSpecial />
</template>
<script>
import XtxCarousel from '@/components/library/xtx-carousel.vue';
import HomeCategroy from './components/home-categroy.vue';
import HomeBanner from '@/views/home/components/home-banner.vue'
import HomeNew from '@/views/home/components/home-new.vue'
import HomeHot from './components/home-hot.vue';
import HomeBrand from './components/home-brand.vue';
import HomeProduct from '@/views/home/components/home-product.vue'
import HomeSpecial from './components/home-special.vue';

export default {
  name: "HomePage",
  components: { HomeCategroy, XtxCarousel, HomeBanner, HomeNew, HomeHot, HomeBanner, HomeBrand, HomeProduct, HomeSpecial }
}
</script>
<style scoped lang="less">
.container {
  // less混入
  .hoverShadow()
}
</style>
