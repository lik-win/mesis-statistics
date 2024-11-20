<template>
  <div class="pointChoose">
    <div class="pointTitle">
      <img src="@/assets/pic/statistical-analysis/zhandianxuanze.png" />
    </div>
    <el-scrollbar class="pointContent" v-if="checkedTimeKey != 'dayIndex'">
      <div class="pointCon">
        <div
          v-if="comCode.comCode == '0'"
          :class="['singleTitle countryTitle', pointObj.id === '0' ? 'activeTitle' : '']"
          style="border: none"
          @click="searchPABData(countyObj)"
        >
          全国范围
        </div>
        <div
          v-else
          :class="['singleTitle countryTitle', pointObj.id == comCode.comCode ? 'activeTitle' : '']"
          style="border: none"
          @click="searchPABData(provinceObj)"
        >
          全省
        </div>
        <!-- 新增省会城市功能查询页面 -->
        <div
          v-if="comCode.comCode == '0'"
          :class="['singleTitle countryTitle', pointObj.id === 'capitals34' ? 'activeTitle' : '', checkedTimeKey === 'cnYear' ? 'disabledTitle' : '']"
          style="border: none"
          @click="searchPABData(cityObj)"
        >
          省会城市
        </div>
        <!-- 全国 -->
        <el-collapse v-model="activeName" class="pointCollapse">
          <el-collapse-item name="1" class="singleTitle" v-if="regionArr.length">
            <template #title>
              <div class="collapseTitle">按区域</div>
            </template>
            <el-checkbox-group v-model="checkRegionList" class="provinceContent singleContent" @change="searchPABData">
              <el-checkbox
                :class="['pointItem', pointObj.id === item.mark ? 'activePointItem' : '']"
                v-for="(item, index) in regionArr"
                :key="index"
                :label="item"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="按流域" name="2" class="singleTitle" v-if="basinArr.length">
            <template #title>
              <div class="collapseTitle">按流域</div>
            </template>
            <div class="basinContent singleContent">
              <div
                :class="['pointItem', pointObj.id === item.mark ? 'activePointItem' : '']"
                v-for="(item, index) in basinArr"
                :key="index"
                @click="searchPABData(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item v-if="comCode.comCode == '0'" title="按省份" name="3" class="singleTitle">
            <template #title>
              <div class="collapseTitle">按省份</div>
            </template>
            <el-checkbox-group v-model="checkProvinceList" class="provinceContent singleContent" @change="searchPABData">
              <el-checkbox
                :class="['pointItem', pointObj.id === item.id ? 'activePointItem' : '']"
                v-for="(item, index) in provinceArr"
                :key="index"
                :label="item"
                >{{ item.areaName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item v-else-if="cityArr.length" title="按地级市" name="5" class="singleTitle">
            <template #title>
              <div class="collapseTitle">按地级市</div>
            </template>
            <el-checkbox-group v-model="checkCityList" class="provinceContent singleContent" @change="searchPABData">
              <el-checkbox
                :class="['pointItem', pointObj.id === item.id ? 'activePointItem' : '']"
                v-for="(item, index) in cityArr"
                :key="index"
                :label="item"
                >{{ item.areaName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="自选站" v-if="false" name="4" class="singleTitle singleStationTitle">
            <template #title>
              <div class="collapseTitle">自选站</div>
            </template>
            <div class="optionalContent singleContent">
              <div class="optionalContentWrap">
                <h5><img src="@/assets/pic/statistical-analysis/checkStationIcon.png" />手动框选</h5>
                <div :class="['mapCheck pointItem', pointObj.id === 'map' ? 'activePointItem' : '']" @click="showMapSelectedDialog">地图框选</div>
                <div class="mapExtent" v-if="pointObj.id === 'map' && pointObj.lat1">
                  <div class="lonExtent">
                    <p>经度范围：</p>
                    <div class="lonValue">
                      <div class="lonText">
                        <span>{{ pointObj.lon1 }}</span>
                      </div>
                      <span>至</span>
                      <div class="lonText">
                        <span>{{ pointObj.lon2 }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="lonExtent">
                    <p>纬度范围：</p>
                    <div class="lonValue">
                      <div class="lonText">
                        <span>{{ pointObj.lat1 }}</span>
                      </div>
                      <span>至</span>
                      <div class="lonText">
                        <span>{{ pointObj.lat2 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h5><img src="@/assets/pic/statistical-analysis/checkStationIcon.png" />手动添加</h5>
                <div :class="['mapCheck pointItem']" @click="showStationMsg">手动添加</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-scrollbar>
    <div class="dayIndexClass" v-if="checkedTimeKey == 'dayIndex'">
      <h5 class="dotIconalgin-r"><img class="dotIconClass" src="@/assets/pic/statistical-analysis/titleIcon.png" alt />新增站点</h5>
      <div class="addCon">
        <el-select
          v-model="inputStationVal"
          size="small"
          placeholder="站名或站号"
          filterable
          remote
          style="width: 200px"
          :remote-method="remoteLikeStationName1"
          @change="formatterInputvalue"
        >
          <el-option v-for="item in inputStationList" :key="item.stationId" :value="item.stationId" :label="item.stationName"
            >{{ item.stationId }}/{{ item.stationName }}</el-option
          >
        </el-select>
        <!-- <el-button class="primary" @click="addStationQuery">新增</el-button> -->
      </div>
      <el-button type="primary" class="btnDiv" @click="submitDialog">确定</el-button>
    </div>
    <!-- 弹出层-地图框选 -->
    <el-dialog class="mapSelectedDialogClass" :close-on-click-modal="false" :visible.sync="mapSelectedVisble" top="5vh" width="45%">
      <span slot="title" class="dialogHead">
        <span>地图框选</span>
      </span>
      <!-- <MapSelected v-if="mapSelectedVisble" @setMapLonlat="setMapLonlat"></MapSelected> -->
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { interfaceObj } from "./urlConfig";
import service from "@/message/request";
// import MapSelected from "./MapSelected.vue";
const prop = defineProps({
  checkedTimeKey: String,
  staType: String,
  stationQuery: Object,
});
const emit = defineEmits(["stationIdChange", "clickStation", "setPointObj"]);

let countyObj = reactive({}); // 全国的名称及id
let provinceObj = reactive({}); // 全国的名称及id
const checkedProvinceId = ref("0"); // 当前选中的省份  默认是全国
let pointObj = reactive({
  // 当前选中的站点信息
  type: "province", // 站点类型：省份（province）  区域与流域（mark）
  id: "0", // 查询条件  省份（id） 区域与流域（mark值）
  name: "全国", // 查询条件  名称
});
const cityObj = {
  // 新增省会城市功能查询页面
  id: "capitals34",
  name: "省会城市",
  type: "capitals",
  areaName: "省会城市",
  parentId: null,
  areaLevel: null,
}; // 省会城市的名称及id
const regionArr = ref([]); // 区域
const basinArr = ref([]); // 流域
const provinceArr = ref([]); // 省份
const mapSelectedVisble = ref(false); //地图框选
const mapExtentShow = ref(false); //地图框选范围
const activeName = ref("3");
let comCode = reactive({});
const checkProvinceList = ref([]);
const checkRegionList = ref([]);
const checkCityList = ref([]);
const cityArr = ref([]);
const inputStationVal = ref("54511");
const inputStationList = ref([]);

const submitDialog = () => {
  let ids = [];
  let noIds = [];
  let dddt = inputStationVal.value.split("/");
  if (dddt.length > 0) {
    ids.push(dddt[0]);
  }
  emit("stationIdChange", {
    ids,
    noIds,
  });
};
const formatterInputvalue = (query) => {
  if (!query) {
    inputStationVal.value = "";
    inputStationList.value = [];
    return false;
  }
  let obj = inputStationList.value.filter((item) => item.stationId === query || item.stationName === query);
  if (obj.length > 0) {
    inputStationVal.value = obj[0].stationId + "/" + obj[0].stationName;
  }
};
const remoteLikeStationName1 = async (query) => {
  if (!query) {
    inputStationVal.value = "";
    inputStationList.value = [];
    return false;
  }
  let url = interfaceObj.getLikeStationInfo;
  let obj = {
    staType: prop.stationQuery.staType,
    stationId: query,
  };
  await service.get(url, { params: obj }).then(({ data }) => {
    inputStationList.value = data.data;
  });
};
const showStationMsg = () => {
  let moniobj = {
    type: true,
    zubiao: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  };
  setMapLonlat(moniobj, "station");
  pointObj.id = "map0";
  emit("clickStation");
};

// 获取省份
const setProvince = async () => {
  service.get(interfaceObj.getProvince).then((res) => {
    if (res.code === 200) {
      // 1 取出全国数据
      let provinceData = res.data.filter((item) => {
        if (item.id === "0") {
          for (let key in item) {
            countyObj[key] = item[key];
          }
        }
        if (item.id !== "0") {
          return item;
        }
      });
      provinceArr.value = provinceData;
      if (comCode.comMark != "chn") {
        provinceObj.id = provinceArr.value[0].id;
        provinceObj.name = provinceArr.value[0].areaName;
        pointObj.id = provinceArr.value[0].id;
        pointObj.name = provinceArr.value[0].areaName;
        searchPABData(provinceObj);
        getCityList();
      } else {
        emit("setPointObj", pointObj);
      }
      // 2 设置省份数据
    } else {
      ElMessage({
        type: "success",
        message: data.msg,
      });
    }
  });
};
const getCityList = async () => {
  let res = await service.get(interfaceObj.getIntellectStatisticsCityCode, {
    params: { areaCode: comCode.comCode },
  });
  if (res?.code === 200) {
    res.data.forEach((item) => (item.type = "county"));
    cityArr.value = res.data;
  }
};
// 获取区域与流域
const setRegionBasin = async (id) => {
  // 选中的省份
  let regionRes = await service.get(interfaceObj.getAreaStaInfoRelByParent, {
    params: { parentMark: id, type: "region" },
  });
  if (regionRes?.code === 200) {
    regionArr.value = regionRes.data;
  } else {
    ElMessage({
      type: "success",
      message: regionRes.msg,
    });
  }
  let basinRes = await service.get(interfaceObj.getAreaStaInfoRelByParent, {
    params: { parentMark: id, type: "basin" },
  });
  // 流域
  if (basinRes?.code === 200) {
    basinArr.value = basinRes.data;
  } else {
    ElMessage({
      type: "success",
      message: basinRes.msg,
    });
  }
};
// 根据省份 或 区域  或  流域进行查询
const searchPABData = (item) => {
  if (item instanceof Array && item.length > 0) {
    item = item[0];
  }
  if (item.type === "region") {
    checkProvinceList.value = [];
    checkCityList.value = [];
    pointObj.type = "mark";
    pointObj.objtype = item.type;
    if (checkRegionList.value && checkRegionList.value.length > 0) {
      let ppr = getRegionFomtter();
      pointObj.id = ppr[0];
      pointObj.name = ppr[1];
    } else {
      checkRegionList.value = [];
    }
  } else if ("mark" in item) {
    // 区域或流域
    checkProvinceList.value = [];
    checkRegionList.value = [];
    checkCityList.value = [];
    pointObj.type = "mark";
    pointObj.objtype = item.type;
    pointObj.id = item.mark;
    pointObj.name = item.name;
  } else if (item.type === "capitals") {
    // 新增省会城市功能查询页面
    checkProvinceList.value = [];
    checkRegionList.value = [];
    checkCityList.value = [];
    if (prop.checkedTimeKey === "cnYear") {
      return false;
    }
    pointObj.type = "capitals";
    pointObj.objtype = "capitals";
    pointObj.id = item.id;
    pointObj.name = item.areaName;
  } else if (item.type === "county") {
    // 新增省会城市功能查询页面
    checkProvinceList.value = [];
    checkRegionList.value = [];
    let ppr = getCityFomtter();
    pointObj.type = "county";
    pointObj.objtype = "county";
    pointObj.id = ppr[0];
    pointObj.name = ppr[1];
  } else {
    pointObj.type = "province";
    pointObj.objtype = "province";
    checkRegionList.value = [];
    checkCityList.value = [];
    if (item.id == 0) {
      checkProvinceList.value = [];
      pointObj.id = item.id;
      pointObj.name = item.areaName;
    } else if (comCode.comCode != "0") {
      pointObj.id = item.id;
      pointObj.name = item.name;
    } else {
      let ppr = getProvinceFomtter();
      pointObj.id = ppr[0];
      pointObj.name = ppr[1];
    }
  }
  emit("setPointObj", pointObj);
};
const getCityFomtter = () => {
  let ids = [];
  let names = [];
  checkCityList.value.forEach((item) => {
    ids.push(item.id);
    names.push(item.areaName);
  });
  return [ids.join(), names.join()];
};
const getRegionFomtter = () => {
  let ids = [];
  let names = [];
  checkRegionList.value.forEach((item) => {
    ids.push(item.mark);
    names.push(item.name);
  });
  return [ids.join(), names.join()];
};
const getProvinceFomtter = () => {
  let ids = [];
  let names = [];
  checkProvinceList.value.forEach((item) => {
    ids.push(item.id);
    names.push(item.areaName);
  });
  return [ids.join(), names.join()];
};
const setMapLonlat = (obj, type) => {
  if (obj.type) {
    let lonlat = obj.zubiao;
    if (obj.drawType == 1) {
      pointObj.id = "map";
      pointObj.type = "map";
      pointObj.objtype = "map";
      pointObj.latLons = lonlat;
      pointObj.lon1 = ""; //相对小的经度
      pointObj.lon2 = ""; //相对大的经度
      pointObj.lat1 = ""; //相对小的纬度
      pointObj.lat2 = ""; //相对大的纬度
    } else {
      let lon = [];
      let lat = [];
      lonlat.forEach((item) => {
        lon.push(item[0]);
        lat.push(item[1]);
      });
      pointObj.id = "map";
      pointObj.type = "map";
      pointObj.objtype = "map";
      pointObj.lon1 = Math.min(...lon).toFixed(2); //相对小的经度
      pointObj.lon2 = Math.max(...lon).toFixed(2); //相对大的经度
      pointObj.lat1 = Math.min(...lat).toFixed(2); //相对小的纬度
      pointObj.lat2 = Math.max(...lat).toFixed(2); //相对大的纬度
      pointObj.latLons = [];
    }
  }
  mapSelectedVisble.value = false;
  mapExtentShow.value = true;
  checkProvinceList.value = [];
  emit("setPointObj", pointObj);
};
//地图框选
const showMapSelectedDialog = () => {
  mapSelectedVisble.value = true;
};

watch(
  () => prop.checkedTimeKey,
  (value) => {
    if (value === "cnYear" && pointObj.type === "capitals") {
      pointObj.type = "province";
      pointObj.objtype = "province";
      pointObj.id = "0";
      pointObj.name = "全国";
      emit("setPointObj", pointObj);
    } else if (value === "dayIndex") {
      setTimeout(submitDialog, 50);
    }
  }
);

onMounted(() => {
  let comCodeTemp = window.localStorage.getItem("comCode");
  checkedProvinceId.value = comCodeTemp.comCode;
  comCode = JSON.parse(comCodeTemp);
  if (!comCode.comCode || comCode.comCode === "000000") {
    comCode.comCode = "0";
  }
  // 查询省份
  setProvince(checkedProvinceId.value);
  // 查询区域与流域
  setRegionBasin(checkedProvinceId.value);
});
</script>

<style lang="scss">
.pointChoose {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: url("@/assets/pic/statistical-analysis/leftMenuBG.png") no-repeat center bottom;
  background-size: 112% 112%;
  width: 187px;
  padding: 0.5vh 0px;
  .dayIndexClass {
    padding: 10px;
    padding-left: 40px;
    .dotIconalgin-r {
      text-align: left;
      margin-bottom: 10px;
      img {
        width: 12px;
        margin-right: 3px;
      }
    }
    .addCon {
      .el-input {
        width: 160px;
        font-size: 0.8vw;
        margin-top: 1vh;
      }
      span {
        color: #4dafef;
        cursor: pointer;
      }
    }
    .btnDiv {
      height: 3vh;
      width: 70px;
      margin: 1vh 40px 0 40px;
      padding: 0;
    }
  }
  .pointTitle {
    margin-top: 0.5vh;
    font-size: 16px;
    color: #666666;
    /* line-height: 26px; */
    text-align: center;
    border-bottom: 1px solid #dcdcdc;
    width: 167px;
  }
  .pointContent {
    width: 100%;
    height: 83vh;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .pointCon {
    display: flex;
    flex-direction: column;
    // height: 83vh;
    // width: 190px;
    width: 100%;
    padding: 10px 0;
    margin-top: 0.5vh;
    margin: 0 auto;
    background: #fff;
    .el-scrollbar__view {
      background: rgba(255, 255, 255, 0.9);
      // padding: 0.24vw;
      padding-bottom: 0vw;
    }
    .countryTitle {
      height: 26px;
      line-height: 26px;
      text-align: center;
      position: relative;
      cursor: pointer;
      margin: 0.5vh 0;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: #30302f;
      background: #f2f2f2;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
      border-radius: 2px;
    }
    .singleTitle {
      line-height: 26px;
      border-radius: 4px;
      font-size: 0.83vw;
      text-align: center;
      width: 166px;
      margin: 1vh auto !important;
      .el-collapse-item__header.is-active {
        border: 1px solid #155edc !important;
      }
      .el-collapse-item__header {
        height: 26px;
        line-height: 26px;
        text-align: center;
        position: relative;
        cursor: pointer;
        margin: 0.5vh 0;

        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #30302f;
        background: #f2f2f2;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
        border-radius: 2px;

        .collapseTitle {
          width: 99%;
          text-align: center;
          text-indent: 1.2vw;
        }
      }
      .el-collapse-item__wrap {
        border-bottom: none;
        background: rgba(0, 0, 0, 0);
      }
    }
    .singleStationTitle {
      width: 100%;
      margin: 1vh auto !important;
      .el-collapse-item__header {
        width: 166px;
        margin: 0 auto !important;
      }
    }
    .activeTitle {
      color: #fff;
      background: linear-gradient(180deg, #548ef3 0%, #0b56d9 100%);
      border-radius: 2px;
      border: 1px solid;
      border-image: linear-gradient(360deg, rgba(0, 168, 255, 1), rgba(28, 81, 121, 1)) 1 1;
    }
    .disabledTitle {
      background: #e6e6e6 !important;
      cursor: default;
      color: #999 !important;
    }
    .pointCollapse {
      .el-collapse-item {
        border-top: none;
        border-bottom: none;
        margin: 1vh 0;
      }
      .el-collapse-item__content {
        padding-bottom: 0;
      }
      border-top: none;
      border-bottom: none;
    }

    .isDown {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
      border-radius: 2px;
      border: 1px solid #47aded;
      .isDownEm {
        color: #47aded;
      }
    }
    .singleContent {
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      font-size: 0.8vw;
      padding: 1px;
      .pointItem {
        text-align: center;
        background: #f2f2f2;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        font-family:
          PingFangSC-Medium,
          PingFang SC;
        font-weight: 500;
        color: #999999;
        font-size: 0.624vw;
        cursor: pointer;
        margin: 0.5vh;
        height: 26px;
        line-height: 26px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .el-checkbox__label {
          padding-left: 2px;
        }
      }
      .activePointItem {
        background: linear-gradient(180deg, #548ef3 0%, #0b56d9 100%) !important;
        color: #fff !important;
      }
      .areaPointItem {
        margin: 5px;
        width: calc((100% - 5px * 4) / 3);
      }
    }
    .basinContent {
      .pointItem {
        margin: 5px 0;
        width: calc((100% - 5px * 4) / 3);
      }
      & > :nth-child(2n-1) {
        margin-right: 5px !important;
      }
      & > :nth-child(2n) {
        margin-left: 5px;
      }
    }
    .provinceContent {
      .pointItem {
        margin: 5px;
        width: calc((100% - 5px * 4) / 3);
      }
    }
    .provinceContent,
    .regionContent {
      & > :nth-child(3n + 1) {
        margin-right: 5px;
        margin-left: 0vh;
      }
    }
    .optionalContent {
      .optionalContentWrap {
        padding: 0 8px;
        background: linear-gradient(180deg, rgba(21, 94, 220, 0.2) 0%, rgba(36, 104, 222, 0) 100%);
        margin-bottom: 10px;
        border-bottom: 1px #dcdcdc solid;
        h5 {
          text-align: left;
          color: #333;
          font-size: 12px;
          line-height: 1;
          padding: 13px 0;
          img {
            margin-right: 3px;
          }
        }
        .el-select {
          width: 48%;
          &.ml4 {
            margin-left: 4%;
          }
          & .el-input__inner {
            height: 24px;
            line-height: 24px;
          }
        }
        .addCon {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .addConBtn {
            color: #155edc;
            font-size: 12px;
            margin-top: 6px;
            margin-bottom: 6px;
            margin: 0 5px;
          }
        }
        .lighSelcet {
          .el-select .el-input__inner {
            color: #fff !important;
          }
        }
      }

      display: flex;
      flex-direction: column;
      color: #999999;
      text-align: center;
      .mapCheck {
        background: #def2ff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        line-height: 22px;
        height: 22px;
        font-size: 12px;
        margin: 0;
        color: #999999;
        font-size: 12px;
        cursor: pointer;
        width: 96%;
      }
      .mapExtent {
        border: 1px solid #ccc;
        margin: 10px 0px;
        padding: 2px 0px 8px;
        border-radius: 2px;
        .lonValue {
          display: flex;
          justify-content: center;
          .lonText {
            border-bottom: 1px solid #ccc;
            margin: 0 10px;
          }
        }
      }
      .handAdd {
        margin-top: 2vh;
        .addCon {
          .el-input {
            width: 17vh;
            font-size: 0.8vw;
            margin-top: 1vh;
          }
          span {
            color: #4dafef;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.mapSelectedDialogClass {
  border-radius: 10px;
  width: 100%;

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-dialog__header {
    .el-dialog__title {
      color: #fff;
    }
    padding: 9px 10px;

    background: linear-gradient(180deg, #548ef3 0%, #0b56d9 100%);
    border: 1px solid;
    border-image: linear-gradient(360deg, rgba(0, 168, 255, 1), rgba(28, 81, 121, 1)) 1 1;
    border-radius: 10px 10px 0px 0px;
  }
  .dialogHead {
    border-left: 4px solid #ff8b4c;
    margin-left: 16px;
    padding-left: 16px;

    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #ffffff;
    height: 18px;
  }
  .el-dialog__headerbtn {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
    .el-dialog__close {
      color: rgba(255, 255, 255, 1);
    }
  }
  .el-dialog__body {
    .dialogContentDiv {
      .formRow {
        display: flex;
        justify-content: space-between;
        .el-form--inline .el-form-item {
          margin-right: 0px;
        }
      }
      .el-form-item__label {
        font-size: 0.73vw;
        font-family:
          PingFangSC-Regular,
          PingFang SC;
        font-weight: 400;
        color: #5d677d;
        width: 130px !important;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 160px;
      }
      .timeInput {
        width: 110px !important;
      }
      .el-slider__stop {
        width: 1px;
        height: 0.73vw;
        border-radius: 0;
        background-color: #dfe0e0;
        margin-top: 6px;
      }
      .el-slider__marks-text {
        min-width: 15px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: #666666;
      }
      .playMs {
        width: 75%;
      }
      .el-image {
        margin-top: 10px;
      }
      .dongtuchanpinclass {
        display: flex;
        margin-bottom: 5px;
        .el-form-item__content {
          text-align: center;
        }
      }
    }
  }
  .resultPagination {
    text-align: right;
    line-height: 2.6vh;
    height: 2.6vh;
    font-size: 14px;
    .el-pager li:not(.disabled).active {
      background: #e2eaf9;
      border-radius: 2px;
      border: 1px solid #155edc;
      font-weight: bold;
      color: #155edc;
      width: auto;
      min-width: 20px;
    }
    .btn-next,
    .btn-prev,
    .el-pager,
    .el-pager li {
      height: 20px;
      line-height: 20px;
      border: none;
      background: transparent;
      margin: 0;
    }
    span:not([class*="suffix"]) {
      display: none;
    }
  }
}
</style>
