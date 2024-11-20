// 生产
window.interfaceObj = {
  api: "http://10.1.64.146/mss_dm", // dm菜单后台
  satisIP: "http://10.1.64.146/mss_dm", // ip验证
  satis: "http://10.1.64.146/mss_db", // db统计后台
  satisInteract: "http://10.1.64.146/mss_ed", // 交互编辑后台
  geoserver: "http://10.1.64.146/geoserver_bm", // 底图geoserver
  geoservercolor: "http://10.1.64.146/geoserver_db", // 实况要素geoserver
  geoserverInteract: "http://10.1.64.146/geoserver_ed", // 交互编辑要素geoserver
  satisws: "ws://10.1.64.146/mss_db", // 消息
  serverType: "waisheng", // 前端环境别名
};

const api = window.interfaceObj.api; //新 - 测试版地址
const satis = window.interfaceObj.satis; //新 - 测试版地址
const satisIP = window.interfaceObj.satisIP; //新 - 正式版地址 - 生产 - 跳过代理
const geoserver = window.interfaceObj.geoserver; //VPN网
const geoservercolor = window.interfaceObj.geoservercolor; //VPN网
const satisInteract = window.interfaceObj.satisInteract; //新 - 交互编辑接口 - 测试
const geoserverInteract = window.interfaceObj.geoserverInteract; //新 - 交互编辑geoserver
const forecastSever = window.interfaceObj.forecast;

