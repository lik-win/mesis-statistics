<!--  -->
<template>
  <div class="statistical-analysis">
    <PointChoose
      @setPointObj="setPointObj"
      @clickStation="clickStation"
      @stationIdChange="stationIdChange"
      :checkedTimeKey="statisticObjType.checkedTimeKey"
      :staType="resultData.queryData.staType"
      :stationQuery="stationQuery"
    ></PointChoose>
    <div class="contentResult">
      <!-- 顶部--查询条件 -->
      <SearchInfo
        ref="searchInfoRef"
        :queryData="resultData.queryData"
        :pointAreaType="pointObj"
        @getSearchInfo="getSearchInfo"
        @setstatisticObjType="setstatisticObjType"
        @getTimeScale="getTimeScale"
        @getStationMng="getStationMng"
      />
      <!-- 消息 -->
      <NewDataScroll :staDescription="staDescription" />
      <!-- 底部查询表格--查询结果集合 -->
      <ResultTable
        :resultData="resultData"
        :statisticObjType="statisticObjType"
        :pointAreaType="pointObj"
        ref="resTableRef"
        :timeScaleArr="timeScaleArr"
        @setDescription="getDescription"
      />
    </div>
  </div>
  <StationManage :isShow="stationViewVisible" :stationQuery="stationQuery" @close="stationViewVisible = false" @stationIdChange="stationIdChange" />
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, provide } from "vue";
import { ElMessage } from "element-plus";
import PointChoose from "./PointChoose.vue";
import SearchInfo from "./SearchInfo.vue";
import NewDataScroll from "./NewDataScroll.vue";
import ResultTable from "./ResultTable.vue";
import StationManage from "./StationManage.vue";
const props = defineProps({ ip: String });
provide("ip", props.ip);
const emit = defineEmits([]);

let resultData = reactive({
  isYearRound: false, // 根据查询条件中的常年同期变化
  requestUrl: "",
  queryData: {
    staType: "",
  },
});
const timeScaleArr = ref([]);
const pointAreaType = "";
let pointObj = reactive({});
const statisticObjType = reactive({
  checkedTimeKey: "",
  checkedMethodKey: "",
});
//描述信息
const staDescription = ref("");
const stanoIDS = ref([]);
const staIDS = ref([]);
let stationQuery = reactive({});
const stationViewVisible = ref(false);
const resTableRef = ref(null);
const searchInfoRef = ref(null);

