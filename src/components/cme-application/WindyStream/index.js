import WindyStream from "./index.vue";
// 色斑图组件
WindyStream.install = function (Vue) {
  Vue.component("CME-WindyStream", WindyStream);
};
export { WindyStream };
