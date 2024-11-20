/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-15 14:54:09
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-03-27 20:22:38
 * @FilePath: \cme\src\store\index.js
 * @Description: pinia
 */
import { defineStore } from "pinia";

const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      mapLayersObj: [], //加载的图层实例,
      dateTiem: "", //时间,
      MultipleMaps:[],//多地图实例
    };
  },
  actions: {},
});

//暴露这个useCounterStore模块
export default useCounterStore;