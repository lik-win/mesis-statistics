import SvgIcon from "./index.vue";

// 按需导入法
SvgIcon.install = function (Vue) {
  Vue.component("svg-icon", SvgIcon);
};

export { SvgIcon };
