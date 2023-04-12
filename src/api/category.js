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
