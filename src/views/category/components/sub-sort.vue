<!-- 二级类目下的排序组件 -->
<template>
  <div class='sub-sort'>
    <div class="sort">
      <a @click="changeSort('null')" :class="{ active: sortParams.sortField === 'null' }" href="javascript:;">默认排序</a>
      <a @click="changeSort('publishTime')" :class="{ active: sortParams.sortField === 'publishTime' }"
        href="javascript:;">最新商品</a>
      <a @click="changeSort('orderNum')" :class="{ active: sortParams.sortField === 'orderNum' }"
        href="javascript:;">最高人气</a>
      <a @click="changeSort('evaluateNum')" :class="{ active: sortParams.sortField === 'evaluateNum' }"
        href="javascript:;">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <!-- 排序字段===价格 并且顺序等于正序或者倒序 -->
        <i class="arrow up" :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'asc' }" />
        <i class="arrow down" :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'desc' }" />
      </a>
    </div>
    <div class="check">
      <!-- 双向绑定传值 -->
      <xtxCheckbox @change="changeCheck" v-model="sortParams.inventory">仅显示有货商品</xtxCheckbox>
      <xtxCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount">仅显示特惠商品</xtxCheckbox>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';

export default {
  name: 'SubSort',
  setup(props, { emit }) {
    // 实现交互(实现的数据和后台保持一致)
    // 1.明确交互数据 是否有库存 是否有优惠 排序字段 排序规则
    // 2.提供给模板使用 实现交互
    const sortParams = reactive({
      // 库存
      inventory: false,
      // 特惠
      onlyDiscount: false,
      // 排序字段
      sortField: null,
      // 顺序
      sortMethod: null
    })

    // 点击切换
    const changeSort = (sortField) => {

      // 1.如果点击的是价格排序 就赋值给按钮price
      // 2.然后判断如果是price的话===null的话证明是第一次点击价格排序 赋值给它默认desc倒序
      // 3.else就说明不是第一次点击 就赋值asc
      // 4.点击的不是价格排序直接赋值那个排序字段
      if (sortField === 'price') {
        sortParams.sortField = sortField
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc'
        } else {
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 已经是这个排序字段的话重复点击一直改数据没有意义 直接return
        if (sortParams.sortField === sortField) return
        // 不是price排序字段的话 是什么排序就赋值什么排序
        sortParams.sortField = sortField
        // 然后把价格排序置为null 下次点的时候默认是第一次点倒序
        sortParams.sortMethod = null
      }

      // 排序字段按钮发生改变时触发事件通知父组件
      emit('sort-change', sortParams)
    }

    const changeCheck = () => {
      // 有货和特惠 触发事件通知父组件
      emit('sort-change', sortParams)
    }
    return { sortParams, changeSort, changeCheck }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sort {
    display: flex;

    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;

      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }

      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @xtxColor;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }

  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>