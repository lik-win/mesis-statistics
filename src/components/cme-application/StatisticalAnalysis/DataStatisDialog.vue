<template>
  <div class="dataStatis">
    <el-form class="dataStatisForm">
      <div class="fTop">
        <div class="formRow">
          <el-form-item v-if="prop.dataStatisType == 'station' && configObj.timeOption != 'cnYear'" label="站点排名:">
            <el-radio-group v-model="configObj.size" size="small" @change="changeSizeValue">
              <el-radio :label="item.value" v-for="(item, index) in sizeArr" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计要素:" :class="prop.dataStatisType == 'station' ? 'elementMarkStationStyle' : ''">
            <el-select
              size="small"
              :class="prop.dataStatisType == 'station' ? 'elementMarkSelect' : ''"
              v-model="configObj.elementMark[0]"
              placeholder="统计要素"
              @change="previewImage"
            >
              <el-option v-for="(item, index) in indexCheckedEleObjArr" :key="index" :label="item.elementName" :value="item.elementKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图表类型:">
            <el-radio-group v-model="chartType" size="small" @change="ChangechartType">
              <el-radio label="bar">柱状图</el-radio>
              <el-radio label="line">折线图</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="prop.dataStatisType == 'area' || configObj.timeOption == 'cnYear'" label="仅显示最大值和最小值:">
            <el-switch v-model="isShowTextValue" style="margin-left: 10px" @change="areaGraphicChange"></el-switch>
          </el-form-item>
          <!-- <el-form-item label="统计维度:">
            <el-radio-group v-model="configObj.staType">
              <el-radio
                :label="itemChild.key"
                v-for="(itemChild, indexChild) in stationLevelArr"
                :key="indexChild"
                >{{ itemChild.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>-->
        </div>
        <div class="formRow">
          <el-form-item label="文字标注:">
            <el-select size="small" class="fontFaimlyClass" v-model="chartConfig.fontFaimly" placeholder="请选择字体">
              <el-option v-for="(item, index) in fontFaimly" :key="index" :label="item" :value="item"></el-option>
            </el-select>
            <el-input-number size="small" class="chartFontSize" v-model="chartConfig.fontSize" controls-position="right" :min="11" :max="30"></el-input-number>
            <el-select
              size="small"
              :class="chartConfig.fontStyle == '0' ? 'chartFontStyle' : 'chartFontStyle ' + chartConfig.fontStyle"
              v-model="chartConfig.fontStyle"
            >
              <el-option value="0" label="A">
                <span>A</span>
              </el-option>
              <!-- <el-option value="xiahuanxian" label="A">
                <template>
                  <font class="xiahuanxian">A</font>
                </template>
              </el-option>-->
              <el-option value="jiacu" label="A">
                <span class="jiacu">A</span>
              </el-option>
              <el-option value="qingxie" label="A">
                <span class="qingxie">A</span>
              </el-option>
            </el-select>
            <el-color-picker popper-class="staticsFontColor" v-model="chartConfig.fontColor" size="small"></el-color-picker>
          </el-form-item>
          <el-form-item :class="prop.dataStatisType == 'station' ? 'elementMarkStationStyle' : ''" label="图形标注:">
            <el-input-number
              size="small"
              class="chartImgSize"
              v-model="chartConfig.imgSize"
              controls-position="right"
              :min="1"
              :max="30"
              @change="previewImage('imgSize')"
            ></el-input-number>
            <el-color-picker
              popper-class="staticsFontColor"
              v-model="chartConfig.imgColor"
              size="small"
              color-format="rgb"
              @change="previewImage('imgSize')"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="切换风格:">
            <el-switch v-model="isOpenGraphic" style="margin-left: 10px" @change="areaGraphicChange"></el-switch>
          </el-form-item>
        </div>
        <div v-if="prop.dataStatisType == 'station' && configObj.timeOption != 'cnYear'" class="formRow">
          <el-form-item label="仅显示最大值和最小值:">
            <el-switch v-model="isShowTextValue" style="margin-left: 10px" @change="areaGraphicChange"></el-switch>
          </el-form-item>
        </div>
      </div>
      <div id="variThematics" class="chartBox" v-loading="chartLoading">
        <div>
          <div>
            <p class="chartTitleClass" contenteditable @mouseleave="changeTitleName">{{ echartsData.title }}</p>
          </div>
          <div class="StatisFormChart" id="StatisFormChart" ref="myChartRef" :style="{ width: '100%' }"></div>
        </div>
        <!-- <div class="btnGroup"> -->
        <!-- <img class="typeBtn" :src="require('@/assets/image/IntellectStatistics/bar.png')" @click="ChangeBar(1)" >
        <img class="typeBtn" :src="require('@/assets/image/IntellectStatistics/line.png')" @click="ChangeBar(2)">-->
        <!-- <button class="typeBtn" @click="ChangeBar(1)">柱状图</button>
        <button class="typeBtn" @click="ChangeBar(2)">折线图</button>-->
        <!-- </div> -->
      </div>
      <div class="chartBtn">
        <!-- <el-button class="previewImageClass" size="small" type="primary" plain @click="previewImage">预览</el-button> -->
        <el-button class="saveImageClass" size="small" type="primary" @click="getVariThematics('download')">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import html2canvas from "html2canvas";
import moment from "moment";
import { init as echartsInit, graphic as echartsGraphic } from "echarts";
import service from "@/message/request.js";
const tenDataList = { "01": "上旬", "02": "中旬", "03": "下旬" };
const prop = defineProps({
  staticsSearchObj: {
    //智能统计查询对象
    type: Object,
  },
  dataStatisType: {
    // 统计类型 站点还是区域
    type: String,
  },
  timeScaleArr: {
    // 时间尺度要素数组
    type: Array,
  },
});
const myChartRef = ref(null);
const dataClickShowArray = ref([]);
const configObj = reactive({
  elementMark: [], //当前的统计要素
  size: 10,
});
const timeScaleArrs = []; //时间尺度要素
const chartConfig = reactive({
  fontFaimly: "微软雅黑",
  fontSize: 12,
  fontColor: "#333",
  imgSize: 20,
  imgColor: "rgb(57, 119, 228)",
  imgColor0: "rgba(57, 119, 228, 0)",
  fontStyle: "0",
  fontWeight: "normal",
});
const indexCheckedEleObjArr = ref([]); //时间尺度选中的统计要素
const stationLevelArr = [
  // 台站级别
  { name: "国家站", key: "countrySta" },
  { name: "区域站", key: "areaSta" },
];
const fontFaimly = ["微软雅黑", "黑体", "宋体", "Arial"];
const sizeArr = [
  { value: 10, label: "前10名" },
  { value: 20, label: "前20名" },
  { value: 70, label: "全部" },
];
const echartsData = {
  xaxis: [],
  yaxis: [],
  yDataUnit: "",
  title: "",
  yUnit: "",
  boundaryGap: true,
  yDataUnitStyle: [0, 0, 10, 0],
  seriesData: [],
};
const requestUrl = reactive({}); // 查询的接口地址
const chartType = ref("bar"); //图表的类型
const chartLoading = ref(false);
const startValue = ref(""); //统计图的开始统计区域
const endValue = ref(""); //统计图的结束统计区域
//小时统计--站点统计字段
const hourStationStatics = {
  ifFog: { fog: "出现大雾小时数" },
  ifHaze: { haze: "出现霾小时数" },
  ifSand: { sand: "出现沙尘小时数" },
  ifSnow: { snow: "出现降雪小时数" },
  ifRain: { rain: "出现冻雨小时数" },
  ifThunder: { thunder: "出现雷暴小时数" },
};
//日统计--站点统计字段
const dayStationStatics = {
  highTempDays: { highTempDays: "高温日数", maxConsecutiveHighTempDays: "持续高温日数(最大连续高温日数)" }, //高温日数
  lowTempDays: { lowTempDays: "低温日数", maxConsecutiveLowTempDays: "持续低温日数(最大连续低温日数)" }, //低温日数
  bigWindDays: { bigWindDays: "大风日数", bigWindDays4Avg: "大风日数距平" }, //大风日数
  smallWindDays: { smallWindDays: "小风日数", smallWindDays4Avg: "小风日数距平" }, //小风日数
  preIfGtExt: { preGtExt: "降水量旬/月/历史极值" }, //降水量突破极值
  highTempIfGtExt: { highTempGtExt: "高温旬/月/历史极值" }, //高温旬/月/历史极值
  lowTempIfLtExt: { lowTempLtExt: "低温旬/月/历史极值" }, //低温旬/月/历史极值
  extWindIfGtExt: { extWindGtExt: "极大风旬/月/历史极值" }, //极大风旬/月/历史极值
  avgWindIfGtExt: { avgWindGtExt: "平均风旬/月/历史极值" }, //平均风旬/月/历史极值
};
const extElement = ["preGtExt", "highTempGtExt", "lowTempLtExt", "extWindGtExt", "avgWindGtExt"];
const nameArr = {
  preGtExt: ["降水量旬极值", "降水量月极值", "降水量历史极值"],
  highTempGtExt: ["高温旬极值", "高温月极值", "高温历史极值"],
  lowTempLtExt: ["低温旬极值", "低温月极值", "低温历史极值"],
  extWindGtExt: ["极大风旬极值", "极大风月极值", "极大风历史极值"],
  avgWindGtExt: ["平均风旬极值", "平均风月极值", "平均风历史极值"],
};
//旬统计--扩展统计
const tenStationStatics = {
  sumPre: {
    sumPre: "降水量",
    allYear: { historyPre: "降水量常年值" },
    hisOrder: { preRank: "降水量历史排位" },
    ext: { preExt: "降水量极值" },
  },
  avgTemp: {
    avgTemp: "平均气温",
    allYear: { historyAvgTemp: "平均气温常年值" },
    hisOrder: { avgTempRank: "平均气温历史排位" },
    ext: { avgTempExt: "平均气温极值" },
  },
  maxTemp: {
    maxTemp: "最高气温",
    allYear: { historyMaxTemp: "最高气温常年值" },
    hisOrder: { maxTempRank: "最高气温历史排位" },
    ext: { maxTempExt: "最高气温极值" },
  },
  minTemp: {
    minTemp: "最低气温",
    allYear: { historyMinTemp: "最低气温常年值" },
    hisOrder: { minTempRank: "最低气温历史排位" },
    ext: { minTempExt: "最低气温极值" },
  },
};
//月统计--扩展统计
const monthStationStatics = {
  sumPre: {
    sumPre: "降水量",
    allYear: { historyPre: "降水量常年值" },
    hisOrder: { preRank: "降水量历史排位" },
    ext: { preExt: "降水量极值" },
  },
  rainDays: {
    rainDays: "降水日数",
    allYear: { historyRainDays: "降水日数常年值" },
    hisOrder: { rainDaysRank: "降水日数历史排位" },
    ext: { rainDaysExt: "降水日数极值" },
  },
  heavyRainDays: {
    heavyRainDays: "暴雨日数",
    allYear: { historyHeavyRainDays: "暴雨日数常年值" },
    hisOrder: { heavyRainDaysRank: "暴雨日数历史排位" },
    ext: { heavyRainDaysExt: "暴雨日数极值" },
  },
  avgTemp: {
    avgTemp: "平均气温",
    allYear: { historyAvgTemp: "平均气温常年值" },
    hisOrder: { avgTempRank: "平均气温历史排位" },
    ext: { avgTempExt: "平均气温极值" },
  },
  maxTemp: {
    maxTemp: "最高气温",
    allYear: { historyMaxTemp: "最高气温常年值" },
    hisOrder: { maxTempRank: "最高气温历史排位" },
    ext: { maxTempExt: "最高气温极值" },
  },
  minTemp: {
    minTemp: "最低气温",
    allYear: { historyMinTemp: "最低气温常年值" },
    hisOrder: { minTempRank: "最低气温历史排位" },
    ext: { minTempExt: "最低气温极值" },
  },
  bigWindDays: {
    bigWindDays: "大风日数",
    allYear: { historyBigWindDays: "大风日数常年值" },
    hisOrder: { bigWindDaysRank: "大风日数历史排位" },
    ext: { bigWindDaysExt: "大风日数极值" },
  },
  fogDays: {
    fogDays: "大雾日数",
    allYear: { historyFogDays: "大雾日数常年值" },
    hisOrder: { fogDaysRank: "大雾日数历史排位" },
    ext: { fogDaysExt: "降雪日数极值" },
  },
  sandDays: {
    sandDays: "沙尘日数",
    allYear: { historySandDays: "沙尘日数常年值" },
    hisOrder: { sandDaysRank: "沙尘日数历史排位" },
    ext: { sandDaysExt: "沙尘日数极值" },
  },
  hazeDays: {
    hazeDays: "霾日数",
    allYear: { historyHazeDays: "霾日数常年值" },
    hisOrder: { hazeDaysRank: "霾日数历史排位" },
    ext: { hazeDaysExt: "霾日数极值" },
  },
  snowDays: {
    snowDays: "降雪日数",
    allYear: { historySnowDays: "降雪日数常年值" },
    hisOrder: { snowDaysRank: "降雪日数历史排位" },
    ext: { snowDaysExt: "降雪日数极值" },
  },
  freezingRainDays: {
    freezingRainDays: "冻雨日数",
    allYear: { historyFreezingRainDays: "冻雨日数常年值" },
    hisOrder: { freezingRainDaysRank: "冻雨日数历史排位" },
    ext: { freezingRainDaysExt: "冻雨日数极值" },
  },
  thunderDays: {
    thunderDays: "雷暴日数",
    allYear: { historyThunderDays: "雷暴日数常年值" },
    hisOrder: { thunderDaysRank: "雷暴日数历史排位" },
    ext: { thunderDaysExt: "雷暴日数极值" },
  },
  snowDeepDays: {
    snowDeepDays: "积雪日数",
    allYear: { historySnowDeepDays: "积雪日数常年值" },
    hisOrder: { snowDeepDaysRank: "积雪日数历史排位" },
    ext: { snowDeepDaysExt: "积雪日数极值" },
  },
};
//小时--区域统计字段
const hourAreaStatics = {
  sumPre: { avgPre: "平均降水", preArea: "降水面积" },
  maxTemp: { maxTemp: "最高气温", highTempArea: "高温面积" },
  highTempHours: { highTempStaNum: "高温站点数", highTempScale: "高温站点" },
  bigWindHours: { bigWindStaNum: "大风站点数", bigWindScale: "大风站点比例" },
  ifFog: { weaFogNum: "大雾站点数", weaFogNumScale: "大雾站点" },
  ifHaze: { weaHazeNum: "霾站点数", weaHazeNumScale: "霾站点" },
  ifSand: { weaSandNum: "沙尘站点数", weaSandNumScale: "沙尘站点" },
  ifSnow: { weaSnowNum: "降雪站点数", weaSnowNumScale: "降雪站点" },
  ifRain: { weaRainNum: "冻雨站点数", weaRainNumScale: "冻雨站点" },
  ifThunder: { weaThunderNum: "雷暴站点数", weaThunderNumScale: "雷暴站点" },
  minVis: {
    minVis: "最小能见度",
    vis100StaNum: "能见度小于100m站点数",
    vis100StaScale: "能见度小于100m站点",
    vis200StaNum: "能见度小于200m站点数",
    vis200StaScale: "能见度小于200m站点",
    vis500StaNum: "能见度小于500m站点数",
    vis500StaScale: "能见度小于500m站点",
    vis1000StaNum: "能见度小于1000m站点数",
    vis1000StaScale: "能见度小于1000m站点",
  },
  maxExtWind: { maxExtWind: "最大阵风" },
  maxAvgWind: { maxAvgWind: "最大平均风" },
  minTemp: { minTemp: "最低气温" },
  avgTemp: { avgTemp: "平均气温" },
  temp4Avg: { temJuPing: "气温距平" },
  maxSnowDeep: { maxSnowDeep: "最大积雪深度" }, //雷暴日数
  maxSnowDeepChangeValue: { maxSnowDeepChangeValue: "最大积雪深度变化" },
  minFirstFrostTime: { minFirstFrostTime: "最小初霜冻日" },
};
//日值--区域统计字段
const dayAreaStatics = {
  sumPre: { maxSumPre: "累计降水量", avgPre: "平均降水量", preArea: "降水面积" }, //累计降水
  pre4Avg: { preJuPing: "最大降水距平" }, //降水距平
  rainDays: { maxPreDays: "最大降水日数" }, //降水日数
  preIfGtExt: { overHisPreNum: "突破极值站点数" }, //降水量突破极值
  maxHighTemp: { maxTemp: "区域最高", highTempNum: "高温站点数", highTempStaScale: "高温站点" }, //最高气温最大值
  minLowTemp: { minTemp: "区域最低", lowTempNum: "低温站点数", lowTempStaScale: "低温站点" }, //最低气温最小值
  bigWindDays: { maxBigWindDay: "大风日数", bigWindArea: "大风面积" }, //大风日数
  smallWindDays: { maxSmallWindDay: "小风日数" }, //小风日数
  extWindIfGtExt: { overHisExtWindNum: "突破极值站点数" }, //极大风突破极值
  fogDays: { maxFogDays: "大雾日数", fogArea: "大雾面积" }, //大雾日数
  hazeDays: { maxHazeDays: "霾日数", hazeArea: "霾面积" }, //霾日数
  sandDays: { maxSandDays: "沙尘日数", sandArea: "沙尘面积" }, //沙尘日数
  snowDays: { maxWeaSnowDays: "降雪日数", snowArea: "降雪面积" }, //降雪日数
  freezingRainDays: { maxRainDays: "冻雨日数", rainArea: "冻雨面积" }, //冻雨日数
  thunderDays: { maxThunderDays: "雷暴日数", thunderArea: "雷暴面积" }, //雷暴日数
  maxSnowDeep: {
    maxSnowDeep: "最大积雪深度",
    maxSnow1cmNum: "大于1cm站点数",
    maxSnow1cmScale: "大于1cm站点",
    maxSnow5cmNum: "大于5cm站点数",
    maxSnow5cmScale: "大于5cm站点",
    maxSnow10cmNum: "大于10cm站点数",
    maxSnow10cmScale: "大于10cm站点",
    maxSnow25cmNum: "大于25cm站点数",
    maxSnow25cmScale: "大于25cm站点",
    maxSnowArea: "最大积雪深度",
  }, //雷暴日数
  maxExtWind: { maxExtWind: "最大阵风" },
  maxAvgWind: { maxAvgWind: "最大平均风" },
  maxTemp: { maxTemp: "最高气温" },
  minTemp: { minTemp: "最低气温" },
  avgTemp: { avgTemp: "平均气温" },
  temp4Avg: { temJuPing: "气温距平" },
  avgSumTemp: { maxAvgSumTemp0Num: "0°C以上最高积温", maxAvgSumTemp10Num: "10°C以上最高积温" },
  minFirstFrostTime: { minFirstFrostTime: "最小初霜冻日" },
  highTempDays: { maxHighTemDays: "最大高温日数" },
  lowTempDays: { maxLowTemDays: "最大低温日数" },
  minHighTemp: { minHighTemp: "最小最高气温" },
  maxLowTemp: { maxLowTemp: "最大最低气温" },
  heavyRainDays: { maxHeavyRainDays: "最大暴雨日数" },
  noRainDays: { maxNoRainDays: "最大无降水日数" },
  maxConsecutiveNoRainDays: { maxConsecutiveNoRainDays: "最大连续无降水日数" },
  minVis: { minVis: "最小能见度" },
  rainDays4Avg: {
    rainDaysJuPing: "降水日数距平",
    rain25DaysJuPing: "大雨日数距平",
    rain50DaysJuPing: "暴雨日数距平",
    rain100DaysJuPing: "大暴雨日数距平",
    rain250DaysJuPing: "特大暴雨日数距平",
  },
};
const tenAreaStatics = {
  sumPre: { maxPre: "最大降水量", avgPre: "平均降水量" }, //累计降水
  // pre4Avg: { preJuPing: '最大降水距平' },//降水距平
  // rainDays: { maxPreDays: '最大降水日数' },//降水日数
  preIfGtExt: { overHisPreNum: "突破极值站点数" }, //降水量突破极值
  maxHighTemp: { maxTemp: "区域最高", highTempNum: "高温站点数", highTempStaScale: "高温站点" }, //最高气温最大值
  minLowTemp: { minTemp: "区域最低", lowTempNum: "低温站点数", lowTempStaScale: "低温站点" }, //最低气温最小值
  bigWindDays: { maxBigWindDay: "大风日数", bigWindArea: "大风面积" }, //大风日数
  smallWindDays: { maxSmallWindDay: "小风日数" }, //小风日数
  extWindIfGtExt: { overHisExtWindNum: "突破极值站点数" }, //极大风突破极值
  fogDays: { maxFogDays: "大雾日数", fogArea: "大雾面积" }, //大雾日数
  hazeDays: { maxHazeDays: "霾日数", hazeArea: "霾面积" }, //霾日数
  sandDays: { maxSandDays: "沙尘日数", sandArea: "沙尘面积" }, //沙尘日数
  snowDays: { maxWeaSnowDays: "降雪日数", snowArea: "降雪面积" }, //降雪日数
  freezingRainDays: { maxRainDays: "冻雨日数", rainArea: "冻雨面积" }, //冻雨日数
  thunderDays: { maxThunderDays: "雷暴日数", thunderArea: "雷暴面积" }, //雷暴日数
  maxSnowDeep: {
    maxSnowDeep: "最大积雪深度",
    maxSnow1cmNum: "大于1cm站点数",
    maxSnow1cmScale: "大于1cm站点",
    maxSnow5cmNum: "大于5cm站点数",
    maxSnow5cmScale: "大于5cm站点",
    maxSnow10cmNum: "大于10cm站点数",
    maxSnow10cmScale: "大于10cm站点",
    maxSnow25cmNum: "大于25cm站点数",
    maxSnow25cmScale: "大于25cm站点",
    maxSnowArea: "最大积雪深度",
  }, //雷暴日数

  maxExtWind: { maxExtWind: "最大阵风" },
  maxAvgWind: { maxAvgWind: "最大平均风" },
  maxTemp: { maxTemp: "最高气温" },
  minTemp: { minTemp: "最低气温" },
  avgTemp: { avgTemp: "平均气温" },
  temp4Avg: { temJuPing: "气温距平" },
  minFirstFrostTime: { minFirstFrostTime: "最小初霜冻日" },
};
const splitNumber = ref(5);
const intervalNumRef = ref(1);
const minYaValueRef = ref(undefined);
const maxYaValueRef = ref(undefined);
const isOpenGraphic = ref(false);
const isShowTextValue = ref(true);
const cacheimgSize = ref(20);
const cacheVagdata = ref([]);
const intervalColor = ["transparent"];
const rotateValue = ref(0);
const myChart = ref(null);
const changeTitleName = (e) => {
  echartsData.title = e.target.innerHTML;
};
const areaGraphicChange = () => {
  echartsData.xaxis = [];
  echartsData.yaxis = [];
  initMyChart();
};
const getyUint = () => {
  indexCheckedEleObjArr.value.forEach((element) => {
    if (element.elementKey == configObj.elementMark[0]) {
      echartsData.yDataUnit = element.elementName + "(" + element.unit + ")";
      echartsData.yUnit = element.unit;
      echartsData.title = element.elementName;
    }
  });

  if (configObj.elementMark[0] == "ifFog") {
    echartsData.yDataUnit = "出现大雾小时数(h)";
    echartsData.title = "出现大雾小时数";
  } else if (configObj.elementMark[0] == "ifHaze") {
    echartsData.yDataUnit = "出现霾小时数(h)";
    echartsData.title = "出现霾小时数";
  } else if (configObj.elementMark[0] == "ifSand") {
    echartsData.yDataUnit = "出现沙尘小时数(h)";
    echartsData.title = "出现沙尘小时数";
  } else if (configObj.elementMark[0] == "ifSnow") {
    echartsData.yDataUnit = "出现降雪小时数(h)";
    echartsData.title = "出现降雪小时数";
  } else if (configObj.elementMark[0] == "ifRain") {
    echartsData.yDataUnit = "出现冻雨小时数(h)";
    echartsData.title = "出现冻雨小时数";
  } else if (configObj.elementMark[0] == "ifThunder") {
    echartsData.yDataUnit = "出现雷暴小时数(h)";
    echartsData.title = "出现雷暴小时数";
  }
  if (prop.dataStatisType === "station") {
    if (configObj.timeOption == "cnYear") {
      echartsData.title = "";
    } else {
      echartsData.title = echartsData.title + "站点统计图";
    }
  } else {
    echartsData.title = echartsData.title + "区域统计图";
  }
  if (echartsData.yDataUnit.indexOf("mm") > -1 || echartsData.yDataUnit.indexOf("cm") > -1) {
    chartType.value = "bar";
  } else {
    chartType.value = "line";
  }
  if (echartsData.yDataUnit.length > 4) {
    echartsData.yDataUnitStyle = [0, 0, 0, echartsData.yDataUnit.length - 3 * 6];
  }
  if (chartType.value == "line") {
    echartsData.boundaryGap = true;
  } else {
    echartsData.boundaryGap = true;
  }
};
const getChartData = async () => {
  chartLoading.value = true;
  let url = "";
  if (prop.dataStatisType === "station") {
    url = requestUrl.province;
  } else {
    url = requestUrl.region;
  }
  let queryObject = JSON.parse(JSON.stringify(configObj));
  let params = JSON.parse(JSON.stringify(queryObject));
  if (prop.dataStatisType == "area" && (configObj.timeOption === "ten" || configObj.timeOption === "month" || configObj.timeOption === "year")) {
    params.sortName = "dateTimeName";
    params.sort = "ASC";
  }
  const res = await service["post"](url, params);
  chartLoading.value = false;
  const resultData =
    configObj.timeOption == "cnYear" ||
    (prop.dataStatisType === "area" && (queryObject.timeOption === "ten" || queryObject.timeOption === "month" || queryObject.timeOption === "year"))
      ? res?.data?.list.sort((a, b) => a.year - b.year)
      : res?.data?.list;
  echartsData.xaxis = [];

  //小时日值--站点与区域统计
  let hourDayStatics = [];
  let matchArr = "";
  if (prop.dataStatisType == "station") {
    //小时、日值
    if (configObj.timeOption == "hour" || configObj.timeOption == "day") {
      hourDayStatics = configObj.timeOption == "hour" ? hourStationStatics : dayStationStatics;
      for (let indexKey in hourDayStatics) {
        if (indexKey == queryObject.elementMark[0]) {
          matchArr = hourDayStatics[indexKey];
        }
      }
    }
    //旬月年--扩展
    else {
      let otherMark = configObj.otherMark || [];
      if (otherMark.length > 0) {
        //otherMark>0 存在扩展元素
        hourDayStatics = configObj.timeOption == "ten" ? tenStationStatics : monthStationStatics;
        for (let indexKey in hourDayStatics) {
          if (indexKey == queryObject.elementMark[0]) {
            matchArr = hourDayStatics[indexKey];
          }
        }
      }
    }
  } else {
    matchArr = "";
  }
  if (configObj.elementMark[0].indexOf("avg") !== -1) {
    cacheVagdata.value =
      configObj.timeOption === "cnYear" || configObj.timeOption === "ten" || configObj.timeOption === "month" || configObj.timeOption === "year"
        ? resultData[0]
        : resultData.splice(0, 1);
  } else {
    if (resultData && resultData[0].province === "全国") {
      resultData.splice(0, 1);
    }
  }
  let itemConArr = [];
  if (typeof matchArr == "string") {
    resultData?.forEach((item, index) => {
      echartsData.yaxis.push(item[queryObject.elementMark[0]]);
      if (configObj.requestType == "capitals") {
        // 新增省会城市功能查询页面
        echartsData.xaxis.push(item.city);
      }
      //站点--横坐标为站名
      else if (prop.dataStatisType == "station" && configObj.timeOption != "cnYear") {
        echartsData.xaxis.push(item.stationName);
      }
      //历年同期--横坐标为年
      else if (prop.dataStatisType == "station" && configObj.timeOption == "cnYear") {
        echartsData.xaxis.push(item["year"]);
      }
      //区域--省、区域、流域
      else {
        if (configObj.timeOption === "ten" || configObj.timeOption === "month" || configObj.timeOption === "year") {
          echartsData.xaxis.push(item["dateTimeName"]);
        } else if (configObj.requestType == "region") {
          //区域
          echartsData.xaxis.push(item["province"]);
        } else if (configObj.requestType == "basin") {
          //流域
          echartsData.xaxis.push(item["areaName"]);
        } else if (configObj.requestType == "province") {
          //全国范围
          echartsData.xaxis.push(item["province"]);
        } else if (configObj.requestType == "city") {
          //省份
          echartsData.xaxis.push(item["city"]);
        }
      }
    });
    let itemObj = {
      name: "",
      data: echartsData.yaxis,
    };
    itemConArr.push(itemObj);
  } else {
    resultData.forEach((item, index) => {
      //站点--横坐标为站名
      if (configObj.requestType == "capitals") {
        // 新增省会城市功能查询页面
        echartsData.xaxis.push(item.city);
      } else if (prop.dataStatisType == "station" && configObj.timeOption != "cnYear") {
        echartsData.xaxis.push(item.stationName);
      }

      //区域--省、区域、流域
      else {
        if (configObj.timeOption === "ten" || configObj.timeOption === "month" || configObj.timeOption === "year") {
          echartsData.xaxis.push(item["dateTimeName"]);
        } else if (configObj.requestType == "region") {
          //区域
          echartsData.xaxis.push(item["province"]);
        } else if (configObj.requestType == "basin") {
          //流域
          echartsData.xaxis.push(item["areaName"]);
        } else if (configObj.requestType == "province") {
          //全国范围
          echartsData.xaxis.push(item["province"]);
        } else if (configObj.requestType == "city") {
          //省份
          echartsData.xaxis.push(item["city"]);
        }
      }
    });
    for (let key in matchArr) {
      // 日值
      if (_extElement.includes(key)) {
        let nameVal = _nameArr[key];
        nameVal.forEach((nameItem, index) => {
          itemConArr[index] = {
            name: "",
            data: [],
          };
          itemConArr[index].name = nameItem;
        });
        resultData.forEach((item, index) => {
          let itemVal = item[key];
          let itemValArr = itemVal.split("/");
          itemValArr.forEach((cItem, cIndex) => {
            itemConArr[cIndex].data.push(itemValArr[cIndex]);
          });
        });
      } else {
        let itemObj = {
          name: matchArr[key],
          data: [],
        };
        resultData.forEach((item, index) => {
          let itemVal = item[key];
          itemObj.data.push(itemVal);
        });
        itemConArr.push(itemObj);
      }
    }
  }
  if ((itemConArr && itemConArr.length === 0) || !itemConArr) {
    return false;
  }
  rotateValue.value = echartsData.xaxis.length > 20 ? 45 : 0;
  let maxValue = Math.max(...itemConArr[0].data);
  let minValue = Math.min(...itemConArr[0].data);
  echartsData.seriesData = [];
  splitProps(itemConArr[0].data);
  itemConArr.forEach((item, index) => {
    let obj = {
      type: chartType.value,
      symbol: "circle",
      showAllSymbol: true,
      symbolSize: 8,
      barWidth: chartConfig.imgSize,
      smooth: false,
      data: item.data.map((mmvv) => {
        return {
          value: mmvv,
          label: {
            show: true,
            precision: 1,
            position: mmvv >= 0 ? "top" : "bottom",
            valueAnimation: true,
            color: "#000",
            formatter: (params) => {
              if (!isShowTextValue.value) {
                return params.value;
              }
              if (params.value === maxValue || params.value === minValue || dataClickShowArray.value.includes(params.dataIndex)) {
                return params.value;
              } else if (params.value !== 0) {
                return "";
              }
              return "";
            },
          },
        };
      }),
    };
    if (isOpenGraphic.value) {
      obj.areaStyle = {
        color: new echartsGraphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: chartConfig.imgColor,
          },
          {
            offset: 1,
            color: chartConfig.imgColor0,
          },
        ]),
      };
      obj.itemStyle = {
        color: new echartsGraphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: chartConfig.imgColor0,
          },
          {
            offset: 1,
            color: chartConfig.imgColor,
          },
        ]),
        borderColor: chartConfig.imgColor,
      };
    }
    if (item.name !== "平均值") {
      echartsData.seriesData.push(obj);
    }
  });
  const seriesObj = addAvgLine();
  seriesObj ? echartsData.seriesData.push(seriesObj) : null;
  echartsData.seriesData[0].name = echartsData.yDataUnit;
};
const splitProps = (data) => {
  //降水刻度值间隔  其他要素不做间隔
  return new Promise((resolve, reject) => {
    let intervalNum = 1;
    let maxYaValue = 0;
    let minYaValue = 0;
    if (data[0] && typeof data[0] === "object") {
      let arr = [];
      data.forEach((item) => arr.push(item.value));
      data = arr;
    }
    maxYaValue = Math.max(...data);
    minYaValue = Math.min(...data);
    // cnYear
    let currentType = configObj.elementMark[0];
    splitNumber.value = 5;
    let minA = Math.abs(minYaValue);
    let maxA = Math.abs(maxYaValue);
    if (echartsData.yDataUnit.indexOf("mm") > -1 || echartsData.yDataUnit.indexOf("cm") > -1 || currentType.indexOf("maxAvgSumTemp") > -1) {
      if (maxYaValue <= 5) {
        intervalNum = 1;
      } else if (maxYaValue <= 10) {
        intervalNum = 2;
      } else if (maxYaValue <= 21) {
        intervalNum = 3;
      } else if (maxYaValue <= 50) {
        intervalNum = 5;
      } else if (maxYaValue <= 100) {
        intervalNum = 10;
      } else if (maxYaValue <= 150) {
        intervalNum = 20;
      } else if (maxYaValue <= 200) {
        intervalNum = 25;
      } else if (maxYaValue <= 300) {
        intervalNum = 50;
      } else if (maxYaValue <= 800) {
        intervalNum = 100;
      } else if (maxYaValue <= 2000) {
        intervalNum = 200;
      } else if (maxYaValue <= 20000) {
        intervalNum = 1000;
      } else if (maxYaValue <= 60000) {
        intervalNum = 5000;
      } else {
        intervalNum = 10000;
      }
      splitNumber.value = Math.ceil(maxA / intervalNum);
    } else if (echartsData.yDataUnit.indexOf("天") > -1) {
      if (maxYaValue <= 5) {
        intervalNum = 1;
      } else if (maxYaValue <= 10) {
        intervalNum = 2;
      } else if (maxYaValue <= 21) {
        intervalNum = 3;
      } else if (maxYaValue <= 50) {
        intervalNum = 5;
      } else if (maxYaValue <= 100) {
        intervalNum = 10;
      } else {
        intervalNum = 20;
      }
      splitNumber.value = Math.ceil(maxA / intervalNum);
    } else if (echartsData.yDataUnit.indexOf("℃") > -1) {
      intervalNum = 4;
      splitNumber.value = Math.ceil(maxA / intervalNum);
    } else if (echartsData.yDataUnit.indexOf("m/s") > -1) {
      if (maxYaValue <= 15) {
        intervalNum = 5;
      } else if (maxYaValue <= 25) {
        intervalNum = 12.5;
      } else if (maxYaValue <= 50) {
        intervalNum = 25;
      } else if (maxYaValue <= 100) {
        intervalNum = 50;
      } else if (maxYaValue <= 150) {
        intervalNum = 50;
      } else if (maxYaValue <= 200) {
        intervalNum = 100;
      } else if (maxYaValue <= 250) {
        intervalNum = 150;
      } else if (maxYaValue <= 300) {
        intervalNum = 150;
      } else if (maxYaValue <= 400) {
        intervalNum = 200;
      } else if (maxYaValue <= 500) {
        intervalNum = 200;
      } else {
        intervalNum = 500;
      }
      splitNumber.value = Math.ceil(maxA / intervalNum);
    } else {
      intervalNum = 4;
      splitNumber.value = Math.ceil(maxA / intervalNum);
    }
    if (minYaValue < 0) {
      minYaValue = -1 * (Math.ceil(minA / intervalNum) * intervalNum);
    } else {
      minYaValue = Math.floor(minA / intervalNum) * intervalNum;
    }
    if (maxYaValue < 0) {
      maxYaValue = -1 * (Math.floor(maxA / intervalNum) * intervalNum);
    } else {
      maxYaValue = splitNumber.value * intervalNum;
    }
    minYaValueRef.value = minYaValue;
    maxYaValueRef.value = maxYaValue;
    intervalNumRef.value = intervalNum;
    resolve();
  });
};
const initMyChart = async (type) => {
  myChart.value = echartsInit(document.getElementById("StatisFormChart"));
  if (!type) {
    dataClickShowArray.value = [];
    await getChartData();
  } else {
    let itemConArr = JSON.parse(JSON.stringify(echartsData.seriesData));
    echartsData.seriesData = [];
    let newItemArr = [];
    if ((itemConArr && itemConArr.length === 0) || !itemConArr) {
      return false;
    }
    let maxValue = Math.max(...itemConArr[0].data);
    let minValue = Math.min(...itemConArr[0].data);
    itemConArr.forEach((item, index) => {
      let obj = {
        ...item,
        type: chartType.value,
        symbol: "circle",
        symbolSize: 8,
        showAllSymbol: true,
        barWidth: chartConfig.imgSize,
        smooth: false,
        label: {
          show: true,
          precision: 1,
          position: "top",
          valueAnimation: true,
          color: "#000",
          formatter: (params) => {
            if (!isShowTextValue.value) {
              return params.value;
            }
            if (params.value === maxValue || params.value === minValue || dataClickShowArray.value.includes(params.dataIndex)) {
              return params.value;
            } else if (params.value !== 0) {
              return "";
            }
            return "";
          },
        },
      };
      if (isOpenGraphic.value) {
        obj.areaStyle = {
          color: new echartsGraphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: chartConfig.imgColor,
            },
            {
              offset: 1,
              color: chartConfig.imgColor0,
            },
          ]),
        };
        obj.itemStyle = {
          color: new echartsGraphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: chartConfig.imgColor0,
            },
            {
              offset: 1,
              color: chartConfig.imgColor,
            },
          ]),
          borderColor: chartConfig.imgColor,
        };
      }
      if (item.name !== "平均值") {
        newItemArr.push(obj);
      }
    });
    const seriesObj = addAvgLine();
    seriesObj ? newItemArr.push(seriesObj) : "";
    echartsData.seriesData = newItemArr;
  }
  if (echartsData.xaxis.length > 10) {
    startValue.value = echartsData.xaxis[0];
    endValue.value = echartsData.xaxis[9];
  }
  if (configObj.timeOption !== "cnYear") {
    let title = echartsData.title.split("（")[0];
    switch (configObj.timeOption) {
      case "hour":
        title += `（${moment(configObj.startTime).format("MM") || "-"}月${moment(configObj.startTime).format("DD") || "-"}日${moment(configObj.startTime).format("HH") || ""}时~${moment(configObj.endTime).format("MM") || "-"}月${moment(configObj.endTime).format("DD") || "-"}日${moment(configObj.endTime).format("HH") || "-"}时）`;
        break;
      case "day":
        title += `（${moment(configObj.startTime).format("MM") || "-"}月${moment(configObj.startTime).format("DD") || "-"}日~${moment(configObj.endTime).format("MM") || "-"}月${moment(configObj.endTime).format("DD") || "-"}日）`;
        break;
      case "ten":
        let tenStartDay = moment(configObj.startTime).format("DD");
        let tenEndDay = moment(configObj.endTime).format("DD");
        title += configObj.isMoreTime
          ? `（${moment(configObj.startTime).format("YYYY") || "-"}年${moment(configObj.startTime).format("MM") || "-"}月${tenDataList[tenStartDay] || ""}~${moment(configObj.endTime).format("YYYY") || "-"}年${moment(configObj.endTime).format("MM") || "-"}月${tenDataList[tenEndDay] || "-"}日）`
          : `（${moment(configObj.endTime).format("YYYY") || "-"}年${moment(configObj.endTime).format("MM") || "-"}月${tenDataList[tenEndDay] || "-"}日）`;
        break;
      case "month":
        title += configObj.isMoreTime
          ? `（${moment(configObj.startTime).format("YYYY") || "-"}年${moment(configObj.startTime).format("MM") || "-"}月~${moment(configObj.endTime).format("YYYY") || ""}年${moment(configObj.endTime).format("MM") || "-"}月）`
          : `（${moment(configObj.endTime).format("YYYY") || ""}年${moment(configObj.endTime).format("MM") || "-"}月）`;
        break;
      case "year":
        title += configObj.isMoreTime
          ? `（${moment(configObj.startTime).format("YYYY") || "-"}年~${moment(configObj.endTime).format("YYYY") || "-"}年）`
          : `（${moment(configObj.endTime).format("YYYY") || ""}年）`;
        break;
    }
    echartsData.title = title;
  } else {
    let titleName = "";
    indexCheckedEleObjArr.value.filter((item) => {
      if (item.elementKey === configObj.elementMark[0]) {
        titleName = item.elementName;
      }
    });
    echartsData.title = `${configObj.startYear || "-"}年~${configObj.endYear || "-"}年 ${titleName} （${configObj.startMon || "-"}月${configObj.startDay || ""}日~${configObj.endMon || "-"}月${configObj.endDay || ""}日）`;
  }
  rotateValue.value = echartsData.xaxis.length > 20 ? 45 : 0;

  await splitProps(echartsData.seriesData[0].data);
  echartsData.seriesData[0].name = echartsData.yDataUnit;
  let interval = "auto";
  if (echartsData.xaxis.length > 40) {
    interval = 3;
  } else if (prop.dataStatisType == "area" || echartsData.xaxis.length > 15) {
    interval = 0;
  }
  const option = {
    color: [chartConfig.imgColor, "#91CC75", "#EE6666"],
    legend: {
      data: [echartsData.yDataUnit],
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255,255,255,1)",
      borderWidth: 1,
      borderColor: chartConfig.imgColor,
      formatter: function (params, ticket, callback) {
        return ` ${params[0].name}: <span style='color:${_chartConfig.imgColor};font-weight:bold'>${params[0].value}</span> ${_echartsData.yUnit}`;
      },
      textStyle: {
        color: "#000",
        fontSize: 14,
        fontFamily: "MicrosoftYaHei",
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: echartsData.boundaryGap,
      data: echartsData.xaxis,
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        interval: interval,
        formatter: (value) => {
          if (prop.dataStatisType == "area" && echartsData.xaxis.length <= 11) {
            return value;
          } else if (value.length > 5 && echartsData.xaxis.length < 32) {
            value = value.slice(0, 5) + "\n" + value.slice(5);
          }
          return value;
        },
        fontSize: chartConfig.fontSize,
        rotate: rotateValue,
        color: chartConfig.fontColor,
        fontFamily: chartConfig.fontFaimly,
        fontStyle: chartConfig.fontStyle == "qingxie" ? "italic" : "normal",
        fontWeight: chartConfig.fontStyle == "jiacu" ? "bold" : "normal",
      },
      axisLine: {
        lineStyle: {
          color: "#000",
          width: 1,
        },
      },
      splitLine: {
        show: true,
        interval: "auto",
        lineStyle: {
          color: intervalColor,
          width: 1,
          type: "dashed",
        },
      },
    },
    yAxis: {
      name: echartsData.yDataUnit,
      type: "value",
      min: minYaValueRef.value,
      max: maxYaValueRef.value,
      splitNumber: splitNumber.value,
      minInterval: intervalNumRef.value,
      nameTextStyle: {
        padding: echartsData.yDataUnitStyle,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#000",
          width: 1,
        },
      },
      axisLabel: {
        show: true,
        interval: 0,
        formatter: "{value} ",
        color: chartConfig.fontColor,
        fontSize: chartConfig.fontSize,
        fontFamily: chartConfig.fontFaimly,
        fontStyle: chartConfig.fontStyle == "qingxie" ? "italic" : "normal",
        fontWeight: chartConfig.fontStyle == "jiacu" ? "bold" : "normal",
      },
      splitLine: {
        show: true,
        interval: "auto",
        lineStyle: {
          color: ["#333"],
          width: 0,
          type: "dashed",
        },
      },
    },
    grid: {
      bottom: "10px",
      left: (echartsData.yDataUnit.length - 3) * 12 + "px",
      right: configObj.elementMark[0].indexOf("avg") > -1 ? "60px" : "10px",
      containLabel: true,
    },
    series: echartsData.seriesData,
  };
  // if(!type){
  //   if(echartsData.xaxis.length>10){
  //     option.dataZoom = [{
  //         startValue: startValue,
  //         endValue:endValue,
  //         height: '1%',
  //         bottom: '2.5%',
  //         fillerColor:'#E0E0E0',
  //         filterMode: 'none',
  //         zoomLock: false,
  //     }, {
  //         type: 'inside',
  //         filterMode: 'none',
  //     }]
  //   }else{
  //     option.grid = {
  //       bottom: "10px",
  //       left: "20px",
  //       right: "10px",
  //       containLabel: true,
  //     }
  //   }
  // }

  myChart.value.setOption(option, true);
  myChart.value.off("click").on("click", function (params) {
    if (dataClickShowArray.value.includes(params.dataIndex)) {
      dataClickShowArray.value.splice(
        dataClickShowArray.value.findIndex((item) => item === params.dataIndex),
        1
      );
    } else {
      dataClickShowArray.value.push(params.dataIndex);
    }
    myChart.value.setOption(option, true);
  });
  window.onresize = () => {
    setTimeout(myChart.value?.resize, 500);
  };
};
const addAvgLine = () => {
  let newItemObj = {};
  let ysflag = configObj.elementMark[0];
  if (ysflag.indexOf("avg") !== -1 && configObj.timeOption !== "ten" && configObj.timeOption !== "month" && configObj.timeOption !== "year") {
    let cacheVagdataArr = [];
    let valueMark = "";
    let avgname = "均值";
    if (configObj.timeOption === "cnYear") {
      if (ysflag.indexOf("Pre") > -1) {
        valueMark = cacheVagdata.value.oldAvgPre;
      } else if (ysflag.indexOf("Temp") > -1) {
        valueMark = cacheVagdata.value.oldAvgTemp;
      }
    } else {
      valueMark = cacheVagdata.value[0][ysflag];
    }
    if (valueMark) {
      cacheVagdataArr.push(valueMark);
      newItemObj = {
        name: "平均值",
        type: "line",
        symbol: "none",
        itemStyle: { borderColor: "none" },
        markLine: {
          data: [{ type: "average", name: "平均值" }],
          symbol: ["none", "none"],
          position: "startTopCenter",
          itemStyle: {
            normal: {
              lineStyle: {
                type: "soild",
                width: 2,
                color: "#91CC75",
              },
              label: {
                show: true,
                position: "end",
                fontSize: 10,
                color: "#000",
                formatter: function (params) {
                  return avgname + " : " + params.value;
                },
              },
            },
          },
          large: true,
          effect: {
            show: false,
            loop: true,
            period: 0,
            scaleSize: 2,
            color: null,
            shadowColor: null,
            shadowBlur: null,
          },
        },
        data: cacheVagdataArr,
      };
    }
    return newItemObj;
  }
  return false;
};
const ChangechartType = () => {
  echartsData.xaxis = [];
  echartsData.yaxis = [];
  initMyChart();
};
//保存
const getVariThematics = () => {
  if (!myChart.value) return;
  // var base64 = myChart.value.getDataURL()
  // base64 = base64.split('data:image/png;base64,')[1]

  // // 创建 blob 对象
  // var byteCharacters = atob(base64);
  // var byteNumbers = new Array(byteCharacters.length)
  // for (var i = 0; i < byteCharacters.length; i++) {
  //   byteNumbers[i] = byteCharacters.charCodeAt(i)
  // }
  // var byteArray = new Uint8Array(byteNumbers);
  // var blob = new Blob([byteArray], { type: 'application/octet-stream' })

  // // 下载
  // var fileName = `${configObj.elementMark[0]}.png`
  // var downloadElement = document.createElement('a')
  // downloadElement.style.display = 'none'
  // var href = window.URL.createObjectURL(blob) // 创建下载的链接
  // downloadElement.href = href
  // downloadElement.download = fileName // 下载后文件名
  // downloadElement.click() // 点击下载
  // window.URL.revokeObjectURL(href) // 释放掉blob对象
  window.setTimeout(() => {
    html2canvas(document.getElementById("variThematics"), {
      async: false,
      allowTaint: false,
      taintTest: false,
      useCORS: true,
    }).then((cvs) => {
      let context = cvs.getContext("2d");
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;
      let imageblobUrl = cvs.toDataURL("image/png");
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = imageblobUrl;
      link.setAttribute("download", configObj.elementMark[0] + ".jpg");
      document.body.appendChild(link);
      link.click();
    });
  }, 0);
};
//预览
const changeSizeValue = (value) => {
  if (value === 70) {
    cacheimgSize.value = chartConfig.imgSize;
    chartConfig.imgSize = 10;
  } else if (value === 10) {
    cacheimgSize.value = chartConfig.imgSize;
    chartConfig.imgSize = 30;
  } else if (value === 20) {
    cacheimgSize.value = chartConfig.imgSize;
    chartConfig.imgSize = 20;
  } else {
    chartConfig.imgSize = cacheimgSize.value;
  }
  previewImage();
};
const previewImage = (type) => {
  //改变图形标注
  if (type == "imgSize") {
    initMyChart(type);
    return;
  }
  getyUint();
  echartsData.xaxis = [];
  echartsData.yaxis = [];
  // 定时器-解决echarts容器宽度变化的延迟
  setTimeout(() => {
    initMyChart();
  }, 0);
};
watch(
  chartConfig,
  (n, o) => {
    if (o) {
      if (o.imgColor != n.imgColor) {
        chartConfig.imgColor0 = chartConfig.imgColor.replace("rgb", "rgba").replace(")", ", 0.1)");
      }
      initMyChart("changeStyle");
    }
  },
  { deep: true }
);
const titleNameEdit = computed(() => {
  if (echartsData.title) {
    return echartsData.title;
  }
});
onMounted(() => {
  indexCheckedEleObjArr.value = [];

  let statisStaObj;
  if (prop.dataStatisType == "station") {
    statisStaObj = JSON.parse(JSON.stringify(prop.staticsSearchObj.statisStaObj));
    if (prop.staticsSearchObj.statisStaObj.requestType === "capitals") {
      statisStaObj.timeOption !== "cnYear" ? (statisStaObj.size = 70) : null;
      statisStaObj.timeOption !== "cnYear" ? (statisStaObj.sizeLength = prop.staticsSearchObj.statisStaObj.size) : null;
    } else {
      statisStaObj.timeOption !== "cnYear" ? (statisStaObj.size = 10) : null;
      statisStaObj.timeOption !== "cnYear" ? (statisStaObj.sizeLength = 10) : null;
    }
    //选中的统计要素对象
    let elementMark = statisStaObj.elementMark; //当前时间尺度选中的统计要素
    let indexTimeScaleArr = prop.staticsSearchObj.indexTimeScaleArr; //当前时间尺度所有的要素
    if (statisStaObj.isMoreTime) {
      for (let i = 0; i < indexTimeScaleArr.length; i++) {
        for (let j = 0; j < elementMark.length; j++) {
          if (indexTimeScaleArr[i].elementKey == elementMark[j]) {
            indexCheckedEleObjArr.value.push(indexTimeScaleArr[i]);
          }
        }
      }
    } else {
      //单-旬月年
      let hourDayStatics = statisStaObj.timeOption == "ten" ? tenStationStatics : monthStationStatics;
      let otherMark = statisStaObj.otherMark;

      //获取-统计要素
      for (let i = 0; i < indexTimeScaleArr.length; i++) {
        for (let j = 0; j < elementMark.length; j++) {
          if (indexTimeScaleArr[i].elementKey == elementMark[j]) {
            indexCheckedEleObjArr.value.push(indexTimeScaleArr[i]);
          }
        }
      }

      //获取-统计要素对应的扩展要素
      let ccc, ddd, eee, yyy;
      for (let j = 0; j < elementMark.length; j++) {
        ccc = hourDayStatics[elementMark[j]];
        eee = elementMark[j];

        for (let xx = 0; xx < indexCheckedEleObjArr.value.length; xx++) {
          if (eee == indexCheckedEleObjArr.value[xx].elementKey) {
            yyy = indexCheckedEleObjArr.value[xx];
          }
        }

        if (ccc) {
          for (let ff = 0; ff < otherMark.length; ff++) {
            ddd = ccc[otherMark[ff]];
            if (ddd) {
              let sss = JSON.parse(JSON.stringify(yyy));
              sss.elementKey = Object.keys(ddd)[0];
              sss.elementName = Object.values(ddd)[0];
              indexCheckedEleObjArr.value.push(sss);
            }
          }
        }
      }
    }
  } else {
    let tongjiList = prop.staticsSearchObj?.statisAreaObj?.timeOption == "hour" ? hourAreaStatics : dayAreaStatics;
    if (prop.staticsSearchObj?.statisAreaObj?.timeOption !== "hour" && prop.staticsSearchObj?.statisAreaObj?.timeOption !== "day") {
      tongjiList = tenAreaStatics;
    }

    statisStaObj = JSON.parse(JSON.stringify(prop.staticsSearchObj?.statisAreaObj || {}));
    let e;
    //选中的统计要素对象
    let elementMark = statisStaObj.elementMark; //当前时间尺度选中的统计要素
    let indexTimeScaleArr = prop.staticsSearchObj.indexTimeScaleArr; //当前时间尺度所有的要素
    for (let i = 0; i < indexTimeScaleArr.length; i++) {
      for (let j = 0; j < elementMark.length; j++) {
        if (indexTimeScaleArr[i].elementKey == elementMark[j]) {
          let d = indexTimeScaleArr[i].elementKey;
          e = tongjiList[d];
          if (e) {
            for (let key in e) {
              let c = JSON.parse(JSON.stringify(indexTimeScaleArr[i]));
              c.elementKey = key;
              c.elementName = e[key];
              indexCheckedEleObjArr.value.push(c);
            }
          }
        }
      }
    }
  }
  if (statisStaObj.sizeLength < 15) {
    chartConfig.imgSize = 30;
  } else if (statisStaObj.sizeLength <= 36) {
    chartConfig.imgSize = 20;
  } else if (statisStaObj.sizeLength > 36) {
    chartConfig.imgSize = 10;
  }
  // chartConfig.imgSize = statisStaObj.size > 36 ? 10 : 20
  cacheimgSize.value = chartConfig.imgSize;
  for (let key in statisStaObj) {
    configObj[key] = statisStaObj[key];
  }
  configObj.elementMark = [];
  configObj.elementMark.push(indexCheckedEleObjArr.value.length > 0 ? indexCheckedEleObjArr.value[0].elementKey : "");

  for (let key in prop.staticsSearchObj.requestUrl) {
    requestUrl[key] = prop.staticsSearchObj.requestUrl[key];
  }
  getyUint();
  nextTick(() => {
    initMyChart();
  });
});
</script>

