<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="item in classifyLeft" :key="item.id">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <!-- 有子分类就显示 -->
        <template v-if="item.children">
          <RouterLink v-for="sub in item.children" :key="sub.id" :to="`/category/sub/${sub.id}`">{{ sub.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

// 封装左侧导航方法
const useClassifyLeft = (store) => {
  // 因为左侧分类要十个但数据只有九个 , push一个
  const brand = reactive({
    id: 'brand',
    name: '品牌',
    children: [{ id: 'brand-chilren', name: '品牌推荐' }]
  })
  // 遍历vuex中的数据获取分类 , 取出子分类的前两项
  const menuList = computed(() => {
    // vuex中数据返回的新数组
    const list = store.state.category.list.map((item) => {
      return {
        id: item.id,
        name: item.name,
        children: item.children && item.children.slice(0, 2)
      }
    })
    // 追加第十个分类
    list.push(brand)
    // 计算属性return
    return list
  })
  return menuList
}

export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore()
    // 左侧导航
    const classifyLeft = useClassifyLeft(store)
    return { classifyLeft }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  // background: rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;

      &:hover {
        background: @xtxColor;
      }

      a {
        margin-right: 4px;
        // color: black;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>