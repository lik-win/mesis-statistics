/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-15 14:54:09
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-04-08 13:50:32
 * @FilePath: \cme\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:svg-icons-register"; //配置svg
import i18n from "./plugins/i18n/index.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { SvgIcon } from "./plugins/SvgIcon/index.js";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { GridRender } from "./components/cme-application/GridRender/index.js";
import { WindyBarb } from "./components/cme-application/WindyBarb/index.js";
import { WindyStream } from "./components/cme-application/WindyStream/index.js";
import { StatisticalAnalysis } from "./components/cme-application/StatisticalAnalysis/index.js";
import mitt from "mitt";
import axios from "axios";
import "@/message/mock.js";
import { createPinia } from "pinia";

const store = createPinia(); //pinia实例
export const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store);
app.config.globalProperties.$Map2D = []; //设置map地图实例存放位置
app.config.globalProperties.$axios = axios;
app.provide("$axios", axios);
app.config.globalProperties.$bus = new mitt(); // 安装事件总线
app.use(router);
app.use(i18n);
app.use(SvgIcon);
app.use(GridRender); //色斑图组件
app.use(WindyBarb); //风向杆组件
app.use(WindyStream); //风向杆组件
app.use(StatisticalAnalysis); //统计分析组件
app.use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");
