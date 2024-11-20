<template>
  <div class="searchCon">
    <div class="searchInfoContent">
      <div class="searchInfo">
        <div class="signleInfo">
          <div class="infoItem firstInfoItem">
            <label>
              <img src="@/assets/pic/statistical-analysis/titleIcon.png" alt />
              时间尺度：
            </label>
            <ul class="itemCon">
              <li
                :class="[checkedTimeKey == item.elementKey ? 'intellectActiveBtn' : '', 'intellectDefaultBtn']"
                v-for="(item, index) in timeScaleArr"
                :key="index + 'element'"
                @click="changeScale(item)"
              >
                {{ item.elementName }}
              </li>
            </ul>
          </div>
          <div :class="['infoItem', checkedTimeType == 'year' ? 'timeRangeClass' : 'hourRangeClass']">
            <label>
              <img src="@/assets/pic/statistical-analysis/titleIcon.png" alt />
              时间范围：
            </label>
            <!-- 小时日期 -->
            <template v-if="checkedTimeKey == 'hour'">
              <el-date-picker
                :clearable="false"
                class="timeHour2"
                v-model="hourDate1"
                type="date"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                placeholder="开始日期"
                align="right"
                size="small"
                @change="changeTimeRange"
                :disabled-date="timeOptionHour1"
                key="hour1"
              ></el-date-picker>
              <el-select v-model="hourTime1" size="small" class="tenTimeClass">
                <el-option v-for="item in hourTimeArr1" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="splitLine">-</span>
              <el-date-picker
                :clearable="false"
                class="timeHour2"
                v-model="hourDate2"
                type="date"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                placeholder="结束日期"
                align="right"
                size="small"
                @change="changeTimeRange"
                :disabled-date="timeOptionHour2"
                key="hour2"
              ></el-date-picker>
              <el-select v-model="hourTime2" size="small" class="tenTimeClass">
                <el-option v-for="item in hourTimeArr2" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>

            <!-- 日值统计 -->
            <template v-if="checkedTimeKey == 'day' || checkedTimeKey == 'dayIndex'">
              <el-date-picker
                class="timeHour1"
                :clearable="false"
                v-model="timeRange[0]"
                type="date"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                placeholder="开始日期"
                align="right"
                size="small"
                :disabled-date="dayOption1"
                @change="changeDay1"
              ></el-date-picker>
              <span class="splitLine">-</span>
              <el-date-picker
                class="timeHour1"
                :clearable="false"
                v-model="timeRange[1]"
                type="date"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                placeholder="结束日期"
                align="right"
                size="small"
                :disabled-date="dayOption2"
                @change="changeDay2"
              ></el-date-picker>
            </template>

            <!-- 旬统计 -->
            <template v-if="checkedTimeKey == 'ten'">
              <el-date-picker
                class="tenDateClass"
                :clearable="false"
                v-model="tenDate1"
                type="month"
                value-format="YYYY-MM"
                format="YYYY-MM"
                placeholder="开始日期"
                align="right"
                size="small"
                :disabled-date="timeOptionTen1"
                @change="changeTenDateRange('ten', '1')"
              ></el-date-picker>
              <el-select v-model="tenTime1" size="small" class="tenTimeClass">
                <el-option v-for="item in tenDateArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span v-if="searchObj.isMoreTime">-</span>
              <el-date-picker
                class="tenDateClass"
                :clearable="false"
                v-model="tenDate2"
                type="month"
                value-format="YYYY-MM"
                format="YYYY-MM"
                placeholder="结束日期"
                align="right"
                size="small"
                v-if="searchObj.isMoreTime"
                :disabled-date="timeOptionTen2"
                @change="changeTenDateRange('ten', '2')"
              ></el-date-picker>
              <el-select v-model="tenTime2" size="small" class="tenTimeClass" v-if="searchObj.isMoreTime">
                <el-option v-for="item in tenDateArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>

            <!-- 月统计 -->
            <div v-if="checkedTimeKey == 'month' ? true : false">
              <el-date-picker
                class="tenDateClass"
                :clearable="false"
                v-model="tenDate1"
                type="month"
                value-format="YYYY-MM"
                format="YYYY-MM"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                size="small"
                :disabled-date="timeOptionTen1"
                @change="changeTenDateRange('month', '1')"
                v-if="searchObj.isMoreTime"
              ></el-date-picker>
              <span v-if="searchObj.isMoreTime">-</span>
              <el-date-picker
                class="tenDateClass"
                :clearable="false"
                v-model="tenDate2"
                type="month"
                value-format="YYYY-MM"
                format="YYYY-MM"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                size="small"
                :disabled-date="timeOptionMonth"
                @change="changeTenDateRange('month', '2')"
              ></el-date-picker>
            </div>

            <!-- 年统计 -->
            <div v-if="checkedTimeKey == 'year' ? true : false" class="yearTimeClass">
              <el-date-picker
                v-model="yearRange1"
                :clearable="false"
                type="year"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                size="small"
                value-format="YYYY"
                format="YYYY"
                :disabled-date="timeOption1"
                @change="changeYearTimeRange(1)"
                v-if="searchObj.isMoreTime"
              ></el-date-picker>
              <span v-if="searchObj.isMoreTime">-</span>
              <el-date-picker
                :clearable="false"
                v-model="yearRange2"
                type="year"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                size="small"
                value-format="YYYY"
                format="YYYY"
                :disabled-date="timeOption2"
                @change="changeYearTimeRange(2)"
              ></el-date-picker>
            </div>

            <!-- 历年同期统计 -->
            <div v-if="checkedTimeKey == 'cnYear' ? true : false" class="yearTimeClass">
              <el-date-picker
                v-model="cnYearRange1"
                :clearable="false"
                type="year"
                placeholder="开始年"
                align="right"
                size="small"
                value-format="YYYY"
                format="YYYY"
                @change="changeCnYearTimeRange(1)"
              ></el-date-picker>
              <span v-if="searchObj.isMoreTime">-</span>
              <el-date-picker
                :clearable="false"
                v-model="cnYearRange2"
                type="year"
                placeholder="结束年"
                align="right"
                size="small"
                value-format="YYYY"
                format="YYYY"
                @change="changeCnYearTimeRange(2)"
              ></el-date-picker>

              <el-date-picker
                :clearable="false"
                v-model="cnDateRange1"
                type="date"
                placeholder="开始日期"
                align="right"
                size="small"
                value-format="MM/DD"
                format="MM/DD"
                @change="vaildCnYearDate()"
              ></el-date-picker>
              <span v-if="searchObj.isMoreTime">-</span>
              <el-date-picker
                :clearable="false"
                v-model="cnDateRange2"
                type="date"
                placeholder="结束日期"
                align="right"
                size="small"
                value-format="MM/DD"
                format="MM/DD"
                @change="vaildCnYearDate()"
              ></el-date-picker>
            </div>
          </div>
          <div class="infoItem searchSwitch">
            <el-radio-group v-model="searchObj.isMoreTime" v-if="isTenMonthYear" @change="switchChange" size="small">
              <el-radio-button :label="true">{{ switchName[0] }}</el-radio-button>
              <el-radio-button :label="false">{{ switchName[1] }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="signleInfo statisticalDataCon">
          <div class="infoItem firstInfoItem">
            <label>
              <img src="@/assets/pic/statistical-analysis/titleIcon.png" alt />
              统计要素：
            </label>
            <ul class="tenCon" v-if="!searchObj.isMoreTime && isTenMonthYear">
              <div>
                <img src="@/assets/pic/statistical-analysis/tenStatistics.png" alt width="24px" />
                <span>扩展统计：</span>
              </div>
              <el-checkbox-group v-model="searchObj.otherMark">
                <el-checkbox
                  :label="item.key"
                  v-for="(item, index) in tenElementArr"
                  :key="index"
                  :class="{ noneShow: checkedTimeKey === 'year' && item.key === 'ext' }"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </ul>
          </div>
          <div class="infoItem pointLevel">
            <label>
              <img src="@/assets/pic/statistical-analysis/titleIcon.png" alt />
              台站级别：
            </label>
            <el-radio-group v-model="searchObj.staType">
              <el-radio :label="itemChild.key" v-for="(itemChild, indexChild) in stationLevelArr" :key="indexChild">{{ itemChild.name }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- 小时统计的统计要素 -->
        <div class="StatisticalDataClass hourClassify" v-if="checkedTimeKey == 'hour'">
          <!-- 统计要素  降水气温-->
          <div class="singleClassify itemClassify" v-for="(item, index) in elementArr.slice(0, 2)" :key="index">
            <div class="classifyName">
              <span class="eleTypeName">
                <i v-if="item.elementKey == 'pre'" class="el-icon-new-ele-rain"></i>
                <i v-else class="el-icon-new-ele-tem"></i>
                {{ item.elementName }}
              </span>
            </div>
            <ul class="classifyContent">
              <el-checkbox-group v-model="searchObj.elementMark">
                <el-checkbox
                  :label="itemChild.elementKey"
                  v-for="(itemChild, indexChild) in item.elementArr"
                  :key="indexChild"
                  :class="['elementMark' + itemChild.elementKey]"
                  >{{ itemChild.elementName }}</el-checkbox
                >
              </el-checkbox-group>
            </ul>
          </div>
          <!-- 统计要素  大风能见度-->
          <div class="classifyCon">
            <div :class="'singleClassify singleClassify' + index" v-for="(item, index) in elementArr.slice(2, 4)" :key="index">
              <div class="classifyName">
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'wind'" class="el-icon-new-ele-wind"></i>
                  <i v-else class="el-icon-new-ele-njd"></i>
                  {{ item.elementName }}
                </span>
              </div>
              <ul class="classifyContent">
                <el-checkbox-group v-model="searchObj.elementMark">
                  <el-checkbox
                    :label="itemChild.elementKey"
                    v-for="(itemChild, indexChild) in item.elementArr"
                    :key="indexChild"
                    :class="['elementMark' + itemChild.elementKey]"
                    >{{ itemChild.elementName }}</el-checkbox
                  >
                </el-checkbox-group>
              </ul>
            </div>
          </div>
          <!-- 积雪深度 能见度 -->
          <div class="classifyCon">
            <div :class="'singleClassify singleClassify' + index" v-for="(item, index) in elementArr.slice(4, 6)" :key="index">
              <div class="classifyName">
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'weather'" class="el-icon-new-ele-weather"></i>
                  <i v-else class="el-icon-new-ele-snow"></i>
                  {{ item.elementName }}
                </span>
              </div>
              <ul class="classifyContent">
                <el-checkbox-group v-model="searchObj.elementMark">
                  <el-checkbox
                    :label="itemChild.elementKey"
                    v-for="(itemChild, indexChild) in item.elementArr"
                    :key="indexChild"
                    :class="['elementMark' + itemChild.elementKey]"
                    >{{ itemChild.elementName }}</el-checkbox
                  >
                </el-checkbox-group>
              </ul>
            </div>
          </div>
        </div>

        <!-- 日统计的统计要素 -->
        <div class="StatisticalDataClass dayClassify" v-if="checkedTimeKey == 'day'">
          <div class="singleClassify itemClassify" v-for="(item, index) in elementArr.slice(0, 2)" :key="index">
            <div class="classifyName">
              <span>
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'pre'" class="el-icon-new-ele-rain"></i>
                  <i v-else class="el-icon-new-ele-tem"></i>
                  {{ item.elementName }}
                </span>
                <el-select class="classifySelect" size="small" v-model="searchObj.preType" placeholder="请选择" v-if="index == 0">
                  <el-option v-for="item in preTypeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </span>
            </div>
            <ul class="classifyContent">
              <el-checkbox-group v-model="searchObj.elementMark">
                <el-checkbox
                  :label="itemChild.elementKey"
                  v-for="(itemChild, indexChild) in item.elementArr"
                  :key="indexChild"
                  :disabled="disabledYS(itemChild.elementKey)"
                  :class="['elementMark' + itemChild.elementKey]"
                  >{{ itemChild.elementName }}</el-checkbox
                >
              </el-checkbox-group>
            </ul>
          </div>
          <!-- 统计要素  大风能见度-->
          <div class="classifyCon">
            <div :class="'singleClassify singleClassify' + index" v-for="(item, index) in elementArr.slice(2, 4)" :key="index">
              <div class="classifyName">
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'wind'" class="el-icon-new-ele-wind"></i>
                  <i v-else class="el-icon-new-ele-njd"></i>
                  {{ item.elementName }}
                </span>
              </div>
              <ul class="classifyContent">
                <el-checkbox-group v-model="searchObj.elementMark">
                  <el-checkbox
                    :label="itemChild.elementKey"
                    v-for="(itemChild, indexChild) in item.elementArr"
                    :key="indexChild"
                    :disabled="disabledYS(itemChild.elementKey)"
                    :class="['elementMark' + itemChild.elementKey]"
                    >{{ itemChild.elementName }}</el-checkbox
                  >
                </el-checkbox-group>
              </ul>
            </div>
          </div>
          <!-- 统计要素  天气现象 积雪深度-->
          <div class="classifyCon">
            <div :class="'singleClassify singleClassify' + index" v-for="(item, index) in elementArr.slice(4, 6)" :key="index">
              <div class="classifyName">
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'weather'" class="el-icon-new-ele-weather"></i>
                  <i v-else class="el-icon-new-ele-snow"></i>
                  {{ item.elementName }}
                </span>
              </div>
              <ul class="classifyContent">
                <el-checkbox-group v-model="searchObj.elementMark">
                  <el-checkbox
                    :label="itemChild.elementKey"
                    v-for="(itemChild, indexChild) in item.elementArr"
                    :key="indexChild"
                    :class="['elementMark' + itemChild.elementKey]"
                    >{{ itemChild.elementName }}</el-checkbox
                  >
                </el-checkbox-group>
              </ul>
            </div>
          </div>
        </div>

        <!-- 日序统计的统计要素 -->
        <div class="StatisticalDataClass dayClassify" v-if="checkedTimeKey == 'dayIndex'">
          <div class="singleClassify itemClassify" v-for="(item, index) in elementArr.slice(0, 2)" :key="index + '0'">
            <div class="classifyName">
              <span>
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'pre'" class="el-icon-new-ele-rain"></i>
                  <i v-else class="el-icon-new-ele-tem"></i>
                  {{ item.elementName }}
                </span>
                <el-select class="classifySelect" size="small" v-model="searchObj.preType" placeholder="请选择" v-if="index == 0 ? true : false">
                  <el-option v-for="item in preTypeArr" :key="index + '0' + item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </span>
            </div>
            <ul class="classifyContent">
              <el-checkbox-group v-model="searchObj.elementMark">
                <el-checkbox
                  :label="itemChild.elementKey"
                  v-for="(itemChild, indexChild) in item.elementArr"
                  :key="index + '0' + indexChild"
                  :disabled="disabledYS(itemChild.elementKey)"
                  :class="['elementMark' + itemChild.elementKey]"
                  >{{ itemChild.elementName }}</el-checkbox
                >
              </el-checkbox-group>
            </ul>
          </div>
          <!-- 统计要素  大风能见度-->
          <div class="singleClassify itemClassify" v-for="(item, cindex) in elementArr.slice(2, 4)" :key="cindex">
            <div class="classifyName">
              <span class="eleTypeName">
                <i v-if="item.elementKey == 'wind'" class="el-icon-new-ele-wind"></i>
                <i v-else class="el-icon-new-ele-njd"></i>
                {{ item.elementName }}
              </span>
            </div>
            <ul class="classifyContent">
              <el-checkbox-group v-model="searchObj.elementMark">
                <el-checkbox
                  :label="itemChild.elementKey"
                  v-for="(itemChild, indexChild) in item.elementArr"
                  :key="indexChild + 'cindex' + cindex"
                  :disabled="disabledYS(itemChild.elementKey)"
                  :class="['elementMark' + itemChild.elementKey]"
                  >{{ itemChild.elementName }}</el-checkbox
                >
              </el-checkbox-group>
            </ul>
          </div>
          <!-- 统计要素  天气现象 积雪深度-->
          <div class="classifyCon">
            <div :class="'singleClassify singleClassify' + index" v-for="(item, index) in elementArr.slice(4, 6)" :key="index + 'dayindexother'">
              <div class="classifyName">
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'weather'" class="el-icon-new-ele-weather"></i>
                  <i v-else class="el-icon-new-ele-snow"></i>
                  {{ item.elementName }}
                </span>
              </div>
              <ul class="classifyContent">
                <el-checkbox-group v-model="searchObj.elementMark">
                  <el-checkbox
                    :label="itemChild.elementKey"
                    v-for="(itemChild, indexChild) in item.elementArr"
                    :key="indexChild"
                    :class="['elementMark' + itemChild.elementKey]"
                    >{{ itemChild.elementName }}</el-checkbox
                  >
                </el-checkbox-group>
              </ul>
            </div>
          </div>
        </div>

        <!-- 旬统计的统计要素 -->
        <div class="StatisticalDataClass tenClassify" v-if="checkedTimeKey == 'ten'">
          <!-- 统计要素  降水气温-->
          <div class="classifyCon">
            <div :class="'singleClassify singleClassify' + index" v-for="(item, index) in elementArr.slice(0, 3)" :key="index">
              <div class="classifyName">
                <span>
                  <span class="eleTypeName">
                    <i v-if="item.elementKey == 'pre'" class="el-icon-new-ele-rain"></i>
                    <i v-else-if="item.elementKey == 'temp'" class="el-icon-new-ele-tem"></i>
                    <i v-else-if="item.elementKey == 'wind'" class="el-icon-new-ele-wind"></i>
                    {{ item.elementName }}
                  </span>
                  <el-select
                    class="classifySelect"
                    size="small"
                    v-model="searchObj.preType"
                    placeholder="请选择"
                    v-if="checkedTimeKey != 'hour' ? (index == 0 ? true : false) : false"
                  >
                    <el-option v-for="item in preTypeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </span>
              </div>
              <ul class="classifyContent">
                <el-checkbox-group v-model="searchObj.elementMark">
                  <el-checkbox
                    :label="itemChild.elementKey"
                    v-for="(itemChild, indexChild) in item.elementArr"
                    :key="indexChild"
                    :class="['elementMark' + itemChild.elementKey]"
                    >{{ itemChild.elementName }}</el-checkbox
                  >
                </el-checkbox-group>
              </ul>
            </div>
          </div>
        </div>

        <!--月年统计的统计要素 -->
        <div :class="['StatisticalDataClass yearClassify']" v-if="checkedTimeKey == 'month' || checkedTimeKey == 'year'">
          <!-- 统计要素  降水气温-->
          <div class="classifyCon">
            <div :class="'singleClassify singleClassify' + index" v-for="(item, index) in elementArr.slice(0, 2)" :key="index">
              <div class="classifyName">
                <span>
                  <span class="eleTypeName">
                    <i v-if="item.elementKey == 'pre'" class="el-icon-new-ele-rain"></i>
                    <i v-else class="el-icon-new-ele-tem"></i>
                    {{ item.elementName }}
                  </span>
                  <el-select
                    class="classifySelect"
                    size="small"
                    v-model="searchObj.preType"
                    placeholder="请选择"
                    v-if="checkedTimeKey != 'hour' ? (index == 0 ? true : false) : false"
                  >
                    <el-option v-for="item in preTypeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </span>
              </div>
              <ul class="classifyContent">
                <el-checkbox-group v-model="searchObj.elementMark">
                  <el-checkbox
                    :label="itemChild.elementKey"
                    v-for="(itemChild, indexChild) in item.elementArr"
                    :key="indexChild"
                    :class="['elementMark' + itemChild.elementKey]"
                    >{{ itemChild.elementName }}</el-checkbox
                  >
                </el-checkbox-group>
              </ul>
            </div>
          </div>
          <!-- 统计要素  大风天气现象-->
          <div class="classifyCon">
            <div
              :class="['singleClassify', checkedTimeKey == 'ten' ? item.elementKey + 'Ten' : '']"
              v-for="(item, index) in elementArr.slice(2, 4)"
              :key="index"
            >
              <div class="classifyName">
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'wind'" class="el-icon-new-ele-wind"></i>
                  <i v-else class="el-icon-new-ele-weather"></i>
                  {{ item.elementName }}
                </span>
              </div>
              <ul class="classifyContent">
                <el-checkbox-group v-model="searchObj.elementMark">
                  <el-checkbox
                    :label="itemChild.elementKey"
                    v-for="(itemChild, indexChild) in item.elementArr"
                    :key="indexChild"
                    :class="['elementMark' + itemChild.elementKey]"
                    >{{ itemChild.elementName }}</el-checkbox
                  >
                </el-checkbox-group>
              </ul>
            </div>
          </div>
          <!-- 积雪深度 能见度 -->
          <div class="classifyCon">
            <div
              :class="[
                'singleClassify',
                checkedTimeKey == 'ten' ? item.elementKey + 'Ten' : checkedTimeKey == 'month' || checkedTimeKey == 'year' ? item.elementKey + 'MonYear' : '',
              ]"
              v-for="(item, index) in elementArr.slice(4, 6)"
              :key="index"
            >
              <div class="classifyName">
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'snow'" class="el-icon-new-ele-snow"></i>
                  {{ item.elementName }}
                </span>
              </div>
              <ul class="classifyContent">
                <el-checkbox-group v-model="searchObj.elementMark">
                  <el-checkbox
                    :label="itemChild.elementKey"
                    v-for="(itemChild, indexChild) in item.elementArr"
                    :key="indexChild"
                    :class="['elementMark' + itemChild.elementKey]"
                    >{{ itemChild.elementName }}</el-checkbox
                  >
                </el-checkbox-group>
              </ul>
            </div>
          </div>
        </div>

        <!--历年同期的统计要素 -->
        <div class="StatisticalDataClass samePeriodClassify" v-if="checkedTimeKey == 'cnYear'">
          <!-- 统计要素  降水气温-->
          <div class="singleClassify itemClassify" v-for="(item, index) in elementArr.slice(0, 2)" :key="index">
            <div class="classifyName">
              <span>
                <span class="eleTypeName">
                  <i v-if="item.elementKey == 'pre'" class="el-icon-new-ele-rain"></i>
                  <i v-else class="el-icon-new-ele-tem"></i>
                  {{ item.elementName }}
                </span>
                <el-select class="classifySelect" size="small" v-model="searchObj.preType" placeholder="请选择" v-if="index == 0 ? true : false">
                  <el-option v-for="item in preTypeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </span>
            </div>
            <ul class="classifyContent">
              <el-checkbox-group v-model="searchObj.elementMark">
                <el-checkbox
                  :label="itemChild.elementKey"
                  v-for="(itemChild, indexChild) in item.elementArr"
                  :key="indexChild"
                  :class="['elementMark' + itemChild.elementKey]"
                  >{{ itemChild.elementName }}</el-checkbox
                >
              </el-checkbox-group>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="searchBtn">
      <div class="btns">
        <div class="statisBtn normalBtn" @click="searchStatisData">智能统计</div>
        <div v-show="checkedTimeKey != 'dayIndex'" class="resetBtn normalBtn" @click="searchStatisData('station')">站点管理</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, watch, onMounted, reactive, ref } from "vue";