const interfaceObj = {
  /* geoserver接口 */
  geoserverwmts: geoserver + "/gwc/service/wmts",
  geoserverbasewms: geoserver + "/base/wms",
  geoserverbasewms960: geoserver + "/rp0/wms",
  geoserverbasewms1200: geoserver + "/rp1/wms",
  geoserverbasewms1440: geoserver + "/rp2/wms",
  geoserverwms: geoserver + "/wms",
  geogwcserverwms: geoserver + "/gwc/service/wms",
  geoserverbaseStyle: geoserver + "/rest/workspaces/base/styles/",
  geoservercolorwmts: geoservercolor + "/gwc/service/wmts",
  geoservercolorprewms: geoservercolor + "/prd/wms",
  geoservercolorprewmsInteract: geoserverInteract + "/prd/wms",
  geoservercolorpreStyleInteract: geoserverInteract + "/rest/styles",
  /* 其他接口 */
  login: api + "/login",
  logout: api + "/logout",
  checkToken: api + "/checkToken/",
  verificationIp: satisIP + "/verificationIp",
  getRoutersMenu: api + "/getRouters",
  getComCode: api + "/dm/com/getComCode",
  genSign: api + "/dm/taskconfigmanager",
  getTackClaByLevel: api + "/dm/taskclamanager/getTackClaByLevel",
  taskconfigmanagerList: api + "/dm/taskconfigmanager/list",
  taskconfigmanager: api + "/dm/taskconfigmanager",
  taskclamanagerList: api + "/dm/taskclamanager/list",
  classTaskManage: api + "/dm/taskclamanager",
  getAreaDetail: api + "/dm/indexpage/getRange",
  /* 首页界面逻辑接口 */
  getMainWarnPageInfo1: api + "/dm/indexpage/selectWarnPageInfo", //红色预警统计信息
  getCountryWarnPageInfo: api + "/dm/indexpage/getCountryWarnPageInfo", //国家预警统计信息
  getMainWeaInfoList: api + "/dm/indexpage/getWeaInfoList", //查询重要天气信息
  getMainWeaDesc: api + "/dm/indexpage/getWeaDesc", //查询重要天气的描述信息
  getMaingetWeaImage: api + "/dm/indexpage/getWeaImage", //查询重要天气的色斑图
  getMaingetWeaLayerServer: api + "/dm/indexpage/getWeaLayerServer", //查询重要天气的落区图层
  getLegendInfo: api + "/dm/indexpage/getLegendInfo", //查询落区图例

  getPubSentDesc: api + "/dm/indexpage/getPubSentDesc", //查询舆情信息的描述信息
  getPubSentImage: api + "/dm/indexpage/getPubSentImage", //查询舆情信息的专题图
  getMainViewTime: api + "/dm/indexpage/getTime", // 查询最新落区更新时间
  getElementSwitch: api + "/dm/indexpage/elementSwitch", // 每日雨情控制
  getSurfInfoDataYJMainData: satis + "/db/metewarn/getHomeInfo", //查询气象预警GIS数据
  getMainWarnPageInfo: api + "/dm/indexpage/getWarnPageInfo", //查询气象预警统计数据
  getMainProvinceWarn: api + "/dm/indexpage/getProvinceWarn", // 全国省市县预警

  /* 首页界面统计接口 */
  getGaoliangLayer: satis + "/db/sigmet/zoneOrder/", //查询高亮图层
  getMainWeatherWord: satis + "/db/homeStatis/getWeatherWord", //查询当日天气公报
  getMainWeatherWordnew: satis + "/db/homeStatis/getWeatherWordTitle", //查询当日天气公报(拆分)
  getMainqueryOneLine: satis + "/db/homeStatis/queryOneLine", //查询首页优先级最高折线图统计
  getMainqueryLine: satis + "/db/homeStatis/queryLine", //首页折线图统计
  getMainsearchSingleSite: satis + "/db/homeStatis/searchSingleSite", //查询单站点多要素
  getMainqueryTwoStatis: satis + "/db/homeStatis/queryTwoStatis", //首页二级页统计数据
  getMainBigRainNumData: satis + "/db/indexPre/searchBaoRain", //查询暴雨站点数量
  getMainBigSnowNumData: satis + "/db/indexPre/searchBaoSnowNum", //查询暴雪点数
  getMainBigChangeTemNumData: satis + "/db/indexPre/searchChangeTemNum", //查询降温幅度超4℃站点数
  getMainPreStaData: satis + "/db/indexPre/searchPreSta", //查询首页雨雪统计
  getMainSingleSiteData: satis + "/db/indexPre/searchSingleSite", //查询积雪深度最大站点的单站多要素
  searchSingleSitePubSent: satis + "/db/homeStatis/searchSingleSitePubSent", //查询单站点多要素（舆情）
  searchForeStatisDayPubSent: satis + "/db/homeStatis/searchForeStatisDayPubSent", //查询日值预报统计（舆情）
  searchForeStatisHourPubSent: satis + "/db/homeStatis/searchForeStatisHourPubSent", //查询小时值预报统计（舆情）
  searchForeStatisHourPubSent: satis + "/db/homeStatis/searchForeStatisHourPubSent", //查询小时值预报统计（舆情）
  getmainStationList: satis + "/db/OG/getStationList", // 查询冬奥监测站站点
  getmainOGDataAll: satis + "/db/OG/getOGDataAll", // 单站点总数据查询 实况 预报 统计
  getMainquakeDownWord: satis + "/db/homeStatis/downWord", // word下载(单)
  downMainEveryRainWord: satis + "/db/homeStatis/downEveryRainWord", // word下载(单-每日雨情)
  queryMainEveryRainWord: satis + "/db/homeStatis/queryEveryRainWord", // 每日雨情Word预览

  /* 重要产品界面逻辑接口 */
  getHpageThematicNewMenu: api + "/hpageThematic/getNewMenu",
  getHPageArea: api + "/hpageThematic/selectHPageArea",
  getHPageFactorData: api + "/hpageThematic/selectFactorBitImgData",
  getHPageCFactorData: api + "/hpageThematic/selectCFactorData",
  selectTimeaxisSpecData: api + "/hpageThematic/selectTimeaxisSpecData", // 根据子要素，查询时间轴
  getHPageTimeaxisData: api + "/hpageThematic/selectTimeaxisData",
  getselectThematicData: api + "/hpageThematic/selectThematicData",
  downloadImage: api + "/hpageThematic/downThematic",
  downThematicGif: api + "/hpageThematic/downThematicGif", //下载GIF
  variThematics: api + "/hpageThematic/variThematics", //预览GIF
  selectAreaProporions: api + "/hpageThematic/selectAreaProporions",
  getSingleFactorBitImg: api + "/hpageThematic/selectSingleFactorBitImg",
  selectJobUpdateTime: satis + "/db/preStatistics/selectJobUpdateTime", //查询重要产品任务数据更新时间
  getselectThematicDatas: api + "/hpageThematic/selectThematicDatas",
  getHpageStartAndEnd: api + "/hpageThematic/getStartAndEnd",
  /* 重要产品预警接口 */
  selectWarnPageInfo: api + "/warningInfoController/selectWarnPageInfo",
  selectWarnPageInfoMore: api + "/warningInfoController/selectWarnPageInfoMore",
  getCounterWarn: api + "/warningInfoController/getCounterWarn", //重要产品--国家预警统计信息
  /* 重要产品降水统计接口 */
  getPreData1: satis + "/db/preStatistics/redisProvStaPre136h",
  getPreData2: satis + "/db/preStatistics/redisProvPre136h",
  getPreData3: satis + "/db/preStatistics/redisProvStaPre136h",
  getPreAvgData1: satis + "/db/preStatistics/selectRainNumAndAvg",
  getPreExtsData: satis + "/db/factorExt/redisPreExts",
  getPreExtStaData: satis + "/db/factorExt/redisPreExtStaInfo",
  /* 重要产品气温统计接口 */
  getTempMaxData: satis + "/db/tempStatistics/testRedisTempMax",
  getTempMinData: satis + "/db/tempStatistics/redisTempMin",
  selectMaxAndMinTempOfSta: satis + "/db/tempStatistics/selectMaxAndMinTempOfSta", //统计站点最高最低气温
  //getTempExtsData: satis + "/db/factorExt/redisTempExts",
  getTempExtsData: satis + "/db/tempStatistics/selectTemExtNumOfProvince", //统计站点省份高温低温突破极值站点数
  getTempExtStaData: satis + "/db/factorExt/redisTempExtStaInfo",
  /* 重要产品大风统计接口 */
  getWindAvgData: satis + "/db/windStatistics/redisWindAvg",
  getWindMaxData: satis + "/db/windStatistics/redisWindMax",
  selectExtAndAvgWindOfSta: satis + "/db/windStatistics/selectExtAndAvgWindOfSta", //统计站点极大风平均风
  selectWindExtNumOfProvince: satis + "/db/windStatistics/selectWindExtNumOfProvince", //统计站点省份极大风平均风突破极值站点数
  getWindExtsData: satis + "/db/factorExt/redisWindExts",
  getWindExtStaData: satis + "/db/factorExt/redisWindExtStaInfo",
  /* 重要产品天气现象统计接口 */
  getWeatherStaData: satis + "/db/weaStatistics/redisWeaNum",
  getWeatherStaInfoData: satis + "/db/weaStatistics/redisWeaInfo",
  /* 重要产品能见度统计接口 */
  getVisStaData: satis + "/db/visiStatistics/redisVisNum",
  getVisStaInfoData: satis + "/db/visiStatistics/redisStaVisInfo",
  /* 实况监测界面站点类接口 */
  getExtStationData: satis + "//db/livesta/api", //获取后来补充得极值点地图信息接口
  get0808hExstaLivePre: satis + "/db/livepre/0808hexsta", //日值(08-08)出现突破极值站点
  spresxd8hexstaLivePre: satis + "/db/livepre/spresxd8hexsta", //前期08时以来降水突破极值站点
  preptxdexstaLivePre: satis + "/db/livepre/preptxdexsta", //过去10/20/30天降水突破极值站点
  pretenexstaLivePre: satis + "/db/livepre/pretenexsta", //旬值降水突破极值站点
  premonexstaLivePre: satis + "/db/livepre/premonexsta", //月值降水突破极值站点
  thrmonexstaLivePre: satis + "/db/livepre/thrmonexsta", //3至当前月降水突破极值站点
  temmax0808hexstaLive: satis + "/db/livetem/temmax0808hexsta", //日值(08-08)最高气温出现突破极值站点
  temmin0808hexstaLive: satis + "/db/livetem/temmin0808hexsta", //日值(08-08)最低气温出现突破极值站点
  temmaxsxd8hexstaLive: satis + "/db/livetem/temmaxsxd8hexsta", //前期08时以来高温出现突破极值站点
  temminsxd8hexstaLive: satis + "/db/livetem/temminsxd8hexsta", //前期08时以来低温出现突破极值站点
  temmaxptxdexstaLive: satis + "/db/livetem/temmaxptxdexsta", //过去10/20/30天高温出现突破极值站点
  temminptxdexstaLive: satis + "/db/livetem/temminptxdexsta", //过去10/20/30天低温出现突破极值站点
  temmaxtenexstaLive: satis + "/db/livetem/temmaxtenexsta", //旬值最高气温出现突破极值站点
  temmintenexstaLive: satis + "/db/livetem/temmintenexsta", //旬值最低气温出现突破极值站点
  temmaxmonexstaLive: satis + "/db/livetem/temmaxmonexsta", //月值最高气温出现突破极值站点
  temminmonexstaLive: satis + "/db/livetem/temminmonexsta", //月值最低气温出现突破极值站点
  thrmonmaxexstaLive: satis + "/db/livetem/thrmonmaxexsta", //3至当前月以来最高气温出现突破极值站点
  thrmonminexstaLive: satis + "/db/livetem/thrmonminexsta", //3至当前月以来最低气温出现突破极值站点
  sxd8hwindextexstaLive: satis + "/db/livewind/sxd8hwindextexsta", //前期08时以来极大风出现突破极值站点
  sxd8hwindavgexstaLive: satis + "/db/livewind/sxd8hwindavgexsta", //前期08时以来平均风出现突破极值站点
  ptxdwindextexstaLive: satis + "/db/livewind/ptxdwindextexsta", //过去x天极大风出现突破极值站点
  ptxdwindavgexstaLive: satis + "/db/livewind/ptxdwindavgexsta", //过去x天平均风出现突破极值站点
  tenwindextexstaLive: satis + "/db/livewind/tenwindextexsta", //旬值极大风出现突破极值站点
  tenwindavgexstaLive: satis + "/db/livewind/tenwindavgexsta", //旬值平均风出现突破极值站点
  monwindextexstaLive: satis + "/db/livewind/monwindextexsta", //月值极大风出现突破极值站点
  monwindavgexstaLive: satis + "/db/livewind/monwindavgexsta", //月值平均风出现突破极值站点
  thrmonwindextexstaLive: satis + "/db/livewind/thrmonwindextexsta", //3至当前月极大风出现突破极值站点
  thrmonwindavgexstaLive: satis + "/db/livewind/thrmonwindavgexsta", //3至当前月平均风出现突破极值站点
  hourweatherLive: satis + "/db/liveweather/hourweather", //小时天气现象
  getWeatherStaByDayLive: satis + "/db/liveweather/getWeatherStaByDay", //日值天气现象
  d8hweatherLive: satis + "/db/liveweather/d8hweather", //前期08时以来天气现象
  //getWeatherStaByDayLive:satis + "/db/liveweather/getWeatherStaByDay", //过去x天天气现象
  tenfsnowstaDayLive: satis + "/db/liveweather/tenfsnowsta", //旬值天气现象
  monfsnowstaLive: satis + "/db/liveweather/monfsnowsta", //月值天气现象
  thrmonfsnowstaLive: satis + "/db/liveweather/thrmonfsnowsta", //3至当前月天气现象
  ptxdtmaxdaLive: satis + "/db/livetem/ptxdtmaxda", //过去10/20/30天出现最高气温日期
  ptxdtmindaLive: satis + "/db/livetem/ptxdtminda", //过去10/20/30天出现最低气温日期
  tenmaxdaLive: satis + "/db/livetem/tenmaxda", //旬值出现最高气温日期
  tenmindaLive: satis + "/db/livetem/tenminda", //旬值出现最低气温日期
  monmaxdaLive: satis + "/db/livetem/monmaxda", //月值出现最高气温日期
  monmindaLive: satis + "/db/livetem/monminda", //月值出现最低气温日期
  thrmonmaxdaLive: satis + "/db/livetem/thrmonmaxda", //3至当前月出现最高气温日期
  thrmonmindaLive: satis + "/db/livetem/thrmonminda", //3至当前月出现最低气温日期
  /* 实况监测界面逻辑接口 */
  getLPageProvinces: api + "/dm/surfPageController/getProvinces", //实况省份新版查询接口
  getLPageFactorDatas: api + "/dm/surfPageController/findByParent", //查询父级下的子要素
  getLPageAttrDatas: api + "/dm/surfPageController/findAttrByParent", //查询父要素id的子要素
  getLiveMap: api + "/dm/geopre/getMap",
  variMapServer: api + "/dm/geopre/variMapServer",
  downLoadLiveThematic: api + "/dm/geopre/downLoadThematic",
  getStationLiveId: satis + "/db/livepre/getStationInfo", //查询站点信息
  getLivePointData: satis + "/db/livepre/getPointData", //查询点图层信息
  getLMaxMinPointData: satis + "/db/livepre/getMaxMinPointData", //阈值查询点图层信息
  selectPreThresholdHour: satis + "/db/surfPreStatistics/selectPreThresholdHour",
  selectPreThresholdDay: satis + "/db/surfPreStatistics/selectPreThresholdDay",
  selectExtByStationIdDay: satis + "/db/surfPreStatistics/selectExtByStationIdDay", //（日值）查询时段内站点降水量、最高/低气温，极大风、各类历史、月极值
  selectInfoByStationIdDay: satis + "/db/surfPreStatistics/selectInfoByStationIdDay", //（日值）查询时段内站点降水量、气温、湿度、能见度、极大风速、极大风速风向
  selectInfoByStationIdHour: satis + "/db/surfPreStatistics/selectInfoByStationIdHour", //（小时）查询时段内站点降水量、气温、湿度、能见度、极大风速、极大风速风向
  selectExtByStationIdHour: satis + "/db/surfPreStatistics/selectExtByStationIdHour", //（小时）查询时段内站点降水量、最高/低气温，极大风、各类历史、月极值
  /* 实况监测界面气温统计接口 */
  searchSurTemTenValueForPro: satis + "/db/surfTempStatistics/searchSurTemTenValueForPro", //分省查询实况气温逐旬(单个旬)数据
  searchSurfTemForProHourData: satis + "/db/surfTempStatistics/searchSurfTemForProHourData", //分省查询实况气温单个子要素（至过去10/20/30天）数据
  searchSurfTemMonValueForPro: satis + "/db/surfTempStatistics/searchSurfTemMonValueForPro", //分省查询实况气温某月以来数据
  searchSurfTemOneMonValueForPro: satis + "/db/surfTempStatistics/searchSurfTemOneMonValueForPro", //分省查询实况气温逐月(单个月)数据
  searchSurfTemTenValue: satis + "/db/surfTempStatistics/searchSurfTemTenValue", //查询实况气温逐旬(单个旬)数据
  searchSurfTemOneMonValue: satis + "/db/surfTempStatistics/searchSurfTemOneMonValue", //查询实况气温逐月(单个月)数据
  searchSurfTemMonValue: satis + "/db/surfTempStatistics/searchSurfTemMonValue", //查询实况气温某月以来数据
  searchSurfTemHourData: satis + "/db/surfTempStatistics/searchSurfTemHourData", //查询实况气温单个子要素（至过去10/20/30天）数据
  liveDownloadPic: satis + "/db/data/downloadPic", //查询实况气温单个子要素（至过去10/20/30天）数据

  /* 实况监测界面降水统计接口 */
  getSearchStaDatas: satis + "/searchStaDatas", //天气现象--查询出现降雪、大雾的站点信息等
  searchStaVisSnowInfo: satis + "/searchStaVisSnowInfo", //天气现象--查询站点最大积雪深度或最小能见度
  searchSticWeaProvinceSxd: satis + "/searchSticWeaProvinceSxd", //天气现象--查询省份数据

  selectWeaDayTenMonStaInfo: satis + "/selectWeaDayTenMonStaInfo", //天气现象--站点统计10/20/30天，旬，月天气现象接口
  searchSticFirstSnowNumProvinceLongDate: satis + "/searchSticFirstSnowNumProvinceLongDate", //天气现象--分省统计10/20/30天，旬，月天气现象接口
  searchSurfRhuData: satis + "/db/surfRhuStatistics/searchSurfRhuData", //查询实况相对湿度单个子要素数据
  searchSurfRhuForProData: satis + "/db/surfRhuStatistics/searchSurfRhuForProData", //查询实况相对湿度单个子要素数据

  searchSurfPreHourData: satis + "/db/surfPreStatistics/searchSurfPreHourData",
  searchSurfPreTenValue: satis + "/db/surfPreStatistics/searchSurfPreTenValue",
  searchSurfPreOneMonValue: satis + "/db/surfPreStatistics/searchSurfPreOneMonValue",
  searchSurfPreMonValue: satis + "/db/surfPreStatistics/searchSurfPreMonValue",
  searchSurfForProvincial: satis + "/db/surfPreStatistics/searchSurfForProvincial",
  searchSurfPreMonValueForPro: satis + "/db/surfPreStatistics/searchSurfPreMonValueForPro",
  searchSurfPreOneMonValueForPro: satis + "/db/surfPreStatistics/searchSurfPreOneMonValueForPro",
  searchSurfPreTenValueForPro: satis + "/db/surfPreStatistics/searchSurfPreTenValueForPro",
  selectThresholdPreByACodeHour: satis + "/db/surfPreStatistics/selectThresholdPreByACodeHour",
  selectAreaCode: satis + "/db/inteAreaPreStatistics/selectAreaCode",
  /* 实况监测界面大风统计接口 */
  searchSurfWindHourData: satis + "/db/surfWindStatistics/searchSurfWindForProHourData", //分省查询实况大风单个子要素数据
  searchSurfWindTenValue: satis + "/db/surfWindStatistics/searchSurfWindTenValue", //查询实况大风逐旬(单个旬)数据
  searchSurfWindOneMonValue: satis + "/db/surfWindStatistics/searchSurfWindOneMonValue", //查询实况大风逐月(单个月)数据
  searchSurfWindMonValue: satis + "/db/surfWindStatistics/searchSurfWindMonValue", //查询实况大风某月以来数据
  searchSurfWindDayData: satis + "/db/surfWindStatistics/searchSurfWindDayData", //查询实况大风单个子要素（至过去10/20/30天）数据
  searchSurfWindTenData: satis + "/db/surfWindStatistics/searchSurfWindForProTenData", //分省查询实况大风(单个旬)子要素数据
  searchSurfWindOneMonData: satis + "/db/surfWindStatistics/searchSurfWindForProOneMonData", //分省查询实况大风(单个月)子要素数据
  /* 预报分析界面接口 */
  /* 预报分析-城市预报-接口 */
  exportWeaInfoForecastData: satis + "/db/citynafp/exportWeaInfo", //导出天气现象信息
  getWeaInfoForecastData: satis + "/db/citynafp/getWeaInfo", //查询城市天气现象信息
  getWarnInfoDataForecastData: satis + "/db/citynafp/getWarnInfoData", //查询城市预警信息
  getSurfInfoDataForecastData: satis + "/db/citynafp/getSurfInfoData", //查询城市当前实况信息
  getWeaInCityNumForecastData: satis + "/db/citynafp/getWeaInCityNum", //统计重大天气现象出现的城市
  /* 预报分析-气象预警-接口 */
  getSurfInfoDataYJForecastData: satis + "/db/metewarn/getSurfInfoData", //查询气象预警GIS数据
  getAreaCityInfoForecastData: satis + "/db/metewarn/getAreaCityInfo", //查询省市县信息
  getWarnInfoByCityForecastData: satis + "/db/metewarn/getWarnInfoByCity", //根据城市查询预警信息
  getWarnInfoNumForecastData: satis + "/db/metewarn/getWarnInfoNum", //根据城市查询预警信息

  /*预报分析 - 智能格网*/
  // getTwoLevel: api + "/dm/NafpPageController/getTwoLevel", //获取二级菜单 - 弃
  getTwoLevel: api + "/dm/NafpPageController/getTwoLevelNew", //获取二级菜单 - 新
  getNafpImageAndMapList: api + "/dm/NafpJsPage/getNafpImageAndMapList", //获取二级菜单 - 新
  getForecastMap: api + "/dm/NafpPageController/getMap", //获取地图数据
  variMapServerForecast: api + "/dm/NafpPageController/variMapServer", //验证是否存在图层
  getSmartgridRecordInfo: satis + "/db/smartnafp/getSmartgridRecordInfo", //查询区域影响信息
  getBreachExtremumSite: satis + "/db/smartnafp/breachExtremumSite", //查询突破极值隐患站点
  getForecastDescText: satis + "/db/smartnafp/getDescText", // 获取产品描述文本
  breachExtremumSiteDetails: satis + "/db/smartnafp/breachExtremumSiteDetails", //查询突破极值隐患站点详情
  /*预报分析 - 主观预报*/
  getSubjectiveBitImageList: api + "/dm/NafpJsPage/getBitImageList", //查询主观预报时次缩略图集合
  getSubjectiveTyphNames: api + "/dm/NafpJsPage/typhNames", //获取正在发生的台风名称
  // 预报分析 - 数据一体化分析
  getIntegraDayTable: forecastSever + "/db/integra/table", // 实况预报逐日统计
  getIntegraDaychartTable: forecastSever + "/db/integra/barchart", // 实况预报逐日统计
  getIntegraMenuList: forecastSever + "/db/integra/menu", // 实况预报逐日统计

  /* 过程分析界面逻辑接口 */
  selectProsStata: api + "/dm/pros/selectProsStata", //有效过程管理查询
  selectProsAndGraphsById: api + "/dm/pros/selectProsAndGraphsById", //根据id查询过程详细信息及过程对应产品
  selectSelectProsById: api + "/dm/pros/selectProsById", //根据id查询过程详细信息
  selectProsGraphs: api + "/dm/pros/selectGraphs", //查询过程页面产品
  selectProsAreas: api + "/dm/pros/selectProsAreas", //查询过程页面过程区域集合
  selectProsTypes: api + "/dm/pros/selectProsTypes", //查询过程页面过程类型集合
  saveProcess: api + "/dm/pros/savetPros", //保存新增过程
  getProcessData: api + "/dm/pros/selectPros", //过程管理查询
  deleteProcessData: api + "/dm/pros/deletePros", //过程删除
  endProcessData: api + "/dm/pros/updatePros", //过程暂停
  updateProEnableds: api + "/dm/pros/updateProEnableds", //过程开始
  getprosGeoMap: api + "/dm/prosGeo/getMap", //获取地图服务
  getSiteData: satis + "/db/prosStatistics/searchPros", //过程站点气象要素统计
  getRegionData: satis + "/db/prosStatistics/searchProsCity", //过程区域气象要素统计
  //getProssearchText: satis + "/db/prosStatistics/searchTextDesc", //过程区域气象要素统计
  getProssearchText: satis + "/db/prosStatistics/searchTextMap", //过程区域气象要素统计
  getProsProvCode: satis + "/db/prosStatistics/getProvCode", //根据经纬度查询过程区域省份信息
  getProsAreaCodes: satis + "/db/prosStatistics/getAreaCodes", //根据区域编码查询过程区域省份信息
  getMapList: api + "/dm/prosGeo/getMapList", //获取地图服务(GIF动图)
  ptxdFogsta: satis + "/db/prospre/ptxdFogsta", //出现雾站点
  ptxdsandsta: satis + "/db/prospre/ptxdsandsta", //出现沙尘站点
  getprosImgMapList: api + "/dm/prosGeo/getImgMapList", //获取地图服务(GIF动图)(图片版)
  /* 过程分析下载界面接口 */
  getprosgetImgList: api + "/dm/prosGeo/getImgList", //获取已经生成的图片时间集合
  getprosgetProsImg: api + "/dm/prosGeo/getProsImg", //查看单张图片
  getprosdownProsImg: api + "/dm/prosGeo/downProsImg", //图片下载(单张)
  getprosdownProsImgMore: api + "/dm/prosGeo/downProsImgMore", //多张图片打包下载
  getprosdownProsGif: api + "/dm/prosGeo/downProsGif", //GIF动图生成下载
  getdownNewestProsImg: api + "/dm/prosGeo/downNewestProsImg", // 图片下载(单张)
  getdownNewestProsMC3: api + "/dm/prosGeo/downNewestProsMC3", // 最新3类数据下载(单)
  getdownProsMC3More: api + "/dm/prosGeo/downProsMC3More", // 3类数据文件打包下载
  downProsWord: satis + "/db/word/downProsWord",

  /*  智能统计页面  */
  getInstSequenceElementData: satis + "/db/inst/getInstSequenceElementData", //时序图-统计要素查询
  getInstSequenceData: satis + "/db/inst/getInstSequenceData", //时序图查询
  getInstMultiStaData: satis + "/db/inst/getInstMultiStaData", //连续旬月年站点查询
  getInstYearStaData: satis + "/db/inst/getInstYearStaData", //单个年查询
  selectSingleMonDataInfo: satis + "/db/inst/tenMon/selectSingleMonDataInfo", //单个月查询
  selectSingleTenDataInfo: satis + "/db/inst/tenMon/selectSingleTenDataInfo", //单个旬查询
  exportInstHourStaData: satis + "/db/inst/export/exportInstHourStaData", //导出-小时值站点
  exportInstDayStaData: satis + "/db/inst/export/exportInstDayStaData", //导出-日值站点
  exportInstCnYearData: satis + "/db/inst/export/exportInstCnYearData", //导出-历年同期站点
  exportInstMultiStaData: satis + "/db/inst/export/exportInstMultiStaData", //导出-多旬｜多月｜多年站点
  exportInstMonAreaData: satis + "/db/inst/export/exportInstMonAreaData", // 导出-月值区域
  exportInstTenAreaData: satis + "/db/inst/export/exportInstTenAreaData", // 导出-旬值区域
  exportInstYearAreaData: satis + "/db/inst/export/exportInstYearAreaData", // 导出-年值区域
  exportInstSingleStaData: satis + "/db/inst/export/exportInstSingleStaData", //导出-多旬｜多月｜多年站点
  exportInstHourAreaData: satis + "/db/inst/export/exportInstHourAreaData", //导出-小时-区域
  exportInstDayAreaData: satis + "/db/inst/export/exportInstDayAreaData", //导出-日值-区域
  //getDayindexAreaData: satis + '/db/inteAreaStatisticsControllerNew/selectInteSequenceInfoDay', // 日序区域查询
  getDayindexAreaData: satis + "/db/inst/getInteSequenceStaInfoDay", // 日序区域查询
  getDayindexAreaDataExport: satis + "/db/inst/export/exportInteSequenceInfoDay", // 日序导出
  // getIntelSearchInfo: api + "/dm/inte/selectStatisticsElementByParentId", //获取查询条件
  getProvince: satis + "/db/inteAreaPreStatistics/selectAreaCode", //查询省份
  getAreaStaInfoRelByParent: satis + "/db/inteAreaPreStatistics/selectAreaStaInfoRelByParent", //查询区域及流域
  getIntelSearchInfo: satis + "/db/inst/getInstElementData", //查询时间尺度与统计要素
  getInstHourStaData: satis + "/db/inst/getInstHourStaData", //小时站点查询
  getInstDayStaData: satis + "/db/inst/getInstDayStaData", //日值站点查询
  selectCnYearData: satis + "/db/inteAreaStatisticsControllerNew/selectCnYearData", //智能统计，历年同期
  getLikeStationInfoById: satis + "/db/inst/getLikeStationInfoById", // 根据输入站号 查询站号
  getLikeStationInfoByName: satis + "/db/inst/getLikeStationInfoByName", // 根据输入站名 查询站号
  getLikeStationInfo: satis + "/db/inst/getLikeStationInfo", // 根据输入站名 查询站号
  getStationInfoByLonLat: satis + "/db/inst/getStationInfoByLonLat", // 根据经纬度范围 查询站号
  getStationListByType: satis + "/db/inst/getStationListByType", // 根据类型 条件查询站号
  getStationListByXGB: satis + "/db/inst/getStationListByXGB", // 根据类型县编码查询站号
  getStationCityCode: satis + "/db/inst/getCityCode", // 行政区划信息查询更新缓存
  //getProvince: satis + "/db/inteAreaPreStatistics/selectAreaCode", //查询省份
  //getAreaStaInfoRelByParent:
  //  satis + "/db/inteAreaPreStatistics/selectAreaStaInfoRelByParent", //查询区域及流域
  /*  智能统计-小时统计-站点统计-接口  */
  getHourStationData: satis + "/db/Statistics4Hour/selectStatisticsHour4Sta", //小时站点统计
  getSingleStationData: satis + "/db/Statistics4Hour/selectSingleStation4Hour", //查询单一站点的统计信息
  /*  智能统计-小时统计-区域统计-接口  */
  mergeAreaCityHour: satis + "/db/inteAreaPreStatistics/mergeAreaCityHour", //区域城市小时组合接口
  mergeAreaProvinceHour: satis + "/db/inteAreaPreStatistics/mergeAreaProvinceHour", //区域省份小时组合接口
  mergeAreaBasinHour: satis + "/db/inteAreaPreStatistics/mergeAreaBasinHour", //流域小时组合接口
  mergeAreaRegionHour: satis + "/db/inteAreaPreStatistics/mergeAreaRegionHour", //地区小时组合接口
  selectSubBasinInfoHourPage: satis + "/db/inteAreaPreStatistics/selectSubBasinInfoHourPage", //（区域小时子表）查询流域下站点信息
  selectSubCityInfoHourPage: satis + "/db/inteAreaPreStatistics/selectSubCityInfoHourPage", //（区域小时子表）查询城市下站点信息
  selectSubProvinceInfoHourPage: satis + "/db/inteAreaPreStatistics/selectSubProvinceInfoHourPage", //（区域小时子表）查询省份下站点信息
  selectSubRegInfoHourPage: satis + "/db/inteAreaPreStatistics/selectSubRegInfoHourPage", //（区域小时子表）查询地区下站点信息
  mergeRegionAreaHour: satis + "/db/inteAreaStatisticsControllerNew/mergeRegionAreaHour", //智能统计，查询区域小时数据接口
  selectInteAreaInfoDay: satis + "/db/inteAreaStatisticsControllerNew/selectInteAreaInfoDay", //智能统计，查询区域日值数据接口
  getInstMonthAreaData: satis + "/db/inst/area/getInstMonthAreaData", //智能统计，查询区域月数据接口
  getInstTenAreaData: satis + "/db/inst/area/getInstTenAreaData", //智能统计，查询区域旬数据接口
  getInstYearAreaData: satis + "/db/inst/area/getInstYearAreaData", //智能统计，查询区域年数据接口
  /*  智能统计-日统计-站点统计-接口  */
  selectStatisticsDay4Sta: satis + "/db/Statistics4Day/selectStatisticsDay4Sta", //查询日站点统计
  selectSingleStation4Day: satis + "/db/Statistics4Day/selectSingleStation4Day", //查询单站逐日
  /*  智能统计-日统计-区域统计-接口  */
  mergeAreaBasinDay: satis + "/db/inteAreaPreStatistics/mergeAreaBasinDay", //（日值数据）流域日值组合接口
  mergeAreaCityDay: satis + "/db/inteAreaPreStatistics/mergeAreaCityDay", //(日值）区域城市日值组合接口
  mergeAreaProvinceDay: satis + "/db/inteAreaPreStatistics/mergeAreaProvinceDay", //(日值)区域省份日值组合接口
  mergeAreaRegionDay: satis + "/db/inteAreaPreStatistics/mergeAreaRegionDay", //(日值数据)地区日值组合接口
  selectSubBasinInfoDayPage: satis + "/db/inteAreaPreStatistics/selectSubBasinInfoDayPage", //（（日值子表）查询流域下站点信息
  selectSubCityInfoDayPage: satis + "/db/inteAreaPreStatistics/selectSubCityInfoDayPage", //（日值子表）查询城市下站点信息
  selectSubProvinceInfoDayPage: satis + "/db/inteAreaPreStatistics/selectSubProvinceInfoDayPage", //(日值子表）查询省份下站点信息
  selectSubRegInfoDayPage: satis + "/db/inteAreaPreStatistics/selectSubRegInfoDayPage", //（日值子表）查询地区下站点信息
  exportlnstSequenceData: satis + "/db/inst/export/exportInstSequenceData", // 时序图导出
  getIntellectStatisticsCityCode: satis + "/db/inteAreaPreStatistics/getCityCode", // 查询当前省份权限

  /* 灾害评估界面逻辑接口 */
  disaConfig: api + "/dm/disa/disaConfig", //1.	查询产品树
  getRecord: api + "/dm/disaRecord/getRecord", //2.	查询灾害数据记录
  loadPng: api + "/dm/disaRecord/loadPng", //3.	加载图片资源
  getdisaquerySnowData: satis + "/db/disaPros/querySnowData",
  getdisaProsArea: api + "/dm/disa/disaProsArea",
  getdisaProsSnowPngGroup: api + "/dm/disa/disaProsSnowPngGroup",
  getdisaProsSnowPng: api + "/dm/disa/disaProsSnowPng",

  querydisaSnowDataType: satis + "/db/disaPros/querySnowDataType", // 类型选择
  exportdisaSnowData: satis + "/db/disaPros/exportSnowData", // 导出暴雪过程要素数据

  /* 材料制作 */
  // 常规决策服务
  findActDocumentEle: satis + "/db/make/convention/findActDocumentEle", //天气预报信息编辑查询接口
  findActKeepSugList: api + "/dm/actKeepSug/findActKeepSugList", //关注与建议下拉框列表查询
  findActKeepSug: api + "/dm/actKeepSug/findActKeepSug", //关注与建议模板查询
  weatherForecastEdit: satis + "/db/make/convention/weatherForecastEdit", //天气预报信息编辑文字提取接口
  materialFindProsFactorImg: satis + "/db/make/convention/findProsFactorImg", //实况信息文本生成--过程分析编辑文字提取接口
  findActTimeList: satis + "/db/make/convention/findActTimeList", //天气实况信息编辑 时间下拉框
  findActEleList: satis + "/db/make/convention/findActEleList", //天气实况信息编辑 要素
  actuallyHappening: satis + "/db/make/convention/actuallyHappening", //天气实况信息编辑 检索
  generateDocument: satis + "/db/make/convention/generateDocument", //富文本生成
  getWordHeader: api + "/dm/actKeepSug/getWordHeader", //富文本标题
  preWarningMsg: satis + "/db/make/convention/preWarningMsg", //材料加载按钮字典查询接口
  getDocTemplateEle: satis + "/db/make/convention/getDocTemplateEle", //材料模板选择
  findDocTemplatebyID: satis + "/db/make/convention/findDocTemplate", //材料模板选择--点击某个模板
  getDocLoadingHeader: api + "/dm/actKeepSug/getWordHeader?tempType=", //材料加载头部
  docLoading: satis + "/db/make/convention/docLoading?docType=", //材料加载内容

  preSpecialTime: satis + "/db/make/special/preSpecialTime", //要素查询
  querySpecialActEle: satis + "/db/make/special/querySpecialActEle", //实况要素查询
  queryCityAreaByCode: satis + "/db/make/special/queryCityAreaByCode", //专项保障-保障区域选择
  queryAccordLonLat: satis + "/db/make/special/queryAccordLonLat", //专项保障-经纬度
  queryActSpecialActEle: satis + "/db/make/special/queryActSpecialActEle", //专项保障-实况信息文本生成
  preSpecialTotqlQuery: satis + "/db/make/special/preSpecialTotqlQuery", //专项保障-预报信息文本生成

  getEmergencyAceEle: satis + "/db/make/craw/getEmergencyAceEle", //突发事件
  getEmergencyTimeFrame: satis + "/db/make/craw/getEmergencyTimeFrame", //突发事件
  findEmergencyPreEle: satis + "/db/make/craw/findEmergencyPreEle", //突发事件
  findEmergencyActEle: satis + "/db/make/craw/findEmergencyActEle", //突发事件
  emergencyPreEleTotal: satis + "/db/make/craw/emergencyPreEleTotal", //突发事件
  getQueryBurstEle: satis + "/db/make/craw/queryBurstEle", //突发事件
  getQueryEmergencyTemplate: satis + "/db/make/craw/queryEmergencyTemplate", //突发事件

  findProsFactor: satis + "/db/make/convention/findProsFactor", //过程分析
  getCityCodeAndName: satis + "/db/make/special/getCityCodeAndName",
  getquakeFindCityCode: satis + "/db/make/quake/findCityCode", // 行政区划信息查询更新缓存,
  getquakeFindSuggetList: satis + "/db/make/quake/findSuggetList", // 地震关注与建议查询
  getquakeQuakeWord: satis + "/db/make/quake/getQuakeWord", // 生成地震文档
  getquakeCheckQuakeWord: satis + "/db/make/quake/checkQuakeWord", // 生成地震文档
  getquakeEveryList: satis + "/db/make/quake/getEveryList", // 获取每日文档列表
  getquakeEveryWord: satis + "/db/make/quake/getEveryWord", // 生成每日雨情文档
  getquakeEveryListNX: satis + "/db/make/ngx/getMarkList", // 获取每日文档列表
  getquakeEveryWordNX: satis + "/db/make/ngx/getWord", // 生成每日雨情文档

  /* 交互编辑界面逻辑接口 */
  getInteractiveAreaInfo: api + "/dm/edit/sudden/getAreaInfo", //查询地区流域省份分类及比例
  getInteractivefindByParent: satisInteract + "/db/edit/findByParent", //查询父级下的子要素
  getInteractivegetTwoLevelCata: satisInteract + "/db/edit/getTwoLevelCata", //查询二级目录要素
  getInteractivegetMap: satisInteract + "/db/edit/getMap", //获取地图服务
  getInteractivegetLineServerData: satisInteract + "/db/edit/getLineServerData", //查询等值线图层信息
  getInteractivegetPointData: satisInteract + "/db/edit/getPointData", //查询点图层信息
  getInteractivegetLineData: satisInteract + "/db/edit/getLineData", //查询线图层标注信息
  getInteractivegetPolygonMap: satisInteract + "/db/edit/getPolygonMap", //获取等值面图服务
  getInteractivegetLegendTemplate: satisInteract + "/db/edit/getLegendTemplate", //查询图例模板
  getInteractivegetLegendTempMap: satisInteract + "/db/edit/getLegendTempMap", //查询图例模板 分类
  editorInteractivemodifyGeoMapServer: satisInteract + "/db/edit/modifyGeoMapServer", //修改图例重新发布图层
  getProductionTimes: satisInteract + "/db/edit/getDateList", //获取产品数据时次
  downloadInteractivePic: satisInteract + "/db/downloadPic/downloadPic", // 下载高清图
  downloadInteractivePicTable: satisInteract + "/db/downloadPic/downloadPicWithTable", // 下载高清图-表格
  getInteractiveptxdStaData: satisInteract + "/db/edit/ptxdStaData", // 统计表格
  postInteractUpload: satisInteract + "/db/editData/upload", // 本地导入产品接口
  postInteractUploadtxtPrefix: satisInteract + "/db/editData/uploadtxtPrefix", // 本地导入TXT产品前缀处理接口
  postInteractUploadtxt: satisInteract + "/db/editData/uploadtxt", // 本地导入TXT产品
  postInteractUploadGrib: satisInteract + "/db/editData/uploadGrib", // 本地导入Grib2产品接口
  getInteractTyphTwoLevelCata: satisInteract + "/db/edit/getTyphTwoLevelCata",
  getInteractAnalysisData: satisInteract + "/db/downloadPic/getIndexAnalysisData",
  getInteractIntersectData: satisInteract + "/db/downloadPic/getIntersectData", // 获取和天气现象数据相交部分的底图数据
  getInteractTifInversion: satisInteract + "/db/downloadPic/tifInversion", // tif数据反演
  modifyInteractGeoMapServer: satisInteract + "/db/downloadPic/modifyGeoMapServer", // 修改图例重新发布图层
  getInteractTyphPointData: satisInteract + "/db/edit/getTyphPointData", //
  getRangeByMulProvence: satisInteract + "/db/edit/getRangeByMulProvence", //
  addInteractLegend: satisInteract + "/db/edit/addLegend", //
  getTileDataByRangeZoom: satisInteract + "/db/edit/getTileDataByRangeZoom", //
  getDisaUploadSta: satisInteract + "/db/editData/disaUploadSta", //
  getDisaUploadMore: satisInteract + "/db/editData/disaUploadMore", //
  exportIndexAnalysisData: satisInteract + "/db/downloadPic/exportIndexAnalysisData",

  /* 服务参考 */
  getSevrPageDirs: api + "/dm/sevrPage/getDirs", // 查询服务参考页面目录
  getSevrPageTwoType: api + "/dm/sevrPage/getTwoType", // 查询服务参考页面子目录
  getSevrPageMenu: api + "/dm/make/getMenu", // 查询材料制作菜单
  getSevrPageMapTypeQueryList: satis + "/db/sevrQuery/markMapType", // 查询单目录下文档集合数据
  getSevrPageMapTypeOneQueryList: satis + "/db/sevrQuery/queryMarkOne", // 查询单目录下文档集合数据
  getSevrPageMoreQueryList: satis + "/db/sevrQuery/moreQueryListNew", // 多条件查询单项文档集合数据
  getSevrPageMoreQueryQuakeList: satis + "/db/sevrQuery/moreQueryQuakeList", // 多条件查询单项文档集合数据
  getSevrPageDownWord: satis + "/db/sevrQuery/downWord", // word下载(单)
  getSevrPageDownWordList: satis + "/db/sevrQuery/downWordList", // word下载(单)
  getSevrPageTextList: satis + "/db/sevrQuery/textList", // word下载(单)
  getSevrPageYearList: satis + "/db/sevrQuery/queryYearList", // 天气过程统计表格类型的年份
  getSevrPageDataOne: satis + "/db/sevrQuery/queryDataOne", // 根据id查询具体单条数据
  getSevrPageUpdateMap: satis + "/db/sevrQuery/updateMap", // 更新数据
};
export { interfaceObj };
