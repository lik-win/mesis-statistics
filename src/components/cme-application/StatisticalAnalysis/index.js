import StatisticalAnalysis from "./index.vue";
//风向杆组件
StatisticalAnalysis.install = function (Vue) {
  Vue.component("CME-StatisticalAnalysis", StatisticalAnalysis);
};
export { StatisticalAnalysis };