//获取统计时间尺度和统计方式的类型
const setstatisticObjType = (value) => {
  if (!value) return;
  for (let key in value) {
    statisticObjType[key] = value[key];
  }
};
// 获取站点信息 类型 与 查询id
const setPointObj = (obj) => {
  if ((obj.latLons && obj.latLons.length > 0) || Number(pointObj.lon1) > 0 || Number(pointObj.lon2) > 0) {
    // 地图框选
    staIDS.value = [];
  }
  pointObj = obj;
  // resTableRef.value?.refreashTable(); //切换左侧菜单先制空右侧内容
  /* if (resultData.requestUrl) {
        resultData.type = "search";
        getSearchInfo(resultData);
      } */
};
const stationIdChange = (value) => {
  console.log(value);
  staIDS.value = value.ids;
  stanoIDS.value = value.noIds;
};
const clickStation = () => {
  if (searchInfoRef.value && searchInfoRef.value.searchStatisData) {
    searchInfoRef.value.searchStatisData("station");
  }
};
const getStationMng = (obj) => {
  if (pointObj.type === "province") {
    obj.queryData = {
      ...obj.queryData,
      areaCode: pointObj.id,
      areaName: pointObj.name,
      areaMark: "",
    };
  } else if (pointObj.type === "county") {
    obj.queryData = {
      ...obj.queryData,
      areaCode: "",
      areaMark: pointObj.id,
      areaName: pointObj.name,
    };
  } else if (pointObj.type === "mark") {
    obj.queryData = {
      ...obj.queryData,
      areaCode: "",
      areaMark: pointObj.id,
      areaName: pointObj.name,
    };
  } else if (pointObj.type === "map") {
    obj.queryData = {
      ...obj.queryData,
      areaCode: "",
      areaMark: "",
      areaName: "",
      lon1: pointObj.lon1, //相对小的经度
      lon2: pointObj.lon2, //相对大的经度
      lat1: pointObj.lat1, //相对小的纬度
      lat2: pointObj.lat2, //相对大的纬度
      latLons: pointObj.latLons, // 多边形的数据
    };
  } else if (pointObj.type === "capitals") {
    // 新增省会城市功能查询页面
    obj.queryData = {
      ...obj.queryData,
      areaCode: pointObj.id,
      areaMark: "",
      areaName: pointObj.name,
    };
  } else {
    console.log(pointObj);
  }
  // if (staIDS.value.length > 0) {
  //   obj.queryData.ids = staIDS.value
  // }
  // if (stanoIDS.value.length > 0) {
  //   obj.queryData.noIds = stanoIDS.value
  // }
  if (pointObj.type == "province" && pointObj.id == "0") {
    obj.queryData.requestType = "province";
  } else if (pointObj.type == "province") {
    if (obj.queryData.timeOption === "ten" || obj.queryData.timeOption === "month" || obj.queryData.timeOption === "year") {
      obj.queryData.requestType = "province";
    } else {
      obj.queryData.requestType = "city";
    }
  } else if (pointObj.type == "county") {
    obj.queryData.requestType = "county";
  } else if (pointObj.type == "map") {
    obj.queryData.requestType = "range";
  } else if (pointObj.type == "mark") {
    obj.queryData.requestType = pointObj.objtype;
  } else {
    obj.queryData.requestType = pointObj.type;
  }
  stationQuery = obj.queryData;
  stationQuery.requestUrl = obj.requestUrl;
  stationViewVisible.value = true;
};
// 查询条件  requestUrl（接口地址）  queryData（查询条件）
const getSearchInfo = (obj, type) => {
  console.log(pointObj);
  if (obj.type === "set") {
    resTableRef.value.cacheArea = JSON.parse(JSON.stringify(pointObj));
    resultData = obj;
  } else {
    if (type == "refreash") {
      resTableRef.value?.refreashTable(resultData);
      return;
    }
    resTableRef.value.cacheArea = JSON.parse(JSON.stringify(pointObj));
    resultData = obj;
    if (pointObj.type === "province") {
      obj.queryData = {
        ...obj.queryData,
        areaCode: pointObj.id,
        areaName: pointObj.name,
        areaMark: "",
      };
    } else if (pointObj.type === "county") {
      obj.queryData = {
        ...obj.queryData,
        areaCode: pointObj.id,
        areaName: pointObj.name,
        areaMark: "",
      };
    } else if (pointObj.type === "mark") {
      obj.queryData = {
        ...obj.queryData,
        areaCode: "",
        areaMark: pointObj.id,
        areaName: pointObj.name,
      };
    } else if (pointObj.type === "map") {
      obj.queryData = {
        ...obj.queryData,
        areaCode: "",
        areaMark: "",
        areaName: "",
        lon1: pointObj.lon1, //相对小的经度
        lon2: pointObj.lon2, //相对大的经度
        lat1: pointObj.lat1, //相对小的纬度
        lat2: pointObj.lat2, //相对大的纬度
        latLons: pointObj.latLons, // 多边形的数据
      };
    } else if (pointObj.type === "capitals") {
      // 新增省会城市功能查询页面
      obj.queryData = {
        ...obj.queryData,
        areaCode: pointObj.id,
        areaMark: "",
        areaName: pointObj.name,
      };
    } else {
      console.log(pointObj);
    }
    obj.queryData.ids = [];
    obj.queryData.noIds = [];
    if (staIDS.value.length > 0) {
      obj.queryData.ids = staIDS.value;
    }
    if (stanoIDS.value.length > 0) {
      obj.queryData.noIds = stanoIDS.value;
    }
    // 对查询条件进行校验
    // 1 时间范围
    let queryData = resultData.queryData;
    if (queryData.startTime === "" || queryData.endTime === "") {
      type !== "init"
        ? ElMessage({
            type: "warning",
            message: "请选择【时间范围】",
          })
        : null;
      return;
    }
    // 2 统计要素不可为空
    if (queryData.elementMark.length === 0) {
      type !== "init"
        ? ElMessage({
            type: "warning",
            message: "请选择【统计要素】",
          })
        : null;
      return;
    }
    // 3 重置排序字段  统计要素变化，可能出现存储的排序字段与统计要素不符
    queryData.sort = "";
    queryData.sortName = "";
    queryData.page = 1;
    resultData.queryData = queryData;
    resTableRef.value?.setPointStationData(resultData, "init");
  }
};
const getTimeScale = (obj) => {
  timeScaleArr.value = obj;
};
//获取描述信息
const getDescription = (msg) => {
  staDescription.value = msg;
};

onMounted(() => {});
onBeforeUnmount(() => {});
</script>
<style lang="scss" scoped>
.statistical-analysis {
  display: flex;
  height: 100%;
  .contentResult {
    // display: flex;
    // flex-direction: column;
    min-height: 600px;
    overflow: auto;
    overflow-x: hidden;
    margin: 0 0 2px 2px;
    width: calc(100% - 190px);
  }
  .contentClass {
    position: relative;
    // height: 91.2vh;
    height: calc(100% - 28px);
    width: 100vw;
    background: url("@/assets/pic/statistical-analysis/contentBG.png");
    background-size: 100%;
    display: flex;
    .contentResult {
      display: flex;
      flex-direction: column;
      margin: 1vh;
      margin-top: 0;
      width: calc(100vw - 187px - 2vh);
    }
  }
  .resultTableCon {
    display: flex;
    width: 100%;
    margin-top: 1vh;
    height: calc(91.2vh - 39vh);
    .leftTable {
      width: 50%;
      margin-right: 1vh;
    }
    .rightTable {
      width: 50%;
    }
  }
}
</style>
