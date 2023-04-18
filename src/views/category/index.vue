<!-- 一级路由 -->
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <!--  v-if="topCategory" 计算属性里写有判断非空 -->
          <!-- 不同的key可以创建移除元素，创造触发动画条件 -->
          <XtxBreadItem :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders='sliders' style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture">
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { findBanner } from '@/api/home'
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import GoodsItem from '@/views/category/components/goods-item.vue'
import { findTopCategory } from '@/api/category'

export default {
  name: "topCategory",
  components: { GoodsItem },
  setup() {
    const sliders = ref([])
    // 轮播图数据
    onMounted(async () => {
      const { result } = await findBanner()
      sliders.value = result
    })
    // 面包屑和子分类 vuex
    // 1.引入vuex和路由 2.声明一个数据 使用计算属性 3.声明一个空对象cate接收使用find查找到的与路由动态id===的vuex中的item分类数据
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      // 声明一个空数组接收
      let cate = {}
      // find查找vuex中===当前分类路由id的分类
      const item = store.state.category.list.find(item => item.id === route.params.id)
      // 赋值
      if (item) cate = item
      return cate
    })

    // 获取各个子类目下的推荐商品
    const subList = ref([])
    // 渲染数据方法
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
      // onMounted(async () => {
      //   const { result } = await findTopCategory(route.params.id)
      //   subList.value = result.children
      // })
    }
    // 动态路由当id发生变化时不会重新渲染组件 监听路由切换后的id调用渲染
    // 切换二级类目路由时也会有id会触发watch , 导致watch发送了请求
    watch(() => route.params.id, (newVal) => {
      // newVal && getSubList()
      // 判断动态路由id改变并且与category拼接的路径===当前路径watch才会发起请求
      if (newVal && `/category/${newVal}` === route.path) getSubList()
      // watch初始化时候主动触发一次
    }, { immediate: true })

    return { sliders, topCategory, subList }
  }
}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>