import moment from "moment";
import { ElMessage } from "element-plus";
import { interfaceObj } from "./urlConfig";
import service from "@/message/request.js";
const prop = defineProps(["pointAreaType", "queryData"]);
const emit = defineEmits(["getTimeScale", "getSearchInfo", "getStationMng", "setstatisticObjType"]);

const requestUrl = reactive({}); // 查询的接口地址
// 选中时间尺度的类型
const checkedTimeType = ref("daterange");
// 选中时间尺度的名称
const checkedTimeKey = ref("hour");
//单旬、单月、单年
const isTenMonthYear = ref(false);
// 小时、日台站级别
const stationLevelArr = ref([
  { name: "国家站", key: "countrySta" },
  { name: "区域站", key: "areaSta" },
]);
const tenElementArr = [
  { name: "常年值", key: "allYear" },
  { name: "历史排位", key: "hisOrder" },
  { name: "极值", key: "ext" },
];
//旬的选择
const tenDateArr = [
  { label: "上旬", value: "01" },
  { label: "中旬", value: "02" },
  { label: "下旬", value: "03" },
];
// 小时的选择
const hourTimeArr = reactive([
  { label: "00时", value: "00" },
  { label: "01时", value: "01" },
  { label: "02时", value: "02" },
  { label: "03时", value: "03" },
  { label: "04时", value: "04" },
  { label: "05时", value: "05" },
  { label: "06时", value: "06" },
  { label: "07时", value: "07" },
  { label: "08时", value: "08" },
  { label: "09时", value: "09" },
  { label: "10时", value: "10" },
  { label: "11时", value: "11" },
  { label: "12时", value: "12" },
  { label: "13时", value: "13" },
  { label: "14时", value: "14" },
  { label: "15时", value: "15" },
  { label: "16时", value: "16" },
  { label: "17时", value: "17" },
  { label: "18时", value: "18" },
  { label: "19时", value: "19" },
  { label: "20时", value: "20" },
  { label: "21时", value: "21" },
  { label: "22时", value: "22" },
  { label: "23时", value: "23" },
]);
const preTypeArr = [
  { value: "08-08", label: "08" },
  { value: "20-20", label: "20" },
];
// 时间范围
let hourTimeArr1 = reactive([]);
let hourTimeArr2 = reactive([]);
const hourDate1 = ref(""); //小时开始日期
const hourTime1 = ref("00"); //小时开始时间
const hourDate2 = ref(""); //小时截至日期
const hourTime2 = ref("00"); //小时截至时间
const tenDate1 = ref(""); //第一个月份
const tenDate2 = ref(""); //第二个月份
const tenTime1 = ref("01"); //上中下旬
const tenTime2 = ref("01"); //上中下旬
const timeHourRange = [];
const yearRange1 = ref("2020"); // 年：范围1
const yearRange2 = ref("2021"); // 年：范围2
const cnYearRange1 = ref("1950");
const cnYearRange2 = ref("2021");
const cnDateRange1 = ref("03/20");
const cnDateRange2 = ref("04/30");
const switchName = ref([]);
const indexTimeScaleArr = ref([]); // 当前时间尺度的统计要素
const initQueryType = ref(true);
const timer = ref(null);

