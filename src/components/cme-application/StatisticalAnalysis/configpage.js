const pageObj = {};
/**geoserver全国界线、标注图层的名称*/
pageObj.qg = {
  ProLineName: "STD-CHN-OVRLINE",
  ProTextName: "STD-PRV-ANOTION",
  STDANOTION: [{
      layer: 'base:NHDY',
      name: '南海群岛标记'
    },
    {
      layer: 'base:NAME_SEA',
      name: '河流标记'
    },
    {
      layer: 'base:AGNP_D',
      name: '市标记'
    },
    {
      layer: 'base:AGNP_X',
      name: '县标记'
    },
    {
      layer: 'base:AGNP_SHCS',
      name: '省会标记'
    },
    {
      layer: 'base:NAME_L3',
      name: '河流标记'
    },
    {
      layer: 'base:NAME_L2',
      name: '河流标记'
    },
    {
      layer: 'base:SD',
      name: '首都标记'
    }
  ]
}

/**geoserver省界线、标注图层的名称*/
pageObj.area = {
  areaBase: 'DEM-area-areaBase',
  mapMark: 'STD-area-mapMark',
}
pageObj.sheng = {
  ProLineName: 'DEM-SHE-OVRLINE',
  ProTextName: 'STD-SHE-ANOTION',
  IntellctPage: 'STD-SHE-EDITANNOT'
}
/**geoserver流域界线、标注图层的名称*/
pageObj.basin = {
  ProLineName: 'DEM-LUY-OVRLINE',
  //ProTextName: 'STD-SHE-ANOTION'
}
/**实况监控界面配置 pageObj.Live*/
pageObj.Live = {};
pageObj.Live.Special = {
  titaltext: '气温实况图',
  titaltime: '2020年8月31日06时',
  zhizutime: '8月31日06时'
}
pageObj.Live.shi = {
  ProLineName: 'STD_LIVE_SHI',
  ProTextName: 'STD_LIVE_SHI_ANOTION'
}
pageObj.Live.xian = {
  ProLineName: 'STD_LIVE_XIAN',
  ProTextName: 'STD_LIVE_XIAN_ANOTION'
}
/**实况监控界面配置 左侧省的配置
 * label-展现字体
 * id-对应的geoserver掩膜图层的名称
 * extent-省边框的四角坐标
 */
