<!-- 头部导航结构 -->
<template>
  <!-- 导航 -->
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <!-- 滚动到顶部，鼠标有时候会进入一级类目上，触发弹出二级类目。改成在一级类目上移动弹出二级类目@mousemove -->
    <li v-for="item in list" :key="item.id" @mousemove="show(item)" @mouseleave="hide(item)">
      <!-- 路由跳转 要传id参数-->
      <RouterLink @click="hide(item)" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <!-- 二级路由跳转 -->
            <RouterLink :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="">
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'app-header-nav',
  setup() {
    const store = useStore()
    // vuex中的数据
    const list = computed(() => {
      return store.state.category.list
    })
    // 二级分类显示与不显示的函数
    const show = (item) => {
      // 提交mutations中的方法 item.id传参find遍历找出当前元素
      store.commit('category/show', item.id)
    }
    const hide = (item) => {
      store.commit('category/hide', item.id)
    }
    return { list, show, hide }
  }
}
</script>
<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  >li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    >a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }

    &:hover {
      >a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }

      // >.layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}

.layer {

  // 鼠标经过显示与不显示的二级分类
  &.open {
    height: 132px;
    opacity: 1;
  }

  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;

    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }

      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
