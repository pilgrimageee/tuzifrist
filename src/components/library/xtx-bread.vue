<!-- 面包屑组件 -->

<!-- 指定组件显示的内容 new Vue({选项}), 有三种
el选项 , 通过一个选择器找到容器 , 容器内容就是组件内容
template选项 , <div>组件内容</div>作为组件内容
render选项(优先级更高) , 它是一个函数 , 函数会默认传入createElement函数 , 这个函数用来创建结构 , 再render函数返回渲染为组件内容 如果组件中含有render函数 , template将被忽略-->

<script>
// 导入h函数
import { h } from 'vue';
export default {
  name: 'XtxBread',
  render() {
    // 用法
    // 单文件组件有render去除template
    // vue2的h函数是传参进来render:h=>{return } , vue3是导入进来
    // 返回值就是组件内容
    // h('标签名字', '标签的属性对象class','子节点')

    // 需求
    // 创建xtx-bread父容器
    // 获取默认插槽内容
    // 去除xtx-bread-item组件的i标签 , 应该由render函数来组织
    // 遍历插槽里的item , 得到一个动态创建的节点 , 最后一个item不加i标签
    // 把动态创建的节点渲染在xtx-bread标签中

    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < items.length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<!--去除scoped属性变成全局样式 , 让样式作用到xtx-bread-item中 -->
<style lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;

  &-item {
    a {
      color: #666;
      transition: all .4s;

      &:hover {
        color: @xtxColor;
      }
    }
  }

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>