let timeRange = ref([]);
const timeScaleArr = ref([]);
const elementArr = ref([]); // 统计要素集合
const searchObj = reactive({
  // 初始化查询条件
  elementMark: [], // 选中的统计要素
  startTime: "", // 开始时间
  endTime: "", // 结束时间
  staType: "countrySta", // 国家站 或 区域站
  timeOption: "", //时间尺度
  preType: "08-08", //降水类型: 08-08; 20-20
  isMoreTime: true, //true：多，false：单
  otherMark: [], //旬月年（扩展统计）
  ten: "", //旬
  mon: "", //月
  year: "", //年
  startYear: "", // 历年同期
  startMon: "", // 历年同期
  startDay: "", // 历年同期
  endYear: "", // 历年同期
  endMon: "", // 历年同期
  endDay: "", // 历年同期
});

watch(hourDate1, (n) => {
  let dateTime = new Date();
  let year = dateTime.getFullYear();
  let month = dateTime.getMonth() + 1;
  let date = dateTime.getDate();
  if (n.substr(0, 4) == year && parseInt(n.substr(5, 2)) == month && parseInt(n.substr(8, 2)) == date) {
    hourTimeArr1 = hourTimeArr.slice(0, hourTimeArr2.length - 1);
  } else {
    hourTimeArr1 = hourTimeArr;
  }

  if (n == hourDate2.value && hourTime2.value <= hourTime1.value) {
    hourTime1.value = hourTimeArr1[parseInt(hourTime2.value - 1)].value;
  }
});
watch(hourDate2, (n) => {
  let dateTime = new Date();
  let year = dateTime.getFullYear();
  let month = dateTime.getMonth() + 1;
  let date = dateTime.getDate();
  let hour = dateTime.getHours();
  if (n.substr(0, 4) == year && parseInt(n.substr(5, 2)) == month && parseInt(n.substr(8, 2)) == date) {
    hourTimeArr2 = hourTimeArr.slice(0, hour + 1);
  } else {
    hourTimeArr2 = hourTimeArr;
  }
  if (n == hourDate1.value && hourTime2.value <= hourTime1.value) {
    hourTime2.value = hourTimeArr2[parseInt(hourTime1.value) + 1].value;
  }
});
watch(
  searchObj,
  (newVal, oldVal) => {
    if (newVal.startTime == "" || newVal.endTime == "" || newVal.elementMark.length == 0) {
      return;
    }
    // 1 获取查询参数，对要素统计进行格式化
    getRequestUrl(prop.pointAreaType);
    // let resultData = {
    //   requestUrl: requestUrl, // 接口地址
    //   queryData: searchObj, // 请求参数
    //   indexTimeScaleArr: indexTimeScaleArr.value, //当前存储
    //   //type: "set" // set(不查询数据,单纯同步查询条件) search(设置查询条件,查询表格数据)
    // };
    // this.$emit("getSearchInfo", resultData, "refreash");
  },
  { deep: true }
);
watch(
  () => prop.queryData,
  (newVal) => {
    if (newVal.elementMark && newVal.elementMark.length > 0 && initQueryType.value) {
      debounce(searchStatisData, 50);
      initQueryType.value = false;
    }
  },
  { deep: true }
);
watch(checkedTimeKey, (newVal) => {
  searchObj.timeOption = newVal;
  emit("setstatisticObjType", {
    checkedTimeKey: newVal,
    // checkedMethodKey: this.checkedMethodKey,
    allSearchInfoArr: timeScaleArr.value, //所有的时间尺度、统计要素
  });
});

