# 一体化框架CME-轻量化

## 项目简介

> 一体化框架CME-轻量化 是一个基于 Vue 3 和 Vite 的前端项目。它使用了一些流行的库和插件，如CME2D、Element Plus、axios、pinia、vue-router 等，以提供丰富的功能和优化的开发体验。详情项目配置说明请预览 http://10.1.64.146/cme/#/cme/index CME文档网站

### 项目启动

> 本项目只配置一种npm方式下载内部组件，yarn pnpm 用户自行配置
> 在.npmrc文件内默认指定了本项目私有npm仓库地址，无需修改本地源



### 安装本项目依赖

```sh
npm install
```

### 启动 Vite 开发服务器。

```sh
npm run dev
```

### vite build 进行生产环境构建。

```sh
npm run build
```

### 启动 Vite 预览服务器，用于预览生产环境构建结果。

```sh
npm run preview
```


## 部分目录结构说明

```
|-- build
|   |-- CME-WindyBarb -单组件打包、发布、部署脚本配置文件夹（示例）
|       |-- deploy.js -单组件自动拷贝部署脚本（示例）
|       |-- pac.json -单组件配置文件（示例）
|       |-- prod.com.config.js -单组件打包配置文件（示例）
|-- public
|   |-- data -模拟数据（示例）
|   |-- pic  -图层配置图标（示例）
|-- src -项目主体
|   |-- api -封装接口文件
|       |-- mockApi -mock模拟接口文件（示例）
|       |-- maplist -普通接口文件（示例）
|   |-- assets -静态资源
|       |-- font -字体存放（示例）
|       |-- icons -svg图标（示例）
|       |-- pic -图片存放（示例）
|       |-- style -主要样式存放（示例）
|   |-- components -组件化
|       |-- cme-application -基础组件
|           |-- mapControl -底图控制弹框组件（示例）
|           |-- RasterRender -单通道栅格数据渲染组件（示例）
|           |-- WindyBarb -风向杆渲染组件（示例）
|           |-- WindyStream -风流场渲染组件（示例）
|       |-- cme-base -基于CMEsdk封装的组件
|           |-- baseMap -生成2Dmap组件（示例）
|       |-- cme-ui -基础UI融合组件
|           |-- timeLine -时间轴组件（示例）
|           |-- settingControl -左侧工具组件（示例）
|           |-- layerSetting -图层控制图例控制组件（示例）
|           |-- layerManage -右侧要素展示组件（示例）
|           |-- headerNav -头部导航栏组件（示例）
|       |-- cms-plugins -基于扩展封装组件
|   |-- config -配置文件
|       |-- maplist -底图配置数据（示例）
|       |-- projection -投影配置数据（示例）
|       |-- toolbox -地图工具配置数据（示例）
|   |-- message -消息管理
|       |-- mock -mock模拟接口消息配置（示例）
|       |-- request -axios请求封装（示例）
|       |-- ws-request -websocket消息封装（示例）
|   |-- plugins -扩展插件存放
|       |-- i18n -语言切换插件（示例）
|       |-- SvgIcon -svg图标加载封装（示例）
|   |-- router -路由管理
|   |-- store -状态管理
|   |-- utils -通用工具
|   |-- views -主体业务页面
|       |-- home -主体业务页面
|   |-- App.vue -vue入口文件
|   |-- main.js -整体配置入口文件



```

## 代码开发规范说明

> 1 遵循Eslint + Periiter + Editconfig ,暂未配置代码提交规范，可自行考量

> 2 遵循规定的目录结构，以便后期统一维护，示例代码可以自行根据业务需求调整

> 3 CME\* 组件，打包到私有源组件遵循CME 组件开发规范，其他组件遵循各自规范

## 项目说明

### 主要技术选型

> Vue3 + js（支持ts） + Vite + ElementPlus + mockjs + CME2D + Axios + vue-router + pinia

### Icon组件使用

> 方式1 本地svg 下载到 plugins/icon 下面

```angular2html
<svg-icon name="local-icon-print" size="18px" color="red" />
```

### Api真实接口请求说明

> 请求实例可在message/request目录下配置，使用方式参数api文件夹下设置

```js
//参考
import request from "@/message/request";

export function shopAdd(param) {
  return request({
    url: "/Data/goods.ashx",
    method: "get",
    params: param,
  });
}
```

### mockjs模拟接口请求说明

> 模拟请求实例可在message/mock目录下配置，使用方式参数api文件夹下设置

```js
// 模拟配置 message/mock
/** get请求
 * 获取图层url
 */
Mock.mock(RegExp("/api/mockGetList" + ".*"), "get", (options) => {
  var str = options.url.slice(options.url.indexOf("?") + 1);
  var elem = QS.parse(str);
  let projection;
  switch (elem.projection) {
    default:
      projection = "4326";
  }
  console.log(projection, elem, "res");
  return Mock.mock({
    code: 200,
    data: [
      {
        url: `/data/${elem.element}/${elem.element}_${projection}.tif`,
      },
    ],
  });
});

// api文件夹下
//接口参考
import request from "@/message/request";

export default {
  layersAll(param) {
    return request({
      url: `/api/mockGetList`,
      method: "get",
      params: param,
    });
  },
};
```
