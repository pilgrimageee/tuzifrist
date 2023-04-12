<!-- 产品区块 -->
<template>
  <div ref="target" class="home-product">
    <!-- 遍历4个 -->
    <HomePanel :title="item.name" v-for="item in list" :key="item.id">
      <!-- 右侧具名插槽 -->
      <template v-slot:right>
        <div class="sub" v-for="sub in item.children.slice(0, 4)" :key="sub.id">
          <RouterLink to="/">{{ sub.name }}</RouterLink>
        </div>
        <!-- 右上角查看更多 -->
        <XtxMore />
      </template>
      <div class="box">
        <!-- 左侧大图片 -->
        <RouterLink class="cover" to="/">
          <!-- :src="item.picture" -->
          <img v-lazy="item.picture" alt="">
          <strong class="label">
            <span>{{ item.name }}馆</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!-- 八张商品图 -->
        <ul class="goods-list">
          <li v-for="sub in item.goods" :key="sub.id">
            <!-- 导入的商品区块组件 -->
            <HomeGoods :goods="sub" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { findGoods } from '@/api/home';
import { useLazyData } from '@/hooks';
import { onMounted, reactive, ref } from 'vue';

export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup() {
    const { target, result } = useLazyData(findGoods)
    return { target, list: result }
  }
}
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: @xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, .9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, .7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>