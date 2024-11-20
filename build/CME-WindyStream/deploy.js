/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-25 18:19:05
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-03-27 11:38:56
 * @FilePath: \cme\build\CME-WindyBarb\deploy.js
 * @Description: 拷贝pac到打包出来的组件里当作package.json、上传组件到私服库中去
 */
// 导入依赖
import fs from 'fs';
import { execa } from 'execa';

// 拷贝文件
function copyFiles() {
    try {
        // 拷贝文件
        fs.copyFileSync(
            "build/CME-WindyStream/pac.json",
            "dist/CME-WindyStream/package.json"
        );
        console.log('pac文件拷贝成功!');
    } catch (error) {
        console.error('pac文件拷贝失败:', error.message);
    }

}
// 跳转到发布目录 
function cdPublishDir() {
    process.chdir("dist/CME-WindyStream");
}

// 发布到npm
function publishNpm() {
    return execa("npm", ["publish"], {
        env: {
            ...process.env,
            // npm_config_registry: "http://10.0.74.105:12302/repository/npm-release/",
            npm_config_registry: 'http://cme.leonhan.com:3526/nexus/repository/npm-release/'
        },
    });

}

// 执行任务
async function run() {
    copyFiles();
    cdPublishDir();
    await publishNpm();
}
export default run().catch(err => {
    console.error(err);
    process.exit(1);
});