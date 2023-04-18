<template>
  <!-- 二级路由面包屑 -->
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{ category.top.name }}</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem v-if="category.sub" :key="category.sub.id" :to="`/category/${category.sub.id}`">{{ category.sub.name
      }}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>
<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'SubBread',
  setup() {
    // 在计算属性中从vuex中获取数据 一级类目和二级类目
    // 获取数据cate{top:{id,name}, sub:{id,name}}
    // 遍历vuex中的数据找出一级类目 然后通过id find出与当前二级类目id===的sub然后赋值
    const store = useStore()
    const route = useRoute()
    const category = computed(() => {
      // 声明一个空对象接收值
      const cate = {}
      store.state.category.list.forEach(top => {
        // 判断一级类目是否有children二级类目
        if (top.children) {
          // 找出二级类目与当前地址栏id相同的
          const sub = top.children.find(sub => sub.id === route.params.id)
          // 如果找到
          if (sub) {
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      });

      return cate
    })
    return { category }
  }

}
</script>
<style scoped></style>
