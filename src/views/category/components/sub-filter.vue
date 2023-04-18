<!-- 二级类目下筛选区 -->
<template>
  <!-- 筛选区 -->
  <!-- filterData只能判断第一次刷新 在二级类目之间切换并不能判断骨架屏 重新定义一个loading判断 -->
  <div class="sub-filter" v-if="filterData && filterLoading === false">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <!-- active类 添加的品牌和属性null === 给数组添加的id null -->
        <!-- 点击事件 点击的时候把点击的当前id赋值给添加的null  active类就等于当前点击的为true-->
        <a @click="changeBrand(item.id)" :class="{ active: item.id === filterData.selectedBrand }" href="javascript:;"
          v-for="item in filterData.brands" :key="item.id">{{ item.name }}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}: </div>
      <div class="body">
        <a @click="changeProp(item, prop.id)" :class="{ active: prop.id === item.selectedProp }" href="javascript:;"
          v-for="prop in item.properties" :key="prop.id">{{ prop.name }}</a>
      </div>
    </div>
  </div>
  <!-- 骨架 -->
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { findSubCategoryFilter } from '@/api/category';

export default {
  name: 'SubFilter',
  // 提前声明子传父自定义事件
  emits: ['filter-change'],
  setup(props, { emit }) {
    const route = useRoute()
    // 分类发生变化时需要重新渲染数据监听二级分类下的id
    const filterData = ref([])
    // 判断数据显示骨架
    const filterLoading = ref(false)
    // const selec
    watch(() => route.params.id, (newVal) => {
      // 变化后的id有值 且处于二级分类下
      if (newVal && `/category/sub/${newVal}` === route.path) {
        // 没有数据之前显示骨架
        filterLoading.value = true
        findSubCategoryFilter(route.params.id).then(({ result }) => {
          // 每一组的筛选条件前缺少全部 处理数据
          result.brands.unshift({ id: null, name: '全部' })
          // 每一组添加数据 设置选中的类active
          result.selectedBrand = null
          // 销售属性也需要加全部
          result.saleProperties.forEach(item => {
            item.properties.unshift({ id: null, name: '全部' })
            item.selectedProp = null
          });
          // 设置修改的数据
          filterData.value = result
          // console.log('筛选区', result);
          // 有数据渲染之后取消骨架渲染数据
          filterLoading.value = false
        })
      }
    }, { immediate: true })

    const getFilterParams = () => {
      // 要传递的参数
      const obj = { brandId: null, attrs: [] }
      obj.brandId = filterData.value.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach(item => {
        // 判断销售属性有没有id(id是点击赋的值)
        if (item.selectedProp) {
          // 获取当前点击的元素
          const prop = item.properties.find(prop => prop.id === item.selectedProp)
          // 添加进筛选的参数数据
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      // 如果选择的属性参数数据长度为0 选择属性为null不发请求
      if (obj.attrs.length === 0) obj.attrs = null
      // 参考数据brandId:'' attrs:[{groupName:'',propertyName:''},{...}]
      return obj
    }

    // 记录当前点击的品牌
    const changeBrand = (brandId) => {
      // 如果当前的id===要修改的就不再执行
      if (filterData.value.selectedBrand === brandId) return
      // 赋值id 实现点击高亮
      filterData.value.selectedBrand = brandId
      // 筛选条件改的时候通知父组件
      emit('filter-change', getFilterParams())
    }
    // 当前选择的销售属性
    const changeProp = (item, propId) => {
      if (item.selectedProp === propId) return
      item.selectedProp = propId
      emit('filter-change', getFilterParams())
    }

    return { filterData, filterLoading, changeBrand, changeProp }
  }
}
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all .3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>