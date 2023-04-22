<!-- 商品详情组件 -->
<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{ goods.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片组件 -->
          <GoodsImage :images="goods.mainPictures" />
          <!-- 商品销售属性组件 -->
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 商品名称信息组件 -->
          <GoodsName :goods="goods" />
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 商品推荐组件
import GoodsRelevant from './components/goods-relevant'
import { findGoods } from '@/api/product';
import { useRoute } from 'vue-router';
import { nextTick, ref, watch } from 'vue';
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';

export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName },
  setup() {
    const goods = useGoods()

    return { goods }
  },
}

const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  // 侦听路由id 改变并且改变的id===当前id为商品详情
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      // 商品详情请求
      findGoods(route.params.id).then(({ result }) => {
        // console.log('商品详情', result);
        //让商品数据为null 然后使用v-if的组件可以重新创建销毁
        goods.value = null
        nextTick(() => {
          goods.value = result
        })
      })
    }
  }, {
    immediate: true
  })
  return goods
}

</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>