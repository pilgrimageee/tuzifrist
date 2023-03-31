<template>
  <!-- 顶部通栏 -->
  <nav>
    <AppTopnav />
  </nav>
  <!-- 头部组件 -->
  <header>
    <AppHeader />
  </header>
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

export default {
  name: "Layout",
  components: { AppTopnav, AppHeader, AppFooter }
}
</script>
<style scoped lang="less">
.app-body {
  // 给内容撑开一个高度
  min-height: 600px;
}
</style>
