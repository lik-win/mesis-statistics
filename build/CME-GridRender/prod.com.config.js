/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-25 17:24:38
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-03-25 19:56:48
 * @FilePath: \cme\build\CME-WindyBarb\prod.com.config.js
 * @Description: CME-WindyBarb组件打包配置
 */
import { defineConfig } from "vite";
import path from "path";
import baseConfig from "../../vite.config"; // 主要用于alias文件路径别名

export default defineConfig({
  ...baseConfig,
  esbuild: {
    pure: ["console.log"], // 删除 console.log
    drop: ["debugger"], // 删除 debugger
  },
  // 打包配置
  build: {
    input: "../../src/components/cme-application/GridRender/index.js", // 只打包 引入及其依赖
    outDir: "dist/CME-GridRender", //输出文件名称
    minify: "esbuild", // 指定使用哪种混淆器
    // minify: false, // 关闭代码压缩
    sourcemap: true, // 生成源代码映射文件
    lib: {
      entry: path.resolve(
        __dirname,
        "../../src/components/cme-application/GridRender/index.js"
      ), //指定组件编译入口文件
      name: "CME-GridRender",
      fileName: "CME-GridRender",
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "vue",
        "element-plus",
        "ol",
        "CME3D",
        "CME2DCore",
        "axios",
        "Cesium",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        manualChunks: undefined,
        globals: {
          vue: "Vue",
          "@element-plus/icons-vue": "@element-plus/icons-vue",
        },
      },
    },
  },
});
