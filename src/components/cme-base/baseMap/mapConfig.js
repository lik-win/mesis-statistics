/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-24 18:25:28
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-04-08 14:05:38
 * @FilePath: \cme\src\utils\mapConfig.js
 * @Description: 生成2dmap
 */
import Map from "CME2D/Map.js";
import TileLayer from "CME2D/layer/Tile.js";
import XYZ from "CME2D/source/XYZ.js";
/**
 * @description: 生成2Dmap
 * @param {Object} target --挂载地图的div
 * @param {String} url --底图url
 * @return {Object} map实例
 */
export function initMap(target, url, view) {
  const map = new Map({
    target,//挂载实例
    layers: [
      new TileLayer({
        preload: Infinity, //开启预加载模式
        source: new XYZ({
          url: url,
        }),
      }),
    ],
    view,//地图设置
    controls: [],//取消地图操作
  });
  return map;
}
