/**
 * 商品详情
 */
import request from "@/utils/request";

export const findGoods = (id) => {
  return request("/goods", "get", { id });
};
