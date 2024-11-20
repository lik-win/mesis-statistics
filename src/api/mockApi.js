/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-21 18:19:56
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-03-27 14:48:37
 * @FilePath: \cme\src\api\mockApi.js
 * @Description: mockApi模拟接口
 */
import request from "@/message/request";
export default {
  //返回图层列表
  layersAll(param) {
    return request({
      url: `/api/mockGetList`,
      method: "get",
      params: param,
    });
  },
  //获取时间列表
  timeList(param) {
    return request({
      url: `/api/timeList`,
      method: "get",
      params: param,
    });
  },
};
