<!-- 新鲜好物组件 -->
<template>
  <div class="home-new">
    <!-- 传递参数修改 -->
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <!-- 右上角具名插槽 -->
      <template #right>
        <XtxMore />
      </template>
      <!-- 面板内容  动画的父容器需要是定位，防止定位跑偏-->
      <div ref="target" style="position: relative;height: 426px;">
        <Transition name="fade">
          <ul class="goods-list" v-if="goods.length">
            <li v-for="item in goods" :key="item.id">
              <!-- 路由跳转商品详情 -->
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="">
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>
<script>
import HomePanel from './home-panel.vue';
import { findNew } from '@/api/home'
import { onMounted, ref } from 'vue';
import HomeSkeleton from './home-skeleton.vue';
// 组件懒加载
import { useLazyData } from '@/hooks';

export default {
  name: "home-new",
  components: { HomePanel, HomeSkeleton },
  setup() {
    // const goods = ref([])
    // onMounted(async () => {
    //   const { result } = await findNew()
    //   goods.value = result
    //   // console.log('新鲜好物', goods.value);
    // })
    // ref绑定dom元素
    // const target = ref(null)
    // 调用组件懒加载
    const { target, result } = useLazyData(findNew)
    return { target, goods: result }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