function formatTime(selectTime, type) {
  let finalTime;
  selectTime = new Date(selectTime);
  const year = selectTime.getFullYear();
  let month = selectTime.getMonth() * 1 + 1;

  if (month < 10) {
    month = "0" + month;
  }
  let date = selectTime.getDate();
  if (date < 10) {
    date = "0" + date;
  }

  //时间
  let hour = selectTime.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minute = selectTime.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let second = selectTime.getSeconds();
  if (second < 10) {
    second = "0" + second;
  }
  //返回时间格式为yyyy-mm-dd
  if (type === "time") {
    finalTime = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    return finalTime;
  } else if (type === "onlyTime") {
    return hour + ":" + minute + ":" + second;
  }
  if (type === "year") {
    return year;
  } else {
    return year + "-" + month + "-" + date;
  }
}
// 小时统计--时间范围变化
const changeTimeRange = (val) => {
  if (val === null) {
    ElMessage({
      type: "warning",
      message: "请选择【时间范围】",
    });
    searchObj.startTime = "";
    searchObj.endTime = "";
  } else {
    searchObj.startTime = val[0];
    searchObj.endTime = val[1];
  }
};

const timeOptionHour1 = (time) => {
  return time.getTime() > new Date(hourDate2.value).getTime() - 1 * 1 * 60 * 60 * 1000;
};
const timeOptionHour2 = (time) => {
  return time.getTime() < new Date(hourDate1.value + " 00:00:00").getTime();
};
const dayOption1 = (time) => {
  let indexDate = new Date();
  let indexHour = indexDate.getHours();
  if (indexHour < 20) {
    return time.getTime() >= Date.now() - 1 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(timeRange.value[1]).getTime();
  } else {
    return time.getTime() >= Date.now() || time.getTime() > new Date(timeRange.value[1]).getTime();
  }
};
const dayOption2 = (time) => {
  let indexDate = new Date();
  let indexHour = indexDate.getHours();
  if (indexHour < 20) {
    return (
      time.getTime() >= Date.now() - (1 * 24 * 60 * 60 * 1000 + 20 * 1000) ||
      time.getTime() < new Date(timeRange.value[0]).getTime() - (1 * 24 * 60 * 60 * 1000 + 20 * 1000)
    );
  } else {
    return time.getTime() >= Date.now() || time.getTime() < new Date(timeRange.value[0]).getTime();
  }
};
const timeOptionTen1 = (time) => {
  if (tenDate2.value) {
    return time.getTime() >= Date.now() || time.getTime() > new Date(tenDate2.value).getTime();
  }
  return time.getTime() >= Date.now();
};
const timeOptionTen2 = (time) => {
  return time.getTime() >= Date.now() || time.getTime() < new Date(tenDate1.value).getTime() + 30 * 24 * 60 * 60 * 1000;
};
const timeOption1 = (time) => {
  if (yearRange2.value) {
    return time.getTime() >= Date.now() || time.getTime() > new Date(yearRange2.value).getTime();
  }
  return time.getTime() >= Date.now();
};
const timeOption2 = (time) => {
  return time.getTime() >= moment().add(-1, "year").toDate().getTime() || time.getTime() < new Date(yearRange1.value).getTime() + 365 * 24 * 60 * 60 * 1000;
};

