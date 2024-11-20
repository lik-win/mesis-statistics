<!--
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-16 15:52:15
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-05-27 19:57:25
 * @FilePath: \cme\src\components\cme-application\RasterRender\index.vue
 * @Description: 渲染栅格数据图层（单通道/多通道）
-->
<script>
import {
  cme_gridValueLayer,
  cme_cogtifLayer2,
} from "CME2D/CME2DCore/index.js";

import { defineComponent } from "vue";
// import { getCofTifData } from "./cogtifWorld.js";
export default defineComponent({
  setup() {
    let layerdata = null;
    let mapRef = null;
    const layerRef = { tifLayer: null, textLayer: null };
    const CogTifInfo = {};
    /**
     * @description: 渲染栅格数据图层（单通道/多通道）
     * @param {object} map - 地图实例
     * @param {string} url - 图层url
     * @param {object} data - 配置属性
     * @return {*}
     */
    let addLayer = (map, url, data) => {
      mapRef = map;
      // CogTifInfo.value = res
      CogTifInfo.configUnit = data?.configUnit
      // let bandsNumber = data.bandsNumber || 1; //判断是UV还是普通色斑
      layerdata = data; //存储图层实例变量，方便销毁使用

      // 图例
      let config = {
        layerName: data.id,
        type: 'grid',
        zIndex: data.zIndex ?? 1,
        source: {
          //图层的数据源
          normalize: data.normalize ?? false, //是否是多通道 true 表示是多通道，false表示单通道
          sources: [{ url, min: -9999, max: 9999 }], // tif文件路径
          wrapX: data.wrapX ?? true,
          interpolate: data?.interpolate ?? true,  // 控制图层展示是否平滑
        },
        style: {
          //渲染的样式
          color: data.legendData?.legend ?? [], //颜色
          radio: +data.radio || 2, //颜色拉伸 1表示渐变拉伸，2表示区间值拉伸
          scale: +(data.scale || data.scala), // data.legendData?.scala ?? 0,//颜色拉伸
          offset: +data.offset || 0,
          unit: data.unit ?? ''
        },
        opacity: data.opacity ?? 0.78, //图层透明度
        sourceOptions: {
          allowFullFile: false,
        },
        mapproj: map.getView().getProjection().getCode()
      };
      // let layer = new cme_cogtifLayer(config); //调用栅格图渲染方法
      let layer = new cme_cogtifLayer2(); //调用栅格图渲染方法
      map.addLayer(layer);
      layerRef.tifLayer = layer;
      return layer._render(config).then((meta) => {
        if (data.showText) {
          addTextLayer(map, layer, data); //添加文本数值图层
        }
        return Promise.resolve(layerRef, meta); // 返回元数据
      });
    };

    /**
     * @description: 渲染格点显示图层
     * @param {*} map - 地图实例
     * @param {Object} layer - 图层实例
     * @param {Object} data - 配置属性
     * @return {*}
     */
    let addTextLayer = (map, layer, data) => {
      const range = { min: -9999, max: 9999 };
      const legend = (data?.legendData?.legend || []).map(v => v[0]);
      if (legend.length) {
        range.min = legend.reduce((v1, v2) => Math.min(v1, v2), 0) - 10;
        range.max = legend.reduce((v1, v2) => Math.max(v1, v2), 0) + 10;
      }
      let config = {
        map: map, //地图实例
        params: {
          type: 'grid',
          layer: layer, //图层实例
          layerName: data.textId ?? data.id, //文本图层的图层名字,默认是栅格数据id名称加上_Text
          precision: 1, //格网数据显示的小数点的精度
          opacity: 1, //透明度
          maxZoom: 15, // 最大缩放级别
          zIndex: Number(data.zIndex) + 1 ?? 2, //图层层级
          showTextRange: range,
          distanceArrow: data.distanceArrow ?? 80, //距离
          fixedPixel: data.fixedPixel ?? false, // 每个原始像素最多渲染一个值
          textStyle: data.textStyle ?? {
            //文本样式
            font: "11px Calibri,sans-serif", //字体
            fill: {
              color: "#000000", //填充颜色
            },
            stroke: {
              // strokeStyle:'white',
              lineWidth: 5
            }
          },
        },
      };
      let lyr = new cme_gridValueLayer(); //调用渲染文本图层方法
      map.addLayer(lyr); //添加图层
      lyr._render(config); //把数据添加到图层上
      layerRef.tifLayer = lyr;
    };

    const getData = (pixel, layer) => {
      let res = layer.getData(pixel)
      let { scale = 1, unit, offset = 0, nodata, configUnit } = CogTifInfo
      let params = {
        value: null
      }
      if (res !== nodata) {
        try {
          if (configUnit && configUnit === 'k') {
            params.value = (res[0] / scale) + offset
          }
          else if (unit === 'K') {
            if (res[0] === 0) {
              params.value = 0
            }
            else {
              params.value = offset + (res[0] / scale) - 273.15
            }
          }
          else {
            params.value = (res[0] / scale) + offset
          }
        }
        catch (err) {
        }
        return params
      }
      return ''
    };

    function removeLayer() {
      Object.values(layerRef).forEach(layer => {
        if (!layer) return;
        mapRef && mapRef.removeLayer(layer);
      });
    }

    return {
      getData,
      addLayer,
      removeLayer
    };
  },
});
</script>
