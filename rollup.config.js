import vue from '@vitejs/plugin-vue'
import terser from "@rollup/plugin-terser";
export default {
    input: "./src/components/cme-application/GridRender/index.js",
    output: {
        file: "dist/index.js",
        format: "esm",
        assetFileNames: "index.css"
    },
    external: ["ol"],
    plugins: [terser(),vue()],
};