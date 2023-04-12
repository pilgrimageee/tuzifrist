<!-- 广告组件 -->
<template>
  <div class="home-banner">
    <!-- 注册了插件不用导入  autoPlay传值控制播放 -->
    <XtxCarousel autoPlay :sliders="sliders" />
  </div>
</template>
<script>

import { findBanner } from '@/api/home';
import { onMounted, ref } from 'vue';
import XtxCarousel from '@/components/library/xtx-carousel.vue'

export default {
  name: "home-banner",
  components: { XtxCarousel },
  setup() {
    const sliders = ref();
    // 发起广告请求
    onMounted(async () => {
      const { result } = await findBanner();
      // 请求到的数据赋值
      sliders.value = result;
    });
    return { sliders };
  },

}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  // 覆盖轮播图组件的样式
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }

    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
