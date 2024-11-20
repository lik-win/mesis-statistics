/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-20 14:02:13
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-03-21 18:20:09
 * @FilePath: \cme\src\api\maplist.js
 * @Description: 接口实例
 */
import request from "@/message/request";

export function shopAdd(param) {
  return request({
    url: "/Data/goods.ashx?Action=goodsAdd",
    method: "get",
    params: param,
  });
}
