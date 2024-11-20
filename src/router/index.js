import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import service from "@/message/request.js";
import { interfaceObj } from "@/components/cme-application/StatisticalAnalysis/urlConfig.js";
const routes = [
  {
    path: "/",
    meta: {
      title: "首页",
    },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/StatisticalAnalysis",
    meta: {
      title: "统计分析",
    },
    component: () => import("@/views/StatisticalAnalysis/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getComCode = async () => {
  let res = await service.get(interfaceObj.getComCode);
  if (res.code === 200) {
    let res2 = await service.get(interfaceObj.getAreaDetail, {
      params: { mark: res.data.comMark },
    });
    if (res2.code === 200) {
      window.localStorage.setItem(
        "comCode",
        JSON.stringify({
          ...res.data,
          ...res2.data,
        })
      );
    }
  }
};
function toLogin() {
  return new Promise((resolve, reject) => {
    let loginState = 2; // 0 无权限  1 自动登录   2 页面登录
    let isToken = "0"; // token 失效
    let tokenCode = ""; // 自动登录成功
    service
      .get(interfaceObj.verificationIp)
      .then(({ data }) => {
        if (data && data.state) {
          const arr = data.state.split("_");
          loginState = arr[0];
          isToken = arr[1];
          tokenCode = data.token;
          if (loginState == 1 && tokenCode) {
            // 自动登录
            window.localStorage.setItem("token", tokenCode);
          }
          resolve({ loginState, isToken });
        }
        resolve({ loginState, isToken });
      })
      .catch((msg) => {
        resolve({ loginState, isToken });
      });
  });
}
router.beforeEach(async (to, from, next) => {
  toLogin().then(async ({ loginState, isToken }) => {
    if (loginState == 2) {
      let res = await service.post(interfaceObj.login, {
        userName: "gnxmesis",
        password: "mesis@gnx45",
      });
      if (res.code === 200) {
        // 1设置token
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("tokenTime", new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
      }
      getComCode();
    }
    next(to.path);
  });
  next();
});

export default router;
