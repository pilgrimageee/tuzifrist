<!-- 城市配送组件 -->
<template>
  <div class="xtx-city" ref="target">
    <!-- 选择框 -->
    <div class="select" @click="toggle" :class="{ active: visible }">
      <!-- 如果有值就显示下面的span 没有值就显示占位请配送地址 -->
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <!-- 可以选择的地址 -->
    <div class="option" v-if="visible">
      <!-- 加载中图片 转换为base64配置一直报错 -->
      <!-- <div v-if="loading" class="loading"></div> -->

      <!-- 省市数据 -->
      <span class="ellipsis" @click="changeItem(item)" v-for="item in currList" :key="item.code">{{ item.name }}</span>

    </div>
  </div>
</template>
<script>
import { ref, reactive, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'

export default {
  name: 'xtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 城市选择框
    const visible = ref(false)
    // 所有省市区数据
    const allCityData = ref([])
    // 加载效果
    const loading = ref(false)

    // 打开选择城市
    const open = () => {
      visible.value = true
      // 正在加载效果为true
      loading.value = true
      // 获取地区数据
      getCityData().then(data => {
        allCityData.value = data
        loading.value = false
      })
      // 每次打开清空之前选择
      for (const k in changeResult) {
        changeResult[k] = ''
      }
    }
    // 关闭选择城市
    const close = () => {
      visible.value = false
    }

    // 控制打开关闭选择城市的方法
    const toggle = () => {
      visible.value ? close() : open()
    }

    // 监听dom元素 使用vueuse触发点击元素外部关闭选择城市
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })

    // 显示的省市
    const currList = computed(() => {
      let list = allCityData.value
      // 当前在省 点击进去市
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find(item => item.code === changeResult.provinceCode).areaList
      }
      // 地区
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find(item => item.code === changeResult.cityCode).areaList
      }

      return list
    })
    // 记录选择的省市数据 , 点击省市区的时候记录
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    // 点击省市区的时候记录
    const changeItem = (item) => {
      // 当level===0就是省
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        // 三级选完之后拼接一下完整地址
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        // 选择到===2到了地区是最后一级 通知父组件关闭对话框数据通知父组件
        close()
        emit('change', changeResult)
      }
    }
    return { visible, toggle, target, loading, currList, changeItem }
  }
}

// 城市请求完的数据缓存
const getCityData = () => {
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有缓存
      resolve(window.cityData)
    } else {
      // 无缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        // 缓存
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}

</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }

    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>

