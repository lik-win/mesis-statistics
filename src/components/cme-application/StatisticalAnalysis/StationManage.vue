<template>
  <el-dialog class="station-manage" :close-on-click-modal="false" align-center v-model="stationViewVisible" title="站点管理" width="800" @close="closeDialog">
    <h5 class="dotIconalgin-r"><img class="dotIconClass" src="@/assets/pic/statistical-analysis/titleIcon.png" alt />已选站点</h5>
    <div v-if="stationQueryList.length > 0" class="handAddData">
      <ul class="handTitle clearfix">
        <li class="handNum">
          <span>序号</span>
        </li>
        <li class="handNamewidth">
          <span>站名</span>
        </li>
        <li class="handId">
          <span>站号</span>
        </li>
        <li>
          <span>省份</span>
        </li>
        <li>
          <span>城市</span>
        </li>
        <li>
          <span>县</span>
        </li>
        <li>
          <span>操作</span>
        </li>
      </ul>
      <el-scrollbar class="handAddBody" v-loading="loadingStation">
        <ul v-for="(item, index) in stationSelectPageList" :key="index" class="singleHand clearfix" :class="item.type == 'search' ? 'lighBylonlot' : ''">
          <li class="handNum">
            <span>{{ index + 1 }}</span>
          </li>
          <li class="handNamewidth">
            <span>{{ item.stationName }}</span>
          </li>
          <li class="handId">
            <span>{{ item.stationId }}</span>
          </li>
          <li>
            <span>{{ item.province }}</span>
          </li>
          <li>
            <span>{{ item.city }}</span>
          </li>
          <li>
            <span>{{ item.county }}</span>
          </li>
          <li class="pointDel" @click="removeStationQuery(index)">
            <span>
              <el-icon><Delete /></el-icon>
            </span>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div v-else class="handAddData"></div>
    <el-pagination
      class="resultPagination"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="stationPage"
      :page-size="stationSize"
      layout="prev, pager, next, jumper"
      :total="stationTotal"
    ></el-pagination>

    <h5 class="dotIconalgin-r"><img class="dotIconClass" src="@/assets/pic/statistical-analysis/titleIcon.png" alt />新增站点</h5>
    <el-form class="searchform" size="small">
      <el-form-item class="inputsearch" label-width="100px" label="模糊检索：">
        <div class="addCon">
          <el-select
            v-model="inputStationVal"
            size="small"
            placeholder="站名或站号"
            filterable
            remote
            style="width: 200px"
            :remote-method="remoteLikeStationName"
            @change="formatterInputvalue"
          >
            <el-option v-for="item in inputStationList" :key="item.stationId" :value="item.stationId" :label="item.stationName"
              >{{ item.stationId }}/{{ item.stationName }}</el-option
            >
          </el-select>
        </div>
      </el-form-item>
      <el-form-item class="submitBtn" label-width="100px" label>
        <el-button type="warning" @click="addStationQuery">新增</el-button>
        <el-button type="primary" @click="submitDialog">保存</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { watch } from "vue";
import { ElMessage } from "element-plus";
import { interfaceObj } from "./urlConfig";
import service from "@/message/request.js";
const prop = defineProps({ stationQuery: Object, isShow: Boolean });
const emit = defineEmits(["close", "stationIdChange"]);
const stationViewVisible = ref(false);
const initQueryList = ref([]);
const stationQueryList = ref([]);
const stationSelectPageList = ref([]);
const searchQueryList = ref([]);
const stationPage = ref(1);
const stationSize = ref(10);
const stationTotal = ref(0);
const inputStationVal = ref("");
const inputStationList = ref([]);
const bylonlatListNOT = ref([]);
const loadingStation = ref(false);

