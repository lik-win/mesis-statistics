import GridRender from "./index.vue";
// 色斑图组件
GridRender.install = function (Vue) {
  Vue.component("CME-GridRender", GridRender);
};
export { GridRender };