pageObj.Live.Provinces = [{
    id: "",
    label: "全国范围",
    areaMark: 'qg',
    extent: [-2750000, 1750000, 2350000, 6000000]
  },
  {
    id: "DEM-BEJ-MASKBLK",
    label: "北京",
    extent: [864192, 4288819, 1052195, 4476822]
  },
  {
    id: "DEM-HLJ-MASKBLK",
    label: "黑龙江",
    // extent: [938191, 4918471, 2290728, 5932535]
    extent: [1057598, 4926352, 2262347, 5914353]
  },
  {
    id: "DEM-JIL-MASKBLK",
    label: "吉林",
    extent: [1278475, 4561622, 2087014, 5167824]
  },
  {
    id: "DEM-LIN-MASKBLK",
    label: "辽宁",
    extent: [1140022, 4264057, 1713153, 4837189]
  },
  {
    id: "DEM-TAJ-MASKBLK",
    label: "天津",
    // extent: [987640, 4197735, 1120220, 4396694]
    extent: [935709, 4201251, 1132422, 4392869]
  },
  {
    id: "DEM-NMG-MASKBLK",
    label: "内蒙古",
    // extent: [-666964, 3971053, 1875035, 5881366]
    extent: [-697567, 3948309, 1657694, 5876986]
  },
  {
    id: "DEM-XNJ-MASKBLK",
    label: "新疆",
    // extent: [-2640572, 3897370, -356397, 5610501]
    extent: [-2673910, 3851804, -654980, 5522334]
  },
  {
    id: "DEM-NGX-MASKBLK",
    label: "宁夏",
    // extent: [-82398, 3759668, 234944, 4235895]
    extent: [-105839, 3760053, 314976, 4233550]
  },
  {
    id: "DEM-QGH-MASKBLK",
    label: "青海",
    // extent: [-1400990, 3350206, 15252, 4412388]
    extent: [-1420807, 3293484, -166164, 4332334]
  },
  {
    id: "DEM-GNS-MASKBLK",
    label: "甘肃",
    // extent: [-1149425, 3462161, 431498, 4647854]
    extent: [-1110533, 3448494, 341873, 4641484]
  },
  {
    id: "DEM-SHX-MASKBLK",
    label: "陕西",
    // extent: [38499, 3338548, 677092, 4296864]
    extent: [-84066, 3355478, 737384, 4273212]
  },
  {
    id: "DEM-XIZ-MASKBLK",
    label: "西藏",
    // extent: [-2478680, 2763698, -473014, 4267947]
    extent: [-2458655, 2730561, -554282, 4296891]
  },
  {
    id: "DEM-SIC-MASKBLK",
    label: "四川",
    // extent: [-723701, 2720893, 338063, 3782658]
    extent: [-795131, 2730309, 350239, 3672814]
  },
  {
    id: "DEM-CHQ-MASKBLK",
    label: "重庆",
    // extent: [17394, 2956003, 496297, 3434906]
    extent: [7798, 2973792, 548549, 3426500]
  },
  {
    id: "DEM-GIZ-MASKBLK",
    label: "贵州",
    // extent: [-230826, 2570656, 465102, 3092603]
    extent: [-174895, 2558583, 473561, 3089462]
  },
  {
    id: "DEM-YNN-MASKBLK",
    label: "云南",
    // extent: [-838558, 2161921, 126179, 3126660]
    extent: [-919848, 2182355, 211612, 3114292]
  },
  {
    id: "DEM-SNX-MASKBLK",
    label: "山西",
    // extent: [400254, 3699098, 890309, 4434507]
    extent: [308090, 3699506, 952673, 4424304]
  },
  {
    id: "DEM-HEB-MASKBLK",
    label: "河北",
    // extent: [638266, 3887258, 1262893, 4668198]
    extent: [583702, 3876090, 1292249, 4669915]
  },
  {
    id: "DEM-SND-MASKBLK",
    label: "山东",
    // extent: [849945, 3733776, 1543278, 4253603]
    extent: [871534, 3703000, 1534022, 4246434]
  },
  {
    id: "DEM-HEN-MASKBLK",
    label: "河南",
    // extent: [477458, 3343123, 1079607, 3945271]
    extent: [418200, 3367857, 1099968, 3930695]
  },
  {
    id: "DEM-ANH-MASKBLK",
    label: "安徽",
    extent: [902393, 3163853, 1382827, 3764516]
  },
  {
    id: "DEM-JGS-MASKBLK",
    label: "江苏",
    // extent: [964744, 3369157, 1601949, 3846901]
    extent: [1015535, 3369215, 1585490, 3839288]
  },
  {
    id: "DEM-SHH-MASKBLK",
    label: "上海",
    // extent: [1484455, 3364462, 1598878, 3507490]
    extent: [1461828, 3374832, 1622247, 3507182]
  },
  {
    id: "DEM-HUB-MASKBLK",
    label: "湖北",
    // extent: [182624, 3059364, 1082682, 3565318]
    extent: [296756, 2974237, 1065360, 3607553]
  },
  {
    id: "DEM-HUN-MASKBLK",
    label: "湖南",
    // extent: [278571, 2592491, 952634, 3266554]
    extent: [231669, 2596547, 971132, 3202665]
  },
  {
    id: "DEM-JGX-MASKBLK",
    label: "江西",
    // extent: [653379, 2598142, 1451321, 3251719]
    extent: [697119, 2602825, 1352853, 3244119]
  },
  {
    id: "DEM-ZHJ-MASKBLK",
    label: "浙江",
    // extent: [1190358, 2958777, 1688161, 3456580]
    extent: [1168214, 2967680, 1718807, 3417562]
  },
  {
    id: "DEM-FUJ-MASKBLK",
    label: "福建",
    // extent: [1088484, 2513964, 1547553, 3087915]
    extent: [973100, 2532464, 1640150, 3080032]
  },
  {
    id: "DEM-TAW-MASKBLK",
    label: "台湾",
    // extent: [1469118, 2400886, 1732569, 2796239]
    extent: [1439380, 2397536, 1794180, 2794449]
  },
  {
    id: "DEM-GNX-MASKBLK",
    label: "广西",
    // extent: [-80351, 2171811, 744014, 2789879]
    extent: [-51808, 2188574, 718597, 2815251]
  },
  {
    id: "DEM-HAN-MASKBLK",
    label: "海南",
    // extent: [368554, 1876348, 669143, 2101714]
    extent: [377274, 1876279, 648913, 2098963]
  },
  {
    id: "DEM-GND-MASKBLK",
    label: "广东",
    // extent: [446545, 2102593, 1267895, 2718399]
    extent: [482886, 2095638, 1250197, 2728585]
  }
]
/**过程分析界面配置 pageObj.Process*/
pageObj.Process = {};
pageObj.Process.qg = {
  ProLineName: "STD_PROCESS_QG_OVRLINE",
  ProTextName: "STD_PROCESS_QG_ANOTION",
  ProCityName: "STD_PROCESS_SHI",
  ProXianName: "STD_PROCESS_XIAN",
}
pageObj.Process.Areas = {
  "haet": { //"华东"
    ProTextName: "STD-PROCESS-HAET-SHADE",
  },
  "jhan": { //"江汉"
    ProTextName: "STD-PROCESS-JHAN-SHADE",
  },
  "etno": { //"江汉"
    ProTextName: "STD-PROCESS-ETNO-SHADE",
  }
};
/**智能统计界面配置 pageObj.IntellctPage*/
pageObj.IntellctPage = {};
/**智能统计界面配置字段pageObj.IntellctPage.feilds
 * tem-气温
 * pre-降水
 * vis-能见度
 * wea-天气现象
 * wind-风
 * snow-积雪
 */
