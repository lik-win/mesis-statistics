<!--
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-16 15:52:15
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-04-03 16:46:21
 * @FilePath: \cme\src\components\cme-application\RasterRender\index.vue
 * @Description: 风流场渲染
-->
<script>
import {
  cme_windyStreamLayer

} from "CME2D/CME2DCore/index.js";
// } from "E://0509/cme2d-v1.0-0510/cme2d-v1.0----new/src/CME2D/CME2DCore";
// import { defineComponent, onMounted, defineProps, onBeforeUnmount, ref, getCurrentInstance } from "vue";

import { defineComponent, ref } from "vue";
export default defineComponent({
  // setup(props, ctx) {
  setup() {
    // const internalInstance = getCurrentInstance()
    let layerdata = ref({})
    /**
     * @description: 风流场渲染
     * @param {object} map - 地图实例
     * @param {string} url - 图层url
     * @param {object} data - 图层url
     * @return {*}
     */
    let addLayer = (map, url, data) => {
      layerdata.value = data //存储图层实例变量，方便销毁使用
      let params = {
        colors: [[0, 'rgb(98, 113, 184)'],
        [1.5, 'rgb(61, 110, 163)'],
        [3, 'rgb(74, 148, 170)'],
        [4, 'rgb(74, 146, 148)'],
        [5, 'rgb(77, 143, 124)'],
        [7.5, 'rgb(76, 164, 76)'],
        [10, 'rgb(104, 164, 55)'],
        [12.5, 'rgb(160, 133, 64)'],
        [15, 'rgb(163, 110, 92)'],
        [17.5, 'rgb(141, 63, 92)'],
        [20, 'rgb(150, 74, 144)'],
        [25, 'rgb(96, 101, 159)'],
        [30, 'rgb(90, 135, 160)']], //颜色

        pointSize: data.legendData.pointSize ?? 1.2,//线条的宽度
        color: data.legendData.color ?? [255, 255, 255, 1],//[100,0,100,1],//颜色

        layerName: data.id,
        opacity: data.opacity ?? 1,//图层透明度
        url: url,//tif文件
        scala: data.legendData.scala ?? 0,//颜色拉伸
        numParticles: data.legendData.numParticles ?? 5000,//粒子个数
        fadeOpacity: data.legendData.fadeOpacity ?? 0.98, // 粒子轨迹在每帧上衰减的速度有多快
        speedFactor: data.legendData.speedFactor ?? 0.99, // 粒子移动的速度有多快
        dropRate: data.legendData.dropRate ?? 0.01, // 粒子移动到随机位置的频率
        dropRateBump: data.legendData.dropRateBump ?? 0.01, // 下降速率相对于单个粒子速度的增加
        factor: data.legendData.factor ?? 10, //抽稀因子
        zIndex: data.zIndex ?? 100 //图层层级
      }
      let config = {
        map: map,
        params: params
      }
      let layer = new cme_windyStreamLayer(); //调用风流场渲染方法
      layer._render(config).then((bool) => {

      });
      map.addLayer(layer);
      return data //把数据返回给渲染层，添加到全局进行管理
    }
    return {
      addLayer
    }
  }
})
</script>
