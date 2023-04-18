<!-- 二级类目 -->
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 复选框 -->
      <!-- v-model双向绑定 vue3.0语法糖 -->
      <!-- <xtxCheckbox v-model="isAllChecked">全选{{ isAllChecked }}</xtxCheckbox> -->
      <!-- 商品面板 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.categoryId">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <!-- infinite是子组件的事件 只不过是在父组件里面触发父组件的getData方法 子组件的事件绑定的getData方法才把数据传递给父组件 -->
        <xtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>
<script>
// 面包屑
import SubBread from './components/sub-bread.vue';
// 筛选区
import SubFilter from './components/sub-filter.vue';
// 排序组件
import SubSort from './components/sub-sort.vue';
// 列表
import GoodsItem from './components/goods-item.vue';
import { findSubCategoryGoods } from '@/api/category'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: "subCategory",
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup() {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 数据是否加载完毕
    const finished = ref(false)
    // 获取的数据
    const goodsList = ref([])
    // 请求数据传递的查询参数
    let reqParams = {
      page: 1,
      pagsize: 20
    }
    // 子组件里面进入可视区请求加载完成 数据加载完毕 触发父组件中的getData方法
    const getData = () => {
      // 发请求前出现加载中图标
      loading.value = true
      // id添加进去
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // console.log('二级分类下无限加载的图片', result.items);
        // 如果有数据
        if (result.items.length) {
          // 赋值
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          // 没有数据就显示没有更多数据
          finished.value = true
        }
        // 请求完关闭请求图标
        loading.value = false
      })
    }
    // 在更改了二级分类的时候重新加载
    watch(() => route.params.id, (newVal) => {
      // 如果更改了二级分类并且判断是否===当前路由id
      if (newVal && `/category/sub/${newVal}` === route.path) {
        // 把数据清空页面就自动会进入可视区 并把页码置为1
        finished.value = false
        goodsList.value = []
        reqParams = {
          page: 1,
          pagsize: 20
        }
      }
    })
    // 更改排序组件的筛选数据 重新请求
    const sortChange = (sortParams) => {
      finished.value = false
      // 合并参数 保留之前的参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []

    }
    // 更改筛选组件的筛选数据 重新请求
    const filterChange = (filterParams) => {
      finished.value = false
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }

    // 更改筛选组件的筛选数据重新请求
    return { loading, finished, getData, goodsList, sortChange, filterChange }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
