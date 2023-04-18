// 导入请求
import request from "@/utils/request";

/**
 * 获取首页头部分类数据
 */
export const findAllCategory = () => {
  return request("/home/category/head", "get");
};

/**
 *一级分类 , children属性就是各个子分类
 */
export const findTopCategory = (id) => {
  return request("/category", "get", { id });
};

/**
 * 二级分类筛选
 */
export const findSubCategoryFilter = (id) => {
  return request("/category/sub/filter", "get", { id });
};

/**
 *获取分类下的商品 传参是对象Object
 */
export const findSubCategoryGoods = (params) => {
  return request("/category/goods/temporary", "post", params);
};