const changeDay1 = (val) => {
  if (val === null) {
    // ElMessage({
    //   type: "warning",
    //   message: "请选择【时间范围】",
    // });
  } else {
    searchObj.startTime = val + " " + "00:00:00";
  }
};
const changeDay2 = (val) => {
  if (val === null) {
    // ElMessage({
    //   type: "warning",
    //   message: "请选择【时间范围】",
    // });
  } else {
    searchObj.endTime = val + " " + "00:00:00";
  }
};

const disabledYS = (item) => {
  if (
    (checkedTimeKey.value === "day" || checkedTimeKey.value === "dayIndex") &&
    searchObj.staType === "areaSta" &&
    (item.indexOf("rainDays4Avg") > -1 ||
      item.indexOf("avgTemp4Avg") > -1 ||
      item.indexOf("pre4Avg") > -1 ||
      item.indexOf("highTempIfGtExt") > -1 ||
      item.indexOf("lowTempIfLtExt") > -1 ||
      item.indexOf("avgWindIfGtExt") > -1 ||
      item.indexOf("preIfGtExt") > -1 ||
      item.indexOf("extWindIfGtExt") > -1)
  ) {
    return true;
  } else {
    return false;
  }
};

// 切换时间尺度
const changeScale = (item) => {
  // 1 默认选中的时间尺度
  if (item === "already") {
    checkedTimeKey.value = checkedTimeKey.value;
  } else {
    checkedTimeKey.value = item.elementKey;
    searchObj.isMoreTime = true;
  }
  searchObj.timeOption = checkedTimeKey.value;
  elementArr.value = [];
  searchObj.elementMark = [];
  // 2根据时间尺度查询统计要素
  timeScaleArr.value.forEach((itemElement, index) => {
    if (itemElement.elementKey == checkedTimeKey.value) {
      elementArr.value = itemElement.elementArr;
    }
  });
  // 3 修改台站级别  小时日  国家与区域   旬月年  国家
  if (checkedTimeKey.value == "hour" || checkedTimeKey.value == "day") {
    stationLevelArr.value = [
      { name: "国家站", key: "countrySta" },
      { name: "区域站", key: "areaSta" },
    ];
  } else {
    stationLevelArr.value = [{ name: "国家站", key: "countrySta" }];
    searchObj.staType = "countrySta";
  }

  //多旬单旬
  if (checkedTimeKey.value == "ten") {
    switchName.value = ["多旬", "单旬"];
    let indexElementArr = [];
    elementArr.value.forEach((item1, index) => {
      if (searchObj.isMoreTime) {
        if (item1.elementKey == "multiTen") {
          indexElementArr = item1.elementArr;
        }
      } else {
        if (item1.elementKey == "singleTen") {
          indexElementArr = item1.elementArr;
        }
      }
    });
    elementArr.value = indexElementArr;
  } else if (checkedTimeKey.value == "month") {
    switchName.value = ["多月", "单月"];
    let indexElementArr = [];
    elementArr.value.forEach((item1, index) => {
      if (searchObj.isMoreTime) {
        if (item1.elementKey == "consecutiveMonth") {
          indexElementArr = item1.elementArr;
        }
      } else {
        if (item1.elementKey == "singleMonth") {
          indexElementArr = item1.elementArr;
        }
      }
    });
    elementArr.value = indexElementArr;
  } else if (checkedTimeKey.value == "year") {
    switchName.value = ["多年", "单年"];
    let indexElementArr = [];
    elementArr.value.forEach((item1, index) => {
      if (searchObj.isMoreTime) {
        if (item1.elementKey == "multiYear") {
          indexElementArr = item1.elementArr;
        }
      } else {
        if (item1.elementKey == "singleYear") {
          indexElementArr = item1.elementArr;
        }
      }
    });
    elementArr.value = indexElementArr;
  }
  // if (checkedTimeKey.value=='cnYear') {
  //   elementArr.forEach(dda => {
  //     dda.elementArr.forEach(item => {
  //       searchObj.elementMark.push(item.elementKey)
  //     })
  //   })
  // } else {
  searchObj.elementMark.push(elementArr.value[0].elementArr[0].elementKey);
  // }

  indexTimeScaleArr.value = [];
  for (let i = 0; i < elementArr.value.length; i++) {
    indexTimeScaleArr.value = indexTimeScaleArr.value.concat(elementArr.value[i].elementArr); //存储当前时间尺度的统计要素
  }
  // 3 根据key变换时间范围 hour小时  day日  ten旬   mon月  yea年 历年同期
  if (checkedTimeKey.value === "hour" || checkedTimeKey.value === "day" || checkedTimeKey.value === "dayIndex" || checkedTimeKey.value === "cnYear") {
    isTenMonthYear.value = false;
  } else {
    isTenMonthYear.value = true;
  }
  initTimeRange(checkedTimeKey.value);
  getRequestUrl(prop.pointAreaType);
};
// 获取查询的url
const getRequestUrl = (obj) => {
  // 小时统计
  if (checkedTimeKey.value === "hour") {
    //全国或省 站点表格1
    requestUrl.province = interfaceObj.getInstHourStaData;
    //区域 表格2
    requestUrl.region = interfaceObj.mergeRegionAreaHour;
  } else if (checkedTimeKey.value === "day") {
    //全国或省
    requestUrl.province = interfaceObj.getInstDayStaData;
    //区域
    requestUrl.region = interfaceObj.selectInteAreaInfoDay;
  } else if (checkedTimeKey.value === "dayIndex") {
    //全国或省
    requestUrl.province = interfaceObj.getDayindexAreaData;
    //区域
    requestUrl.region = interfaceObj.getDayindexAreaData;
  } else if (checkedTimeKey.value === "cnYear") {
    //全国或省
    requestUrl.province = interfaceObj.selectCnYearData;
    //区域
    requestUrl.region = interfaceObj.selectCnYearData;
  } else {
    //连续旬月年
    if (searchObj.isMoreTime) {
      requestUrl.province = interfaceObj.getInstMultiStaData;
    }
    //单个旬月年
    else {
      if (checkedTimeKey.value === "year") {
        requestUrl.province = interfaceObj.getInstYearStaData;
      } else if (checkedTimeKey.value === "month") {
        requestUrl.province = interfaceObj.selectSingleMonDataInfo;
      } else if (checkedTimeKey.value === "ten") {
        requestUrl.province = interfaceObj.selectSingleTenDataInfo;
      }
    }

    if (checkedTimeKey.value === "year") {
      requestUrl.region = interfaceObj.getInstYearAreaData;
    } else if (checkedTimeKey.value === "month") {
      requestUrl.region = interfaceObj.getInstMonthAreaData;
    } else if (checkedTimeKey.value === "ten") {
      requestUrl.region = interfaceObj.getInstTenAreaData;
    }
  }
};
// 设置时间
const initTimeRange = (type) => {
  let indexData = new Date();
  let dayHourDate = indexData.getHours();
  let startimeData, endtimeData;
  let starHourData, endHourData;
  //小时统计
  if (type === "hour") {
    // 1 设置时间范围--默认小时
    startimeData = "";
    endtimeData = formatTime(indexData.getTime(), "time");
    //开始时间--比结束时间早24小时
    startimeData = formatTime(indexData.getTime() - 24 * 60 * 60 * 1000, "time");
    //设置开始时间与结束时间的分钟与秒值为00
    starHourData = startimeData.split(" ")[1].split(":")[0]; //取出小时值
    endHourData = endtimeData.split(" ")[1].split(":")[0]; //取出小时值

    startimeData = startimeData.split(" ")[0] + " " + starHourData + ":00:00";
    endtimeData = endtimeData.split(" ")[0] + " " + endHourData + ":00:00";
    timeRange.value = [startimeData, endtimeData]; //年月日
    searchObj.startTime = startimeData;
    searchObj.endTime = endtimeData;
    hourDate1.value = startimeData.split(" ")[0];
    hourDate2.value = endtimeData.split(" ")[0];
    hourTime1.value = starHourData;
    hourTime2.value = endHourData;
  }
  //日统计  日统计在20时前无当日数据
  else if (type === "day" || type === "dayIndex") {
    let hourTypehour = indexData.getHours();
    if (hourTypehour < 20) {
      indexData = indexData.getTime() - 1 * 24 * 60 * 60 * 1000;
    }
    startimeData = formatTime(indexData - 10 * 24 * 60 * 60 * 1000);
    endtimeData = formatTime(indexData);
    timeRange.value = [startimeData, endtimeData];
    searchObj.startTime = startimeData + " " + "00:00:00";
    searchObj.endTime = endtimeData + " " + "00:00:00";
  }
  //旬统计
  else if (type === "ten") {
    //时间范围近3月（6个旬）
    let startTenDate = moment().add(-2, "month").toDate();
    tenDate1.value =
      startTenDate.getFullYear() + "-" + (startTenDate.getMonth() * 1 + 1 > 9 ? startTenDate.getMonth() * 1 + 1 : "0" + (startTenDate.getMonth() * 1 + 1)); //前三月
    tenDate2.value = indexData.getFullYear() + "-" + (indexData.getMonth() * 1 + 1 > 9 ? indexData.getMonth() * 1 + 1 : "0" + (indexData.getMonth() * 1 + 1)); //当前月
    //终止时间为最近一个有数据的旬（例如今日7月9日，还没有7月上旬的数据，只能选到6月下旬）
    let dayTypeDate = indexData.getDate();
    //上旬  ≤10，都是上月下旬；≤20，当月上旬，≤月末，当月中旬
    if (dayTypeDate <= 10) {
      //当月上旬
      if (dayTypeDate == 10 && dayHourDate >= 20) {
        tenTime2.value = "01";
        tenTime1.value = "02";
      }
      //上月下旬
      else {
        startTenDate = moment().add(-2, "month").toDate();
        let endTenDate = moment().add(-1, "month").toDate();
        tenDate1.value =
          startTenDate.getFullYear() + "-" + (startTenDate.getMonth() * 1 + 1 > 9 ? startTenDate.getMonth() * 1 + 1 : "0" + (startTenDate.getMonth() * 1 + 1)); //前三月
        tenDate2.value =
          endTenDate.getFullYear() + "-" + (endTenDate.getMonth() * 1 + 1 > 9 ? endTenDate.getMonth() * 1 + 1 : "0" + (endTenDate.getMonth() * 1 + 1)); //当前月
        tenTime2.value = "03";
        tenTime1.value = "01";
      }
    }
    //中旬
    else if (10 < dayTypeDate <= 20) {
      //当月中旬
      if (dayTypeDate == 20 && dayHourDate >= 20) {
        tenTime2.value = "02";
        tenTime1.value = "03";
      }
      //当月上旬
      else {
        startTenDate = moment().add(-2, "month").toDate();
        tenDate1.value =
          startTenDate.getFullYear() + "-" + (startTenDate.getMonth() * 1 + 1 > 9 ? startTenDate.getMonth() * 1 + 1 : "0" + (startTenDate.getMonth() * 1 + 1)); //前三月
        tenTime2.value = "01";
        tenTime1.value = "02";
      }
    }
    //下旬
    else {
      //获取月末
      let lastDay = new Date(indexData.getFullYear(), indexData.getMonth() + 1, 0);
      let lastDate = lastDay.getDate();
      //当月下旬
      if (dayTypeDate == lastDate && dayHourDate >= 20) {
        startTenDate = moment().add(-1, "month").toDate();
        tenDate1.value =
          startTenDate.getFullYear() + "-" + (startTenDate.getMonth() * 1 + 1 > 9 ? startTenDate.getMonth() * 1 + 1 : "0" + (startTenDate.getMonth() * 1 + 1)); //前三月
        tenTime2.value = "03";
        tenTime1.value = "01";
      }
      //当月中旬
      else {
        startTenDate = moment().add(-2, "month").toDate();
        tenDate1.value =
          startTenDate.getFullYear() + "-" + (startTenDate.getMonth() * 1 + 1 > 9 ? startTenDate.getMonth() * 1 + 1 : "0" + (startTenDate.getMonth() * 1 + 1)); //前三月
        tenTime2.value = "02";
        tenTime1.value = "03";
      }
    }
    searchObj.startTime = tenDate1.value + "-" + tenTime1.value;
    searchObj.endTime = tenDate2.value + "-" + tenTime2.value;
  } else if (type === "month") {
    //月统计，默认多月，时间范围近12个月；
    let startMonthDate = moment().add(-12, "month").toDate();
    let endMonthDate = moment().add(0, "month").toDate();
    tenDate1.value =
      startMonthDate.getFullYear() +
      "-" +
      (startMonthDate.getMonth() * 1 + 1 > 9 ? startMonthDate.getMonth() * 1 + 1 : "0" + (startMonthDate.getMonth() * 1 + 1)); //前一月
    tenDate2.value =
      endMonthDate.getFullYear() + "-" + (endMonthDate.getMonth() * 1 + 1 > 9 ? endMonthDate.getMonth() * 1 + 1 : "0" + (endMonthDate.getMonth() * 1 + 1)); //当前月
    searchObj.startTime = tenDate1.value + "-01";
    searchObj.endTime = tenDate2.value + "-01";
  } else if (type === "year") {
    // 年统计，默认多年，时间范围近10年
    let startYearDate = moment().add(-10, "year").toDate();
    let endYearDate = moment().add(-1, "year").toDate();
    yearRange1.value = startYearDate.getFullYear() + "";
    yearRange2.value = endYearDate.getFullYear() + "";
    searchObj.startTime = yearRange1.value + "-01-01";
    searchObj.endTime = yearRange2.value + "-01-01";
  } else if (type === "cnYear") {
    let startindexData = indexData.getTime() - 30 * 24 * 60 * 60 * 1000;
    let endindexData = indexData.getTime() - 1 * 24 * 60 * 60 * 1000;
    cnYearRange2.value = formatTime(endindexData, "year").toString();
  }
  // this.cachecnDateRange2 = cnDateRange2.value;
  // this.cachecnDateRange1 = cnDateRange1.value;
};

