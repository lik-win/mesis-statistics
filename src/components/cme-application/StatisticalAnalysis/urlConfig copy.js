// 生产
window.interfaceObj = {
  serverType: "waisheng", // 前端环境别名
};

const interfaceObj = {
  /* geoserver接口 */
  geoserverwmts: "/geoserver_bm/gwc/service/wmts",
  geoserverbasewms: "/geoserver_bm/base/wms",
  geoserverbasewms960: "/geoserver_bm/rp0/wms",
  geoserverbasewms1200: "/geoserver_bm/rp1/wms",
  geoserverbasewms1440: "/geoserver_bm/rp2/wms",
  geoserverwms: "/geoserver_bm/wms",
  geogwcserverwms: "/geoserver_bm/gwc/service/wms",
  geoserverbaseStyle: "/geoserver_bm/rest/workspaces/base/styles/",
  geoservercolorwmts: "/geoserver_db/gwc/service/wmts",
  geoservercolorprewms: "/geoserver_db/prd/wms",
  geoservercolorprewmsInteract: "/geoserver_ed/prd/wms",
  geoservercolorpreStyleInteract: "/geoserver_ed/rest/styles",
  /* 其他接口 */
  login: "/mss_dm/login",
  logout: "/mss_dm/logout",
  checkToken: "/mss_dm/checkToken/",
  verificationIp: "/mss_dm/verificationIp",
  getRoutersMenu: "/mss_dm/getRouters",
  getComCode: "/mss_dm/dm/com/getComCode",
  genSign: "/mss_dm/dm/taskconfigmanager",
  getTackClaByLevel: "/mss_dm/dm/taskclamanager/getTackClaByLevel",
  taskconfigmanagerList: "/mss_dm/dm/taskconfigmanager/list",
  taskconfigmanager: "/mss_dm/dm/taskconfigmanager",
  taskclamanagerList: "/mss_dm/dm/taskclamanager/list",
  classTaskManage: "/mss_dm/dm/taskclamanager",
  getAreaDetail: "/mss_dm/dm/indexpage/getRange",
  /* 首页界面逻辑接口 */
  getMainWarnPageInfo1: "/mss_dm/dm/indexpage/selectWarnPageInfo", //红色预警统计信息
  getCountryWarnPageInfo: "/mss_dm/dm/indexpage/getCountryWarnPageInfo", //国家预警统计信息
  getMainWeaInfoList: "/mss_dm/dm/indexpage/getWeaInfoList", //查询重要天气信息
  getMainWeaDesc: "/mss_dm/dm/indexpage/getWeaDesc", //查询重要天气的描述信息
  getMaingetWeaImage: "/mss_dm/dm/indexpage/getWeaImage", //查询重要天气的色斑图
  getMaingetWeaLayerServer: "/mss_dm/dm/indexpage/getWeaLayerServer", //查询重要天气的落区图层
  getLegendInfo: "/mss_dm/dm/indexpage/getLegendInfo", //查询落区图例

  getPubSentDesc: "/mss_dm/dm/indexpage/getPubSentDesc", //查询舆情信息的描述信息
  getPubSentImage: "/mss_dm/dm/indexpage/getPubSentImage", //查询舆情信息的专题图
  getMainViewTime: "/mss_dm/dm/indexpage/getTime", // 查询最新落区更新时间
  getElementSwitch: "/mss_dm/dm/indexpage/elementSwitch", // 每日雨情控制
  getSurfInfoDataYJMainData: "/mss_db/db/metewarn/getHomeInfo", //查询气象预警GIS数据
  getMainWarnPageInfo: "/mss_dm/dm/indexpage/getWarnPageInfo", //查询气象预警统计数据
  getMainProvinceWarn: "/mss_dm/dm/indexpage/getProvinceWarn", // 全国省市县预警

  /* 首页界面统计接口 */
  getGaoliangLayer: "/mss_db/db/sigmet/zoneOrder/", //查询高亮图层
  getMainWeatherWord: "/mss_db/db/homeStatis/getWeatherWord", //查询当日天气公报
  getMainWeatherWordnew: "/mss_db/db/homeStatis/getWeatherWordTitle", //查询当日天气公报(拆分)
  getMainqueryOneLine: "/mss_db/db/homeStatis/queryOneLine", //查询首页优先级最高折线图统计
  getMainqueryLine: "/mss_db/db/homeStatis/queryLine", //首页折线图统计
  getMainsearchSingleSite: "/mss_db/db/homeStatis/searchSingleSite", //查询单站点多要素
  getMainqueryTwoStatis: "/mss_db/db/homeStatis/queryTwoStatis", //首页二级页统计数据
  getMainBigRainNumData: "/mss_db/db/indexPre/searchBaoRain", //查询暴雨站点数量
  getMainBigSnowNumData: "/mss_db/db/indexPre/searchBaoSnowNum", //查询暴雪点数
  getMainBigChangeTemNumData: "/mss_db/db/indexPre/searchChangeTemNum", //查询降温幅度超4℃站点数
  getMainPreStaData: "/mss_db/db/indexPre/searchPreSta", //查询首页雨雪统计
  getMainSingleSiteData: "/mss_db/db/indexPre/searchSingleSite", //查询积雪深度最大站点的单站多要素
  searchSingleSitePubSent: "/mss_db/db/homeStatis/searchSingleSitePubSent", //查询单站点多要素（舆情）
  searchForeStatisDayPubSent: "/mss_db/db/homeStatis/searchForeStatisDayPubSent", //查询日值预报统计（舆情）
  searchForeStatisHourPubSent: "/mss_db/db/homeStatis/searchForeStatisHourPubSent", //查询小时值预报统计（舆情）
  searchForeStatisHourPubSent: "/mss_db/db/homeStatis/searchForeStatisHourPubSent", //查询小时值预报统计（舆情）
  getmainStationList: "/mss_db/db/OG/getStationList", // 查询冬奥监测站站点
  getmainOGDataAll: "/mss_db/db/OG/getOGDataAll", // 单站点总数据查询 实况 预报 统计
  getMainquakeDownWord: "/mss_db/db/homeStatis/downWord", // word下载(单)
  downMainEveryRainWord: "/mss_db/db/homeStatis/downEveryRainWord", // word下载(单-每日雨情)
  queryMainEveryRainWord: "/mss_db/db/homeStatis/queryEveryRainWord", // 每日雨情Word预览

  /* 重要产品界面逻辑接口 */
  getHpageThematicNewMenu: "/mss_dm/hpageThematic/getNewMenu",
  getHPageArea: "/mss_dm/hpageThematic/selectHPageArea",
  getHPageFactorData: "/mss_dm/hpageThematic/selectFactorBitImgData",
  getHPageCFactorData: "/mss_dm/hpageThematic/selectCFactorData",
  selectTimeaxisSpecData: "/mss_dm/hpageThematic/selectTimeaxisSpecData", // 根据子要素，查询时间轴
  getHPageTimeaxisData: "/mss_dm/hpageThematic/selectTimeaxisData",
  getselectThematicData: "/mss_dm/hpageThematic/selectThematicData",
  downloadImage: "/mss_dm/hpageThematic/downThematic",
  downThematicGif: "/mss_dm/hpageThematic/downThematicGif", //下载GIF
  variThematics: "/mss_dm/hpageThematic/variThematics", //预览GIF
  selectAreaProporions: "/mss_dm/hpageThematic/selectAreaProporions",
  getSingleFactorBitImg: "/mss_dm/hpageThematic/selectSingleFactorBitImg",
  selectJobUpdateTime: "/mss_db/db/preStatistics/selectJobUpdateTime", //查询重要产品任务数据更新时间
  getselectThematicDatas: "/mss_dm/hpageThematic/selectThematicDatas",
  getHpageStartAndEnd: "/mss_dm/hpageThematic/getStartAndEnd",
  /* 重要产品预警接口 */
  selectWarnPageInfo: "/mss_dm/warningInfoController/selectWarnPageInfo",
  selectWarnPageInfoMore: "/mss_dm/warningInfoController/selectWarnPageInfoMore",
  getCounterWarn: "/mss_dm/warningInfoController/getCounterWarn", //重要产品--国家预警统计信息
  /* 重要产品降水统计接口 */
  getPreData1: "/mss_db/db/preStatistics/redisProvStaPre136h",
  getPreData2: "/mss_db/db/preStatistics/redisProvPre136h",
  getPreData3: "/mss_db/db/preStatistics/redisProvStaPre136h",
  getPreAvgData1: "/mss_db/db/preStatistics/selectRainNumAndAvg",
  getPreExtsData: "/mss_db/db/factorExt/redisPreExts",
  getPreExtStaData: "/mss_db/db/factorExt/redisPreExtStaInfo",
  /* 重要产品气温统计接口 */
  getTempMaxData: "/mss_db/db/tempStatistics/testRedisTempMax",
  getTempMinData: "/mss_db/db/tempStatistics/redisTempMin",
  selectMaxAndMinTempOfSta: "/mss_db/db/tempStatistics/selectMaxAndMinTempOfSta", //统计站点最高最低气温
  //getTempExtsData: "/mss_db/db/factorExt/redisTempExts",
  getTempExtsData: "/mss_db/db/tempStatistics/selectTemExtNumOfProvince", //统计站点省份高温低温突破极值站点数
  getTempExtStaData: "/mss_db/db/factorExt/redisTempExtStaInfo",
  /* 重要产品大风统计接口 */
  getWindAvgData: "/mss_db/db/windStatistics/redisWindAvg",
  getWindMaxData: "/mss_db/db/windStatistics/redisWindMax",
  selectExtAndAvgWindOfSta: "/mss_db/db/windStatistics/selectExtAndAvgWindOfSta", //统计站点极大风平均风
  selectWindExtNumOfProvince: "/mss_db/db/windStatistics/selectWindExtNumOfProvince", //统计站点省份极大风平均风突破极值站点数
  getWindExtsData: "/mss_db/db/factorExt/redisWindExts",
  getWindExtStaData: "/mss_db/db/factorExt/redisWindExtStaInfo",
  /* 重要产品天气现象统计接口 */
  getWeatherStaData: "/mss_db/db/weaStatistics/redisWeaNum",
  getWeatherStaInfoData: "/mss_db/db/weaStatistics/redisWeaInfo",
  /* 重要产品能见度统计接口 */
  getVisStaData: "/mss_db/db/visiStatistics/redisVisNum",
  getVisStaInfoData: "/mss_db/db/visiStatistics/redisStaVisInfo",
  /* 实况监测界面站点类接口 */
  getExtStationData: "/mss_db//db/livesta/api", //获取后来补充得极值点地图信息接口
  get0808hExstaLivePre: "/mss_db/db/livepre/0808hexsta", //日值(08-08)出现突破极值站点
  spresxd8hexstaLivePre: "/mss_db/db/livepre/spresxd8hexsta", //前期08时以来降水突破极值站点
  preptxdexstaLivePre: "/mss_db/db/livepre/preptxdexsta", //过去10/20/30天降水突破极值站点
  pretenexstaLivePre: "/mss_db/db/livepre/pretenexsta", //旬值降水突破极值站点
  premonexstaLivePre: "/mss_db/db/livepre/premonexsta", //月值降水突破极值站点
  thrmonexstaLivePre: "/mss_db/db/livepre/thrmonexsta", //3至当前月降水突破极值站点
  temmax0808hexstaLive: "/mss_db/db/livetem/temmax0808hexsta", //日值(08-08)最高气温出现突破极值站点
  temmin0808hexstaLive: "/mss_db/db/livetem/temmin0808hexsta", //日值(08-08)最低气温出现突破极值站点
  temmaxsxd8hexstaLive: "/mss_db/db/livetem/temmaxsxd8hexsta", //前期08时以来高温出现突破极值站点
  temminsxd8hexstaLive: "/mss_db/db/livetem/temminsxd8hexsta", //前期08时以来低温出现突破极值站点
  temmaxptxdexstaLive: "/mss_db/db/livetem/temmaxptxdexsta", //过去10/20/30天高温出现突破极值站点
  temminptxdexstaLive: "/mss_db/db/livetem/temminptxdexsta", //过去10/20/30天低温出现突破极值站点
  temmaxtenexstaLive: "/mss_db/db/livetem/temmaxtenexsta", //旬值最高气温出现突破极值站点
  temmintenexstaLive: "/mss_db/db/livetem/temmintenexsta", //旬值最低气温出现突破极值站点
  temmaxmonexstaLive: "/mss_db/db/livetem/temmaxmonexsta", //月值最高气温出现突破极值站点
  temminmonexstaLive: "/mss_db/db/livetem/temminmonexsta", //月值最低气温出现突破极值站点
  thrmonmaxexstaLive: "/mss_db/db/livetem/thrmonmaxexsta", //3至当前月以来最高气温出现突破极值站点
  thrmonminexstaLive: "/mss_db/db/livetem/thrmonminexsta", //3至当前月以来最低气温出现突破极值站点
  sxd8hwindextexstaLive: "/mss_db/db/livewind/sxd8hwindextexsta", //前期08时以来极大风出现突破极值站点
  sxd8hwindavgexstaLive: "/mss_db/db/livewind/sxd8hwindavgexsta", //前期08时以来平均风出现突破极值站点
  ptxdwindextexstaLive: "/mss_db/db/livewind/ptxdwindextexsta", //过去x天极大风出现突破极值站点
  ptxdwindavgexstaLive: "/mss_db/db/livewind/ptxdwindavgexsta", //过去x天平均风出现突破极值站点
  tenwindextexstaLive: "/mss_db/db/livewind/tenwindextexsta", //旬值极大风出现突破极值站点
  tenwindavgexstaLive: "/mss_db/db/livewind/tenwindavgexsta", //旬值平均风出现突破极值站点
  monwindextexstaLive: "/mss_db/db/livewind/monwindextexsta", //月值极大风出现突破极值站点
  monwindavgexstaLive: "/mss_db/db/livewind/monwindavgexsta", //月值平均风出现突破极值站点
  thrmonwindextexstaLive: "/mss_db/db/livewind/thrmonwindextexsta", //3至当前月极大风出现突破极值站点
  thrmonwindavgexstaLive: "/mss_db/db/livewind/thrmonwindavgexsta", //3至当前月平均风出现突破极值站点
  hourweatherLive: "/mss_db/db/liveweather/hourweather", //小时天气现象
  getWeatherStaByDayLive: "/mss_db/db/liveweather/getWeatherStaByDay", //日值天气现象
  d8hweatherLive: "/mss_db/db/liveweather/d8hweather", //前期08时以来天气现象
  //getWeatherStaByDayLive:"/mss_db/db/liveweather/getWeatherStaByDay", //过去x天天气现象
  tenfsnowstaDayLive: "/mss_db/db/liveweather/tenfsnowsta", //旬值天气现象
  monfsnowstaLive: "/mss_db/db/liveweather/monfsnowsta", //月值天气现象
  thrmonfsnowstaLive: "/mss_db/db/liveweather/thrmonfsnowsta", //3至当前月天气现象
  ptxdtmaxdaLive: "/mss_db/db/livetem/ptxdtmaxda", //过去10/20/30天出现最高气温日期
  ptxdtmindaLive: "/mss_db/db/livetem/ptxdtminda", //过去10/20/30天出现最低气温日期
  tenmaxdaLive: "/mss_db/db/livetem/tenmaxda", //旬值出现最高气温日期
  tenmindaLive: "/mss_db/db/livetem/tenminda", //旬值出现最低气温日期
  monmaxdaLive: "/mss_db/db/livetem/monmaxda", //月值出现最高气温日期
  monmindaLive: "/mss_db/db/livetem/monminda", //月值出现最低气温日期
  thrmonmaxdaLive: "/mss_db/db/livetem/thrmonmaxda", //3至当前月出现最高气温日期
  thrmonmindaLive: "/mss_db/db/livetem/thrmonminda", //3至当前月出现最低气温日期
  /* 实况监测界面逻辑接口 */
  getLPageProvinces: "/mss_dm/dm/surfPageController/getProvinces", //实况省份新版查询接口
  getLPageFactorDatas: "/mss_dm/dm/surfPageController/findByParent", //查询父级下的子要素
  getLPageAttrDatas: "/mss_dm/dm/surfPageController/findAttrByParent", //查询父要素id的子要素
  getLiveMap: "/mss_dm/dm/geopre/getMap",
  variMapServer: "/mss_dm/dm/geopre/variMapServer",
  downLoadLiveThematic: "/mss_dm/dm/geopre/downLoadThematic",
  getStationLiveId: "/mss_db/db/livepre/getStationInfo", //查询站点信息
  getLivePointData: "/mss_db/db/livepre/getPointData", //查询点图层信息
  getLMaxMinPointData: "/mss_db/db/livepre/getMaxMinPointData", //阈值查询点图层信息
  selectPreThresholdHour: "/mss_db/db/surfPreStatistics/selectPreThresholdHour",
  selectPreThresholdDay: "/mss_db/db/surfPreStatistics/selectPreThresholdDay",
  selectExtByStationIdDay: "/mss_db/db/surfPreStatistics/selectExtByStationIdDay", //（日值）查询时段内站点降水量、最高/低气温，极大风、各类历史、月极值
  selectInfoByStationIdDay: "/mss_db/db/surfPreStatistics/selectInfoByStationIdDay", //（日值）查询时段内站点降水量、气温、湿度、能见度、极大风速、极大风速风向
  selectInfoByStationIdHour: "/mss_db/db/surfPreStatistics/selectInfoByStationIdHour", //（小时）查询时段内站点降水量、气温、湿度、能见度、极大风速、极大风速风向
  selectExtByStationIdHour: "/mss_db/db/surfPreStatistics/selectExtByStationIdHour", //（小时）查询时段内站点降水量、最高/低气温，极大风、各类历史、月极值
  /* 实况监测界面气温统计接口 */
  searchSurTemTenValueForPro: "/mss_db/db/surfTempStatistics/searchSurTemTenValueForPro", //分省查询实况气温逐旬(单个旬)数据
  searchSurfTemForProHourData: "/mss_db/db/surfTempStatistics/searchSurfTemForProHourData", //分省查询实况气温单个子要素（至过去10/20/30天）数据
  searchSurfTemMonValueForPro: "/mss_db/db/surfTempStatistics/searchSurfTemMonValueForPro", //分省查询实况气温某月以来数据
  searchSurfTemOneMonValueForPro: "/mss_db/db/surfTempStatistics/searchSurfTemOneMonValueForPro", //分省查询实况气温逐月(单个月)数据
  searchSurfTemTenValue: "/mss_db/db/surfTempStatistics/searchSurfTemTenValue", //查询实况气温逐旬(单个旬)数据
  searchSurfTemOneMonValue: "/mss_db/db/surfTempStatistics/searchSurfTemOneMonValue", //查询实况气温逐月(单个月)数据
  searchSurfTemMonValue: "/mss_db/db/surfTempStatistics/searchSurfTemMonValue", //查询实况气温某月以来数据
  searchSurfTemHourData: "/mss_db/db/surfTempStatistics/searchSurfTemHourData", //查询实况气温单个子要素（至过去10/20/30天）数据
  liveDownloadPic: "/mss_db/db/data/downloadPic", //查询实况气温单个子要素（至过去10/20/30天）数据

  /* 实况监测界面降水统计接口 */
  getSearchStaDatas: "/mss_db/searchStaDatas", //天气现象--查询出现降雪、大雾的站点信息等
  searchStaVisSnowInfo: "/mss_db/searchStaVisSnowInfo", //天气现象--查询站点最大积雪深度或最小能见度
  searchSticWeaProvinceSxd: "/mss_db/searchSticWeaProvinceSxd", //天气现象--查询省份数据

  selectWeaDayTenMonStaInfo: "/mss_db/selectWeaDayTenMonStaInfo", //天气现象--站点统计10/20/30天，旬，月天气现象接口
  searchSticFirstSnowNumProvinceLongDate: "/mss_db/searchSticFirstSnowNumProvinceLongDate", //天气现象--分省统计10/20/30天，旬，月天气现象接口
  searchSurfRhuData: "/mss_db/db/surfRhuStatistics/searchSurfRhuData", //查询实况相对湿度单个子要素数据
  searchSurfRhuForProData: "/mss_db/db/surfRhuStatistics/searchSurfRhuForProData", //查询实况相对湿度单个子要素数据

  searchSurfPreHourData: "/mss_db/db/surfPreStatistics/searchSurfPreHourData",
  searchSurfPreTenValue: "/mss_db/db/surfPreStatistics/searchSurfPreTenValue",
  searchSurfPreOneMonValue: "/mss_db/db/surfPreStatistics/searchSurfPreOneMonValue",
  searchSurfPreMonValue: "/mss_db/db/surfPreStatistics/searchSurfPreMonValue",
  searchSurfForProvincial: "/mss_db/db/surfPreStatistics/searchSurfForProvincial",
  searchSurfPreMonValueForPro: "/mss_db/db/surfPreStatistics/searchSurfPreMonValueForPro",
  searchSurfPreOneMonValueForPro: "/mss_db/db/surfPreStatistics/searchSurfPreOneMonValueForPro",
  searchSurfPreTenValueForPro: "/mss_db/db/surfPreStatistics/searchSurfPreTenValueForPro",
  selectThresholdPreByACodeHour: "/mss_db/db/surfPreStatistics/selectThresholdPreByACodeHour",
  selectAreaCode: "/mss_db/db/inteAreaPreStatistics/selectAreaCode",
  /* 实况监测界面大风统计接口 */
  searchSurfWindHourData: "/mss_db/db/surfWindStatistics/searchSurfWindForProHourData", //分省查询实况大风单个子要素数据
  searchSurfWindTenValue: "/mss_db/db/surfWindStatistics/searchSurfWindTenValue", //查询实况大风逐旬(单个旬)数据
  searchSurfWindOneMonValue: "/mss_db/db/surfWindStatistics/searchSurfWindOneMonValue", //查询实况大风逐月(单个月)数据
  searchSurfWindMonValue: "/mss_db/db/surfWindStatistics/searchSurfWindMonValue", //查询实况大风某月以来数据
  searchSurfWindDayData: "/mss_db/db/surfWindStatistics/searchSurfWindDayData", //查询实况大风单个子要素（至过去10/20/30天）数据
  searchSurfWindTenData: "/mss_db/db/surfWindStatistics/searchSurfWindForProTenData", //分省查询实况大风(单个旬)子要素数据
  searchSurfWindOneMonData: "/mss_db/db/surfWindStatistics/searchSurfWindForProOneMonData", //分省查询实况大风(单个月)子要素数据
  /* 预报分析界面接口 */
  /* 预报分析-城市预报-接口 */
  exportWeaInfoForecastData: "/mss_db/db/citynafp/exportWeaInfo", //导出天气现象信息
  getWeaInfoForecastData: "/mss_db/db/citynafp/getWeaInfo", //查询城市天气现象信息
  getWarnInfoDataForecastData: "/mss_db/db/citynafp/getWarnInfoData", //查询城市预警信息
  getSurfInfoDataForecastData: "/mss_db/db/citynafp/getSurfInfoData", //查询城市当前实况信息
  getWeaInCityNumForecastData: "/mss_db/db/citynafp/getWeaInCityNum", //统计重大天气现象出现的城市
  /* 预报分析-气象预警-接口 */
  getSurfInfoDataYJForecastData: "/mss_db/db/metewarn/getSurfInfoData", //查询气象预警GIS数据
  getAreaCityInfoForecastData: "/mss_db/db/metewarn/getAreaCityInfo", //查询省市县信息
  getWarnInfoByCityForecastData: "/mss_db/db/metewarn/getWarnInfoByCity", //根据城市查询预警信息
  getWarnInfoNumForecastData: "/mss_db/db/metewarn/getWarnInfoNum", //根据城市查询预警信息

  /*预报分析 - 智能格网*/
  // getTwoLevel: "/mss_dm/dm/NafpPageController/getTwoLevel", //获取二级菜单 - 弃
  getTwoLevel: "/mss_dm/dm/NafpPageController/getTwoLevelNew", //获取二级菜单 - 新
  getNafpImageAndMapList: "/mss_dm/dm/NafpJsPage/getNafpImageAndMapList", //获取二级菜单 - 新
  getForecastMap: "/mss_dm/dm/NafpPageController/getMap", //获取地图数据
  variMapServerForecast: "/mss_dm/dm/NafpPageController/variMapServer", //验证是否存在图层
  getSmartgridRecordInfo: "/mss_db/db/smartnafp/getSmartgridRecordInfo", //查询区域影响信息
  getBreachExtremumSite: "/mss_db/db/smartnafp/breachExtremumSite", //查询突破极值隐患站点
  getForecastDescText: "/mss_db/db/smartnafp/getDescText", // 获取产品描述文本
  breachExtremumSiteDetails: "/mss_db/db/smartnafp/breachExtremumSiteDetails", //查询突破极值隐患站点详情
  /*预报分析 - 主观预报*/
  getSubjectiveBitImageList: "/mss_dm/dm/NafpJsPage/getBitImageList", //查询主观预报时次缩略图集合
  getSubjectiveTyphNames: "/mss_dm/dm/NafpJsPage/typhNames", //获取正在发生的台风名称
  // 预报分析 - 数据一体化分析
  // getIntegraDayTable: forecastSever + "/db/integra/table", // 实况预报逐日统计
  // getIntegraDaychartTable: forecastSever + "/db/integra/barchart", // 实况预报逐日统计
  // getIntegraMenuList: forecastSever + "/db/integra/menu", // 实况预报逐日统计

  /* 过程分析界面逻辑接口 */
  selectProsStata: "/mss_dm/dm/pros/selectProsStata", //有效过程管理查询
  selectProsAndGraphsById: "/mss_dm/dm/pros/selectProsAndGraphsById", //根据id查询过程详细信息及过程对应产品
  selectSelectProsById: "/mss_dm/dm/pros/selectProsById", //根据id查询过程详细信息
  selectProsGraphs: "/mss_dm/dm/pros/selectGraphs", //查询过程页面产品
  selectProsAreas: "/mss_dm/dm/pros/selectProsAreas", //查询过程页面过程区域集合
  selectProsTypes: "/mss_dm/dm/pros/selectProsTypes", //查询过程页面过程类型集合
  saveProcess: "/mss_dm/dm/pros/savetPros", //保存新增过程
  getProcessData: "/mss_dm/dm/pros/selectPros", //过程管理查询
  deleteProcessData: "/mss_dm/dm/pros/deletePros", //过程删除
  endProcessData: "/mss_dm/dm/pros/updatePros", //过程暂停
  updateProEnableds: "/mss_dm/dm/pros/updateProEnableds", //过程开始
  getprosGeoMap: "/mss_dm/dm/prosGeo/getMap", //获取地图服务
  getSiteData: "/mss_db/db/prosStatistics/searchPros", //过程站点气象要素统计
  getRegionData: "/mss_db/db/prosStatistics/searchProsCity", //过程区域气象要素统计
  //getProssearchText: "/mss_db/db/prosStatistics/searchTextDesc", //过程区域气象要素统计
  getProssearchText: "/mss_db/db/prosStatistics/searchTextMap", //过程区域气象要素统计
  getProsProvCode: "/mss_db/db/prosStatistics/getProvCode", //根据经纬度查询过程区域省份信息
  getProsAreaCodes: "/mss_db/db/prosStatistics/getAreaCodes", //根据区域编码查询过程区域省份信息
  getMapList: "/mss_dm/dm/prosGeo/getMapList", //获取地图服务(GIF动图)
  ptxdFogsta: "/mss_db/db/prospre/ptxdFogsta", //出现雾站点
  ptxdsandsta: "/mss_db/db/prospre/ptxdsandsta", //出现沙尘站点
  getprosImgMapList: "/mss_dm/dm/prosGeo/getImgMapList", //获取地图服务(GIF动图)(图片版)
  /* 过程分析下载界面接口 */
  getprosgetImgList: "/mss_dm/dm/prosGeo/getImgList", //获取已经生成的图片时间集合
  getprosgetProsImg: "/mss_dm/dm/prosGeo/getProsImg", //查看单张图片
  getprosdownProsImg: "/mss_dm/dm/prosGeo/downProsImg", //图片下载(单张)
  getprosdownProsImgMore: "/mss_dm/dm/prosGeo/downProsImgMore", //多张图片打包下载
  getprosdownProsGif: "/mss_dm/dm/prosGeo/downProsGif", //GIF动图生成下载
  getdownNewestProsImg: "/mss_dm/dm/prosGeo/downNewestProsImg", // 图片下载(单张)
  getdownNewestProsMC3: "/mss_dm/dm/prosGeo/downNewestProsMC3", // 最新3类数据下载(单)
  getdownProsMC3More: "/mss_dm/dm/prosGeo/downProsMC3More", // 3类数据文件打包下载
  downProsWord: "/mss_db/db/word/downProsWord",

  /*  智能统计页面  */
  getInstSequenceElementData: "/mss_db/db/inst/getInstSequenceElementData", //时序图-统计要素查询
  getInstSequenceData: "/mss_db/db/inst/getInstSequenceData", //时序图查询
  getInstMultiStaData: "/mss_db/db/inst/getInstMultiStaData", //连续旬月年站点查询
  getInstYearStaData: "/mss_db/db/inst/getInstYearStaData", //单个年查询
  selectSingleMonDataInfo: "/mss_db/db/inst/tenMon/selectSingleMonDataInfo", //单个月查询
  selectSingleTenDataInfo: "/mss_db/db/inst/tenMon/selectSingleTenDataInfo", //单个旬查询
  exportInstHourStaData: "/mss_db/db/inst/export/exportInstHourStaData", //导出-小时值站点
  exportInstDayStaData: "/mss_db/db/inst/export/exportInstDayStaData", //导出-日值站点
  exportInstCnYearData: "/mss_db/db/inst/export/exportInstCnYearData", //导出-历年同期站点
  exportInstMultiStaData: "/mss_db/db/inst/export/exportInstMultiStaData", //导出-多旬｜多月｜多年站点
  exportInstMonAreaData: "/mss_db/db/inst/export/exportInstMonAreaData", // 导出-月值区域
  exportInstTenAreaData: "/mss_db/db/inst/export/exportInstTenAreaData", // 导出-旬值区域
  exportInstYearAreaData: "/mss_db/db/inst/export/exportInstYearAreaData", // 导出-年值区域
  exportInstSingleStaData: "/mss_db/db/inst/export/exportInstSingleStaData", //导出-多旬｜多月｜多年站点
  exportInstHourAreaData: "/mss_db/db/inst/export/exportInstHourAreaData", //导出-小时-区域
  exportInstDayAreaData: "/mss_db/db/inst/export/exportInstDayAreaData", //导出-日值-区域
  //getDayindexAreaData: '/db/inteAreaStatisticsControllerNew/selectInteSequenceInfoDay', // 日序区域查询
  getDayindexAreaData: "/mss_db/db/inst/getInteSequenceStaInfoDay", // 日序区域查询
  getDayindexAreaDataExport: "/mss_db/db/inst/export/exportInteSequenceInfoDay", // 日序导出
  // getIntelSearchInfo: "/mss_dm/dm/inte/selectStatisticsElementByParentId", //获取查询条件
  getProvince: "/mss_db/db/inteAreaPreStatistics/selectAreaCode", //查询省份
  getAreaStaInfoRelByParent: "/mss_db/db/inteAreaPreStatistics/selectAreaStaInfoRelByParent", //查询区域及流域
  getIntelSearchInfo: "/mss_db/db/inst/getInstElementData", //查询时间尺度与统计要素
  getInstHourStaData: "/mss_db/db/inst/getInstHourStaData", //小时站点查询
  getInstDayStaData: "/mss_db/db/inst/getInstDayStaData", //日值站点查询
  selectCnYearData: "/mss_db/db/inteAreaStatisticsControllerNew/selectCnYearData", //智能统计，历年同期
  getLikeStationInfoById: "/mss_db/db/inst/getLikeStationInfoById", // 根据输入站号 查询站号
  getLikeStationInfoByName: "/mss_db/db/inst/getLikeStationInfoByName", // 根据输入站名 查询站号
  getLikeStationInfo: "/mss_db/db/inst/getLikeStationInfo", // 根据输入站名 查询站号
  getStationInfoByLonLat: "/mss_db/db/inst/getStationInfoByLonLat", // 根据经纬度范围 查询站号
  getStationListByType: "/mss_db/db/inst/getStationListByType", // 根据类型 条件查询站号
  getStationListByXGB: "/mss_db/db/inst/getStationListByXGB", // 根据类型县编码查询站号
  getStationCityCode: "/mss_db/db/inst/getCityCode", // 行政区划信息查询更新缓存
  //getProvince: "/mss_db/db/inteAreaPreStatistics/selectAreaCode", //查询省份
  //getAreaStaInfoRelByParent:
  //  "/mss_db/db/inteAreaPreStatistics/selectAreaStaInfoRelByParent", //查询区域及流域
  /*  智能统计-小时统计-站点统计-接口  */
  getHourStationData: "/mss_db/db/Statistics4Hour/selectStatisticsHour4Sta", //小时站点统计
  getSingleStationData: "/mss_db/db/Statistics4Hour/selectSingleStation4Hour", //查询单一站点的统计信息
  /*  智能统计-小时统计-区域统计-接口  */
  mergeAreaCityHour: "/mss_db/db/inteAreaPreStatistics/mergeAreaCityHour", //区域城市小时组合接口
  mergeAreaProvinceHour: "/mss_db/db/inteAreaPreStatistics/mergeAreaProvinceHour", //区域省份小时组合接口
  mergeAreaBasinHour: "/mss_db/db/inteAreaPreStatistics/mergeAreaBasinHour", //流域小时组合接口
  mergeAreaRegionHour: "/mss_db/db/inteAreaPreStatistics/mergeAreaRegionHour", //地区小时组合接口
  selectSubBasinInfoHourPage: "/mss_db/db/inteAreaPreStatistics/selectSubBasinInfoHourPage", //（区域小时子表）查询流域下站点信息
  selectSubCityInfoHourPage: "/mss_db/db/inteAreaPreStatistics/selectSubCityInfoHourPage", //（区域小时子表）查询城市下站点信息
  selectSubProvinceInfoHourPage: "/mss_db/db/inteAreaPreStatistics/selectSubProvinceInfoHourPage", //（区域小时子表）查询省份下站点信息
  selectSubRegInfoHourPage: "/mss_db/db/inteAreaPreStatistics/selectSubRegInfoHourPage", //（区域小时子表）查询地区下站点信息
  mergeRegionAreaHour: "/mss_db/db/inteAreaStatisticsControllerNew/mergeRegionAreaHour", //智能统计，查询区域小时数据接口
  selectInteAreaInfoDay: "/mss_db/db/inteAreaStatisticsControllerNew/selectInteAreaInfoDay", //智能统计，查询区域日值数据接口
  getInstMonthAreaData: "/mss_db/db/inst/area/getInstMonthAreaData", //智能统计，查询区域月数据接口
  getInstTenAreaData: "/mss_db/db/inst/area/getInstTenAreaData", //智能统计，查询区域旬数据接口
  getInstYearAreaData: "/mss_db/db/inst/area/getInstYearAreaData", //智能统计，查询区域年数据接口
  /*  智能统计-日统计-站点统计-接口  */
  selectStatisticsDay4Sta: "/mss_db/db/Statistics4Day/selectStatisticsDay4Sta", //查询日站点统计
  selectSingleStation4Day: "/mss_db/db/Statistics4Day/selectSingleStation4Day", //查询单站逐日
  /*  智能统计-日统计-区域统计-接口  */
  mergeAreaBasinDay: "/mss_db/db/inteAreaPreStatistics/mergeAreaBasinDay", //（日值数据）流域日值组合接口
  mergeAreaCityDay: "/mss_db/db/inteAreaPreStatistics/mergeAreaCityDay", //(日值）区域城市日值组合接口
  mergeAreaProvinceDay: "/mss_db/db/inteAreaPreStatistics/mergeAreaProvinceDay", //(日值)区域省份日值组合接口
  mergeAreaRegionDay: "/mss_db/db/inteAreaPreStatistics/mergeAreaRegionDay", //(日值数据)地区日值组合接口
  selectSubBasinInfoDayPage: "/mss_db/db/inteAreaPreStatistics/selectSubBasinInfoDayPage", //（（日值子表）查询流域下站点信息
  selectSubCityInfoDayPage: "/mss_db/db/inteAreaPreStatistics/selectSubCityInfoDayPage", //（日值子表）查询城市下站点信息
  selectSubProvinceInfoDayPage: "/mss_db/db/inteAreaPreStatistics/selectSubProvinceInfoDayPage", //(日值子表）查询省份下站点信息
  selectSubRegInfoDayPage: "/mss_db/db/inteAreaPreStatistics/selectSubRegInfoDayPage", //（日值子表）查询地区下站点信息
  exportlnstSequenceData: "/mss_db/db/inst/export/exportInstSequenceData", // 时序图导出
  getIntellectStatisticsCityCode: "/mss_db/db/inteAreaPreStatistics/getCityCode", // 查询当前省份权限

  /* 灾害评估界面逻辑接口 */
  disaConfig: "/mss_dm/dm/disa/disaConfig", //1.	查询产品树
  getRecord: "/mss_dm/dm/disaRecord/getRecord", //2.	查询灾害数据记录
  loadPng: "/mss_dm/dm/disaRecord/loadPng", //3.	加载图片资源
  getdisaquerySnowData: "/mss_db/db/disaPros/querySnowData",
  getdisaProsArea: "/mss_dm/dm/disa/disaProsArea",
  getdisaProsSnowPngGroup: "/mss_dm/dm/disa/disaProsSnowPngGroup",
  getdisaProsSnowPng: "/mss_dm/dm/disa/disaProsSnowPng",

  querydisaSnowDataType: "/mss_db/db/disaPros/querySnowDataType", // 类型选择
  exportdisaSnowData: "/mss_db/db/disaPros/exportSnowData", // 导出暴雪过程要素数据

  /* 材料制作 */
  // 常规决策服务
  findActDocumentEle: "/mss_db/db/make/convention/findActDocumentEle", //天气预报信息编辑查询接口
  findActKeepSugList: "/mss_dm/dm/actKeepSug/findActKeepSugList", //关注与建议下拉框列表查询
  findActKeepSug: "/mss_dm/dm/actKeepSug/findActKeepSug", //关注与建议模板查询
  weatherForecastEdit: "/mss_db/db/make/convention/weatherForecastEdit", //天气预报信息编辑文字提取接口
  materialFindProsFactorImg: "/mss_db/db/make/convention/findProsFactorImg", //实况信息文本生成--过程分析编辑文字提取接口
  findActTimeList: "/mss_db/db/make/convention/findActTimeList", //天气实况信息编辑 时间下拉框
  findActEleList: "/mss_db/db/make/convention/findActEleList", //天气实况信息编辑 要素
  actuallyHappening: "/mss_db/db/make/convention/actuallyHappening", //天气实况信息编辑 检索
  generateDocument: "/mss_db/db/make/convention/generateDocument", //富文本生成
  getWordHeader: "/mss_dm/dm/actKeepSug/getWordHeader", //富文本标题
  preWarningMsg: "/mss_db/db/make/convention/preWarningMsg", //材料加载按钮字典查询接口
  getDocTemplateEle: "/mss_db/db/make/convention/getDocTemplateEle", //材料模板选择
  findDocTemplatebyID: "/mss_db/db/make/convention/findDocTemplate", //材料模板选择--点击某个模板
  getDocLoadingHeader: "/mss_dm/dm/actKeepSug/getWordHeader?tempType=", //材料加载头部
  docLoading: "/mss_db/db/make/convention/docLoading?docType=", //材料加载内容

  preSpecialTime: "/mss_db/db/make/special/preSpecialTime", //要素查询
  querySpecialActEle: "/mss_db/db/make/special/querySpecialActEle", //实况要素查询
  queryCityAreaByCode: "/mss_db/db/make/special/queryCityAreaByCode", //专项保障-保障区域选择
  queryAccordLonLat: "/mss_db/db/make/special/queryAccordLonLat", //专项保障-经纬度
  queryActSpecialActEle: "/mss_db/db/make/special/queryActSpecialActEle", //专项保障-实况信息文本生成
  preSpecialTotqlQuery: "/mss_db/db/make/special/preSpecialTotqlQuery", //专项保障-预报信息文本生成

  getEmergencyAceEle: "/mss_db/db/make/craw/getEmergencyAceEle", //突发事件
  getEmergencyTimeFrame: "/mss_db/db/make/craw/getEmergencyTimeFrame", //突发事件
  findEmergencyPreEle: "/mss_db/db/make/craw/findEmergencyPreEle", //突发事件
  findEmergencyActEle: "/mss_db/db/make/craw/findEmergencyActEle", //突发事件
  emergencyPreEleTotal: "/mss_db/db/make/craw/emergencyPreEleTotal", //突发事件
  getQueryBurstEle: "/mss_db/db/make/craw/queryBurstEle", //突发事件
  getQueryEmergencyTemplate: "/mss_db/db/make/craw/queryEmergencyTemplate", //突发事件

  findProsFactor: "/mss_db/db/make/convention/findProsFactor", //过程分析
  getCityCodeAndName: "/mss_db/db/make/special/getCityCodeAndName",
  getquakeFindCityCode: "/mss_db/db/make/quake/findCityCode", // 行政区划信息查询更新缓存,
  getquakeFindSuggetList: "/mss_db/db/make/quake/findSuggetList", // 地震关注与建议查询
  getquakeQuakeWord: "/mss_db/db/make/quake/getQuakeWord", // 生成地震文档
  getquakeCheckQuakeWord: "/mss_db/db/make/quake/checkQuakeWord", // 生成地震文档
  getquakeEveryList: "/mss_db/db/make/quake/getEveryList", // 获取每日文档列表
  getquakeEveryWord: "/mss_db/db/make/quake/getEveryWord", // 生成每日雨情文档
  getquakeEveryListNX: "/mss_db/db/make/ngx/getMarkList", // 获取每日文档列表
  getquakeEveryWordNX: "/mss_db/db/make/ngx/getWord", // 生成每日雨情文档

  /* 交互编辑界面逻辑接口 */
  getInteractiveAreaInfo: "/mss_dm/dm/edit/sudden/getAreaInfo", //查询地区流域省份分类及比例
  getInteractivefindByParent: "/mss_ed/db/edit/findByParent", //查询父级下的子要素
  getInteractivegetTwoLevelCata: "/mss_ed/db/edit/getTwoLevelCata", //查询二级目录要素
  getInteractivegetMap: "/mss_ed/db/edit/getMap", //获取地图服务
  getInteractivegetLineServerData: "/mss_ed/db/edit/getLineServerData", //查询等值线图层信息
  getInteractivegetPointData: "/mss_ed/db/edit/getPointData", //查询点图层信息
  getInteractivegetLineData: "/mss_ed/db/edit/getLineData", //查询线图层标注信息
  getInteractivegetPolygonMap: "/mss_ed/db/edit/getPolygonMap", //获取等值面图服务
  getInteractivegetLegendTemplate: "/mss_ed/db/edit/getLegendTemplate", //查询图例模板
  getInteractivegetLegendTempMap: "/mss_ed/db/edit/getLegendTempMap", //查询图例模板 分类
  editorInteractivemodifyGeoMapServer: "/mss_ed/db/edit/modifyGeoMapServer", //修改图例重新发布图层
  getProductionTimes: "/mss_ed/db/edit/getDateList", //获取产品数据时次
  downloadInteractivePic: "/mss_ed/db/downloadPic/downloadPic", // 下载高清图
  downloadInteractivePicTable: "/mss_ed/db/downloadPic/downloadPicWithTable", // 下载高清图-表格
  getInteractiveptxdStaData: "/mss_ed/db/edit/ptxdStaData", // 统计表格
  postInteractUpload: "/mss_ed/db/editData/upload", // 本地导入产品接口
  postInteractUploadtxtPrefix: "/mss_ed/db/editData/uploadtxtPrefix", // 本地导入TXT产品前缀处理接口
  postInteractUploadtxt: "/mss_ed/db/editData/uploadtxt", // 本地导入TXT产品
  postInteractUploadGrib: "/mss_ed/db/editData/uploadGrib", // 本地导入Grib2产品接口
  getInteractTyphTwoLevelCata: "/mss_ed/db/edit/getTyphTwoLevelCata",
  getInteractAnalysisData: "/mss_ed/db/downloadPic/getIndexAnalysisData",
  getInteractIntersectData: "/mss_ed/db/downloadPic/getIntersectData", // 获取和天气现象数据相交部分的底图数据
  getInteractTifInversion: "/mss_ed/db/downloadPic/tifInversion", // tif数据反演
  modifyInteractGeoMapServer: "/mss_ed/db/downloadPic/modifyGeoMapServer", // 修改图例重新发布图层
  getInteractTyphPointData: "/mss_ed/db/edit/getTyphPointData", //
  getRangeByMulProvence: "/mss_ed/db/edit/getRangeByMulProvence", //
  addInteractLegend: "/mss_ed/db/edit/addLegend", //
  getTileDataByRangeZoom: "/mss_ed/db/edit/getTileDataByRangeZoom", //
  getDisaUploadSta: "/mss_ed/db/editData/disaUploadSta", //
  getDisaUploadMore: "/mss_ed/db/editData/disaUploadMore", //
  exportIndexAnalysisData: "/mss_ed/db/downloadPic/exportIndexAnalysisData",

  /* 服务参考 */
  getSevrPageDirs: "/mss_dm/dm/sevrPage/getDirs", // 查询服务参考页面目录
  getSevrPageTwoType: "/mss_dm/dm/sevrPage/getTwoType", // 查询服务参考页面子目录
  getSevrPageMenu: "/mss_dm/dm/make/getMenu", // 查询材料制作菜单
  getSevrPageMapTypeQueryList: "/mss_db/db/sevrQuery/markMapType", // 查询单目录下文档集合数据
  getSevrPageMapTypeOneQueryList: "/mss_db/db/sevrQuery/queryMarkOne", // 查询单目录下文档集合数据
  getSevrPageMoreQueryList: "/mss_db/db/sevrQuery/moreQueryListNew", // 多条件查询单项文档集合数据
  getSevrPageMoreQueryQuakeList: "/mss_db/db/sevrQuery/moreQueryQuakeList", // 多条件查询单项文档集合数据
  getSevrPageDownWord: "/mss_db/db/sevrQuery/downWord", // word下载(单)
  getSevrPageDownWordList: "/mss_db/db/sevrQuery/downWordList", // word下载(单)
  getSevrPageTextList: "/mss_db/db/sevrQuery/textList", // word下载(单)
  getSevrPageYearList: "/mss_db/db/sevrQuery/queryYearList", // 天气过程统计表格类型的年份
  getSevrPageDataOne: "/mss_db/db/sevrQuery/queryDataOne", // 根据id查询具体单条数据
  getSevrPageUpdateMap: "/mss_db/db/sevrQuery/updateMap", // 更新数据
};
export { interfaceObj };
