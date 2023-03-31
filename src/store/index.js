import { createStore } from "vuex";

// 三个模块
import user from "./modules/user";
import cart from "./modules/cart";
import category from "./modules/category";
import createPersistedState from "vuex-persistedstate";

// 创建仓库
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    cart,
    category,
  },
  // vuex持久化
  plugins: [
    createPersistedState({
      // local storage存入的名字
      key: "vuexTime",
      // 要存储的模块
      paths: ["user", "cart"],
    }),
  ],
});