// ==========================

const debounce = (fn, wait) => {
  if (timer.value !== null) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(fn, wait);
};
//旬、月统计--日期范围变化timeType：ten，month type:1第一个，2第二个；
const changeTenDateRange = (timeType, type) => {
  //旬,月-第一个
  if (type == 1) {
    if (tenDate1.value === null) {
      ElMessage({
        type: "warning",
        message: "请选择【时间范围】",
      });
      searchObj.startTime = "";
    } else {
      searchObj.startTime = timeType == "ten" ? tenDate1.value + "-" + tenTime1.value : tenDate1.value + "-01";
    }
  }
  //旬,月-第二个
  else {
    if (tenDate2.value === null) {
      ElMessage({
        type: "warning",
        message: "请选择【时间范围】",
      });
      searchObj.endTime = "";
    } else {
      searchObj.endTime = timeType == "ten" ? tenDate2.value + "-" + tenTime2.value : tenDate2.value + "-01";
    }
  }
};
//历年同期统计--时间范围变化
const changeCnYearTimeRange = (type) => {
  //年-第一个
  if (type == 1) {
    if (cnYearRange1.value === null) {
      ElMessage({
        type: "warning",
        message: "请选择【时间范围】",
      });
      searchObj.startTime = "";
      searchObj.startYear = "";
    } else {
      searchObj.startTime = cnYearRange1.value + "-01-01";
    }
  }
  //年-第二个
  else {
    if (cnYearRange2.value === null) {
      ElMessage({
        type: "warning",
        message: "请选择【时间范围】",
      });
      searchObj.endTime = "";
      searchObj.endYear = "";
    } else {
      searchObj.endTime = cnYearRange2.value + "-01-01";
    }
  }
};
//年统计--时间范围变化
const changeYearTimeRange = (type) => {
  //年-第一个
  if (type == 1) {
    if (yearRange1.value === null) {
      ElMessage({
        type: "warning",
        message: "请选择【时间范围】",
      });
      searchObj.startTime = "";
      searchObj.startYear = "";
    } else {
      searchObj.startTime = yearRange1.value + "-01-01";
    }
  }
  //年-第二个
  else {
    if (yearRange2.value === null) {
      ElMessage({
        type: "warning",
        message: "请选择【时间范围】",
      });
      searchObj.endTime = "";
      searchObj.endYear = "";
    } else {
      searchObj.endTime = yearRange2.value + "-01-01";
    }
  }
};
// 根据类型进行查询type:（时间尺度：timeScale，统计方式：staMethod，统计要素：staElement）
const getSearchElement = async () => {
  let res = await service.get(interfaceObj.getIntelSearchInfo);
  // 成功
  if (res?.code === 200) {
    timeScaleArr.value = res.data; //时间尺度及统计要素
    if (timeScaleArr.value.length > 0) {
      checkedTimeKey.value = timeScaleArr.value[0].elementKey; //初始化设置选中的时间尺度
      searchObj.timeOption = checkedTimeKey.value;
      elementArr.valueFormat = timeScaleArr.value[0].elementArr; //初始化选中的统计要素--选中有统计要素的第一个

      searchObj.elementMark.push(elementArr.valueFormat[0].elementArr[0].elementKey);
      indexTimeScaleArr.value = []; //存储当前时间尺度的统计要素
      for (let i = 0; i < elementArr.valueFormat.length; i++) {
        indexTimeScaleArr.value = indexTimeScaleArr.value.concat(elementArr.valueFormat[i].elementArr); //存储当前时间尺度的统计要素
      }
    }
  } else {
    // 失败
    ElMessage({
      type: "error",
      message: res.msg,
    });
  }
  emit("getTimeScale", timeScaleArr.value);
};
// 单旬月年与多旬月年的切换
const switchChange = () => {
  changeScale("already");
};
const vaildCnYearDate = () => {
  // if (new Date(cnDateRange2.value).getTime() < new Date(cnDateRange1.value).getTime()) {
  //   cnDateRange2.value = this.cachecnDateRange2
  //   cnDateRange1.value = this.cachecnDateRange1
  //   ElMessage.warning('时间范围的结束时间不能大于开始时间')
  // }
};
// 智能统计
const searchStatisData = (flag) => {
  getRequestUrl(prop.pointAreaType);
  //小时统计--格式化查询的时间
  if (checkedTimeKey.value == "hour") {
    searchObj.startTime = hourDate1.value + " " + hourTime1.value + ":" + "00:00";
    searchObj.endTime = hourDate2.value + " " + hourTime2.value + ":" + "00:00";
  } else if (checkedTimeKey.value == "ten") {
    searchObj.startTime = tenDate1.value + "-" + tenTime1.value;
    searchObj.endTime = tenDate2.value + "-" + tenTime2.value;
  } else if (checkedTimeKey.value == "cnYear") {
    searchObj.startYear = cnYearRange1.value;
    searchObj.startMon = cnDateRange1.value.split("/")[0];
    searchObj.startDay = cnDateRange1.value.split("/")[1];
    searchObj.endYear = cnYearRange2.value;
    searchObj.endMon = cnDateRange2.value.split("/")[0];
    searchObj.endDay = cnDateRange2.value.split("/")[1];
  }
  //单旬月
  if (!searchObj.isMoreTime) {
    if (checkedTimeKey.value == "ten") {
      let startTime = searchObj.startTime.split("-");
      searchObj.year = startTime[0] * 1;
      searchObj.mon = startTime[1] * 1;
      searchObj.ten = startTime[2] * 1;
    } else {
      let endTime = searchObj.endTime.split("-");
      searchObj.year = endTime[0] * 1;
      searchObj.mon = endTime[1] * 1;
    }
    //单 旬 月 年 开始时间等于结束时间
    if (checkedTimeKey.value == "ten") {
      searchObj.endTime = searchObj.startTime;
    } else {
      searchObj.startTime = searchObj.endTime;
    }
  }
  // if (new Date(searchObj.endTime).getTime() < new Date(searchObj.startTime).getTime()) {
  //   ElMessage.warning('时间范围的结束时间不能大于开始时间')
  //   return false
  // }
  let resultData = {
    indexTimeScaleArr: indexTimeScaleArr.value,
    requestUrl: requestUrl, // 接口地址
    queryData: searchObj, // 请求参数
    type: "search", // set(不查询数据,单纯同步查询条件) search(设置查询条件,查询表格数据)
  };
  // this.cachecnDateRange2 = cnDateRange2.value;
  // this.cachecnDateRange1 = cnDateRange1.value;
  if (flag === "station") {
    emit("getStationMng", resultData);
  } else {
    emit("getSearchInfo", resultData, initQueryType.value ? "init" : undefined);
  }
};
//重置
const resetStatisData = () => {
  searchObj.elementMark = [];
  emit("getSearchInfo", "refreash");
};