const initQuery = async () => {
  loadingStation.value = true;
  if (prop.stationQuery.requestType === "county") {
    prop.stationQuery.areaCode = prop.stationQuery.areaMark;
  }
  service
    .post(interfaceObj.getStationListByType, prop.stationQuery)
    .then((res) => {
      if (res.code === 200) {
        loadingStation.value = false;
        initQueryList.value = res.data || [];
        stationTotal.value = res.data.length;
        stationQueryList.value = JSON.parse(JSON.stringify(initQueryList.value));
        stationPage.value = 1;
        handleCurrentChange(stationPage.value);
      }
    })
    .catch((_) => (loadingStation.value = false));
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
const remoteLikeStationName = async (query) => {
  if (!query) {
    return false;
  }
  let url = interfaceObj.getLikeStationInfo;
  let obj = {
    staType: prop.stationQuery.staType,
    stationId: query,
  };
  await service.get(url, { params: obj }).then(({ data }) => {
    inputStationList.value = data || [];
  });
};
const removeStationQuery = (index) => {
  let l = (stationPage.value - 1) * stationSize.value + index;
  let item = stationQueryList.value[l];
  if (item.type === "search") {
    searchQueryList.value.splice(l, 1);
  } else {
    let idx = null;
    initQueryList.value.filter((fitem, index) => {
      if (fitem.stationId === item.stationId) {
        idx = index;
      }
    });
    idx && initQueryList.value.splice(idx, 1);
  }
  let filterN = bylonlatListNOT.value.filter((fitem) => {
    return fitem.stationId === item.stationId;
  });
  if (filterN.length <= 0) {
    bylonlatListNOT.value.push(item);
  }
  stationQueryList.value.splice(l, 1);
  handleCurrentChange(stationPage.value);
};
const handleCurrentChange = (val) => {
  stationPage.value = val;
  stationTotal.value = stationQueryList.value.length;
  if (stationTotal.value == 0) {
    return;
  }
  stationSelectPageList.value = stationQueryList.value.slice((stationPage.value - 1) * stationSize.value, val * stationSize.value);
  if (stationSelectPageList.value.length == 0) {
    handleCurrentChange(val - 1);
  }
};
const addStationQuery = () => {
  if (inputStationVal.value) {
    let obj = inputStationList.value.filter(
      (item) =>
        item.stationId === inputStationVal.value ||
        item.stationName === inputStationVal.value ||
        item.stationId + "/" + item.stationName === inputStationVal.value
    );
    if (obj.length > 0 && isRepeat(obj[0].stationId)) {
      ElMessage({
        type: "warning",
        message: "已添加该站点",
      });
      return false;
    }
    if (obj.length > 0) {
      obj[0].type = "search";
      searchQueryList.value.unshift(obj[0]);
      stationQueryList.value = JSON.parse(JSON.stringify([...searchQueryList.value, ...initQueryList.value]));
      stationPage.value = 1;
      handleCurrentChange(stationPage.value);
    }
  }
};
const isRepeat = (value) => {
  for (let i in stationQueryList.value) {
    if (stationQueryList.value[i].stationId === value) {
      return true;
    }
  }
};
const closeDialog = () => {
  emit("close", false);
};
const submitDialog = () => {
  let ids = [];
  let noIds = [];
  searchQueryList.value.forEach((item) => ids.push(item.stationId));
  bylonlatListNOT.value.forEach((item) => noIds.push(item.stationId));
  emit("stationIdChange", {
    ids,
    noIds,
  });
  emit("close", false);
};

watch(
  () => prop.isShow,
  (val) => {
    stationViewVisible.value = val;
    if (val) {
      inputStationVal.value = "";
    }
  },
  { immediate: true }
);
watch(
  () => prop.stationQuery,
  (newVal, oldVal) => {
    if (newVal.requestType === "range" && newVal.lon1 === "0.00" && newVal.latLons && newVal.latLons.length <= 0) {
      if (oldVal.requestType !== "range" || (oldVal.requestType === "range" && (oldVal.lon1 !== "0.00" || (oldVal.latLons && oldVal.latLons.length > 0)))) {
        searchQueryList.value = [];
        bylonlatListNOT.value = [];
        inputStationList.value = [];
        initQuery();
      }
    } else {
      searchQueryList.value = [];
      bylonlatListNOT.value = [];
      inputStationList.value = [];
      initQuery();
    }
  },
  { deep: true }
);
</script>

<style lang="scss">
.station-manage {
  border-radius: 10px;
  // width: 100%;

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
    margin: 0;
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
    top: 0px;
    right: 0px;
    width: 44px;
    height: 44px;
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
    padding: 10px 16px 24px 16px;
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
  .handAddData {
    border: 1px solid #dcdcdc;
    margin-bottom: 10px;
    min-height: calc(260px + 27px);
    .handTitle {
      width: 100%;
      border-top: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      margin-top: -1px;
      height: 27px;
      line-height: 26px;
      background: #def2ff;
      &.clearfix::after {
        content: "";
        display: block;
        clear: both;
        width: 100%;
        height: 0;
        overflow: hidden;
      }
    }
    .singleHand {
      width: 100%;
      border-bottom: 1px solid #dcdcdc;
      line-height: 27px;
      height: 27px;
      background: #fff;
      .pointDel {
        color: rgb(235, 63, 57);
        cursor: pointer;
      }
      &.clearfix::after {
        content: "";
        display: block;
        clear: both;
        width: 100%;
        height: 0;
        overflow: hidden;
      }
    }
    .handTitle li,
    .singleHand li {
      float: left;
      width: 18%;
      display: inline-block;
      font-size: 12px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      box-sizing: border-box;
      border-left: 1px solid #dcdcdc;
      margin-left: -1px;
      text-align: center;
      &:first-child {
        width: 7%;
      }
      &:last-child {
        width: 7%;
      }
      &.handNamewidth {
        width: 20%;
      }
      &.handId {
        width: 11%;
      }
      span {
        padding: 0 5%;
      }
    }
    .lighBylonlot {
      background: #e8f6fe;
    }
    .handAddBody {
      width: 100%;
      height: 278px;
      .el-scrollbar__wrap {
        height: auto;
        margin-bottom: 0 !important;
      }
    }
  }
  .resultPagination {
    width: 100%;
    text-align: right;
    line-height: 24px;
    height: 24px;
    font-size: 14px;
    justify-content: flex-end;
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
  .dotIconalgin-r {
    text-align: left;
    margin-top: 0;
    margin-bottom: 10px;
    img {
      width: 12px;
      margin-right: 3px;
    }
  }
  .searchform {
    width: 530px;
    margin: 0 auto;
    .inputsearch {
      margin-bottom: 10px;
      .el-input {
        width: 100%;
      }
      .el-button {
        border-color: #ff8b4c;
        color: #ff8b4c;
        background: rgba(255, 139, 76, 0.05);
        padding: 5px 20px;
        margin-left: 10px;
        &:hover {
          background: rgba(255, 139, 76, 0.1);
        }
      }
    }
    .areasearch {
      margin-bottom: 10px;
      .el-select {
        width: 18%;
      }
    }
    .submitBtn {
      margin-top: 25px;
      margin-bottom: 0;
      .el-button--warning {
        background-color: #ff8b4c;
        border-color: #ff8b4c;
        &.is-active,
        &:active,
        &:focus,
        &:hover {
          background-color: #ffa675;
          border-color: #ffa675;
        }
      }
    }
  }
  .addConBtn {
    color: #155edc;
    font-size: 12px;
    margin-top: 6px;
    margin-bottom: 6px;
    margin: 0 5px;
    cursor: pointer;
  }
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
</style>