pageObj.IntellctPage.feilds = {
  other: {
    sort: 'sort', //排序
    shengName: 'province', //省名
    cityName: 'city', //市名
    areaName: 'areaName', //市名
    sName: 'stationName', //站名
    sId: 'stationId', //站号
    countyName: 'county', //县名
    dateTime: 'dateTime' //时间
  },
  hourFiles: {
    type: 'hour',
    //气温
    maxTempObj: {
      maxTemp: 'maxTemp', //小时--最高气温
      maxTempTime: 'maxTempTime' //小时--最高气温出现的时间
    },
    minTempObj: {
      minTemp: 'minTemp', //小时--最低气温
      minTempTime: 'minTempTime' //小时--最低气温出现的时间
    },
    avgTempObj: {
      avgTemp: 'avgTemp', //平均气温
    },
    highTempHoursObj: {
      highTempHours: 'highTempHours', //高温持续小时数
    },
    //降水
    sumPreObj: {
      sumPre: 'sumPre', //累计降水量
    },
    max1hPreObj: {
      max1hPre: 'max1hPre', //最大1小时降水量
      max1hPreTime: 'max1hPreTime', //最大1小时降水量出现时间
    },
    max3hPreObj: {
      max3hPre: 'max3hPre', //最大3小时降水量
      max3hPreTime: 'max3hPreTime', //最大3小时降水量出现时间
    },
    max6hPreObj: {
      max6hPre: 'max6hPre', //最大6小时降水量
      max6hPreTime: 'max6hPreTime', //最大6小时降水量出现时间
    },
    //大风
    maxExtWindObj: {
      maxExtWind: 'maxExtWind', //最大阵风
      maxExtWindTime: 'maxExtWindTime' // 最大阵风出现时间
    },
    maxAvgWindObj: {
      maxAvgWind: 'maxAvgWind', //最大平均风
      maxAvgWindTime: 'maxAvgWindTime' // 最大平均风出现时间
    },
    bigWindHoursObj: {
      bigWindHours: 'bigWindHours', //大风持续小时数
    },
    //能见度
    minVisObj: {
      minVis: 'minVis', //最小能见度
      minVisTime: 'minVisTime', //最小能见度出现时间
    },
    // 天气现象
    ifFogObj: {
      ifFog: 'ifFog', //是否出现大雾
      fog: 'fog', //出现大雾小时数
    },
    ifHazeObj: {
      ifHaze: 'ifHaze', //是否出现霾
      haze: 'haze', //出现霾小时数
    },
    ifSandObj: {
      ifSand: 'ifSand', //是否出现沙尘天气（浮尘或扬沙、沙尘暴、强沙尘暴）
      sand: 'sand', //出现沙尘天气小时数（浮尘或扬沙、沙尘暴、强沙尘暴）
    },
    ifSnowObj: {
      ifSnow: 'ifSnow', //是否出现降雪
      snow: 'snow', //出现降雪小时数
    },
    ifRainObj: {
      ifRain: 'ifRain', //是否出现冻雨
      rain: 'rain', //出现冻雨小时数
    },
    ifThunderObj: {
      ifThunder: 'ifThunder', //是否出现雷暴
      thunder: 'thunder', //出现雷暴小时数
    },
    //积雪深度

  },
  tem: {
    maxTem: 'maxTemp', //最高气温
    minTem: 'minTemp', //最低气温
    avgTem: 'avgTemp', //平均气温
    hourTem: 'tempHour', //气温持续小时数
    areaTem: 'tempArea', //温度影响面积
    extMaxTem: 'maxTempExt', //最高气温极值
    extMinTem: 'minTempExt', //最低气温极值
    extAvgTem: 'avgTempExt', //平均气温极值
    numMaxTem: 'highTempDays', //高温日数
    numMinTem: 'lowTempDays', //低温日数
    numAvgTem: 'avgTempDays', //平均气温日数
    anoNumMaxTem: 'highTempDays4Avg', //高温日数距平
    anoNumMinTem: 'lowTempDays4Avg', //低温日数距平
    anoNumAvgTem: 'avgTempDays4Avg', //平均气温日数距平
    dayMaxTem: 'maxContinuityHighTempDays', //最大持续高温日数
    dayMinTem: 'maxContinuityLowTempDays', //最大持续低温日数
    dayAvgTem: 'maxContinuityAvgTempDays', //最大持续平均气温日数
    maxTempArea: 'maxTempArea', //最高气温影响面积
    minTempArea: 'minTempArea', //最低气温影响面积	
    maxTempNum: 'maxTempNum', //最高气温站点数
    maxTempPc: 'maxTempPc', //最高气温站点比例
    minTempNum: 'minTempNum', //最低气温站点数
    minTempPc: 'minTempPc', //最低气温站点比例	
    maxMaxTempDay: 'maxMaxTempDay', //最大最高气温日数
    maxMinTempDay: 'maxMinTempDay', //最大最低气温日数
    maxAvgTempDay: 'maxAvgTempDay', //最大平均气温日数


  },
  pre: {
    pre: 'pre', //降水量
    sumPre: 'sumPre', //累计降水量
    avgPre: 'avgPre', //	平均降水
    maxPre1h: 'maxPre1h', //	最大1小时降水
    maxPre1hTime: 'maxPre1hTime', //	最大1小时降水量出现时间
    maxPre3h: 'maxPre3h', //	最大3小时降水量
    maxPre3hTime: 'maxPre3hTime', //	最大3小时降水量出现时间
    maxPre6h: 'maxPre6h', //	最大6小时降水量
    maxPre6hTime: 'maxPre6hTime', //最大6小时降水量出现时间
    preArea: 'preArea', //	降水影响面积
    preHour: 'preHour', //降水小时数
    maxPre: 'maxPre', //最大日降水量
    maxPreTime: 'maxPreTime', //最大日降水量出现时间
    pre4Avg: 'pre4Avg', //降水距平
    preExt: 'preExt', //降水极值
    preDays: 'preDays', //降水日数
    preDays4Avg: 'preDays4Avg', //降水日数距平
    preSta: 'preSta', //降水站点数
    preProportion: 'preProportion', //降水站点数比例	
    avgPreDays: 'avgPreDays', //平均降水日数	
    maxPreDays: 'maxPreDays', //最大降水日数
    maxContinuityPreDays: 'maxContinuityPreDays', //最大连续降水日数	

  },
  wind: {
    avgWind: 'avgWind', //平均风速
    maxWind: 'maxWind', //极大风速
    windHour: 'windHour', //大风持续小时数
    avgWindExt: 'avgWindExt', //平均风速极值
    maxWindExt: 'maxWindExt', //	极大风速极值 
    windDays: 'windDays', //大风日数	
    windDays4Avg: 'windDays4Avg', //大风日数距平
    maxContinuityWindDays: 'maxContinuityWindDays', //最大大风连续日数
    maxWindNum: 'maxWindNum', //极大风站点数 1
    maxWindPc: 'maxWindPc', //极大风站点比例
    avgWindNum: 'avgWindNum', //平均风站点数
    avgWindPc: 'avgWindPc', //平均风站点数比例
    avgMaxWindDay: 'avgMaxWindDay', //平均大风日数
    maxMaxWindDay: 'maxMaxWindDay', //最大大风日数
  },
  vis: {

  },
  weather: {},
  snow: {}
};
/**交互编辑界面配置 pageObj.Interact*/
pageObj.Interact = {
  biaozhuId: 'basemapMark', //标注地图Id
  dituId: 'basemap', //地图Id
  yanmoId: 'basemapYanmo', //掩膜Id
  station: 'station_new', //站点图层Id
  iconLayerId: 'interactIconIdZDY', //点标注Id
  dituWorldId: 'baseWorldmap', //台风世界地图Id
  duoshengyanmo: 'duoshengyanmo',
  duoshengxian: 'duoshengxian',
  duoshengbianzhu: 'duoshengbiaozhu',
  duoshengbiankaung: 'duoshengbiankaung',
  ProCHinaName: "STD-CHN-EDIT-CHINA",
  ProCityName: "STD-CHN-EDIT-CITY",
  ProXianName: "STD-CHN-EDIT-COUNTY",
  ProXianNameSpe: "STD-CHN-EDIT-COUNTY-special",
  RIVER_L1: "STD-CHN-EDIT-RIVER_L1",
  RIVER_L2: "STD-CHN-EDIT-RIVER_L2",
  RIVER_L3: "STD-CHN-EDIT-RIVER_L3",
  RailRoads: "STD-CHN-EDIT-RailRoads",
  RoadsInShengLu: "STD-CHN-EDIT-road_ln_ShengLu",
  RoadsInGuoDao: "STD-CHN-EDIT-road_ln_GuoDao",
  dituSea: 'STD-CHN-EDITSEA1',
};
/**交互编辑界面配置 标准地图配置
 */