onMounted(async () => {
  // 2 时间尺度与统计要素
  await getSearchElement();
  debounce(searchStatisData, 100);

  initTimeRange(checkedTimeKey.value);
  changeScale(timeScaleArr.value[0]);
});
</script>

<style lang="scss">
.searchCon {
  display: flex;
  justify-content: space-between;
  padding: 4px 0px 0px 0px;
  border-top: none;
  // height: 40%;
  background: linear-gradient(180deg, #f2faff 0%, rgba(255, 255, 255, 0.8) 100%);
  box-shadow: 0px -2px 0.52vw 0px rgba(0, 0, 0, 0.16);
  border: 1px solid;
  border-image: linear-gradient(360deg, rgba(53, 165, 237, 0), rgba(53, 165, 237, 1)) 1 1;
  .searchInfoContent {
    background: url("@/assets/pic/statistical-analysis/searchConBG.png") no-repeat bottom center;
    background-size: 100% 30%;
  }
  .searchInfo {
    position: relative;
    display: flex;
    flex-direction: column;
    border-right: 1px dashed #a0d3f3;
    margin-left: 1.04vw;
    height: 40%;
    .signleInfo {
      display: flex;
      line-height: 40px;
      .infoItem {
        display: flex;
        // width: 39vw;
        align-items: center;
        font-size: 12px;
        line-height: 24px;
        & > label {
          display: flex;
          align-items: center;
          img {
            margin-right: 0.52vw;
          }
        }
        .itemCon {
          display: flex;
          .intellectDefaultBtn {
            border-radius: 2px;
            line-height: 24px;
            padding: 0 6px;
            margin: 0 6px;

            font-size: 12px;
            font-family:
              PingFangSC-Semibold,
              PingFang SC;
            // font-weight: 600;
            color: #828381;
            cursor: pointer;

            background: #def2ff;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
            border-radius: 2px;
            &:first-child {
              margin-left: 0;
            }
          }
          .intellectActiveBtn {
            background: linear-gradient(180deg, #548ef3 0%, #0b56d9 100%);
            border-radius: 2px;
            border-image: linear-gradient(360deg, rgba(0, 168, 255, 1), rgba(28, 81, 121, 1)) 1 1;
            color: #fff;
          }
        }
      }
      .firstInfoItem {
        width: 48%;
      }
      .noneShow {
        display: none !important;
      }
      .pointLevel {
        width: 246px;
        .el-radio-group {
          & > :last-child {
            margin-left: 0.52vw;
          }
        }
      }
      .hourRangeClass {
        line-height: 0vw;
      }
      .timeRangeClass {
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 14vw;
        }
      }
      .hourRangeClass {
        .timeHour1 {
          width: 7.2vw;
        }
        .timeHour2 {
          width: 8vw;
          margin-right: 1vh;
        }
        .splitLine {
          padding: 0.4vh;
        }
        .timeHour {
          width: 24vw;
          .el-range__close-icon {
            display: none;
          }
        }
        //旬值的长度
        .tenDateClass {
          width: 6.8vw;
        }
        .tenTimeClass {
          width: 4.5vw;
        }
        .yearTimeClass {
          .el-date-editor--year {
            width: 6vw;
          }
          .el-date-editor--date {
            width: 6vw;
          }
        }
      }
    }
    .StatisticalDataClass {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      width: 76.8vw;
      margin-left: 1.2vw;
      .classifyCon {
        display: flex;
      }
      .singleClassify {
        display: flex;
        border-top: none;
        height: 34px;
        line-height: 34px;
        .classifyName {
          // float: left;
          background: #e8f6fe;
          display: flex;
          color: #555656;
          min-width: 80px;
          width: 80px;
          // width: 6.4vw;
          font-size: 12px;
          margin-right: 4px;
          // position: relative;
          .eleTypeName {
            margin-left: 4px;
            font-size: 12px;
            min-width: 30px;
            & > i {
              margin-right: 0.21vw;
            }
          }
          .classifySelect {
            width: 80px;
            // transform: scale(0.8);
            right: 0;
            .el-input {
              width: 40px;
            }
            .el-input__wrapper {
              padding: 0;
            }
            .el-input__inner {
              width: 20px;
              padding: 0 4px;
              height: 22px;
              line-height: 22px;
            }
            .el-input__suffix {
              right: 0;
              top: -2px;
              width: 16px;
              transform: scale(0.8);
              .el-input__suffix-inner > :first-child {
                margin-left: 0;
              }
            }
          }
          & > span {
            display: flex;
            align-items: center;
            // margin: 0 auto;
          }
        }
        .classifyContent {
          .el-checkbox-group {
            display: flex;
            .el-checkbox {
              margin-right: 4px;
            }
          }
        }
      }
      .signleData {
        display: flex;
        width: 23vw;
        align-items: center;
        border-bottom: 1px solid #a0d3f3;
        border-left: 1px solid #a0d3f3;
        height: 5vh;
        &:nth-child(3n) {
          border-right: 0.1vw solid #a0d3f3;
        }
        & > label {
          text-align: center;
          background: #dbe5f8;
          margin-right: 1vw;
          display: inline-block;
          width: 5vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .sameTime {
        width: 73vw !important;
        border-right: none !important;
      }
    }
    //小时
    .dayClassify,
    .hourClassify,
    .samePeriodClassify {
      .itemClassify {
        border-top: 1px solid #a0d3f3;
        border-left: 1px solid #a0d3f3;
        border-right: 1px solid #a0d3f3;
      }
      .classifyCon {
        & > :first-child {
          border-top: 1px solid #a0d3f3;
          border-left: 1px solid #a0d3f3;
          border-right: 1px solid #a0d3f3;
        }
      }
      & > :last-child {
        border-bottom: 1px solid #a0d3f3;
      }
      .singleClassify {
        display: flex;
        width: 100%;
      }
      .singleClassify0 {
        width: 49.4vw !important;
      }
      .singleClassify1 {
        width: 27.4vw !important;
        border-top: 1px solid #a0d3f3;
        border-right: 1px solid #a0d3f3;
      }
    }

    //日统计
    .dayClassify {
      .singleClassify0 {
        width: 47.4vw !important;
      }
      .singleClassify1 {
        width: 29.4vw !important;
      }
    }
    //旬统计
    .tenClassify {
      .classifyCon {
        border: 1px solid #a0d3f3;
        flex-direction: column;
      }
      .singleClassify {
        &:first-child {
          border-bottom: 1px solid #a0d3f3 !important;
        }
        &:nth-child(2n) {
          border-bottom: 1px solid #a0d3f3 !important;
        }
      }
    }
    //年月统计
    .yearClassify {
      .classifyCon {
        &:last-child {
          border-bottom: 1px solid #a0d3f3 !important;
          border-right: 1px solid #a0d3f3 !important;
        }
      }
      .singleClassify {
        border: 1px solid #a0d3f3;
        &:first-child {
          width: 39.4vw !important;
          border-bottom: none;
          border-right: none;
        }
        &:nth-child(2n) {
          width: 37.4vw !important;
          border-left: 1px solid #a0d3f3;
          border-bottom: none;
        }
      }
      .snowMonYear,
      .windTen {
        &:first-child {
          width: 100% !important;
        }
      }
      .visMonYear,
      .snowTen,
      .visTen,
      .weatherTen {
        display: none;
      }
    }
    .pointLevel,
    .StatisticalDataClass {
      .el-radio__input.is-checked .el-radio__inner,
      .el-radio__input.is-indeterminate .el-radio__inner,
      .el-checkbox__input.is-checked .el-checkbox__inner,
      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #ff8b4c;
        border-color: #ff8b4c;
      }
      .el-radio__input.is-checked + .el-radio__label,
      .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #555656;
      }
      .el-radio__input.is-focus .el-radio__inner,
      .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #ff8b4c;
      }
      .el-radio__label {
        font-size: 12px;
      }
      .el-checkbox__label {
        font-size: 12px;
        font-family:
          PingFangSC-Regular,
          PingFang SC;
        font-weight: 400;
        color: #555656;
        padding-left: 4px;
      }
      .el-radio,
      .el-checkbox {
        margin-right: 2px;
      }
      .el-radio__inner:hover,
      .el-checkbox__inner:hover {
        border-color: #ff8b4c;
      }
      .el-checkbox__input {
        width: 16px;
        height: 16px;
      }
      .el-checkbox__inner::after {
        border-width: 2px;
        top: 0px;
      }
    }
    .statisticalDataCon {
      .tenCon {
        display: flex;
        align-items: center;
        color: #555656;
        height: 24px;
        line-height: 25px;
        background: #e2eaf9;
        border-radius: 12px;
        font-size: 12px;
        padding: 0 0.73vw;
        .el-checkbox {
          height: 24px;
          margin-right: 0.73vw;
          .el-checkbox__label {
            font-size: 12px;
            padding-left: 6px;
          }
          &:last-child {
            margin-right: 0px;
          }
        }
        .el-checkbox-group {
          height: 24px;
        }
        .el-checkbox__inner {
          border-color: #979797;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #155edc;
          border-color: #155edc;
        }
        .el-checkbox__inner::after {
          border-width: 2px;
          top: 0px;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #555656;
        }
        & > div {
          display: flex;
          align-items: center;
          & > span {
            margin-left: 0.52vw;
          }
        }
      }
    }
  }
  .searchBtn {
    width: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    .normalBtn {
      width: 76px;
      height: 24px;
      margin: 0.52vw auto;
      border-radius: 2px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
    }
    .statisBtn {
      background: linear-gradient(180deg, #548ef3 0%, #0b56d9 100%);
      box-shadow: 0px 2px 16px 0px rgba(57, 166, 236, 0.7);
      border-radius: 2px;
      border: 1px solid;
      border-image: linear-gradient(180deg, rgba(33, 255, 248, 1), rgba(37, 144, 255, 1)) 1 1;
      color: #fff;
    }
    .resetBtn {
      background: rgba(49, 151, 217, 0.1);
      color: #3197d9;
      border: 1px solid #3197d9;
    }
  }
}

.searchSwitch {
  margin-left: 0.52vw;
  .el-radio-button__inner {
    line-height: 24px;
    padding: 0px 6px;
  }
  .el-radio-button__original-radio:checked + .el-radio-button__inner {
    background: linear-gradient(180deg, #5a87e5 0%, #49aae1 100%);
    border: 0;
  }
}
</style>
