<!--
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-16 15:52:15
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-03-29 18:50:22
 * @FilePath: \cme\src\components\cme-application\RasterRender\index.vue
 * @Description: 风向杆渲染
-->
<script>
import {
  cme_gridValueLayer,
  cme_cogtifLayer2,
  cme_gridArrowLayer,
} from "CME2D/CME2DCore";
// } from "@/CME2D/CME2DCore";

import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    let mapRef = null;
    const layerRef = { tifLayer: null, textLayer: null, arrowLayer: null };
    /**
     * @description: 风向杆渲染
     * @param {object} map - 地图实例
     * @param {string} url - 图层url
     * @param {object} data - 配置信息
     * @return {*}
     */
    let addLayer = (map, url, data) => {
      mapRef = map;
      // 图例
      let config = {
        layerName: data.id,
        source: {
          //图层的数据源
          normalize: data.normalize ?? false, //是否是多通道 true 表示是多通道，false表示单通道
          sources: [{ url, min: -9999, max: 9999 }],
          wrapX: true,
        },
        style: {
          //渲染的样式
          color: data.legendData?.legend ?? [], //颜色
          radio: +data.radio || 2, //颜色拉伸 1表示渐变拉伸，2表示区间值拉伸
          scale: +(data.scale || data.scala), // data.legendData?.scala ?? 0,//颜色拉伸
          offset: +data.offset || 0,
          unit: data.unit ?? ''
        },
        opacity: data.opacity ?? 1,  //data.opacity ?? 1, //图层透明度
        sourceOptions: {
          allowFullFile: false,
        },
        interpolate: true,
        mapproj: map.getView().getProjection().getCode()
      };

      let layer = new cme_cogtifLayer2(); //调用栅格图渲染方法
      map.addLayer(layer);
      layerRef.tifLayer = layer; //存储图层实例变量，方便销毁使用
      return layer._render(config).then((metas) => {
        if (data.legendData?.barbImg) {
          addArrowLayer(map, layer, data);
        }
        if (data.showText) {
          addTextLayer(map, layer, data); //添加文本数值图层
        }
        return Promise.resolve(layerRef, metas);
      });
      // return data; //把数据返回给渲染层，添加到全局进行管理
    };
    /**
     * @description: 渲染格点显示图层
     * @param {*} map - 地图实例
     * @param {Object} layer - 图层实例
     * @param {Object} data - 配置信息
     * @return {*}
     */
    let addTextLayer = (map, layer, data) => {
      const range = { min: -10000, max: 10000 };
      const legend = (data?.legendData?.legend || []).map(v => v[0]);
      if (legend.length) {
        range.min = legend.reduce((v1, v2) => Math.min(v1, v2), 0) - 10;
        range.max = legend.reduce((v1, v2) => Math.max(v1, v2), 0) + 10;
      }
      let config = {
        map: map, //地图实例
        params: {
          layer: layer, //图层实例
          layerName: data.id + "_text", //文本图层的图层名字
          precision: 1, //格网数据显示的小数点的精度
          opacity: 1, //透明度
          maxZoom: 15, // 最大缩放级别
          zIndex: data.zIndex + 1, //图层层级
          showTextRange: range,//显示的范围
          distanceArrow: data.distanceArrow ?? 80, //距离
          fixedPixel: data.fixedPixel ?? false, // 每个原始像素最多渲染一个值
          textStyle: {
            //文本样式
            font: "18px Calibri,sans-serif", //字体
            fill: {
              //填充
              color: "#000000", //颜色
            },
            stroke: {
              strokeStyle: 'rgba(255,255,0,1)',
              lineWidth: 5
            }
          }
        }
      };

      //  let lyr = new cme_gridValueLayer(); //调用渲染文本图层方法
      //  map.addLayer(lyr); //添加图层
      // lyr._render(config); //把数据添加到图层上
      let lyr = new cme_gridValueLayer(); //调用渲染文本图层方法
      map.addLayer(lyr); //添加图层
      lyr._render(config); //把数据添加到图层上
      layerRef.textLayer = lyr; //存储图层实例变量，方便销毁使用
    };
    /**
     * @description: 添加箭头图层到地图的函数。
     * @param {*} map - 地图实例
     * @param {Object} layer - 图层实例
     * @param {Object} data - 配置数据
     * @return {*}
     */
    let addArrowLayer = (map, layer, data) => {
      let image = new Image();
      image.src = data.legendData.barbImg; //图片地址
      image.onload = function () {
        let config = {
          map: map,
          params: {
            image: image,
            layer: layer,
            layerName: data.id + "_arrow",
            maxZoom: 15, // 最大缩放级别
            opacity: data.opacity ?? 1, //图层透明度
            distanceArrow: data.distanceArrow ?? 80, // 网格数据的间隔，可以不填写，默认80像素
            fixedPixel: data.fixedPixel ?? false, // 每个原始像素最多渲染一个值
            typeColor: data.typeColor ?? black, //默认是黑色，目前有white  black  blue  orange这几种颜色
            type: "wind", //  arrow 表示箭头  wind 表示风向杆
            peak: data.typeColor ?? false //默认为false，可以不配置这个参数，如果true 表示风力大于16级别的时候，使用红色的风向杆显示
          },
        };

        let lyr = new cme_gridArrowLayer(); //调用渲染文本图层方法
        map.addLayer(lyr); //添加图层
        lyr._render(config); //把数据添加到图层上
        layerRef.arrowLayer = lyr; //存储图层实例变量，方便销毁使用
      };
    };

    function removeLayer() {
      Object.values(layerRef).forEach(layer => {
        if (!layer) return;
        mapRef && mapRef.removeLayer(layer);
      });
    }
    return {
      addLayer,
      removeLayer
    };
  },
});
</script>