<style lang="scss">
.dataStatisForm {
  // background: url(~@/assets/image/IntellectStatistics/dialogBg.png) no-repeat right bottom;
  .chartBox {
    position: relative;
    padding: 0 5px 12px 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    // border: rgba(0, 0, 0, 1) 1px solid;
    // border-image: linear-gradient(0deg, rgba(53, 165, 237, 0), rgba(53, 165, 237, 1)) 1 1;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    .tipschartTitleClass {
      color: #999;
      margin: 10px;
    }
    .chartTitleClass {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: #4f4f4f;
      margin-top: 10px;
    }
    .StatisFormChart {
      height: 40vh;
      // background: url(~@/assets/image/IntellectStatistics/dialogEcharts.png) no-repeat left bottom;
    }
    // .btnGroup {
    //   position: absolute;
    //   right: 10px;
    //   top: 10px;
    //   // z-index: 20;
    //   .typeBtn{
    //     height:20px;
    //     width:20px;
    //     margin-right:10px;
    //     cursor: pointer;
    //     &:active {
    //       // box-shadow: 2px 2px 2px #000;
    //     }
    //   }
    // }
  }

  .fTop {
    padding: 10px 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, #f1faff 100%);
    border: 1px solid;
    border-image: linear-gradient(0deg, rgba(53, 165, 237, 0), rgba(53, 165, 237, 1)) 1 1;
    .formRow {
      display: flex;
      justify-content: none;
      padding: 3px 30px;
      .fontFaimlyClass,
      .staEle {
        width: 100px;
      }
      .el-select {
        margin: 0 10px 0 0;
      }
      .chartImgColor {
        margin-left: 10px;
      }
      .el-form-item {
        margin-bottom: 0px;
        &:first-child {
          width: 380px;
        }
        &:nth-child(2n) {
          width: 260px;
        }
        &.elementMarkStationStyle {
          width: 240px;
          .elementMarkSelect {
            width: 150px;
          }
        }
      }
      .el-input-number.is-controls-right {
        .el-input__wrapper {
          padding-left: 0;
          padding-right: 20px;
          .el-input__inner {
            text-align: left;
          }
        }
      }

      &:first-child {
        border-bottom: 1px dashed #dcdcdc;
      }
    }
  }

  .el-form-item__label {
    font-size: 14px;
    font-family:
      PingFangSC-Regular,
      PingFang SC;
    font-weight: 400;
    color: #5d677d;
    // width: 130px !important;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      left: -20px;
      top: 12px;
      background: url("~@/assets/image/common/titleIcon.png") no-repeat left center;
      background-size: 100% 100%;
    }
  }
  .el-form-item__content {
    display: flex;
    align-items: center;
    height: 32px;
    .chartImgSize,
    .chartFontSize {
      width: 60px;
      .el-input-number__increase,
      .el-input-number__decrease {
        width: 20px;
      }
      .el-input__inner {
        padding-left: 6px;
        padding-right: 0px;
      }
    }
    .chartImgSize {
      margin-right: 10px;
    }
    .chartFontStyle {
      width: 60px;
      margin-left: 10px !important;
    }
  }
  .chartBtn {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    .previewImageClass {
      // background: #EAF5FB;
      // border: 1px solid #3197d9;
      width: 70px;
      // color: #2F71E3;
      background: rgba(49, 151, 217, 0.1);
      border-radius: 2px;
      border: 1px solid #155edc;
      color: #155edc;
      &:hour {
        color: #155edc;
      }
    }
    .saveImageClass {
      margin: 0 auto;
      width: 70px;
      background: linear-gradient(180deg, #548ef3 0%, #0b56d9 100%);
      border-radius: 2px;
      border: 1px solid;
      border-image: linear-gradient(360deg, rgba(0, 168, 255, 1), rgba(28, 81, 121, 1)) 1 1;
    }
  }
}
.otherNum {
  width: 100px;
}
.xiahuanxian {
  .el-input--suffix .el-input__inner {
    font-weight: 500;
    text-decoration: underline;
  }
}
.jiacu {
  .el-input--suffix .el-input__inner {
    font-weight: 600;
  }
}
.qingxie {
  .el-input--suffix .el-input__inner {
    font-style: italic;
  }
}
.xiahuanxian {
  font-weight: 500;
  text-decoration: underline;
}
.jiacu {
  font-weight: 600;
}
.qingxie {
  font-style: italic;
}
.staticsFontColor {
  .el-color-dropdown__value,
  .el-color-dropdown__link-btn {
    display: none !important;
  }
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  border: none;
}

/* 滚动条两端 */
::-webkit-scrollbar-button {
  background-color: transparent;
}

/* 滚动部分颜色 */
::-webkit-scrollbar-track-piece {
  background: selScrollBar;
}

/* 滚动条里面可以拖动的那部分 */
::-webkit-scrollbar-thumb {
  background: rgba(216, 216, 216, 0.8);
  border-radius: 5px;
}
</style>