pageObj.Interact.areaBase = {
  biaozhu: 'STD-CHN-EDIT-CHINA',
  ditu: 'STD-CHN-EDITSEA',
  ProCHinaName: "STD-CHN-EDIT-CHINA",
  ProCityName: "STD-CHN-EDIT-CITY",
  ProXianName: "STD-CHN-EDIT-COUNTY",
  ProXianNameSpe: "STD-CHN-EDIT-COUNTY-special",
  RIVER_L1: "STD-CHN-EDIT-RIVER_L1",
  RIVER_L2: "STD-CHN-EDIT-RIVER_L2",
  RIVER_L3: "STD-CHN-EDIT-RIVER_L3",
  RailRoads: "STD-CHN-EDIT-RailRoads",
  RoadsInShengLu: "STD-CHN-EDIT-road_ln_ShengLu",
  RoadsInGuoDao: "STD-CHN-EDIT-road_ln_GuoDao",
}
/**交互编辑界面配置 标准地图配置
 */
pageObj.Interact.demBase = {
  biaozhu: 'STD-CHN-EDIT-CHINA',
  ditu: 'DEM-CHN-EDIT',
}
pageObj.Interact.projBase = {
  biaozhu: 'STD-CHN-EDIT-CHINA',
  ditu: 'DEM-CHN-EDIT',
}
export {
  pageObj
}
