<!-- 商品名称信息组件 -->
<template>
  <p class="g-name">{{ goods.name }}</p>
  <p class="g-desc">{{ goods.desc }}</p>
  <p class="g-price">
    <span>{{ goods.price }}</span>
    <span>{{ goods.oldPrice }}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送 , App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至
        <!-- 城市组件 -->
        <xtxCity :fullLocation="fullLocation" @change="changeCity" />
      </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'GoodName',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // 设置省市区code数据 , 对应的文字数据
    // 监听用户点击省,市显示省市区列表  计算出需要展示的列表  打开弹层之前清空之前的数据
    // 点击地区的时候将数据通知给父组件使用 , 关闭对话框

    // 提供给后台的四项数据(没登陆默认显示的地址)
    const provinceCode = ref('110000')  //省一级的code
    const cityCode = ref('119900')  //市
    const countyCode = ref('110101')  //地区
    const fullLocation = ref('北京市 市辖区 东城区')  //省市区拼接的地址
    // 如果有默认地址 取出用户登录后的收货地址中默认地址给四个数据赋值(已登录)
    if (props.goods.userAddresses) {
      const defaultAddr = props.goods.userAddresses.find(item => item.isDefault === 1)
      // 如果有登陆后的收货地址就赋值给提供给后台的四项数据
      if (defaultAddr) {
        provinceCode.value = defaultAddr.provinceCode
        cityCode.value = defaultAddr.cityCode
        countyCode.value = defaultAddr.countyCode
        fullLocation.value = defaultAddr.fullLocation
      }
    }
    // 城市选择事件处理
    const changeCity = (result) => {
      provinceCode.value = result.provinceCode
      cityCode.value = result.cityCode
      countyCode.value = result.countyCode
      fullLocation.value = result.fullLocation
    }
    return { fullLocation, changeCity }
  }
}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px
}

.g-desc {
  color: #999;
  margin-top: 10px;
}

.g-price {
  margin-top: 10px;

  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }

    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }

    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}

.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;

  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      color: #666;

      &:last-child {
        span {
          margin-right: 10px;

          &::before {
            content: "•";
            color: @xtxColor;
            margin-right: 2px;
          }
        }

        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>