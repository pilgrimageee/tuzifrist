<!-- 首页布局容器 -->
<template>
  <!-- 顶部通栏 -->
  <AppTopnav />
  <!-- 吸顶头部 -->
  <AppHeaderSticky />
  <!-- 头部组件 -->
  <AppHeader />
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <RouterView />

  </div>
  <!-- 底部组件 -->
  <footer>
    <AppFooter />
  </footer>
</template>
<script>
import AppTopnav from '@/components/app-topnav.vue';
import AppHeader from '@/components/app-header.vue';
import AppFooter from '@/components/app-footer.vue';
import { useStore } from 'vuex';
import AppHeaderSticky from '@/components/app-header-sticky.vue';

export default {
  name: "Layout",
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  // 获取分类数据 因为好几个组件都要用分类所以在最大的里面获取都可以用
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style scoped lang="less">
.app-body {
  // 给内容撑开一个高度
  // min-height: 600px;
}
</style>
