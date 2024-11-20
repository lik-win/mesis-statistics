import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vue from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
  base: "./",
  proxy: {
    "/CMEDATA": {
      target: "http://10.16.57.161:8001/CMEDATA", // 目标服务器
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/CMEDATA/, "/"),
    },
  },
  resolve: {
    //路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // 导入时想要省略的扩展名列表
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  server: {
    port: 5173,
    // open: true,
    proxy: {},
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true, // <-- this
      },
      imports: ["vue", "vue-router"],
    }),
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 执行icon name的格式
      symbolId: "[name]",
    }),
  ],
});
