import request from "@/utils/request";

// 热门品牌 , limit是获取的品牌图片数量
export const findBrand = (limit = 6) => {
  return request("/home/brand", "get", { limit });
};
