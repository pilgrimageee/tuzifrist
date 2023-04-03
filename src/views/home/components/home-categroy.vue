<template>
  <!-- 鼠标离开把当前id清空 , 高亮取消 -->
  <div class='home-category' @mouseleave="categoryId = null">
    <ul class="menu">
      <!-- 当前id相等时添加高亮的类 -->
      <li :class="{ active: categoryId === item.id }" v-for="item in classifyLeft" :key="item.id"
        @mouseenter="categoryId = item.id">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <!-- 有子分类就显示 -->
        <template v-if="item.children">
          <RouterLink v-for="sub in item.children" :key="sub.id" :to="`/category/sub/${sub.id}`">{{ sub.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
    <!-- 鼠标经过左侧分类的弹出层 -->
    <div class="layer">
      <!-- 判断当前分类的id是品牌就显示品牌推荐 -->
      <h4 v-if="currCategory">{{ currCategory.id === 'brand' ? '品牌' : '分类' }}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <!-- 判断有没有获取到当前分类 当前分类有没有商品 -->
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌样式 -->
      <!-- <h4> <small>根据您的购买或浏览记录推荐</small></h4> -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="item in currCategory.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { findBrand } from '@/api/home'

// 封装左侧导航方法
const useClassifyLeft = (store) => {
  // 因为左侧分类要十个但数据只有九个 , push一个
  const brand = reactive({
    id: 'brand',
    name: '品牌',
    children: [{ id: 'brand-chilren', name: '品牌推荐' }],
    // 给brand追加一个品牌图片api
    brands: []
  })
  // 遍历vuex中的数据获取分类 , 取出子分类的前两项
  const menuList = computed(() => {
    // vuex中数据返回的新数组
    const list = store.state.category.list.map((item) => {
      return {
        id: item.id,
        name: item.name,
        children: item.children && item.children.slice(0, 2),
        goods: item.goods
      }
    })
    // 追加第十个分类
    list.push(brand)
    // 计算属性return
    return list
  })
  // 获取品牌数据图片
  findBrand().then((data) => {
    brand.brands = data.result
  })

  return menuList
}

export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore()
    // 左侧导航方法导入
    const classifyLeft = useClassifyLeft(store)
    // 弹层
    // 1. 获取鼠标划过当前分类的id 2.再找出划过的当前分类 3.return出去渲染
    const categoryId = ref(null)

    // 获取的鼠标划过的当前元素
    const currCategory = computed(() => {
      // find方法查找当前元素 , 箭头函数加{}就带return , 不加{}就不带return
      return classifyLeft.value.find(item => item.id === categoryId.value)
    })
    // // 监听当前元素
    // watch(currCategory, (n, o) => {
    //   console.log(n, o);
    // })
    return { classifyLeft, categoryId, currCategory }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  // background: rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;

      &:hover,
      &.active {
        background: @xtxColor;
      }

      a {
        margin-right: 4px;
        // color: black;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;

    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;

      small {
        font-size: 16px;
        color: #666;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          margin-right: 0;
        }

        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;

          &:hover {
            background: #e3f9f4;
          }

          img {
            width: 95px;
            height: 95px;
          }

          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;

            .name {
              font-size: 16px;
              color: #666;
            }

            .desc {
              color: #999;
            }

            .price {
              font-size: 22px;
              color: @priceColor;

              i {
                font-size: 16px;
              }
            }
          }
        }
      }

      li.brand {
        height: 180px;

        a {
          align-items: flex-start;

          img {
            width: 120px;
            height: 160px;
          }

          .info {
            p {
              margin-top: 8px;
            }

            .place {
              color: #999;
            }
          }
        }
      }
    }
  }

  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>