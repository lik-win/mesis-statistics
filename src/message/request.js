/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-15 16:58:51
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-03-22 09:51:16
 * @FilePath: \cme\src\message\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import QS from "qs";
import { ElLoading } from "element-plus";

let loading, timeIntervalObj;

// 创建axios实例
const service = axios.create({
  // 请求URL公共部分
  baseURL: "",
  // 超时
  timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 设置 token,请求头
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    } else {
      config.headers["Authorization"] = "";
    }
    if (config.url) {
      if (
        config.url.indexOf("/hpageThematic/selectFactorBitImgData111") > 0 ||
        /* config.url.indexOf('/db/surfPreStatistics/searchSurfPreHourData') > 0 || */
        config.url.indexOf("/warningInfoController/selectWarnPageInfoMore") > 0 ||
        config.url.indexOf("/db/citynafp/getSurfInfoData") > 0 ||
        config.url.indexOf("/db/citynafp/getWarnInfoData") > 0 ||
        config.url.indexOf("/db/metewarn/getWarnInfoByCity") > 0 ||
        config.url.indexOf("/db/metewarn/getSurfInfoData") > 0
      ) {
        loading = ElLoading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)",
        });
      } else if (
        config.url.indexOf("/db/data/downloadPic") > 0 ||
        config.url.indexOf("/hpageThematic/downThematicGif") > 0 ||
        config.url.indexOf("/db/inst/export/exportInstHourStaData") > 0 ||
        config.url.indexOf("/db/inst/export/exportInstDayStaData") > 0 ||
        config.url.indexOf("/db/inst/export/exportInstMultiStaData") > 0 ||
        config.url.indexOf("/db/inst/export/exportInstSingleStaData") > 0 ||
        config.url.indexOf("/db/inst/export/exportInstHourAreaData") > 0 ||
        config.url.indexOf("/db/inst/export/exportInstCnYearData") > 0 ||
        config.url.indexOf("/db/inst/export/exportInstDayAreaData") > 0
      ) {
        loading = ElLoading.service({
          lock: true,
          text: "下载中...",
          background: "rgba(0, 0, 0, 0.7)",
        });
      } else if (
        config.url.indexOf("/db/Statistics4Hour/selectStatisticsHour4Sta") > 0 ||
        config.url.indexOf("/db/Statistics4Hour/selectSingleStation4Hour") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/mergeAreaProvinceHour") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/mergeAreaCityHour") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/mergeAreaBasinHour") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/mergeAreaRegionHour") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/selectSubBasinInfoHourPage") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/selectSubCityInfoHourPage") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/selectSubProvinceInfoHourPage") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/selectSubRegInfoHourPage") > 0 ||
        config.url.indexOf("/db/Statistics4Day/selectStatisticsDay4Sta") > 0 ||
        config.url.indexOf("/db/Statistics4Day/selectSingleStation4Day") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/mergeAreaBasinDay") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/mergeAreaCityDay") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/mergeAreaProvinceDay") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/mergeAreaRegionDay") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/selectSubBasinInfoDayPage") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/selectSubCityInfoDayPage") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/selectSubProvinceInfoDayPage") > 0 ||
        config.url.indexOf("/db/inteAreaPreStatistics/selectSubRegInfoDayPage") > 0
      ) {
        let num = 1;
        loading = ElLoading.service({
          lock: true,
          text: `查询内容较多，请耐心等待，已耗时${num}秒`,
          customClass: "numTime",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let numTimeObj = document.querySelector(".numTime p");
        num = numTimeObj.innerHTML.split("耗时")[1].split("秒")[0];
        timeIntervalObj = setInterval(() => {
          num++;
          numTimeObj.innerHTML = `查询内容较多，请耐心等待，查询已耗时${num}秒`;
        }, 1000);
      } else if (
        (config.url.indexOf("/geoserver/") > 0 ||
          config.url.indexOf("/geoserver_db/") > 0 ||
          config.url.indexOf("/geoserver_bm/") > 0 ||
          config.url.indexOf("/geoserver_ed/") > 0) &&
        config.method == "get"
      ) {
        config.headers["Accept"] = "application/vnd.ogc.sld+xml,application/xml,*/*";
        config.headers["Authorization"] = "Basic YWRtaW46Z2Vvc2VydmVy";
      } else if (
        /* 材料制作 */
        config.url.indexOf("/db/make/convention/actuallyHappening") > 0 ||
        config.url.indexOf("/db/make/convention/weatherForecastEdit") > 0 ||
        config.url.indexOf("/db/make/special/queryActSpecialActEle") > 0 ||
        config.url.indexOf("/db/make/special/preSpecialTotqlQuery") > 0 ||
        config.url.indexOf("db/make/craw/findEmergencyActEle") > 0 ||
        config.url.indexOf("/db/make/craw/emergencyPreEleTotal") > 0
      ) {
        loading = ElLoading.service({
          lock: true,
          text: "查询中...",
          background: "rgba(0, 0, 0, 0.7)",
        });
      }
    } else {
      console.log(config);
      return;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    if (loading) {
      if (timeIntervalObj) {
        clearInterval(timeIntervalObj);
        timeIntervalObj = null;
      }
      loading.close();
    }
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    if (code === 401) {
    } else if (code === 500) {
    } else if (code !== 200) {
      return Promise.reject("error");
    } else if (res.config.url.indexOf("/export/") > -1) {
      // 导出的接口特殊处理返回值
      return res;
    } else {
      return res.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
