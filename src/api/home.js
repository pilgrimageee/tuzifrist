// 主页api
import request from "@/utils/request";

// 热门品牌 , limit是获取的品牌图片数量
export const findBrand = (limit) => {
  return request("/home/brand", "get", { limit });
};

// 广告轮播图
export const findBanner = () => {
  return request("/home/banner", "get");
};

// 新鲜好物
export const findNew = () => {
  return request("/home/new", "get");
};

// 人气推荐
export const findHot = () => {
  return request("/home/hot", "get");
};

// 产品区块
export const findGoods = () => {
  return request("/home/goods", "get");
};

// 最新专题
export const findSpecial = () => {
  return request("/home/special", "get");
};
