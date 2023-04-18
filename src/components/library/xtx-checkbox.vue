<!-- 复选框组件 -->
<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 插槽有内容才会显示span这个结构 -->
    <span v-if="$slots.default">
      <slot />
    </span>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useVModel } from '@vueuse/core';

export default {
  name: 'xtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  // setup(props, { emit }) {
  //   // 设置一个变量 给复选框绑定if和else 绑定一个点击事件改变复选框绑定的变量的值
  //   const checked = ref(false)
  //   const changeChecked = () => {
  //     checked.value = !checked.value
  //     // 使用emit通知父组件数据的改变 双向绑定
  //     emit('update:modelValue', checked.value)
  //   }
  //   // 使用侦听器监听props传递的数据 props中的modelValue赋值给复选框
  //   watch(() => props.modelValue, () => {
  //     checked.value = props.modelValue
  //   }, { immediate: true })
  //   return { checked, changeChecked }
  // }

  // 使用useVmodel实现双向数据绑定v-model指令
  setup(props, { emit }) {
    // 使用props接收父组件数据
    // 使用useVmodel可以把props传递的数据转化成ref的响应式数据
    // 使用checked.value数据就是使用父组件数据
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件修改数据
      checked.value = newVal
      // 让组件支持change事件
      emit('change', newVal)
    }

    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;

  .icon-checked {
    color: @xtxColor;

    ~span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>