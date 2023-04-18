// 分类
import { findAllCategory } from "@/api/category";
import { topCategory } from "@/api/constants";
// 分类模块
export default {
  namespaced: true,
  state: () => {
    return {
      // 分类信息集合 , 依赖topCategory数据 , 保持初始化就要数据不会白屏
      list: topCategory.map((item) => ({ name: item })),
    };
  },
  // 修改分类函数
  mutations: {
    // payload就是请求拿到的分类数组
    setList(state, payload) {
      state.list = payload;
    },
    // 遍历查找list中的id 判断是否等于传进的id 找出当前元素  = true就是显示
    show(state, id) {
      // 不用teturn就不带{ }
      const currCategory = state.list.find((item) => item.id === id);
      currCategory.open = true;
    },
    hide(state, id) {
      // 用return
      const currCategory = state.list.find((item) => {
        return item.id === id;
      });
      currCategory.open = false;
    },
  },
  // 获取分类函数
  actions: {
    async getList({ commit }) {
      // 获取分类数据
      const { result } = await findAllCategory();
      // 给获取的数据一级分类加上一个open控制二级分类显示隐藏
      result.forEach((item) => {
        // 添加一个open的属性
        item.open = false;
      });
      // 修改数据
      // console.log("打印获取到的分类", result);
      commit("setList", result);
    },
  },
};
