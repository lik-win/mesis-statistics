<template>
  <div class="resultCon">
    <div
      v-show="queryObj.timeOption != 'dayIndex'"
      :class="[
        ((isShowSXT && JSON.stringify(bottomCheckedElement) != '{}') || isShowQYTJ) && queryObj.timeOption != 'cnYear' ? 'leftResultCon1' : 'leftResultCon2',
        'leftResultCon',
      ]"
    >
      <div class="leftTableCon normalTable">
        <div class="tableTitle leftTable">
          <label class="leftTableTitle">
            <img src="@/assets/pic/statistical-analysis/leftTableTitleIcon.png" alt />
            <span class="tableTitleTime">{{ timeName }}</span>
            <span class="tableTitleName">{{ tongjiname2 }}表</span>
          </label>
          <div class="tableOperate">
            <el-input class="leftTableSearch" placeholder suffix-icon="el-icon-search" size="small" v-if="false"></el-input>
            <div class="chartPic singleOperate" @click="showDataStatis('station')" v-if="isEnable">
              <img src="@/assets/pic/statistical-analysis/barChart.png" alt="数据统计图" />
            </div>
            <div class="tableExport singleOperate" @click="exportTableData('station')" v-if="isEnable">
              <img src="@/assets/pic/statistical-analysis/exportTable.png" alt="表格导出" />
            </div>
          </div>
        </div>
        <div v-loading="pointStationLoaing" style="height: 100%">
          <el-scrollbar class="defaultScrollbar" border>
            <el-table
              :data="pointStaTable"
              height="360"
              border
              class="defaultTable selScrollBar"
              ref="pointStaTableRef"
              highlight-current-row
              v-if="refreashTable1 && activeTimeType != 'cnYear' && activeTimeType != 'dayIndex'"
              fit
              @current-change="searchPointUniqueData"
              @sort-change="pointSortChange"
              :key="table1Key"
              :default-sort="pointSortDefault"
            >
              <template slot="empty">
                <p>{{ dataStationText }}</p>
              </template>
              <!-- 通用 -->
              <el-table-column type="index" label="序号" key="1" width="60"></el-table-column>
              <el-table-column
                class="pointName"
                :prop="allfeilds.other.sName"
                label="站名"
                v-if="isShowFeilds(allfeilds.other.sName)"
                key="2"
                min-width="80"
                :show-overflow-tooltip="true"
              >
                <template #default="scope">
                  <span style="color: #4094da; font-weight: bold">
                    {{ scope.row[allfeilds.other.sName] }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :prop="allfeilds.other.sId" label="站号" v-if="isShowFeilds(allfeilds.other.sId)" key="3s" min-width="70"></el-table-column>
              <el-table-column
                :prop="allfeilds.other.cityName"
                label="市名"
                v-if="cacheArea.type == 'capitals' && isShowFeilds(allfeilds.other.cityName)"
                key="4c"
                min-width="50"
              ></el-table-column>
              <el-table-column
                :prop="allfeilds.other.shengName"
                label="省名"
                v-if="isShowFeilds(allfeilds.other.shengName)"
                key="3"
                min-width="70"
              ></el-table-column>
              <el-table-column
                :prop="allfeilds.other.cityName"
                label="市名"
                v-if="cacheArea.type != 'capitals' && isShowFeilds(allfeilds.other.cityName)"
                key="4"
                min-width="50"
              ></el-table-column>
              <el-table-column
                :prop="allfeilds.other.countyName"
                label="县名"
                v-if="cacheArea.type == 'county' && isShowFeilds(allfeilds.other.countyName)"
                key="4cm"
                min-width="50"
              ></el-table-column>
              <el-table-column
                :prop="allfeilds.other.areaName"
                label="流域名称"
                v-if="isShowFeilds(allfeilds.other.areaName)"
                key="5"
                min-width="60"
              ></el-table-column>
              <!-- 小时--降水 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="sumPre"
                label="累计降水量"
                sortable="custom"
                v-if="isColumnShow('hour', 'sumPre')"
                min-width="90"
                key="106"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="max1hPre"
                label="最大1小时降水量"
                sortable="custom"
                v-if="isColumnShow('hour', 'max1hPre')"
                min-width="120"
                key="107"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="max1hPreTime"
                label="最大1小时降水量出现时间"
                sortable="custom"
                v-if="isColumnShow('hour', 'max1hPre')"
                min-width="220"
                key="108"
              ></el-table-column>

              <el-table-column
                :render-header="forceWrapLine"
                prop="max3hPre"
                label="最大3小时降水量"
                sortable="custom"
                v-if="isColumnShow('hour', 'max3hPre')"
                min-width="120"
                key="109"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="max3hPreTime"
                label="最大3小时降水量出现时间"
                sortable="custom"
                v-if="isColumnShow('hour', 'max3hPre')"
                min-width="220"
                key="110"
              ></el-table-column>

              <el-table-column
                :render-header="forceWrapLine"
                prop="max6hPre"
                label="最大6小时降水量"
                sortable="custom"
                v-if="isColumnShow('hour', 'max6hPre')"
                min-width="120"
                key="111"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="max6hPreTime"
                label="最大6小时降水量出现时间"
                sortable="custom"
                v-if="isColumnShow('hour', 'max6hPre')"
                min-width="220"
                key="112"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="max24hPre"
                label="最大24小时降水量"
                sortable="custom"
                v-if="isColumnShow('hour', 'max24hPre')"
                min-width="120"
                key="111"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="max24hPreTime"
                label="最大24小时降水量出现时间"
                sortable="custom"
                v-if="isColumnShow('hour', 'max24hPre')"
                min-width="220"
                key="112"
              ></el-table-column>

              <el-table-column
                :render-header="forceWrapLine"
                prop="sumSnow"
                label="累计降雪量"
                sortable="custom"
                v-if="isColumnShow('hour', 'sumSnow')"
                min-width="220"
                key="sumSnow112"
              ></el-table-column>
              <!-- 小时--气温 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTemp"
                label="最高气温"
                sortable="custom"
                v-if="isColumnShow('hour', 'maxTemp')"
                min-width="80"
                key="100"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTempTime"
                label="最高气温出现时间"
                sortable="custom"
                v-if="isColumnShow('hour', 'maxTemp')"
                min-width="200"
                key="101"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTemp"
                label="最低气温"
                sortable="custom"
                v-if="isColumnShow('hour', 'minTemp')"
                min-width="80"
                key="102"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTempTime"
                label="最低气温出现时间"
                sortable="custom"
                v-if="isColumnShow('hour', 'minTemp')"
                min-width="200"
                key="103"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgTemp"
                label="平均气温"
                sortable="custom"
                v-if="isColumnShow('hour', 'avgTemp')"
                min-width="80"
                key="104"
              ></el-table-column>
              <!-- 有阈值 -->
              <el-table-column
                prop="highTempHours"
                label="高温持续小时数"
                v-if="isColumnShow('hour', 'highTempHours')"
                :min-width="250"
                sortable="custom"
                key="105"
              >
                <template #header>
                  <el-popover popper-class="thresholdPopover" :width="270" placement="bottom" ref="temVisible">
                    <el-form :model="wholeThresholdObj.tempThreshold" :rules="winHourRules">
                      <div class="thresholdName">最高气温 ></div>
                      <el-form-item prop="tempThreshold">
                        <input v-model="wholeThresholdObj.tempThreshold.tempThreshold1" type="number" class="yzInput" />
                      </el-form-item>
                      <el-button class="thresholdSure" type="primary" size="small" @click="searchTableData('temVisible')">确定</el-button>
                    </el-form>
                    <template #reference>
                      <span v-if="isColumnShow('hour', 'highTempHours')" @click.stop="showFilter('temVisible')">
                        高温持续小时数 (>{{ tempThreshold1Cache }}°C)
                        <em class="el-icon-edit thresholdIcon"></em>
                      </span>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="avgSumTemp"
                label="高温持续小时数"
                v-if="isColumnShow('day', 'avgSumTemp')"
                :min-width="250"
                sortable="custom"
                key="day100"
              >
                <template #header>
                  <el-popover popper-class="thresholdPopover" :width="270" placement="bottom" ref="avgSumTempVisible">
                    <el-form :model="wholeThresholdObj.avgSumTempThreshold" :rules="avgSumTempRules">
                      <div class="thresholdName">平均气温积温 ></div>
                      <el-form-item prop="avgSumTempThreshold">
                        <input v-model="wholeThresholdObj.avgSumTempThreshold.avgSumTempThreshold" type="number" class="yzInput" />
                      </el-form-item>
                      <el-button class="thresholdSure" type="primary" size="small" @click="searchTableData('avgSumTempVisible')">确定</el-button>
                    </el-form>
                    <template #reference>
                      <span v-if="isColumnShow('day', 'avgSumTemp')" @click.stop="showFilter('avgSumTempVisible')">
                        平均气温积温 (>{{ avgSumTempThresholdCache }}°C) <em class="el-icon-edit thresholdIcon"></em> </span
                    ></template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgSumTemp4Avg"
                label="平均气温积温距平"
                sortable="custom"
                v-if="isColumnShow('day', 'avgSumTemp')"
                min-width="120"
                key="day101"
              ></el-table-column>

              <!-- 小时-- 大风 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxExtWind"
                label="最大阵风"
                sortable="custom"
                v-if="isColumnShow('hour', 'maxExtWind')"
                min-width="80"
                key="113"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxExtWindTime"
                label="最大阵风出现时间"
                sortable="custom"
                v-if="isColumnShow('hour', 'maxExtWind')"
                min-width="140"
                key="114"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxAvgWind"
                label="最大平均风"
                sortable="custom"
                v-if="isColumnShow('hour', 'maxAvgWind')"
                min-width="90"
                key="115"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="maxAvgWindTime"
              label="最大平均风出现时间"
              sortable="custom"="custom"
              v-if="isColumnShow('hour', 'maxAvgWind')"
              min-width="130"
              key="116"
              ></el-table-column>-->
              <el-table-column
                prop="bigWindHours"
                label="大风持续小时数"
                v-if="isColumnShow('hour', 'bigWindHours')"
                :min-width="250"
                sortable="custom"
                key="117"
              >
                <template #header>
                  <el-popover popper-class="thresholdPopover" :width="270" placement="bottom" ref="winVisible">
                    <el-form :model="wholeThresholdObj.winHourThreshold" :rules="winHourRules" ref="winHourForm">
                      <div class="thresholdName">极大风风速 ></div>
                      <el-form-item prop="windThreshold1">
                        <input v-model="wholeThresholdObj.winHourThreshold.windThreshold1" type="number" class="yzInput" />
                      </el-form-item>
                      <el-button class="thresholdSure" type="primary" size="small" @click="searchTableData('winVisible')">确定</el-button>
                    </el-form>
                    <template #reference>
                      <span v-if="isColumnShow('hour', 'bigWindHours')" @click.stop="showFilter('winVisible')">
                        大风持续小时数 (>{{ windThreshold1Cache }}m/s)
                        <em class="el-icon-edit thresholdIcon"></em>
                      </span>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <!-- 小时--天气现象 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="ifFog"
                label="是否出现大雾"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifFog')"
                min-width="100"
                key="120"
              >
                <template slot-scope="scope">
                  {{ scope.row.ifFog == 0 ? "否" : "是" }}
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="fog"
                label="出现大雾小时数"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifFog')"
                min-width="110"
                key="121"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="ifHaze"
                label="是否出现霾"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifHaze')"
                min-width="90"
                key="122"
              >
                <template slot-scope="scope">
                  {{ scope.row.ifHaze == 0 ? "否" : "是" }}
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="haze"
                label="出现霾小时数"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifHaze')"
                min-width="100"
                key="123"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="ifSand"
                label="是否出现沙尘天气"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifSand')"
                min-width="125"
                key="124"
              >
                <template slot-scope="scope">
                  {{ scope.row.ifSand == 0 ? "否" : "是" }}
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="sand"
                label="出现沙尘天气小时数"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifSand')"
                min-width="135"
                key="125"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="ifSnow"
                label="是否出现降雪"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifSnow')"
                min-width="100"
                key="126"
              >
                <template slot-scope="scope">
                  {{ scope.row.ifSnow == 0 ? "否" : "是" }}
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="snow"
                label="出现降雪小时数"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifSnow')"
                min-width="120"
                key="127"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="ifRain"
                label="是否出现冻雨"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifRain')"
                min-width="100"
                key="128"
              >
                <template slot-scope="scope">
                  {{ scope.row.ifRain == 0 ? "否" : "是" }}
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="rain"
                label="出现冻雨小时数"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifRain')"
                min-width="120"
                key="129"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="ifThunder"
                label="是否出现雷暴"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifThunder')"
                min-width="100"
                key="130"
              >
                <template slot-scope="scope">
                  {{ scope.row.ifThunder == 0 ? "否" : "是" }}
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="thunder"
                label="出现雷暴小时数"
                sortable="custom"
                v-if="isColumnShow('hour', 'ifThunder')"
                min-width="110"
                key="131"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxSnowDeep"
                label="最大积雪深度"
                sortable="custom"
                v-if="isColumnShow('hour', 'maxSnowDeep')"
                min-width="100"
                key="132"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxSnowTime"
                label="最大积雪深度出现时间"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('hour', 'maxSnowDeep')"
                min-width="150"
                key="133"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxSnowDeepChangeValue"
                label="最大积雪深度变化"
                sortable="custom"
                v-if="isColumnShow('hour', 'maxSnowDeepChangeValue')"
                min-width="125"
                key="134"
              ></el-table-column>
              <!-- 小时--能见度 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="minVis"
                label="最小能见度"
                sortable="custom"
                v-if="isColumnShow('hour', 'minVis')"
                min-width="90"
                key="118"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.minVis < 0.1 ? "＜0.1 " : scope.row.minVis }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minVisTime"
                label="最小能见度出现时间"
                sortable="custom"
                v-if="isColumnShow('hour', 'minVis')"
                min-width="150"
                key="119"
              ></el-table-column>

              <!-- 日统计 -->
              <!-- 日统计--降水 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="sumPre"
                label="累计降水量"
                sortable="custom"
                v-if="isColumnShow('day', 'sumPre')"
                min-width="90"
                key="1351"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldSumPre"
                label="降水量常年值"
                sortable="custom"
                v-if="isColumnShow('day', 'sumPre')"
                min-width="120"
                key="1352"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="sumPreHisRowNnm"
                label="降水量历史排位"
                sortable="custom"
                v-if="isColumnShow('day', 'sumPre')"
                min-width="140"
                key="1353"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxPre"
                label="最大日降水量"
                sortable="custom"
                v-if="isColumnShow('day', 'maxPre')"
                min-width="100"
                key="136"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxPreTime"
                label="最大日降水量出现时间"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'maxPre')"
                min-width="150"
                key="137"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="pre4Avg"
                label="降水距平百分率"
                sortable="custom"
                v-if="isColumnShow('day', 'pre4Avg')"
                min-width="120"
                key="138"
              ></el-table-column>
              <el-table-column prop="rainDays" label="降水日数" v-if="isColumnShow('day', 'rainDays')" :min-width="170" sortable="custom" key="139">
                <template #header>
                  <el-popover popper-class="thresholdPopover" placement="bottom" :width="270" ref="preVisible">
                    <el-form :model="wholeThresholdObj.preThreshold" :rules="winHourRules" ref="winHourForm">
                      <div class="thresholdName">降水量 ≥</div>
                      <el-form-item prop="preThreshold">
                        <input class="yzInput" v-model="wholeThresholdObj.preThreshold.preThreshold" type="number" />
                      </el-form-item>
                      <el-button class="thresholdSure" type="primary" size="small" @click="searchTableData('preVisible')">确定</el-button>
                    </el-form>
                    <template #reference>
                      <span v-if="isColumnShow('day', 'rainDays')" @click.stop="showFilter('preVisible')">
                        降水日数 (≥{{ preThresholdCache }}mm)
                        <em class="el-icon-edit thresholdIcon"></em>
                      </span>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="rainDays4Avg"
                label="降水日数距平"
                sortable="custom"
                v-if="isColumnShow('day', 'rainDays4Avg')"
                min-width="100"
                key="140"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="rain25Days4Avg"
                label="大雨日数距平"
                sortable="custom"
                v-if="isColumnShow('day', 'rainDays4Avg')"
                min-width="100"
                key="14001"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="rain50Days4Avg"
                label="暴雨日数距平"
                sortable="custom"
                v-if="isColumnShow('day', 'rainDays4Avg')"
                min-width="100"
                key="14002"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="rain100Days4Avg"
                label="大暴雨日数距平"
                sortable="custom"
                v-if="isColumnShow('day', 'rainDays4Avg')"
                min-width="140"
                key="14003"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="rain250Days4Avg"
                label="特大暴雨日数距平"
                sortable="custom"
                v-if="isColumnShow('day', 'rainDays4Avg')"
                min-width="140"
                key="14004"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="heavyRainDays"
                label="暴雨日数"
                sortable="custom"
                v-if="isColumnShow('day', 'heavyRainDays')"
                min-width="80"
                key="141"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="noRainDays"
                label="无降水日数"
                sortable="custom"
                v-if="isColumnShow('day', 'noRainDays')"
                min-width="90"
                key="142"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxConsecutiveNoRainDays"
                label="最大连续无降水日数"
                sortable="custom"
                v-if="isColumnShow('day', 'maxConsecutiveNoRainDays')"
                min-width="140"
                key="143"
              ></el-table-column>
              <el-table-column
                prop="preIfGtExt"
                label="降水量突破极值情况"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'preIfGtExt')"
                min-width="210"
                key="144"
              >
                <template slot-scope="scope">
                  <span>{{ forMateExtData(scope.row.preIfGtExt) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="preGtExt"
                label="降水量旬/月/历史极值 "
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'preIfGtExt')"
                min-width="210"
                key="145"
              >
                <template slot-scope="scope">
                  <span>{{ forValueExtData(scope.row.preGtExt) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="preGtExtTime"
                label="降水量旬/月/历史极值时间"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'preIfGtExt')"
                min-width="240"
                key="146"
              >
              </el-table-column>
              <el-table-column
                prop="sumSnow"
                label="累计降雪量"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'sumSnow')"
                min-width="140"
                key="sumSnow46"
              >
              </el-table-column>
              <el-table-column
                prop="oldSumSnow"
                label="降雪量常年值"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'sumSnow')"
                min-width="120"
                key="sumSnow461"
              >
              </el-table-column>
              <el-table-column
                prop="sumSnowHisRowNnm"
                label="降雪量历史排位"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'sumSnow')"
                min-width="140"
                key="sumSnow462"
              >
              </el-table-column>
              <el-table-column
                prop="snowIfGtExt"
                label="降雪量突破极值情况"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'snowIfGtExt')"
                min-width="240"
                key="sumSnow146"
              >
              </el-table-column>
              <el-table-column
                prop="snowGtExt"
                label="降雪量旬/月/历史极值"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'snowIfGtExt')"
                min-width="240"
                key="sumSnow6"
              >
              </el-table-column>
              <el-table-column
                prop="snowGtExtTime"
                label="降雪量旬/月/历史极值时间"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'snowIfGtExt')"
                min-width="240"
                key="sumSnow26"
              >
              </el-table-column>

              <!-- 日统计--气温 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxHighTemp"
                label="最高气温最大值"
                sortable="custom"
                v-if="isColumnShow('day', 'maxHighTemp')"
                min-width="120"
                key="147"
              ></el-table-column>
              <el-table-column
                prop="maxHighTempTime"
                label="日最高气温最大值出现时间"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'maxHighTemp')"
                min-width="180"
                key="148"
              ></el-table-column>
              <el-table-column
                prop="minHighTemp"
                label="日最高气温最小值"
                sortable="custom"
                v-if="isColumnShow('day', 'minHighTemp')"
                min-width="130"
                key="149"
              ></el-table-column>
              <el-table-column
                prop="minHighTempTime"
                label="日最高气温最小值出现时间"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'minHighTemp')"
                min-width="180"
                key="150"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxLowTemp"
                label="日最低气温最大值"
                sortable="custom"
                v-if="isColumnShow('day', 'maxLowTemp')"
                min-width="130"
                key="151"
              ></el-table-column>
              <el-table-column
                prop="maxLowTempTime"
                label="日最低气温最大值出现时间"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'maxLowTemp')"
                min-width="180"
                key="152"
              ></el-table-column>
              <el-table-column
                prop="minLowTemp"
                label="日最低气温最小值"
                sortable="custom"
                v-if="isColumnShow('day', 'minLowTemp')"
                min-width="130"
                key="153"
              ></el-table-column>
              <el-table-column
                prop="minLowTempTime"
                label="日最低气温最小值出现时间"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'minLowTemp')"
                min-width="180"
                key="154"
              ></el-table-column>
              <el-table-column
                prop="avgLowTemp"
                label="最低气温平均值"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'avgLowTemp')"
                min-width="180"
                key="154"
              ></el-table-column>
              <el-table-column
                prop="avgHighTemp"
                label="最高气温平均值"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'avgLowTemp')"
                min-width="180"
                key="154"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgTemp"
                label="平均气温"
                sortable="custom"
                v-if="isColumnShow('day', 'avgTemp')"
                min-width="80"
                key="155"
              ></el-table-column>
              <el-table-column prop="highTempDays" label="高温日数" v-if="isColumnShow('day', 'highTempDays')" min-width="140" sortable="custom" key="156">
                <template #header>
                  <el-popover popper-class="thresholdPopover" placement="bottom" :width="270" ref="highTempVisible">
                    <el-form :model="wholeThresholdObj.highTempThreshold" :rules="winHourRules" ref="winHourForm">
                      <div class="thresholdName">最高气温 ≥</div>
                      <el-form-item prop="highTempThreshold">
                        <input v-model="wholeThresholdObj.highTempThreshold.highTempThreshold1" type="number" class="yzInput" />
                      </el-form-item>
                      <el-button class="thresholdSure" type="primary" size="small" @click="searchTableData('highTempVisible')">确定</el-button>
                    </el-form>
                    <template #reference>
                      <span v-if="isColumnShow('day', 'highTempDays')" @click.stop="showFilter('highTempVisible')">
                        高温日数 (≥{{ highTempThreshold1Cache }}°C)
                        <em class="el-icon-edit thresholdIcon"></em>
                      </span>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxConsecutiveHighTempDays"
                label="持续高温日数"
                sortable="custom"
                v-if="isColumnShow('day', 'highTempDays')"
                min-width="120"
                key="157"
              ></el-table-column>
              <el-table-column prop="lowTempDays" label="低温日数" v-if="isColumnShow('day', 'lowTempDays')" min-width="140" sortable="custom" key="158">
                <template #header>
                  <el-popover popper-class="thresholdPopover" placement="bottom" :width="270" ref="lowTempVisible">
                    <el-form :model="wholeThresholdObj.lowTempThreshold" :rules="winHourRules" ref="winHourForm">
                      <div class="thresholdName">最低气温 {{ `≤` }}</div>
                      <el-form-item prop="lowTempThreshold">
                        <input v-model="wholeThresholdObj.lowTempThreshold.lowTempThreshold" type="number" class="yzInput" />
                      </el-form-item>
                      <el-button class="thresholdSure" type="primary" size="small" @click="searchTableData('lowTempVisible')">确定</el-button>
                    </el-form>
                    <template #reference>
                      <span v-if="isColumnShow('day', 'lowTempDays')" @click.stop="showFilter('lowTempVisible')">
                        低温日数 (≤{{ lowTempThresholdCache }}°C)
                        <em class="el-icon-edit thresholdIcon"></em>
                      </span>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="maxConsecutiveLowTempDays"
                label="持续低温日数"
                sortable="custom"
                v-if="isColumnShow('day', 'lowTempDays')"
                min-width="110"
                key="159"
              ></el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="avgTemp4Avg"
                label="日平均气温距平"
                sortable="custom"
                v-if="isColumnShow('day', 'avgTemp4Avg')"
                min-width="110"
                key="160"
              ></el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="highTempIfGtExt"
                label="高温突破极值情况"
                sortable="custom"
                v-if="isColumnShow('day', 'highTempIfGtExt')"
                min-width="200"
                key="162"
              >
                <template slot-scope="scope">
                  <span>
                    {{ forMateExtData(scope.row.highTempIfGtExt) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="highTempGtExt"
                label="高温旬/月/历史极值"
                sortable="custom"
                v-if="isColumnShow('day', 'highTempIfGtExt')"
                min-width="190"
                key="163"
              >
                <template slot-scope="scope">
                  <span>{{ forValueExtData(scope.row.highTempGtExt) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="highTempGtExtTime"
                label="高温旬/月/历史极值时间"
                sortable="custom"
                v-if="isColumnShow('day', 'highTempIfGtExt')"
                min-width="200"
                key="164"
              ></el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="lowTempIfLtExt"
                label="低温突破极值情况"
                sortable="custom"
                v-if="isColumnShow('day', 'lowTempIfLtExt')"
                min-width="200"
                key="165"
              >
                <template slot-scope="scope">
                  <span>
                    {{ forMateExtData(scope.row.lowTempIfLtExt) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="lowTempLtExt"
                label="低温旬/月/历史极值"
                sortable="custom"
                v-if="isColumnShow('day', 'lowTempIfLtExt')"
                min-width="190"
                key="166"
              >
                <template slot-scope="scope">
                  <span>{{ forValueExtData(scope.row.lowTempLtExt) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="lowTempLtExtTime"
                label="低温旬/月/历史极值时间"
                sortable="custom"
                v-if="isColumnShow('day', 'lowTempIfLtExt')"
                min-width="200"
                key="167"
              ></el-table-column>

              <!-- 日统计--大风 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxExtWind"
                label="最大阵风"
                sortable="custom"
                v-if="isColumnShow('day', 'maxExtWind')"
                min-width="80"
                key="168"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxAvgWind"
                label="最大平均风"
                sortable="custom"
                v-if="isColumnShow('day', 'maxAvgWind')"
                min-width="90"
                key="169"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTenAvgWind"
                label="最大10分钟平均风"
                sortable="custom"
                v-if="isColumnShow('day', 'maxTenAvgWind')"
                min-width="160"
                key="maxTenAvgWind1"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgAvgWind"
                label="平均风速"
                sortable="custom"
                v-if="isColumnShow('day', 'avgAvgWind')"
                min-width="80"
                key="170"
              ></el-table-column>
              <el-table-column prop="bigWindDays" label="大风日数" v-if="isColumnShow('day', 'bigWindDays')" :min-width="170" sortable="custom" key="171">
                <template #header>
                  <el-popover popper-class="thresholdPopover" placement="bottom" :width="270" ref="bigWindVisible">
                    <el-form :model="wholeThresholdObj.bigWindThreshold" :rules="winHourRules" ref="winHourForm">
                      <div class="thresholdName">极大风风速 ≥</div>
                      <el-form-item prop="bigWindThreshold">
                        <input v-model="wholeThresholdObj.bigWindThreshold.bigWindThreshold" type="number" class="yzInput" />
                      </el-form-item>
                      <el-button class="thresholdSure" type="primary" size="small" @click="searchTableData('bigWindVisible')">确定</el-button>
                    </el-form>
                    <template #reference>
                      <span v-if="isColumnShow('day', 'bigWindDays')" @click.stop="showFilter('bigWindVisible')">
                        大风日数 (≥{{ bigWindThresholdCache }}m/s )
                        <em class="el-icon-edit thresholdIcon"></em>
                      </span>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="bigWindDays4Avg"
                label="大风日数距平"
                sortable="custom"
                v-if="isColumnShow('day', 'bigWindDays')"
                min-width="100"
                key="172"
              ></el-table-column>
              <el-table-column prop="smallWindDays" label="小风日数" v-if="isColumnShow('day', 'smallWindDays')" :min-width="160" sortable="custom" key="173">
                <template #header>
                  <el-popover popper-class="thresholdPopover" placement="bottom" :width="320" ref="smallWindVisible">
                    <el-form :model="wholeThresholdObj.smallWindThreshold" :rules="winHourRules" ref="winHourForm">
                      <div class="thresholdName">极大风风速 ≤</div>
                      <el-form-item prop="smallWindThreshold">
                        <input v-model="wholeThresholdObj.smallWindThreshold.smallWindThreshold" type="number" class="yzInput" />
                      </el-form-item>
                      <el-button class="thresholdSure" type="primary" size="small" @click="searchTableData('smallWindVisible')">确定</el-button>
                    </el-form>
                    <template #reference>
                      <span v-if="isColumnShow('day', 'smallWindDays')" @click.stop="showFilter('smallWindVisible')">
                        小风日数 (≤{{ smallWindThresholdCache }}m/s)
                        <em class="el-icon-edit thresholdIcon"></em>
                      </span>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="smallWindDays4Avg"
                label="小风日数距平"
                sortable="custom"
                v-if="isColumnShow('day', 'smallWindDays')"
                min-width="100"
                key="174"
              ></el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="extWindIfGtExt"
                label="极大风突破极值情况"
                sortable="custom"
                v-if="isColumnShow('day', 'extWindIfGtExt')"
                min-width="210"
                key="175"
              >
                <template slot-scope="scope">
                  <span>{{ forMateExtData(scope.row.extWindIfGtExt) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="extWindGtExt"
                label="极大风旬/月/历史极值"
                sortable="custom"
                v-if="isColumnShow('day', 'extWindIfGtExt')"
                min-width="200"
                key="176"
              >
                <template slot-scope="scope">
                  <span>{{ forValueExtData(scope.row.extWindGtExt) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="extWindGtExtTime"
                label="极大风旬/月/历史极值时间"
                sortable="custom"
                v-if="isColumnShow('day', 'extWindIfGtExt')"
                min-width="210"
                key="177"
              ></el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="avgWindIfGtExt"
                label="平均风突破极值情况"
                sortable="custom"
                v-if="isColumnShow('day', 'avgWindIfGtExt')"
                min-width="210"
                key="178"
              >
                <template slot-scope="scope">
                  <span>{{ forMateExtData(scope.row.avgWindIfGtExt) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="avgWindGtExt"
                label="平均风旬/月/历史极值"
                sortable="custom"
                v-if="isColumnShow('day', 'avgWindIfGtExt')"
                min-width="200"
                key="179"
              >
                <template slot-scope="scope">
                  <span>{{ forValueExtData(scope.row.avgWindGtExt) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="avgWindGtExtTime"
                label="平均风旬/月/历史极值时间"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'avgWindIfGtExt')"
                min-width="240"
                key="180"
              ></el-table-column>

              <!-- 日统计--天气现象 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="fogDays"
                label="大雾日数"
                sortable="custom"
                v-if="isColumnShow('day', 'fogDays')"
                min-width="80"
                key="181"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="hazeDays"
                label="霾日数"
                sortable="custom"
                v-if="isColumnShow('day', 'hazeDays')"
                min-width="60"
                key="182"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="sandDays"
                label="沙尘日数"
                sortable="custom"
                v-if="isColumnShow('day', 'sandDays')"
                min-width="80"
                key="183"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="freezingRainDays"
                label="冻雨日数"
                sortable="custom"
                v-if="isColumnShow('day', 'freezingRainDays')"
                min-width="80"
                key="184"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="snowDays"
                label="降雪日数"
                sortable="custom"
                v-if="isColumnShow('day', 'snowDays')"
                min-width="80"
                key="185"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="thunderDays"
                label="雷暴日数"
                sortable="custom"
                v-if="isColumnShow('day', 'thunderDays')"
                min-width="80"
                key="186"
              ></el-table-column>

              <!-- 日统计--积雪深度 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxSnowDeep"
                label="最大积雪深度"
                sortable="custom"
                v-if="isColumnShow('day', 'maxSnowDeep')"
                min-width="110"
                key="189"
              ></el-table-column>
              <el-table-column
                prop="maxSnowDeepTime"
                label="最大积雪深度出现日期"
                :show-overflow-tooltip="true"
                sortable="custom"
                v-if="isColumnShow('day', 'maxSnowDeep')"
                min-width="150"
                key="190"
              ></el-table-column>
              <el-table-column
                prop="maxSnowDeepChangeValue"
                label="最大24小时积雪深度变化"
                sortable="custom"
                v-if="isColumnShow('day', 'maxSnowDeepChangeValue')"
                min-width="180"
                key="191"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="snowDeepDays"
                label="积雪日数"
                sortable="custom"
                v-if="isColumnShow('day', 'snowDeepDays')"
                min-width="80"
                key="192"
              ></el-table-column>

              <!-- 日统计--能见度 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="minVis"
                label="最小能见度"
                sortable="custom"
                v-if="isColumnShow('day', 'minVis')"
                min-width="90"
                key="187"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.minVis < 0.1 ? "＜0.1" : scope.row.minVis }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="minVisTime"
                label="最小能见度出现时间"
                sortable="custom"
                v-if="isColumnShow('day', 'minVis')"
                min-width="160"
                key="188"
              ></el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="sumRadi"
                label="累计日照时数"
                sortable="custom"
                v-if="isColumnShow('day', 'sumRadi')"
                min-width="120"
                key="sumRadi1"
              ></el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="oldSumRadi"
                label="日照时数常年值"
                sortable="custom"
                v-if="isColumnShow('day', 'sumRadi')"
                min-width="140"
                key="sumRadi2"
              ></el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="radiJuPing"
                label="日照距平百分率"
                sortable="custom"
                v-if="isColumnShow('day', 'sumRadi')"
                min-width="140"
                key="sumRadi3"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="firstFrostTime"
                label="初霜冻日"
                sortable="custom"
                v-if="isColumnShow('day', 'firstFrostDay')"
                min-width="120"
                key="241"
              ></el-table-column>

              <!-- 旬统计--降水量 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="sumPre"
                label="降水量"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'sumPre')"
                min-width="70"
                key="ten1"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historyPre"
                label="降水量常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'sumPre', 'allYear')"
                min-width="120"
                key="historyPre"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="preRank"
                label="降水量历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'sumPre', 'hisOrder')"
                min-width="120"
                key="preRank"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="preExt"
                label="降水量极值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'sumPre', 'ext')"
                min-width="120"
                key="preExt"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="pre4Avg"
                label="降水距平百分率"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'pre4Avg')"
                min-width="120"
                key="ten2"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxPre"
                label="最大日降水量"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxPre')"
                min-width="100"
                key="tens1"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxPreTime"
                label="最大日降水量出现时间"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxPre') && !queryObj.isMoreTime"
                min-width="140"
                key="tens2"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="rainDays"
                label="降水日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'rainDays')"
                min-width="80"
                key="ten3"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historyRainDays"
                label="降水日数常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'rainDays', 'allYear')"
                min-width="110"
                key="historyRainDays"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="rainDaysRank"
                label="降水日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'rainDays', 'hisOrder')"
                min-width="120"
                key="rainDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="rainDaysExt"
              label="降水日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'rainDays','hisOrder','month')"
              min-width="120"
              key="rainDaysExt"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="heavyRainDays"
                label="暴雨日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'heavyRainDays')"
                min-width="80"
                key="ten4"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historyHeavyRainDays"
                label="暴雨日数常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'heavyRainDays', 'allYear')"
                min-width="110"
                key="historyHeavyRainDays"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="heavyRainDaysRank"
                label="暴雨日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'heavyRainDays', 'hisOrder')"
                min-width="120"
                key="heavyRainDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="heavyRainDaysExt"
              label="暴雨日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'heavyRainDays','hisOrder','month')"
              min-width="120"
              key="heavyRainDaysExt"
              ></el-table-column>-->

              <!-- 旬统计--气温 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgTemp"
                label="平均气温"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'avgTemp')"
                min-width="80"
                key="ten5"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historyAvgTemp"
                label="平均气温常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'avgTemp', 'allYear')"
                min-width="110"
                key="historyAvgTemp"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgTempRank"
                label="平均气温历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'avgTemp', 'hisOrder')"
                min-width="120"
                key="avgTempRank"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgTempExt"
                label="平均气温极值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'avgTemp', 'hisOrder', 'month')"
                min-width="120"
                key="avgTempExt"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="temp4Avg"
                label="气温距平"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'temp4Avg')"
                min-width="80"
                key="ten6"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTemp"
                label="最高气温"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxTemp')"
                min-width="80"
                key="ten7"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historyMaxTemp"
                label="最高气温常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxTemp', 'allYear', 'noTen')"
                min-width="120"
                key="historyMaxTemp"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTempRank"
                label="最高气温历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxTemp', 'hisOrder')"
                min-width="120"
                key="maxTempRank"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTempExt"
                label="最高气温极值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxTemp', 'ext')"
                min-width="120"
                key="maxTempExt"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTemp"
                label="最低气温"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'minTemp')"
                min-width="80"
                key="ten8"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historyMinTemp"
                label="最低气温常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'minTemp', 'allYear', 'noTen')"
                min-width="120"
                key="historyMinTemp"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTempRank"
                label="最低气温历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'minTemp', 'hisOrder')"
                min-width="120"
                key="minTempRank"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTempExt"
                label="最低气温极值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'minTemp', 'ext')"
                min-width="120"
                key="minTempExt"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="highTempDays"
                label="高温日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'highTempDays')"
                min-width="80"
                key="highTempDays"
              ></el-table-column>
              <!-- 旬统计--大风 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxExtWind"
                label="最大阵风"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxExtWind')"
                min-width="80"
                key="ten9"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxExtWindTime"
                label="最大阵风出现时间"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxExtWind') && !queryObj.isMoreTime"
                min-width="120"
                key="maxExtWindTime"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxAvgWind"
                label="最大平均风"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxAvgWind')"
                min-width="90"
                key="ten10"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="maxAvgWindTime"
              label="最大平均风出现时间"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'maxAvgWind','none')"
              min-width="130"
              key="maxAvgWindTime"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="bigWindDays"
                label="大风日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'bigWindDays')"
                min-width="80"
                key="ten11"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historyBigWindDays"
                label="大风日数常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'bigWindDays', 'allYear')"
                min-width="120"
                key="historyBigWindDays"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="bigWindDaysRank"
                label="大风日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'bigWindDays', 'hisOrder')"
                min-width="120"
                key="bigWindDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="bigWindDaysExt"
              label="大风日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'bigWindDays','hisOrder','month')"
              min-width="120"
              key="bigWindDaysExt"
              ></el-table-column>-->

              <!-- 旬统计--能见度 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="visLt1000mDays"
                label="能见度<1km日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'visLt1000mDays')"
                min-width="120"
                key="ten12"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="visLt500mDays"
                label="能见度<500m日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'visLt500mDays')"
                min-width="120"
                key="ten13"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="visLt200mDays"
                label="能见度<200m日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'visLt200mDays')"
                min-width="120"
                key="ten14"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="visLt100mDays"
                label="能见度<100m日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'visLt100mDays')"
                min-width="120"
                key="ten15"
              ></el-table-column>
              <!-- 旬统计--天气现象 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="sandDays"
                label="沙尘日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'sandDays')"
                min-width="80"
                key="ten16"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historySandDays"
                label="沙尘日数常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'sandDays', 'allYear')"
                min-width="120"
                key="historySandDays"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="sandDaysRank"
                label="沙尘日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'sandDays', 'hisOrder')"
                min-width="120"
                key="sandDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="sandDaysExt"
              label="沙尘日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'sandDays','hisOrder','month')"
              min-width="120"
              key="sandDaysExt"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="snowDays"
                label="降雪日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'snowDays')"
                min-width="80"
                key="ten17"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historySnowDays"
                label="降雪日数常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'snowDays', 'allYear')"
                min-width="120"
                key="historySnowDays"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="snowDaysRank"
                label="降雪日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'snowDays', 'hisOrder')"
                min-width="120"
                key="snowDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="snowDaysExt"
              label="降雪日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'snowDays','hisOrder','month')"
              min-width="120"
              key="snowDaysExt"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="fogDays"
                label="大雾日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'fogDays')"
                min-width="80"
                key="ten18"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historyFogDays"
                label="大雾日数常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'fogDays', 'allYear')"
                min-width="120"
                key="historyFogDays"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="fogDaysRank"
                label="大雾日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'fogDays', 'hisOrder')"
                min-width="120"
                key="fogDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="fogDaysExt"
              label="大雾日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'fogDays','hisOrder','month')"
              min-width="120"
              key="fogDaysExt"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="hazeDays"
                label="霾日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'hazeDays')"
                min-width="80"
                key="ten19"
              ></el-table-column>
              <!-- <el-table-column
                :render-header="forceWrapLine"
                prop="historyHazeDays"
                label="霾日数常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'hazeDays', 'allYear')"
                min-width="120"
                key="historyHazeDays"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="hazeDaysRank"
                label="霾日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'hazeDays', 'hisOrder')"
                min-width="120"
                key="hazeDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="hazeDaysExt"
              label="霾日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'hazeDays','hisOrder','month')"
              min-width="120"
              key="hazeDaysExt"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="freezingRainDays"
                label="冻雨日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'freezingRainDays')"
                min-width="80"
                key="ten20"
              ></el-table-column>
              <!-- <el-table-column
                :render-header="forceWrapLine"
                prop="historyFreezingRainDays"
                label="冻雨日数常年值"
                sortable="custom"
                v-if="
                  isColumnShow('ten-month-year', 'freezingRainDays', 'allYear')
                "
                min-width="120"
                key="historyFreezingRainDays"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="freezingRainDaysRank"
                label="冻雨日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'freezingRainDays', 'hisOrder')"
                min-width="120"
                key="freezingRainDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="freezingRainDaysExt"
              label="冻雨日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'freezingRainDays','hisOrder','month')"
              min-width="120"
              key="freezingRainDaysExt"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="thunderDays"
                label="雷暴日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'thunderDays')"
                min-width="80"
                key="ten21"
              ></el-table-column>
              <!-- <el-table-column
                :render-header="forceWrapLine"
                prop="historyThunderDays"
                label="雷暴日数常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'thunderDays', 'allYear')"
                min-width="120"
                key="historyThunderDays"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="thunderDaysRank"
                label="雷暴日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'thunderDays', 'hisOrder')"
                min-width="120"
                key="thunderDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="thunderDaysExt"
              label="雷暴日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'thunderDays','hisOrder','month')"
              min-width="120"
              key="thunderDaysExt"
              ></el-table-column>-->
              <!-- 旬统计--最大积雪深度 -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxSnowDeep"
                label="最大积雪深度"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxSnowDeep')"
                min-width="120"
                key="ten22"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxSnowDeepTime"
                :show-overflow-tooltip="true"
                label="最大积雪深度出现时间"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'maxSnowDeep') && !queryObj.isMoreTime"
                min-width="140"
                key="maxSnowDeepTime"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="maxSnowDeepExt"
              label="最大积雪极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'maxSnowDeep','hisOrder','month')"
              min-width="120"
              key="maxSnowDeepExt"
              ></el-table-column>-->
              <el-table-column
                :render-header="forceWrapLine"
                prop="snowDeepDays"
                label="积雪日数"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'snowDeepDays')"
                min-width="80"
                key="ten23"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="historySnowDeepDays"
                label="积雪日数常年值"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'snowDeepDays', 'allYear')"
                min-width="120"
                key="historySnowDeepDays"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="snowDeepDaysRank"
                label="积雪日数历史排位"
                sortable="custom"
                v-if="isColumnShow('ten-month-year', 'snowDeepDays', 'hisOrder')"
                min-width="120"
                key="snowDeepDaysRank"
              ></el-table-column>
              <!-- <el-table-column
              :render-header="forceWrapLine"
              prop="snowDeepDaysExt"
              label="积雪日数极值"
              sortable="custom"
              v-if="isColumnShow('ten-month-year', 'snowDeepDays','hisOrder','month')"
              min-width="120"
              key="snowDeepDaysExt"
              ></el-table-column>-->
            </el-table>

            <!-- 历年同期统计-- -->
            <el-table
              :data="pointStaTable"
              border
              class="defaultTable selScrollBar"
              ref="pointStaTableRef"
              highlight-current-row
              v-else-if="refreashTable1 && (activeTimeType == 'cnYear' || activeTimeType == 'dayIndex')"
              fit
              @current-change="searchPointUniqueData"
              @sort-change="pointSortChange"
              :default-sort="pointSortDefault"
              key="table2"
            >
              <el-table-column type="index" label="序号" key="300" min-width="50"></el-table-column>
              <el-table-column :render-header="forceWrapLine" prop="year" label="年份" sortable="custom" min-width="110" key="301"></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgPre"
                label="平均降水"
                sortable="custom"
                min-width="110"
                key="302"
                v-if="isColumnShow('cnYear', 'avgPre')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgTemp"
                label="平均气温"
                sortable="custom"
                min-width="110"
                key="304"
                v-if="isColumnShow('cnYear', 'avgTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldAvgPre"
                label="降水常年值"
                sortable="custom"
                min-width="110"
                key="3021"
                v-if="isColumnShow('cnYear', 'avgPre')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldAvgTemp"
                label="气温常年值"
                sortable="custom"
                min-width="110"
                key="30211"
                v-if="isColumnShow('cnYear', 'avgTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="preHisRowNnm"
                label="降水历史排位"
                sortable="custom"
                min-width="110"
                key="30212"
                v-if="isColumnShow('cnYear', 'avgPre')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="temHisRowNnm"
                label="气温历史排位"
                sortable="custom"
                min-width="110"
                key="30213"
                v-if="isColumnShow('cnYear', 'avgTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="preJuPing"
                label="降水距平百分率"
                sortable="custom"
                min-width="110"
                key="3022"
                v-if="isColumnShow('cnYear', 'avgPre')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="temJuPing"
                label="气温距平"
                sortable="custom"
                min-width="110"
                key="30221"
                v-if="isColumnShow('cnYear', 'avgTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgPreDays"
                label="平均降水日数"
                sortable="custom"
                min-width="110"
                key="303"
                v-if="isColumnShow('cnYear', 'avgPreDays')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldAvgPreDays"
                label="降水日数常年值"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgPreDays')"
                min-width="110"
                key="cnYear_d140"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="preDaysJuPing"
                label="降水日数距平"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgPreDays')"
                min-width="100"
                key="cnYear_d141"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="preDaysHisRowNnm"
                label="降水日数历史排位"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgPreDays')"
                min-width="120"
                key="cnYear_d142"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgSnow"
                label="平均降雪"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgSnow')"
                min-width="120"
                key="avgSnow1111"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldAvgSnow"
                label="降雪常年值"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgSnow')"
                min-width="120"
                key="avgSnow1112"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="snowHisRowNnm"
                label="降雪历史排位"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgSnow')"
                min-width="120"
                key="avgSnow1113"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="snowJuPing"
                label="降雪距平百分率"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgSnow')"
                min-width="120"
                key="avgSnow1114"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgTempDays"
                label="平均气温高温日数"
                sortable="custom"
                min-width="120"
                key="305"
                v-if="isColumnShow('cnYear', 'avgTempDays')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldAvgTempDays"
                label="平均气温高温日数常年值"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgTempDays')"
                min-width="150"
                key="cnYear_t140"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="tempDaysJuPing"
                label="平均气温高温日数距平"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgTempDays')"
                min-width="140"
                key="cnYear_t141"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="tempDaysHisRowNnm"
                label="平均气温高温日数历史排位"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgTempDays')"
                min-width="170"
                key="cnYear_t142"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTemp"
                label="最高气温"
                sortable="custom"
                min-width="110"
                key="306"
                v-if="isColumnShow('cnYear', 'maxTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldMaxTemp"
                label="最高气温常年值"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'maxTemp')"
                min-width="110"
                key="cnYear_m150"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTemJuPing"
                label="最高气温距平"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'maxTemp')"
                min-width="120"
                key="cnYear_m151"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTemHisRowNnm"
                label="最高气温历史排位"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'maxTemp')"
                min-width="120"
                key="cnYear_m152"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgMaxTempDays"
                label="平均高温日数"
                sortable="custom"
                min-width="110"
                key="307"
                v-if="isColumnShow('cnYear', 'avgMaxTempDays')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldAvgMaxTempDays"
                label="平均高温日数常年值"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgMaxTempDays')"
                min-width="130"
                key="cnYear_a140"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTempDaysJuPing"
                label="平均高温日数距平"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgMaxTempDays')"
                min-width="120"
                key="cnYear_a141"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="maxTempDaysHisRowNnm"
                label="平均高温日数历史排位"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgMaxTempDays')"
                min-width="150"
                key="cnYear_a142"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTemp"
                label="最低气温"
                sortable="custom"
                min-width="110"
                key="308"
                v-if="isColumnShow('cnYear', 'minTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldMinTemp"
                label="最低气温常年值"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'minTemp')"
                min-width="110"
                key="cnYear_m140"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTemJuPing"
                label="最低气温距平"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'minTemp')"
                min-width="100"
                key="cnYear_m141"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTemHisRowNnm"
                label="最低气温历史排位"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'minTemp')"
                min-width="150"
                key="cnYear_m142"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgMinTempDays"
                label="平均低温日数"
                sortable="custom"
                min-width="110"
                key="309"
                v-if="isColumnShow('cnYear', 'avgMinTempDays')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldAvgMinTempDays"
                label="平均低温日数常年值"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgMinTempDays')"
                min-width="130"
                key="cnYear_m143"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTempDaysJuPing"
                label="平均低温日数距平"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgMinTempDays')"
                min-width="120"
                key="cnYear_m144"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="minTempDaysHisRowNnm"
                label="平均低温日数历史排位"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgMinTempDays')"
                min-width="150"
                key="cnYear_m145"
              ></el-table-column>

              <!-- <el-table-column
                :render-header="forceWrapLine"
                prop="avgTempJuPing"
                label="气温距平"
                sortable="custom"
                v-if="isColumnShow('cnYear', 'avgTemp')"
                min-width="80"
                key="day52"
              ></el-table-column> -->
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgSumTemp0Num"
                label="0°C以上平均气温积温"
                sortable="custom"
                min-width="150"
                key="day55"
                v-if="isColumnShow('cnYear', 'avgSumTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldAvgSumTemp0Num"
                label="0°C以上积温常年值"
                sortable="custom"
                min-width="130"
                key="day64"
                v-if="isColumnShow('cnYear', 'avgSumTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="sumTem0NumHisRowNnm"
                label="0°C以上积温历史排位"
                sortable="custom"
                min-width="145"
                key="day63"
                v-if="isColumnShow('cnYear', 'avgSumTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="sumTem0NumJuPing"
                label="0°C以上积温距平"
                sortable="custom"
                min-width="120"
                key="day57"
                v-if="isColumnShow('cnYear', 'avgSumTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="avgSumTemp10Num"
                label="10°C以上平均气温积温"
                sortable="custom"
                min-width="160"
                key="day59"
                v-if="isColumnShow('cnYear', 'avgSumTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="oldAvgSumTemp10Num"
                label="10°C以上积温常年值"
                sortable="custom"
                min-width="140"
                key="day60"
                v-if="isColumnShow('cnYear', 'avgSumTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="sumTem10NumHisRowNnm"
                label="10°C以上积温历史排位"
                sortable="custom"
                min-width="165"
                key="day62"
                v-if="isColumnShow('cnYear', 'avgSumTemp')"
              ></el-table-column>
              <el-table-column
                :render-header="forceWrapLine"
                prop="sumTem10NumJuPing"
                label="10°C以上积温距平"
                sortable="custom"
                min-width="130"
                key="day61"
                v-if="isColumnShow('cnYear', 'avgSumTemp')"
              ></el-table-column>
            </el-table>
          </el-scrollbar>
          <el-pagination
            class="resultPagination"
            background
            @current-change="handleCurrentChange1"
            :current-page.sync="queryObj.page"
            :page-size="queryObj.size"
            layout="prev, pager, next, jumper"
            :total="pointStaTableTotal"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div
      class="rightResultCon"
      v-show="queryObj.timeOption != 'cnYear'"
      :style="{
        display: (isShowSXT || isShowQYTJ) && queryObj.timeOption != 'cnYear' ? 'block' : 'none',
      }"
      :class="{
        dayIndexClass: queryObj.timeOption == 'dayIndex',
      }"
    >
      <div class="areaTableCon" style="width: 100%" v-show="isShowQYTJ">
        <div class="normalTable">
          <div class="tableTitle tableTitle2">
            <label>
              <img src="@/assets/pic/statistical-analysis/rightTableTitleIcon.png" alt />
              <span class="tableTitleTime">{{ timeName }}</span>
              <span class="tableTitleName">{{ tongjiname1 }}表</span>
            </label>
            <div class="tableOperate">
              <div class="chartPic singleOperate" @click="showDataStatis('area')" v-if="isEnable">
                <img src="@/assets/pic/statistical-analysis/barChart.png" />
              </div>
              <div class="tableExport singleOperate" @click="exportTableData('area')" v-if="isEnable">
                <img src="@/assets/pic/statistical-analysis/exportTable.png" />
              </div>
            </div>
          </div>
          <div v-loading="regoinTableLoading">
            <el-scrollbar :class="[isShowSXT && JSON.stringify(bottomCheckedElement) != '{}' && isShowQYTJ ? 'rightTopScrollbar' : 'rightScrollbar']">
              <el-table
                :data="pointUniqueTable"
                height="180"
                border
                class="defaultTable"
                :default-sort="regionSortDefault"
                @sort-change="regionSortChange"
                key="table003"
                ref="regoinTableRef"
              >
                <template slot="empty">
                  <p>{{ dataAreaText }}</p>
                </template>
                <el-table-column :render-header="forceWrapLine" type="index" label="序号" key="0" width="60"></el-table-column>
                <el-table-column
                  prop="areaName"
                  v-if="isShowFeildsTab2(allfeilds.other.areaName) && queryObj.timeOption != 'dayIndex'"
                  label="区域名称"
                  key="5"
                  :show-overflow-tooltip="true"
                  width="120"
                ></el-table-column>
                <el-table-column
                  class="pointName"
                  :prop="allfeilds.other.sName"
                  label="站名"
                  v-if="queryObj.timeOption == 'dayIndex'"
                  key="1"
                  min-width="80"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span style="color: #4094da; font-weight: bold">
                      {{ scope.row[allfeilds.other.sName] }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column :prop="allfeilds.other.sId" label="站号" v-if="queryObj.timeOption == 'dayIndex'" key="2" min-width="70"></el-table-column>
                <el-table-column
                  :prop="allfeilds.other.cityName"
                  label="市名"
                  v-if="cacheArea.type == 'capitals' && isShowFeilds(allfeilds.other.cityName)"
                  key="4c"
                  min-width="50"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="province"
                  label="省名"
                  v-if="isShowFeildsTab2(allfeilds.other.shengName)"
                  key="3"
                  min-width="70"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  :prop="allfeilds.other.cityName"
                  :label="cacheArea.type == 'county' ? '县名' : '市名'"
                  v-if="isShowFeildsTab2(allfeilds.other.cityName)"
                  key="4"
                  min-width="60"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  :prop="allfeilds.other.countyName"
                  label="县名"
                  v-if="isShowFeildsTab2(allfeilds.other.countyName)"
                  key="5"
                  min-width="60"
                ></el-table-column>
                <el-table-column
                  prop="dateTimeName"
                  v-if="dateTimeNameShow('ten-month-year', 'dateTimeName')"
                  :label="dateTimeNameFamtt()"
                  key="6"
                  sortable="custom"
                  :show-overflow-tooltip="true"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="dateTimeName"
                  v-if="dateTimeNameShow('dayIndex', 'dateTimeName')"
                  :label="dateTimeNameFamtt()"
                  key="7"
                  sortable="custom"
                  :show-overflow-tooltip="true"
                  min-width="120"
                ></el-table-column>
                <!-- 小时--降水 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgPre"
                  label="平均降水量"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'sumPre')"
                  min-width="90"
                  key="205"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="preArea"
                  label="降水面积"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'sumPre')"
                  min-width="80"
                  key="206"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max1hPre"
                  label="最大1小时降水量"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max1hPre')"
                  min-width="120"
                  key="207"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max1hPreTimeStr"
                  label="最大1小时降水量出现时间"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max1hPre')"
                  min-width="220"
                  key="208"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max1hPreStaionName"
                  label="最大1小时降水量站点"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max1hPre')"
                  min-width="160"
                  key="240"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max3hPre"
                  label="最大3小时降水量"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max3hPre')"
                  min-width="120"
                  key="209"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max3hPreTimeStr"
                  label="最大3小时降水量出现时间"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max3hPre')"
                  min-width="220"
                  key="210"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max3hPreStaionName"
                  label="最大3小时降水量站点"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max3hPre')"
                  min-width="160"
                  key="241"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max6hPre"
                  label="最大6小时降水量"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max6hPre')"
                  min-width="120"
                  key="211"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max6hPreTimeStr"
                  label="最大6小时降水量出现时间"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max6hPre')"
                  min-width="220"
                  key="212"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max6hPreStaionName"
                  label="最大6小时降水量站点"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max6hPre')"
                  min-width="160"
                  key="242"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max24hPre"
                  label="最大24小时降水量"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max24hPre')"
                  min-width="120"
                  key="211"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max24hPreTimeStr"
                  label="最大24小时降水量出现时间"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max24hPre')"
                  min-width="220"
                  key="212"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="max24hPreStaionName"
                  label="最大24小时降水量站点"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'max24hPre')"
                  min-width="160"
                  key="242"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgSnow"
                  label="平均降雪量"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'sumSnow')"
                  min-width="220"
                  key="1avgSnow2"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="snowArea"
                  label="降雪面积"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'sumSnow')"
                  min-width="220"
                  key="112sumSnow"
                ></el-table-column>
                <!-- 气温 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxTemp"
                  label="最高气温"
                  sortable="custom"
                  key="200"
                  min-width="80"
                  v-if="isColumnShow('hour', 'maxTemp')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="highTempArea"
                  label="高温面积"
                  key="201"
                  min-width="80"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'maxTemp')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="minTemp"
                  label="最低气温"
                  key="202"
                  min-width="80"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minTemp')"
                ></el-table-column>
                <el-table-column
                  sortable="custom"
                  :render-header="forceWrapLine"
                  prop="highTempStaNum"
                  label="高温站点数"
                  key="203"
                  min-width="110"
                  v-if="isColumnShow('hour', 'highTempHours')"
                ></el-table-column>
                <el-table-column
                  sortable="custom"
                  :render-header="forceWrapLine"
                  prop="highTempScale"
                  label="高温站点比例"
                  key="204"
                  min-width="110"
                  v-if="isColumnShow('hour', 'highTempHours')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgTemp"
                  label="平均气温"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'avgTemp')"
                  min-width="80"
                  key="hour50"
                ></el-table-column>

                <!-- 小时-- 大风 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxAvgWind"
                  label="最大平均风"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'maxAvgWind')"
                  min-width="90"
                  key="214"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxExtWind"
                  label="最大阵风"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'maxExtWind')"
                  min-width="80"
                  key="213"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="bigWindStaNum"
                  label="大风站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'bigWindHours')"
                  min-width="100"
                  key="215"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="bigWindScale"
                  label="大风站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'bigWindHours')"
                  min-width="100"
                  key="216"
                ></el-table-column>

                <!-- 天气现象 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaFogNum"
                  label="大雾站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifFog')"
                  min-width="110"
                  key="226"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaFogNumScale"
                  label="大雾站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifFog')"
                  min-width="110"
                  key="227"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaHazeNum"
                  label="霾站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifHaze')"
                  min-width="110"
                  key="228"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaHazeNumScale"
                  label="霾站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifHaze')"
                  min-width="110"
                  key="229"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaSandNum"
                  label="沙尘站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifSand')"
                  min-width="110"
                  key="230"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaSandNumScale"
                  label="沙尘站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifSand')"
                  min-width="110"
                  key="231"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaSnowNum"
                  label="降雪站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifSnow')"
                  min-width="110"
                  key="232"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaSnowNumScale"
                  label="降雪站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifSnow')"
                  min-width="110"
                  key="233"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaRainNum"
                  label="冻雨站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifRain')"
                  min-width="110"
                  key="234"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaRainNumScale"
                  label="冻雨站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifRain')"
                  min-width="110"
                  key="235"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaThunderNum"
                  label="雷暴站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifThunder')"
                  min-width="110"
                  key="236"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="weaThunderNumScale"
                  label="雷暴站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'ifThunder')"
                  min-width="110"
                  key="237"
                ></el-table-column>
                <!-- 积雪深度 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnowDeep"
                  label="最大积雪深度"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'maxSnowDeep')"
                  min-width="110"
                  key="238"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnowDeepChangeValue"
                  label="最大积雪深度变化"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'maxSnowDeepChangeValue')"
                  min-width="130"
                  key="239"
                ></el-table-column>

                <!-- 小时--能见度 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="minVis"
                  label="最小能见度"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minVis')"
                  min-width="90"
                  key="217"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.minVis < 0.1 ? "＜0.1" : scope.row.minVis }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  :render-header="forceWrapLine"
                  prop="vis100StaNum"
                  label="能见度小于100m站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minVis')"
                  min-width="160"
                  key="218"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="vis100StaScale"
                  label="能见度小于100m站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minVis')"
                  min-width="170"
                  key="219"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="vis200StaNum"
                  label="能见度小于200m站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minVis')"
                  min-width="160"
                  key="220"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="vis200StaScale"
                  label="能见度小于200m站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minVis')"
                  min-width="170"
                  key="221"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="vis500StaNum"
                  label="能见度小于500m站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minVis')"
                  min-width="160"
                  key="222"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="vis500StaScale"
                  label="能见度小于500m站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minVis')"
                  min-width="170"
                  key="223"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="vis1000StaNum"
                  label="能见度小于1000m站点数"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minVis')"
                  min-width="170"
                  key="224"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="vis1000StaScale"
                  label="能见度小于1000m站点比例"
                  sortable="custom"
                  v-if="isColumnShow('hour', 'minVis')"
                  min-width="180"
                  key="225"
                ></el-table-column>

                <!-- 日统计 -->
                <!-- 降水 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgPre"
                  label="平均降水量"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sumPre')"
                  min-width="120"
                  key="241"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSumPre"
                  label="最大累积降水量"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sumPre')"
                  min-width="120"
                  key="240"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="preArea"
                  label="降水面积"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sumPre')"
                  min-width="80"
                  key="242"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="sumPreHisRowNnm"
                  label="降水量历史排位"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sumPre')"
                  min-width="140"
                  key="sumPreHisRowNnm1"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxPreOfDay"
                  label="最大日降水量"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxPre')"
                  min-width="100"
                  key="243"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldSumPre"
                  label="常年值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'pre4Avg')"
                  min-width="100"
                  key="245"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="preJuPing"
                  label="最大降水距平百分率"
                  sortable="custom"
                  v-if="isColumnShow('day', 'pre4Avg')"
                  min-width="190"
                  key="244"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="sumPreJuPing"
                  label="累计降水距平百分率"
                  sortable="custom"
                  v-if="isColumnShow('day', 'pre4Avg')"
                  min-width="190"
                  key="246"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxPreDays"
                  label="最大降水日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays')"
                  min-width="100"
                  key="247"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgPreDays"
                  label="平均降水日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="100"
                  key="242001"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgPreDays"
                  label="平均降水日数常年值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="160"
                  key="242002"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="rainDaysJuPing"
                  label="降水日数距平"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="100"
                  key="242003"
                ></el-table-column>

                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgPre25Days"
                  label="平均大雨日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="100"
                  key="242004"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgPre25Days"
                  label="平均大雨日数常年值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="160"
                  key="242017"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="rain25DaysJuPing"
                  label="大雨日数距平"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="100"
                  key="242015"
                ></el-table-column>

                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgPre50Days"
                  label="平均暴雨日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="100"
                  key="242005"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgPre50Days"
                  label="平均暴雨日数常年值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="160"
                  key="242013"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="rain50DaysJuPing"
                  label="暴雨日数距平"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="100"
                  key="242014"
                ></el-table-column>

                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgPre100Days"
                  label="平均大暴雨日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="120"
                  key="242006"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgPre100Days"
                  label="平均大暴雨日数常年值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="160"
                  key="242007"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="rain100DaysJuPing"
                  label="大暴雨日数距平"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="140"
                  key="242008"
                ></el-table-column>

                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgPre250Days"
                  label="平均特大暴雨日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="160"
                  key="242009"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgPre250Days"
                  label="平均特大暴雨日数常年值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="160"
                  key="242010"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="rain250DaysJuPing"
                  label="特大暴雨日数距平"
                  sortable="custom"
                  v-if="isColumnShow('day', 'rainDays4Avg')"
                  min-width="160"
                  key="242011"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overTenPreNum"
                  label="降水突破旬极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'preIfGtExt')"
                  min-width="210"
                  key="288"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overMonPreNum"
                  label="降水突破月极值"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'preIfGtExt')"
                  key="289"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overHisPreNum"
                  label="降水突破历史极值"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'preIfGtExt')"
                  key="290"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgSnow"
                  label="平均降雪量"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'sumSnow')"
                  key="sumSnow291"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSumSnow"
                  label="最大累积降雪量"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'sumSnow')"
                  key="sumSnow292"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="snowPreArea"
                  label="降雪面积"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'sumSnow')"
                  key="sumSnow293"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="sumSnowHisRowNnm"
                  label="降雪量历史排位"
                  sortable="custom"
                  min-width="140"
                  v-if="isColumnShow('day', 'sumSnow')"
                  key="sumSnow2932"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overTenSnowNum"
                  label="降雪突破旬极值"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'snowIfGtExt')"
                  key="overTenSnowNum290"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overMonSnowNum"
                  label="降雪突破月极值"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'snowIfGtExt')"
                  key="overMonSnowNum290"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overHisSnowNum"
                  label="降雪突破历史极值"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'snowIfGtExt')"
                  key="overHisSnowNum290"
                ></el-table-column>

                <!-- 日统计--气温 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxTemp"
                  label="区域最高温"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxHighTemp')"
                  min-width="100"
                  key="maxTemp246"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overTenMaxTempNum"
                  label="高温旬极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'highTempIfGtExt')"
                  min-width="200"
                  key="410"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overMonMaxTempNum"
                  label="高温月极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'highTempIfGtExt')"
                  min-width="200"
                  key="409"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overHisMaxTempNum"
                  label="高温历史极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'highTempIfGtExt')"
                  min-width="200"
                  key="408"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="highTempNum"
                  label="高温站点数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxHighTemp')"
                  min-width="90"
                  key="247"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="highTempStaScale"
                  label="高温站点比例"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxHighTemp')"
                  min-width="110"
                  key="248"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgTemp"
                  label="平均气温"
                  sortable="custom"
                  v-if="isColumnShow('day', 'avgTemp')"
                  min-width="80"
                  key="day50"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxHighTemDays"
                  label="最大高温日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'highTempDays')"
                  min-width="120"
                  key="day_h_157"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxLowTemDays"
                  label="最大低温日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'lowTempDays')"
                  min-width="120"
                  key="day_l_157"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="minHighTemp"
                  label="最小最高气温"
                  sortable="custom"
                  v-if="isColumnShow('day', 'minHighTemp')"
                  min-width="120"
                  key="day_lt_157"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxLowTemp"
                  label="最大最低气温"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxLowTemp')"
                  min-width="120"
                  key="day_ml_157"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxHeavyRainDays"
                  label="最大暴雨日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'heavyRainDays')"
                  min-width="120"
                  key="day_mh_157"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxNoRainDays"
                  label="最大无降水日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'noRainDays')"
                  min-width="120"
                  key="day_m_157"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="minVis"
                  label="最小能见度"
                  sortable="custom"
                  v-if="isColumnShow('day', 'minVis')"
                  min-width="100"
                  key="day_v_157"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.minVis < 0.1 ? "＜0.1" : scope.row.minVis }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgRadi"
                  label="平均日照时数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sumRadi')"
                  min-width="120"
                  key="sumRadi10"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSumRadi"
                  label="最大累积日照时数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sumRadi')"
                  min-width="160"
                  key="sumRadi11"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgRadi"
                  label="平均日照时数常年值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sumRadi')"
                  min-width="160"
                  key="sumRadi13"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="sumRadiJuPing"
                  label="最大累积日照时数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sumRadi')"
                  min-width="160"
                  key="sumRadi14"
                ></el-table-column>

                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxConsecutiveNoRainDays"
                  label="最大连续无降水日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxConsecutiveNoRainDays')"
                  min-width="120"
                  key="day_m_15"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgTemp"
                  label="气温常年值"
                  sortable="custom"
                  min-width="110"
                  key="day51"
                  v-if="isColumnShow('day', 'avgTemp4Avg')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgTempJuPing"
                  label="气温距平"
                  sortable="custom"
                  v-if="isColumnShow('day', 'avgTemp4Avg')"
                  min-width="80"
                  key="day52"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxAvgSumTemp0Num"
                  label="0°C以上最高积温"
                  sortable="custom"
                  min-width="120"
                  key="day53"
                  v-if="isColumnShow('day', 'avgSumTemp')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgSumTemp0Num"
                  label="0°C以上平均积温"
                  sortable="custom"
                  min-width="120"
                  key="day55"
                  v-if="isColumnShow('day', 'avgSumTemp')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgSumTemp0Num"
                  label="0°C以上积温常年值"
                  sortable="custom"
                  min-width="130"
                  key="day56"
                  v-if="isColumnShow('day', 'avgSumTemp')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgSumTempJuPing0Num"
                  label="0°C以上积温距平"
                  sortable="custom"
                  min-width="120"
                  key="day57"
                  v-if="isColumnShow('day', 'avgSumTemp')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxAvgSumTemp10Num"
                  label="10°C以上最高积温"
                  sortable="custom"
                  v-if="isColumnShow('day', 'avgSumTemp')"
                  min-width="120"
                  key="day58"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgSumTemp10Num"
                  label="10°C以上平均积温"
                  sortable="custom"
                  min-width="120"
                  key="day59"
                  v-if="isColumnShow('day', 'avgSumTemp')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgSumTemp10Num"
                  label="10°C以上积温常年值"
                  sortable="custom"
                  min-width="130"
                  key="day60"
                  v-if="isColumnShow('day', 'avgSumTemp')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgSumTempJuPing10Num"
                  label="10°C以上积温距平"
                  sortable="custom"
                  min-width="120"
                  key="day61"
                  v-if="isColumnShow('day', 'avgSumTemp')"
                ></el-table-column>

                <el-table-column
                  :render-header="forceWrapLine"
                  prop="minTemp"
                  label="区域最低"
                  sortable="custom"
                  v-if="isColumnShow('day', 'minLowTemp')"
                  min-width="80"
                  key="249"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overTenMinTempNum"
                  label="低温旬极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'lowTempIfLtExt')"
                  min-width="200"
                  key="405"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overMonMinTempNum"
                  label="低温月极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'lowTempIfLtExt')"
                  min-width="200"
                  key="406"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overHisMinTempNum"
                  label="低温历史极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'lowTempIfLtExt')"
                  min-width="200"
                  key="407"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="lowTempNum"
                  label="低温站点数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'minLowTemp')"
                  min-width="100"
                  key="250"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="lowTempStaScale"
                  label="低温站点比例"
                  sortable="custom"
                  v-if="isColumnShow('day', 'minLowTemp')"
                  min-width="100"
                  key="251"
                ></el-table-column>
                <el-table-column
                  prop="avgLowTemp"
                  label="平均最低气温"
                  :render-header="forceWrapLine"
                  sortable="custom"
                  v-if="isColumnShow('day', 'avgLowTemp')"
                  min-width="180"
                  key="154"
                ></el-table-column>
                <el-table-column
                  prop="avgHighTemp"
                  label="平均最高气温"
                  :render-header="forceWrapLine"
                  sortable="custom"
                  v-if="isColumnShow('day', 'avgLowTemp')"
                  min-width="180"
                  key="154"
                ></el-table-column>
                <!-- 日统计--大风 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxExtWind"
                  label="最大阵风"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxExtWind')"
                  min-width="80"
                  key="252"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxAvgWind"
                  label="最大平均风"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxAvgWind')"
                  min-width="90"
                  key="253"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxTenAvgWind"
                  label="最大10分钟平均风"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxTenAvgWind')"
                  min-width="160"
                  key="2531"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxBigWindDay"
                  label="大风日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'bigWindDays')"
                  min-width="80"
                  key="254"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="bigWindArea"
                  label="大风面积"
                  sortable="custom"
                  v-if="isColumnShow('day', 'bigWindDays')"
                  min-width="80"
                  key="255"
                ></el-table-column>

                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSmallWindDay"
                  label="小风日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'smallWindDays')"
                  min-width="80"
                  key="256"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overTenAvgWindNum"
                  label="平均风旬极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'avgWindIfGtExt')"
                  min-width="200"
                  key="401"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overMonAvgWindNum"
                  label="平均风月极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'avgWindIfGtExt')"
                  min-width="200"
                  key="402"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overHisAvgWindNum"
                  label="平均风历史极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'avgWindIfGtExt')"
                  min-width="200"
                  key="403"
                ></el-table-column>

                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overTenExtWindNum"
                  label="极大风突破旬极值"
                  sortable="custom"
                  v-if="isColumnShow('day', 'extWindIfGtExt')"
                  min-width="210"
                  key="291"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overMonExtWindNum"
                  label="极大风突破月极值"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'extWindIfGtExt')"
                  key="292"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="overHisExtWindNum"
                  label="极大风突破历史极值"
                  sortable="custom"
                  min-width="210"
                  v-if="isColumnShow('day', 'extWindIfGtExt')"
                  key="293"
                ></el-table-column>

                <!-- 日统计--天气现象 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxFogDays"
                  label="大雾日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'fogDays')"
                  min-width="80"
                  key="258"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="fogArea"
                  label="大雾面积"
                  sortable="custom"
                  v-if="isColumnShow('day', 'fogDays')"
                  min-width="80"
                  key="259"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxHazeDays"
                  label="霾日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'hazeDays')"
                  min-width="60"
                  key="260"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="hazeArea"
                  label="霾面积"
                  sortable="custom"
                  v-if="isColumnShow('day', 'hazeDays')"
                  min-width="60"
                  key="261"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSandDays"
                  label="沙尘日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sandDays')"
                  min-width="80"
                  key="262"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="sandArea"
                  label="沙尘面积"
                  sortable="custom"
                  v-if="isColumnShow('day', 'sandDays')"
                  min-width="80"
                  key="263"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxRainDays"
                  label="冻雨日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'freezingRainDays')"
                  min-width="80"
                  key="264"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="rainArea"
                  label="冻雨面积"
                  sortable="custom"
                  v-if="isColumnShow('day', 'freezingRainDays')"
                  min-width="80"
                  key="265"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxWeaSnowDays"
                  label="降雪日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'snowDays')"
                  min-width="80"
                  key="266"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="snowArea"
                  label="降雪面积"
                  sortable="custom"
                  v-if="isColumnShow('day', 'snowDays')"
                  min-width="80"
                  key="267"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxThunderDays"
                  label="雷暴日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'thunderDays')"
                  min-width="80"
                  key="268"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="thunderArea"
                  label="雷暴面积"
                  sortable="custom"
                  v-if="isColumnShow('day', 'thunderDays')"
                  min-width="80"
                  key="269"
                ></el-table-column>

                <!-- 日统计--积雪深度 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnowDeep"
                  label="最大积雪深度"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="110"
                  key="270"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnow1cmNum"
                  label="大于1cm站点数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="120"
                  key="271"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnow1cmScale"
                  label="大于1cm站点比例"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="130"
                  key="272"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnow5cmNum"
                  label="大于5cm站点数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="120"
                  key="273"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnow5cmScale"
                  label="大于5cm站点比例"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="130"
                  key="274"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnow10cmNum"
                  label="大于10cm站点数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="120"
                  key="275"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnow10cmScale"
                  label="大于10cm站点比例"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="140"
                  key="276"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnow25cmNum"
                  label="大于25cm站点数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="120"
                  key="277"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnow25cmScale"
                  label="大于25cm站点比例"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="140"
                  key="278"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnowArea"
                  label="积雪面积"
                  sortable="custom"
                  v-if="isColumnShow('day', 'maxSnowDeep')"
                  min-width="90"
                  key="279"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxSnowDays"
                  label="积雪日数"
                  sortable="custom"
                  v-if="isColumnShow('day', 'snowDeepDays')"
                  min-width="80"
                  key="280"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="minFirstFrostTime"
                  label="最小初霜冻日"
                  sortable="custom"
                  v-if="isColumnShow('day', 'firstFrostDay')"
                  min-width="120"
                  key="241"
                ></el-table-column>
                <!-- 日序-降水量 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="sumPre"
                  label="降水量"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'sumPre')"
                  min-width="110"
                  key="sumPreIndex1"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgPre"
                  label="平均降水量常年值"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'sumPre')"
                  min-width="160"
                  key="sumPreIndex2"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="preJuPing"
                  label="降水距平百分率"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'sumPre')"
                  min-width="140"
                  key="sumPreIndex3"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="preHisRowNum"
                  label="降水量历史排位"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'sumPre')"
                  min-width="140"
                  key="sumPreIndex4"
                ></el-table-column>
                <!-- <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxPre"
                  label="最大降水量"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'sumPre')"
                  min-width="120"
                  key="sumPreIndex5"
                ></el-table-column> -->
                <!-- 日序-降雪量 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="sumSnow"
                  label="降雪量"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'avgSnow')"
                  min-width="90"
                  key="avgSnowIndex2"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgSnow"
                  label="降雪常年值"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'avgSnow')"
                  min-width="110"
                  key="avgSnowIndex3"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="snowJuPing"
                  label="降雪距平百分率"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'avgSnow')"
                  min-width="140"
                  key="avgSnowIndex4"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="snowHisRowNum"
                  label="降雪历史排位"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'avgSnow')"
                  min-width="120"
                  key="avgSnowIndex5"
                ></el-table-column>
                <!-- 日序-平均气温 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgTemp"
                  label="平均气温"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'avgTemp')"
                  min-width="90"
                  key="avgTempIndex2"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgTemp"
                  label="气温常年值"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'avgTemp')"
                  min-width="110"
                  key="avgTempIndex3"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="temJuPing"
                  label="气温距平"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'avgTemp')"
                  min-width="90"
                  key="avgTempIndex4"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="temHisRowNum"
                  label="气温历史排位"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'avgTemp')"
                  min-width="120"
                  key="avgTempIndex5"
                ></el-table-column>
                <!-- 日序-最高气温 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxTemp"
                  label="最高气温"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'maxTemp')"
                  min-width="90"
                  key="maxTempIndex2"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxTemHisRowNum"
                  label="最高气温历史排位"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'maxTemp')"
                  min-width="160"
                  key="maxTempIndex3"
                ></el-table-column>
                <!-- 日序-最高气温 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="minTemp"
                  label="最低气温"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'minTemp')"
                  min-width="90"
                  key="minTempIndex2"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="minTemHisRowNum"
                  label="最低气温历史排位"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'minTemp')"
                  min-width="160"
                  key="minTempIndex3"
                ></el-table-column>
                <!-- 日序-风 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxExtWind"
                  label="最大阵风"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'maxExtWind')"
                  min-width="90"
                  key="maxExtWindIndex3"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxAvgWind"
                  label="最大平均风"
                  sortable="custom"
                  v-if="isColumnShow('dayIndex', 'maxAvgWind')"
                  min-width="110"
                  key="maxAvgWindIndex3"
                ></el-table-column>
                <!-- 旬月年统计 -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxExtWind"
                  label="最大阵风"
                  sortable="custom"
                  v-if="isColumnShow('ten-month-year', 'maxExtWind')"
                  min-width="80"
                  key="281"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxAvgWind"
                  label="最大平均风"
                  sortable="custom"
                  v-if="isColumnShow('ten-month-year', 'maxAvgWind')"
                  min-width="90"
                  key="282"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgPre"
                  label="平均降水量"
                  sortable="custom"
                  v-if="isColumnShow('ten-month-year', 'sumPre')"
                  min-width="120"
                  key="283"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxPre"
                  label="最大降水量"
                  sortable="custom"
                  v-if="isColumnShow('ten-month-year', 'sumPre')"
                  min-width="120"
                  key="284"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="avgTemp"
                  label="平均气温"
                  sortable="custom"
                  v-if="isColumnShow('ten-month-year', 'avgTemp')"
                  min-width="120"
                  key="285"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgPre"
                  label="降水常年值"
                  sortable="custom"
                  min-width="120"
                  key="386"
                  v-if="isColumnShow('ten-month-year', 'pre4Avg')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgTemp"
                  label="气温常年值"
                  sortable="custom"
                  min-width="120"
                  key="387"
                  v-if="isColumnShow('ten-month-year', 'avgTemp')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="temJuPing"
                  label="气温距平"
                  sortable="custom"
                  min-width="120"
                  key="388"
                  v-if="isColumnShow('ten-month-year', 'temp4Avg')"
                ></el-table-column>
                <!-- <el-table-column
                  :render-header="forceWrapLine"
                  prop="temJuPing"
                  label="气温距平"
                  sortable="custom"
                  v-if="isColumnShow('ten-month-year', 'temp4Avg')"
                  min-width="80"
                  key="ten61"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="oldAvgTemp"
                  label="气温常年值"
                  sortable="custom"
                  v-if="isColumnShow('ten-month-year', 'temp4Avg')"
                  min-width="80"
                  key="ten61"
                ></el-table-column> -->
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="preJuPing"
                  label="降水距平百分率"
                  sortable="custom"
                  min-width="120"
                  key="339"
                  v-if="isColumnShow('ten-month-year', 'pre4Avg')"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="maxTemp"
                  label="最高气温"
                  sortable="custom"
                  v-if="isColumnShow('ten-month-year', 'maxTemp')"
                  min-width="120"
                  key="286"
                ></el-table-column>
                <el-table-column
                  :render-header="forceWrapLine"
                  prop="minTemp"
                  label="最低气温"
                  sortable="custom"
                  v-if="isColumnShow('ten-month-year', 'minTemp')"
                  min-width="120"
                  key="287"
                ></el-table-column>
              </el-table>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div
        :class="['bottomResultCon', isShowSXT && isShowQYTJ ? '' : 'noTopMargin']"
        style="width: 100%"
        v-show="isShowSXT && JSON.stringify(bottomCheckedElement) != '{}' && queryObj.timeOption != 'cnYear' && queryObj.timeOption != 'dayIndex'"
      >
        <div class="bottomTable normalTable" style="width: 100%">
          <div class="tableTitle chartTableTitle">
            <label>
              <img src="@/assets/pic/statistical-analysis/bottomTableTitleIcon.png" alt />
              <span v-if="stationName" class="tableTitleStation">
                {{ stationName }}
              </span>
              <span class="tableTitleTime">{{ timeName }}</span>
              <span class="tableTitleName">时序图</span>
            </label>
            <div class="tableOperate">
              <div class="tableExport singleOperate" @click="getVariThematics()" title="下载图片" style="margin-right: 0">
                <el-icon class="downPic"><Download /></el-icon>
              </div>
              <div class="tableExport singleOperate" @click="exportSXTData()" title="导出数据">
                <img src="@/assets/pic/statistical-analysis/exportTable.png" alt="表格导出" />
              </div>
              <el-select v-model="indexSelectedEleKey" placeholder="请选择" size="small" @change="checkedEleChange">
                <el-option v-for="(item, index) in bottomCheckedElement" :key="item" :label="item" :value="index"></el-option>
              </el-select>
            </div>
          </div>
          <div :class="['defaultScrollbar', isShowSXT && isShowQYTJ ? 'rightBottomScrollbar' : 'allRightBotm']" v-loading="chartLoaing">
            <div id="chartCon" class="chartCon" v-if="isShowSXT && isShowQYTJ" :style="{ width: '100%' }"></div>
            <div id="chartCon" class="allChartCon" :style="{ width: '100%' }" v-loading="chartLoaing" v-else></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="dataStatisDialogClass" :close-on-click-modal="false" v-model="dataStatisVisble" top="10vh" width="1000">
      <template #header>
        <div class="dialogHead">
          <img src="@/assets/pic/statistical-analysis/dialogIcon.png" alt="数据统计图" />
          <span>智能报表</span>
        </div>
      </template>
      <DataStatisDialog
        :staticsSearchObj="staticsSearchObj"
        :dataStatisType="dataStatisType"
        :timeScaleArr="timeScaleArr"
        ref="dataStatisChild"
        v-if="dataStatisVisble"
      ></DataStatisDialog>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, h, nextTick, onMounted, defineExpose } from "vue";
import { init as echartsInit, graphic as echartsGraphic } from "echarts";

import axios from "axios";
import { ElMessage } from "element-plus";
import service from "@/message/request.js";
import { interfaceObj } from "./urlConfig";
import { pageObj } from "./configpage";
import DataStatisDialog from "./DataStatisDialog.vue";
const prop = defineProps(["resultData", "statisticObjType", "pointAreaType", "timeScaleArr"]);
const emit = defineEmits(["setDescription", "func"]);
const unitObj = {
  毫米: ["sumPre", "max1hPre", "max3hPre", "max6hPre", "max24hPre", "historyPre", "maxPre", "avgPre", "maxSumPre", "oldAvgPre", "oldSumPre", "maxPre"],
  "℃": [
    "maxTemp",
    "minTemp",
    "avgTemp",
    "maxHighTemp",
    "minHighTemp",
    "maxLowTemp",
    "minLowTemp",
    "avgTemp",
    "historyAvgTemp",
    "temJuPing",
    "oldAvgTemp",
    "maxAvgSumTemp0Num",
    "maxAvgSumTemp10Num",
  ],
  h: ["highTempHours", "bigWindHours", "fog", "haze", "sand", "snow", "rain", "thunder", ""],
  厘米: ["maxSnowDeep", "maxSnowDeepChangeValue"],
  千米: ["minVis"],
  "米/秒": ["maxExtWind", "maxAvgWind", "avgAvgWind"],
  日: [
    "rainDays",
    "heavyRainDays",
    "noRainDays",
    "maxConsecutiveNoRainDays",
    "highTempDays",
    "maxConsecutiveHighTempDays",
    "lowTempDays",
    "maxConsecutiveLowTempDays",
    "bigWindDays",
    "smallWindDays",
    "preExt",
    "historyRainDays",
    "fogDays",
    "hazeDays",
    "sandDays",
    "freezingRainDays",
    "thunderDays",
    "snowDeepDays",
    "historyHeavyRainDays",
    "highTempDays",
    "visLt1000mDays",
    "visLt500mDays",
    "visLt200mDays",
    "visLt100mDays",
    "sandDays",
    "snowDays",
    "fogDays",
    "freezingRainDays",
    "maxPreOfDay",
    "maxPreDays",
    "maxBigWindDay",
    "maxSmallWindDay",
    "maxFogDays",
    "maxHazeDays",
    "maxSandDays",
    "maxRainDays",
    "maxWeaSnowDays",
    "maxThunderDays",
    "maxSnowDays",
    "avgPreDays",
    "avgTempDays",
    "avgMaxTempDays",
    "avgMinTempDays",
  ],
  "%": [
    "pre4Avg",
    "rainDays4Avg",
    "avgTemp4Avg",
    "bigWindDays4Avg",
    "smallWindDays4Avg",
    "temp4Avg",
    "preJuPing",
    "sumPreJuPing",
    "highTempScale",
    "bigWindScale",
    "weaFogNumScale",
    "weaHazeNumScale",
    "weaSandNumScale",
    "weaSnowNumScale",
    "weaRainNumScale",
    "weaThunderNumScale",
    "vis100StaScale",
    "vis200StaScale",
    "vis500StaScale",
    "vis1000StaScale",
    "highTempStaScale",
    "lowTempStaScale",
    "maxSnow1cmScale",
    "maxSnow5cmScale",
    "maxSnow10cmScale",
    "maxSnow25cmScale",
  ],
  站: [
    "preIfGtExt",
    "preGtExt",
    "highTempIfGtExt",
    "highTempGtExt",
    "lowTempIfLtExt",
    "lowTempLtExt",
    "extWindIfGtExt",
    "extWindGtExt",
    "avgWindIfGtExt",
    "avgWindGtExt",
    "maxTempExt",
    "avgTempExt",
    "minTempExt",
  ],
  个: [
    "highTempStaNum",
    "weaFogNum",
    "weaHazeNum",
    "weaSandNum",
    "weaSnowNum",
    "weaRainNum",
    "weaThunderNum",
    "vis100StaNum",
    "vis200StaNum",
    "bigWindStaNum",
    "vis500StaNum",
    "vis1000StaNum",
    "overTenPreNum",
    "overMonPreNum",
    "overHisPreNum",
    "highTempNum",
    "lowTempNum",
    "overTenExtWindNum",
    "overMonExtWindNum",
    "overHisExtWindNum",
    "maxSnow1cmNum",
    "maxSnow5cmNum",
    "maxSnow10cmNum",
    "maxSnow25cmNum",
  ],
  "万km²": ["bigWindArea", "fogArea", "hazeArea", "sandArea", "rainArea", "snowArea", "thunderArea", "maxSnowArea", "preArea"],
};
const timeFomt = { ten: "旬", month: "月", year: "年" };
const activeTimeType = ref("");
const dataStatisVisble = ref(false); //智能报表弹出层
const dataStatisType = ref(""); // 站点还是区域 station 站点 area 区域
const staticsSearchObj = reactive({
  indexTimeScaleArr: [],
  statisStaObj: { elementMark: [] },
}); //站点-区域智能报表
const regoinTableLoading = ref(false);
const pointStationLoaing = ref(false);
const isFirstLoad = ref(false); // 防止查询时，走排序
const chartLoaing = ref(false); //统计图遮罩
const indexSelectedEleKey = ref("pre"); //当前选中的统计要素
const bottomCheckedElement = ref([]); //选中的统计要素
const allfeilds = pageObj.IntellctPage.feilds;
const refreashTable1 = ref(true);
const tongjiname1 = ref("区域统计");
const tongjiname2 = ref("站点统计");
const pointStoreArry = ref({}); //站点统计前6页缓存
const timeName = ref(""); // 站点统计查询的时间段
const stationName = ref(""); // 当前的站名
const requestUrl = ref(""); // 存储查询地址
let chartConEl = "";
const preVisible = ref(true);
// 存储的站点统计的查询条件
const queryObj = reactive({
  elementMark: [],
  otherMark: [],
  page: 1,
  size: 13,
});
const isShowSXT = ref(true); // 是否显示时序图
const isShowQYTJ = ref(true); // 是否显示区域统计
const chartYUnit = ref("降水量(mm)");
const chartYUnitName = ref("mm");
const pointStaTable = ref([]); // 站点统计集合
const pointStaTableRef = ref(null);
const pointStaTableTotal = ref(0); // 站点数量
const queryRegionObj = reactive({
  sort: "DESC", // 排序方式
  sortName: "", // 排序字段
  page: 1, // 第几页
  size: 6, // 没有几条
});
const exportAreaObj = ref({}); //区域表格导出查询参数
const checkedPointStationData = ref({});
const pointUniqueTable = ref([]); // 单一站点的其他信息
const sxtType = ref("bar");
const boundaryGap = ref(false);
const isEnable = ref(true); //是否能够使用
const clickedFileter = ref(false); //是否点击
const wholeThresholdObj = reactive({
  //小时统计
  // 大风持续小时数/大风阈值
  winHourThreshold: {
    windThreshold1: 10.8,
  },
  //高温持续小时数/ 气温阈值
  tempThreshold: {
    tempThreshold1: 35,
  },

  //日统计
  //降水日数/降水阈值
  preThreshold: {
    preThreshold: 0.1,
  },
  //高温日数/高温阈值
  highTempThreshold: {
    highTempThreshold1: 35,
  },
  //低温日数/低温阈值
  lowTempThreshold: {
    lowTempThreshold: 0,
  },
  //大风日数/大风阈值
  bigWindThreshold: {
    bigWindThreshold: 10.8,
  },
  //小风日数/小风阈值
  smallWindThreshold: {
    smallWindThreshold: 2,
  },
  avgSumTempThreshold: {
    avgSumTempThreshold: 10,
  },
});
const yAxisMin = ref(0);
const yAxisMax = ref(10);
const xAxisData = ref([]);
const elementData = ref([]);
const splitNumber = ref(5);
const winHourRules = {
  windThreshold1: [{ required: true, message: "请输入阈值", trigger: "blur" }],
};
const avgSumTempRules = {
  avgSumTempThreshold: [{ required: true, message: "请输入阈值", trigger: "blur" }],
};
const echartsData = ref([]);
const queryObject = ref([]);
const dataAreaText = ref("");
const dataStationText = ref("");
const highTempThreshold1Cache = ref(35);
const lowTempThresholdCache = ref(0);
const bigWindThresholdCache = ref(10.8);
const smallWindThresholdCache = ref(2);
const tempThreshold1Cache = ref(35);
const windThreshold1Cache = ref(10.8);
const preThresholdCache = ref(0.1);
const avgSumTempThresholdCache = ref(10);
const cacheArea = reactive({
  type: "",
  name: "",
  id: "",
  objtype: "",
});
const pointSortDefault = ref({ prop: "sumPre", order: "descending" });
const regionSortDefault = ref({ prop: "ddateTime", order: "descending" });
const table1Key = ref(Math.random());
const mergeRegionAreaInit = ref(true);
const searchTableInit = ref(true);
const concelAxios = ref([]);
const regoinTableRef = ref(null);
const dateTimeNameFamtt = () => {
  if (timeFomt[queryObj.timeOption]) {
    return timeFomt[queryObj.timeOption];
  }
  return "时间";
};
const dateTimeNameShow = (type, name) => {
  if (queryObj.timeOption == "dayIndex" || queryObj.timeOption == "ten" || queryObj.timeOption == "month" || queryObj.timeOption == "year") {
    if (type.indexOf(queryObj.timeOption) > -1) {
      return name;
    }
  }
};
const forceWrapLine = ({ column }) => {
  let unit = null;
  for (let i in unitObj) {
    if (unitObj[i].includes(column.property)) {
      unit = `(${i})`;
    }
  }
  if (unit) {
    return h("div", {}, [
      h(
        "el-tooltip",
        {
          attrs: {
            content: column.label + unit,
            placement: "top",
          },
        },
        [h("span", column.label)]
      ),
    ]);
  } else {
    return column.label;
  }
};
const showFilter = (name) => {
  clickedFileter.value = true;
  this[name] = !this[name];
  preVisible.value = false;
  // const list = ["preVisible", "winVisible", "temVisible", "bigWindVisible", "smallWindVisible", "highTempVisible", "lowTempVisible"];
  // list
  //   .filter((i) => i !== name)
  //   .forEach((item) => {
  //     this[item] = false;
  //   });
};
const popoverChange = (obj, type) => {
  if (type == "气温持续小时数") {
    wholeThresholdObj.temHourThreshold.tempThreshold1 = obj.value1;
    wholeThresholdObj.temHourThreshold.tempThreshold2 = obj.value2;
  }
  if (type == "降水影响面积") {
    wholeThresholdObj.preAreaThreshold.thePreAreaHourL = obj.value1;
    wholeThresholdObj.preAreaThreshold.thePreAreaHourR = obj.value2;
  }
  if (type == "降水持续小时数") {
    wholeThresholdObj.preHourThreshold.preThreshold1 = obj.value1;
    wholeThresholdObj.preHourThreshold.preThreshold2 = obj.value2;
  }
  if (type == "大风持续小时数") {
    wholeThresholdObj.winHourThreshold.windThreshold1 = obj.value1;
    wholeThresholdObj.winHourThreshold.windThreshold2 = obj.value2;
    wholeThresholdObj.winHourThreshold.windThreshold3 = obj.value1;
    wholeThresholdObj.winHourThreshold.windThreshold4 = obj.value2;
  }
  if (type == "温度影响面积") {
    wholeThresholdObj.temAreaThreshold.theTempAreaHourL = obj.value1;
    wholeThresholdObj.temAreaThreshold.theTempAreaHourR = obj.value2;
  }
  searchTableData();
};
const refreashTable = (res) => {
  isFirstLoad.value = false;
  isEnable.value = false;
  // pointStaTable.value = [];
  pointStaTableTotal.value = 0;
  // pointUniqueTable.value = [];
  // echartsData.value = [];
  // xAxisData.value = [];
  pointStoreArry.value = {}; //分页时前6页缓存
  emit("setDescription", ""); //描述信息
  bottomCheckedElement.value = [];
  indexSelectedEleKey.value = "";
  // echartsInit(document.getElementById("chartCon")).dispose();
};

// 统计查询入口debugger
const setPointStationData = (res, init) => {
  init ? (pointSortDefault.value = { prop: "", order: "" }) : null;
  init ? (regionSortDefault.value = { prop: "", order: "" }) : null;
  if (chartConEl != null && chartConEl != "" && chartConEl != undefined) {
    chartConEl.dispose();
  }
  isFirstLoad.value = true;
  activeTimeType.value = res.queryData.timeOption;
  staticsSearchObj.requestUrl = res.requestUrl;
  staticsSearchObj.indexTimeScaleArr = res.indexTimeScaleArr;

  requestUrl.value = res.requestUrl;
  for (let key in res.queryData) {
    queryObj[key] = res.queryData[key];
  }
  // pointUniqueTable.value = [];
  if (init && queryObj.timeOption != "dayIndex") {
    searchTableInit.value = true; //查询站点数据
    searchTableData(); //查询站点数据
  }
  isShowSXT.value = true;
  isShowQYTJ.value = true;
  isEnable.value = true;

  //小时、日值
  if (queryObj.timeOption == "hour" || queryObj.timeOption == "day") {
    echartsInit(document.getElementById("chartCon")).dispose();
    getInstSequenceElementData(); //根据选中的时间要素，时序图要素
  } else if (queryObj.timeOption == "dayIndex") {
    isShowSXT.value = false;
    isShowQYTJ.value = true;
  } else if (queryObj.timeOption == "cnYear") {
    //历年同期
    isShowQYTJ.value = false;
    echartsInit(document.getElementById("chartCon")).dispose();
    echartsData.value = [];
    //选中的统计要素对象
    let eleObj = {};
    let elementMark = queryObj.elementMark; //当前时间尺度选中的统计要素
    let indexTimeScaleArr = res.indexTimeScaleArr; //当前时间尺度所有的要素
    for (let i = 0; i < indexTimeScaleArr.length; i++) {
      for (let j = 0; j < elementMark.length; j++) {
        if (indexTimeScaleArr[i].elementKey == elementMark[j]) {
          eleObj[elementMark[j]] = indexTimeScaleArr[i].elementName;
        }
      }
    }

    setTimeout(() => {
      bottomCheckedElement.value = eleObj;
      indexSelectedEleKey.value = Object.keys(bottomCheckedElement.value)[0];
      isEnable.value = true;
      checkedEleChange();
    }, 200);
    // if (queryObj.timeOption != "cnYear") {
    queryObject.value[0].sort = "desc";
    queryObject.value[0].sortName = "year";
    pointSortDefault.value = { prop: "descending", order: "year" };
    // }
    // 时序图
    getEchartsData();
  } else {
    //旬月年
    isShowQYTJ.value = true;
    if (queryObj.isMoreTime) {
      echartsInit(document.getElementById("chartCon")).dispose();
      getInstSequenceElementData(); //根据选中的时间要素，时序图要素
    } else {
      setTimeout(() => {
        isEnable.value = true;
      }, 100);
      isShowSXT.value = false;
    }
  }
  isShowQYTJ.value = prop.pointAreaType.objtype === "capitals" ? false : isShowQYTJ.value;
  if (queryObj.timeOption != "cnYear") {
    if (init) {
      mergeRegionAreaInit.value = true;
      pointUniqueTable.value = [];
      searchTableDataRegion(); //查询区域数据
    }
    setTimeout(() => {
      regoinTableRef.value.sort(exportAreaObj.value.sortName, "descending");
    }, 200);
  }

  setTimeout(() => {
    isFirstLoad.value = false;
    if (queryObj.timeOption != "cnYear") {
      pointStaTableRef.value.sort(queryObj.elementMark[0], "descending");
    } else {
      pointStaTableRef.value.sort("year", "descending");
    }
  }, 500);
};
//查询站点数据
const searchTableData = (yzValue) => {
  table1Key.value = Math.random();
  switch (yzValue) {
    case "smallWindVisible":
      smallWindThresholdCache.value = wholeThresholdObj.smallWindThreshold.smallWindThreshold;
      break;
    case "bigWindVisible":
      bigWindThresholdCache.value = wholeThresholdObj.bigWindThreshold.bigWindThreshold;
      break;
    case "lowTempVisible":
      lowTempThresholdCache.value = wholeThresholdObj.lowTempThreshold.lowTempThreshold;
      break;
    case "highTempVisible":
      highTempThreshold1Cache.value = wholeThresholdObj.highTempThreshold.highTempThreshold1;
      break;
    case "preVisible":
      preThresholdCache.value = wholeThresholdObj.preThreshold.preThreshold;
      break;
    case "winVisible":
      windThreshold1Cache.value = wholeThresholdObj.winHourThreshold.windThreshold1;
      break;
    case "temVisible":
      tempThreshold1Cache.value = wholeThresholdObj.tempThreshold.tempThreshold1;
      break;
    case "avgSumTempVisible":
      avgSumTempThresholdCache.value = wholeThresholdObj.avgSumTempThreshold.avgSumTempThreshold;
      break;
  }
  //关闭阈值弹出层
  if (yzValue && yzValue != "isCache") {
    this.$refs[yzValue].doClose();
  }
  pointStationLoaing.value = true;
  // 2 获取查询的时间段
  timeName.value = queryObj.startTime + "至" + queryObj.endTime;
  // 小时统计时间
  if (queryObj.timeOption == "hour") {
    timeName.value =
      queryObj.startTime.substring(5, 7) +
      "月" +
      queryObj.startTime.substring(8, 10) +
      "日" +
      queryObj.startTime.substring(11, 13) +
      "时" +
      "~" +
      queryObj.endTime.substring(5, 7) +
      "月" +
      queryObj.endTime.substring(8, 10) +
      "日" +
      queryObj.endTime.substring(11, 13) +
      "时";
  }
  // 日统计时间
  if (queryObj.timeOption == "day" || queryObj.timeOption == "dayIndex") {
    timeName.value =
      queryObj.startTime.substring(0, 4) +
      "年" +
      queryObj.startTime.substring(5, 7) +
      "月" +
      queryObj.startTime.substring(8, 10) +
      "日" +
      "~" +
      queryObj.endTime.substring(0, 4) +
      "年" +
      queryObj.endTime.substring(5, 7) +
      "月" +
      queryObj.endTime.substring(8, 10) +
      "日";
  }
  // 旬月年统计时间
  if (queryObj.timeOption == "ten" || queryObj.timeOption == "month" || queryObj.timeOption == "year") {
    let startTime = queryObj.startTime.split("-");
    let endTime = queryObj.endTime.split("-");
    //旬统计时间
    if (queryObj.timeOption == "ten") {
      let firstTenTime = startTime[2] * 1 == 1 ? "上旬" : startTime[2] * 1 == 2 ? "中旬" : "下旬";
      let secondTenTime = endTime[2] * 1 == 1 ? "上旬" : endTime[2] * 1 == 2 ? "中旬" : "下旬";
      if (queryObj.isMoreTime) {
        timeName.value = startTime[0] + "年" + startTime[1] + "月" + firstTenTime + "~" + endTime[0] + "年" + endTime[1] + "月" + secondTenTime;
      } else {
        timeName.value = startTime[0] + "年" + startTime[1] + "月" + firstTenTime;
      }
    }
    //月统计时间
    if (queryObj.timeOption == "month") {
      if (queryObj.isMoreTime) {
        timeName.value = startTime[0] + "年" + startTime[1] + "月" + "~" + endTime[0] + "年" + endTime[1] + "月";
      } else {
        timeName.value = startTime[0] + "年" + startTime[1] + "月";
      }
    }
    //年统计时间
    if (queryObj.timeOption == "year") {
      if (queryObj.isMoreTime) {
        timeName.value = startTime[0] + "年~" + endTime[0] + "年";
      } else {
        timeName.value = startTime[0] + "年";
      }
    }
  }

  // 历年同期统计时间
  if (queryObj.timeOption == "cnYear") {
    timeName.value =
      queryObj.startYear +
      "年~" +
      queryObj.endYear +
      "年 " +
      queryObj.startMon +
      "月" +
      queryObj.startDay +
      "日" +
      "~" +
      queryObj.endMon +
      "月" +
      queryObj.endDay +
      "日";
  }
  // 3 查询站点数据
  queryObject.value = getTable1Data();
  // 历年同期统计时间

  if (queryObj.timeOption == "cnYear") {
    exportAreaObj.value = queryObject.value[0];
    (queryObject.value[0].avgTempThreshold = 0),
      (queryObject.value[0].maxTempThreshold = 0),
      (queryObject.value[0].minTempThreshold = 0),
      (queryObject.value[0].preThreshold = 0);
    // requestType 原来再这里配置的, 现在挪到条件外添加
  }
  if (prop.pointAreaType.type == "province" && prop.pointAreaType.id == "0") {
    queryObject.value[0].requestType = "province";
  } else if (prop.pointAreaType.type == "province") {
    queryObject.value[0].requestType = "city";
  } else if (prop.pointAreaType.type == "county") {
    queryObject.value[0].requestType = "county";
  } else if (prop.pointAreaType.objtype == "region") {
    queryObject.value[0].requestType = "region";
  } else if (prop.pointAreaType.objtype == "basin") {
    queryObject.value[0].requestType = "basin";
  } else if (prop.pointAreaType.objtype == "map") {
    queryObject.value[0].requestType = "range";
  } else if (prop.pointAreaType.type == "capitals") {
    // 新增省会城市功能查询页面
    queryObject.value[0].requestType = "capitals";
    queryObject.value[0].areaCode = "";
  }

  if (yzValue == "isCache" && queryObject.value[0].page < 7 && Object.keys(pointStoreArry.value).length > 0) {
    //前6页缓存
    pointStationLoaing.value = false;
    pointStaTable.value = pointStoreArry.value[queryObject.value[0].page - 1];
    pointStaTable.value.forEach((item, index, array) => {
      for (let k in item) {
        if (item[k] === null) {
          item[k] = "-";
        }
      }
    });

    for (var i = 0; i < 13; i++) {
      if (pointStaTable.value[i]) {
        pointStaTable.value[i].sort = 13 * (queryObj.page * 1 - 1) + i + 1;
      }
    }

    if (queryObj.timeOption != "cnYear") {
      //历年同期时序图与站点表格没有关联
      checkedPointStationData.value = pointStaTable.value[0];
      queryObj.stationId = pointStaTable.value[0].stationId;
      pointStaTableRef.value.setCurrentRow(pointStaTable.value[0]);
    }
  } else {
    //设置站点统计查询条件
    queryObject.value[0].page == 1 ? (queryObject.value[0].size = 78) : (queryObject.value[0].size = 13);
    queryObject.value[0].sizeLength = queryObject.value[0].size;
    staticsSearchObj.statisStaObj = queryObject.value[0];
    // pointStaTable.value = [];
    service[queryObject.value[1]](requestUrl.value.province, queryObject.value[0]).then((res) => {
      searchTableInit.value = false;
      pointStationLoaing.value = false;
      // 1 成功
      if (res.code === 200) {
        let dataDs = res.data;
        emit("setDescription", res.description); //描述信息
        if (dataDs) {
          if (dataDs.list.length > 0) {
            dataStationText.value = "";
            // emit("func", this.msg);
            pointStaTable.value = dataDs.list.slice(0, 13);

            if (queryObject.value[0].page == 1) {
              // 设置前6页缓存
              pointStoreArry.value[0] = dataDs.list.slice(0, 13);
              pointStoreArry.value[1] = dataDs.list.slice(13, 26);
              pointStoreArry.value[2] = dataDs.list.slice(26, 39);
              pointStoreArry.value[3] = dataDs.list.slice(39, 52);
              pointStoreArry.value[4] = dataDs.list.slice(52, 65);
              pointStoreArry.value[5] = dataDs.list.slice(65);
            }

            pointStaTable.value.forEach((item, index, array) => {
              for (let k in item) {
                if (item[k] === null) {
                  item[k] = "-";
                }
              }
            });

            pointStaTableTotal.value = dataDs.total;

            for (var i = 0; i < 13; i++) {
              if (pointStaTable.value[i]) {
                pointStaTable.value[i].sort = 13 * (queryObj.page * 1 - 1) + i + 1;
              }
            }
            checkedPointStationData.value = pointStaTable.value[0];
            queryObj.stationId = pointStaTable.value[0].stationId;
            table1Key.value = "table1";
            pointStaTableRef.value.setCurrentRow(pointStaTable.value[0]);
          } else {
            dataStationText.value = "暂无数据";
            pointStaTable.value = [];
            pointStaTableTotal.value = 0;
          }
        } else {
          dataStationText.value = "暂无数据";
          pointStaTable.value = [];
          pointStaTableTotal.value = 0;
        }
      } else {
        // 2 失败
        dataStationText.value = "暂无数据";
        pointStaTable.value = [];
        ElMessage({
          type: "error",
          message: res.msg,
        });
      }
    });
  }
};
const isContain = (arr1, arr2) => {
  let resObj = {
    type: false,
  };
  let dataArr = [];
  for (let i = 0; i < arr2.length; i++) {
    //不包含
    if (!arr1.includes(arr2[i])) {
      dataArr.push(arr2[i]);
    } else {
      resObj.type = true;
    }
  }
  resObj.dataArr = dataArr;
  return resObj;
};
const myAreaVisible = () => {
  let el = queryObj.elementMark;
  let visibleTrue = [
    "sumPre",
    "pre4Avg",
    "maxPre",
    "rainDays",
    "heavyRainDays",
    "maxExtWind",
    "maxAvgWind",
    "avgTemp",
    "minTemp",
    "temp4Avg",
    "maxTemp",
    "highTempDay",
  ];
  let visibleFalse = ["fogDays", "hazeDays", "maxSnowDeep", "snowDeepDays", "sandDays", "snow", "maxSnowDeep", "snowDays", "freezingRainDays", "thunderDays"];
  let visibleTrueFlag = false,
    visibleFalseFlag = false;
  for (let i = 0; i < el.length; i++) {
    if (visibleTrue.includes(el[i])) {
      visibleTrueFlag = true;
    }
    if (visibleFalse.includes(el[i])) {
      visibleFalseFlag = true;
    }
    if (visibleTrueFlag && visibleFalseFlag) {
      break;
    }
  }
  if (!visibleTrueFlag && visibleFalseFlag) {
    return true;
  }
};
//查询区域数据 type:sort，排序而来，排序字段不可修改
const searchTableDataRegion = (sortType) => {
  if (queryObj.timeOption === "month" || queryObj.timeOption === "year") {
    if (myAreaVisible()) {
      isShowQYTJ.value = false;
      return false;
    }
  }
  highTempThreshold1Cache.value = 35;
  lowTempThresholdCache.value = 0;
  bigWindThresholdCache.value = 10.8;
  smallWindThresholdCache.value = 2;
  tempThreshold1Cache.value = 35;
  windThreshold1Cache.value = 10.8;
  preThresholdCache.value = 0.1;
  avgSumTempThresholdCache.value = 10;
  regoinTableLoading.value = true;
  // isShowQYTJ.value = queryObj.elementMark[0] === 'bigWindDays' ? false : true;
  queryObject.value = getTable1Data();

  // 查询区域小时表格
  let regiontableObj = queryObject.value[0];
  exportAreaObj.value = regiontableObj;
  if (prop.pointAreaType.type == "province" && prop.pointAreaType.id == "0") {
    regiontableObj.requestType = "province";
    // regiontableObj.areaCode = "";
  } else if (prop.pointAreaType.type == "province") {
    regiontableObj.requestType = "city";
    if (queryObj.timeOption == "ten" || queryObj.timeOption == "month" || queryObj.timeOption == "year") {
      regiontableObj.requestType = "province";
    }
  } else if (prop.pointAreaType.objtype == "region") {
    regiontableObj.requestType = "region";
  } else if (prop.pointAreaType.objtype == "county") {
    regiontableObj.requestType = "county";
  } else if (prop.pointAreaType.objtype == "basin") {
    regiontableObj.requestType = "basin";
  } else if (prop.pointAreaType.objtype == "map") {
    regiontableObj.requestType = "range";
  } else if (prop.pointAreaType.type == "capitals") {
    // 新增省会城市功能查询页面
    regiontableObj.requestType = "capitals";
    regiontableObj.areaCode = "";
  }
  let sortObj = getSortObj();
  if (!queryRegionObj.sortName) {
    queryRegionObj.sortName = sortObj.sortName;
    if (sortObj.sort === "ASC") {
      queryRegionObj.sort = "ascending";
    } else {
      queryRegionObj.sort = "descending";
    }
  }
  regiontableObj.searcheTypes = regiontableObj.elementMark;
  regiontableObj.sortName = queryRegionObj.sortName ? queryRegionObj.sortName : queryObj.elementMark[0];
  regiontableObj.sort = queryRegionObj.sort ? queryRegionObj.sort : "DESC";
  regiontableObj.page = queryRegionObj.page;

  let noAreaDataEle = []; // 无区域统计的统计要素集合
  if (queryObj.timeOption == "hour") {
    // noAreaDataEle = ["avgTemp"];
  } else {
    noAreaDataEle = [
      // "rainDays4Avg",
      // "heavyRainDays",
      // "noRainDays",
      // "maxConsecutiveNoRainDays",
      // "minHighTemp",
      // "maxLowTemp",
      // "avgTemp",
      // "highTempDays",
      // "lowTempDays",
      // "avgTemp4Avg",
      // "highTempIfGtExt",
      // "lowTempIfLtExt",
      "avgAvgWind",
      // "avgWindIfGtExt",
      "maxSnowDeepChangeValue",
      // "minVis"
    ];
  }
  let isHas = isContain(noAreaDataEle, regiontableObj.elementMark);
  //全部包含，没有区域统计
  if (isHas.dataArr.length == 0) {
    regoinTableLoading.value = false;
    isShowSXT.value = true;
    isShowQYTJ.value = false;
    return;
  }
  //存在不包含的，有区域统计
  else {
    regiontableObj.sortName = sortType ? queryRegionObj.sortName : isHas.dataArr[0];
  }

  //不是分页的查询
  if (!sortType) {
    if (queryObj.timeOption == "hour") {
      //累计降水量
      if (regiontableObj.sortName == "sumPre") {
        regiontableObj.sortName = "avgPre";
      }
      if (regiontableObj.sortName == "sumSnow") {
        regiontableObj.sortName = "avgSnow";
      }
      //高温持续小时数
      if (regiontableObj.sortName == "highTempHours") {
        regiontableObj.sortName = "highTempStaNum"; //高温站点数
      }
      //最大阵风持续小时数
      if (regiontableObj.sortName == "bigWindHours") {
        regiontableObj.sortName = "bigWindStaNum"; //大风站点数
      }
      //是否出现大雾
      if (regiontableObj.sortName == "ifFog") {
        regiontableObj.sortName = "weaFogNum"; //大雾站点数
      }
      //是否出现霾
      if (regiontableObj.sortName == "ifHaze") {
        regiontableObj.sortName = "weaHazeNum"; //霾站点数
      }
      //是否出现沙尘
      if (regiontableObj.sortName == "ifSand") {
        regiontableObj.sortName = "weaSandNum"; //沙尘站点数
      }
      //是否出现降雪
      if (regiontableObj.sortName == "ifSnow") {
        regiontableObj.sortName = "weaSnowNum"; //降雪站点数
      }
      //是否出现冻雨
      if (regiontableObj.sortName == "ifRain") {
        regiontableObj.sortName = "weaRainNum"; //冻雨站点数
      }
      //是否出现雷暴
      if (regiontableObj.sortName == "ifThunder") {
        regiontableObj.sortName = "weaThunderNum"; //雷暴站点数
      }
    }
    // 日值统计
    else if (queryObj.timeOption == "day") {
      if (regiontableObj.sortName == "sumRadi") {
        regiontableObj.sortName = "avgRadi";
      }
      if (regiontableObj.sortName == "avgHighTemp") {
        regiontableObj.sortName = "avgLowTemp";
      }
      if (regiontableObj.sortName == "sumSnow") {
        regiontableObj.sortName = "avgSnow";
      }
      if (regiontableObj.sortName == "snowIfGtExt") {
        regiontableObj.sortName = "overTenSnowNum";
      }
      if (regiontableObj.sortName == "rainDays4Avg") {
        regiontableObj.sortName = "rainDaysJuPing";
      }

      if (regiontableObj.sortName == "highTempDays") {
        regiontableObj.sortName = "maxHighTemDays";
      }

      if (regiontableObj.sortName == "lowTempDays") {
        regiontableObj.sortName = "maxLowTemDays";
      }
      if (regiontableObj.sortName == "minHighTemp") {
        regiontableObj.sortName = "minHighTemp";
      }

      if (regiontableObj.sortName == "maxLowTemp") {
        regiontableObj.sortName = "maxLowTemp";
      }
      if (regiontableObj.sortName == "heavyRainDays") {
        regiontableObj.sortName = "maxHeavyRainDays";
      }
      if (regiontableObj.sortName == "noRainDays") {
        regiontableObj.sortName = "maxNoRainDays";
      }
      if (regiontableObj.sortName == "maxConsecutiveNoRainDays") {
        regiontableObj.sortName = "maxConsecutiveNoRainDays";
      }
      if (regiontableObj.sortName == "minVis") {
        regiontableObj.sortName == "minVis";
      }
      //累计降水量
      if (regiontableObj.sortName == "sumPre") {
        regiontableObj.sortName = "maxSumPre";
      }
      if (regiontableObj.sortName == "avgSumTemp") {
        regiontableObj.sortName = "maxAvgSumTemp0Num";
      }
      if (regiontableObj.sortName == "firstFrostDay") {
        regiontableObj.sortName = "minFirstFrostTime";
        regiontableObj.sort = "ASC";
      }
      //最大降水量
      if (regiontableObj.sortName == "maxPre") {
        regiontableObj.sortName = "maxPreOfDay";
      }
      //降水距平百分率
      if (regiontableObj.sortName == "pre4Avg") {
        regiontableObj.sortName = "preJuPing";
      }
      //最大降水日数
      if (regiontableObj.sortName == "rainDays") {
        regiontableObj.sortName = "maxPreDays";
      }
      //降水量突破极值
      if (regiontableObj.sortName == "preIfGtExt") {
        regiontableObj.sortName = "overHisPreNum";
      }
      //区域最高温
      if (regiontableObj.sortName == "maxHighTemp") {
        regiontableObj.sortName = "maxTemp";
      }
      if (regiontableObj.sortName == "avgTemp4Avg") {
        regiontableObj.sortName = "avgTempJuPing";
      }
      //区域最低
      if (regiontableObj.sortName == "minLowTemp") {
        regiontableObj.sortName = "minTemp";
      }
      //大风日数
      if (regiontableObj.sortName == "bigWindDays") {
        regiontableObj.sortName = "maxBigWindDay";
      }
      //小风日数
      if (regiontableObj.sortName == "smallWindDays") {
        regiontableObj.sortName = "maxSmallWindDay";
      }
      //突破极值站点数
      if (regiontableObj.sortName == "extWindIfGtExt") {
        regiontableObj.sortName = "overHisExtWindNum";
      }
      //大雾日数
      if (regiontableObj.sortName == "fogDays") {
        regiontableObj.sortName = "maxFogDays";
      }
      //霾日数
      if (regiontableObj.sortName == "hazeDays") {
        regiontableObj.sortName = "maxHazeDays";
      }
      //沙尘日数
      if (regiontableObj.sortName == "sandDays") {
        regiontableObj.sortName = "maxSandDays";
      }
      //冻雨日数
      if (regiontableObj.sortName == "freezingRainDays") {
        regiontableObj.sortName = "maxRainDays";
      }
      //降雪日数
      if (regiontableObj.sortName == "snowDays") {
        regiontableObj.sortName = "maxWeaSnowDays";
      }
      //雷暴日数
      if (regiontableObj.sortName == "thunderDays") {
        regiontableObj.sortName = "maxThunderDays";
      }
      //最大积雪深度
      if (regiontableObj.sortName == "snowDeepDays") {
        regiontableObj.sortName = "maxSnowDays";
      }
      //平均风旬极值
      if (regiontableObj.sortName == "avgWindIfGtExt") {
        regiontableObj.sortName = "overTenAvgWindNum";
      }
      //高温旬极值
      if (regiontableObj.sortName == "highTempIfGtExt") {
        regiontableObj.sortName = "overTenMaxTempNum";
      }
      //低温旬极值
      if (regiontableObj.sortName == "lowTempIfLtExt") {
        regiontableObj.sortName = "overTenMinTempNum";
      }
    } else if (queryObj.timeOption == "dayIndex") {
      regiontableObj.sortName = "dateTimeName";
    }
    // 旬月年
    else if (queryObj.timeOption == "ten" || queryObj.timeOption == "month" || queryObj.timeOption == "year") {
      //累计降水量
      if (regiontableObj.sortName == "sumPre") {
        regiontableObj.sortName = "avgPre";
      }
      //降水距平百分率
      if (regiontableObj.sortName == "pre4Avg") {
        regiontableObj.sortName = "maxPre";
      }
      //降水日数
      if (regiontableObj.sortName == "rainDays") {
        regiontableObj.sortName = "maxPre";
      }
      //暴雨日数
      if (regiontableObj.sortName == "heavyRainDays") {
        regiontableObj.sortName = "maxPre";
      }
      //气温距平
      if (regiontableObj.sortName == "temp4Avg") {
        regiontableObj.sortName = "avgTemp";
      }
      //大风日数
      if (regiontableObj.sortName == "bigWindDays") {
        regiontableObj.sortName = "maxExtWind";
      }

      //大雾日数
      if (regiontableObj.sortName == "fogDays") {
        regiontableObj.sortName = "maxPre";
      }
      //霾日数
      if (regiontableObj.sortName == "hazeDays") {
        regiontableObj.sortName = "maxPre";
      }
      //沙尘日数
      if (regiontableObj.sortName == "sandDays") {
        regiontableObj.sortName = "maxPre";
      }
      //冻雨日数
      if (regiontableObj.sortName == "freezingRainDays") {
        regiontableObj.sortName = "maxPre";
      }
      //降雪日数
      if (regiontableObj.sortName == "snowDays") {
        regiontableObj.sortName = "maxPre";
      }
      //雷暴日数
      if (regiontableObj.sortName == "thunderDays") {
        regiontableObj.sortName = "maxPre";
      }
      //最大积雪深度
      if (regiontableObj.sortName == "maxSnowDeep") {
        regiontableObj.sortName = "maxPre";
      }
      //积雪日数
      if (regiontableObj.sortName == "snowDeepDays") {
        regiontableObj.sortName = "maxPre";
      }
    }
  }
  if (!regiontableObj.requestType) {
    return;
  }
  regiontableObj.size = 60;
  isShowQYTJ.value = prop.pointAreaType.objtype === "capitals" ? false : isShowQYTJ.value;

  //let pageSize = regiontableObj.size;
  //设置区域统计
  staticsSearchObj.statisAreaObj = regiontableObj;
  service.post(requestUrl.value.region, regiontableObj).then((res) => {
    mergeRegionAreaInit.value = false;
    regoinTableLoading.value = false;
    // 1 成功
    if (res.code === 200) {
      dataAreaText.value = "";
      let dataDs = res.data;
      if (dataDs) {
        pointUniqueTable.value = dataDs.list;
        pointUniqueTable.value.forEach((item, index, array) => {
          for (let k in item)
            if (item[k] === null) {
              item[k] = "-";
            }
        });
        let len = pointUniqueTable.value.length;
        for (var i = 0; i < len; i++) {
          if (pointUniqueTable.value[i]) {
            pointUniqueTable.value[i].sort = len * (queryRegionObj.page * 1 - 1) + i + 1;
          }
        }
        if (regoinTableRef.value && regoinTableRef.value.$el.children) {
          regoinTableRef.value.$el.children[1].style.width = "99%";
        }
        staticsSearchObj.statisAreaObj.sizeLength = regiontableObj.size < dataDs.total ? regiontableObj.size : dataDs.total;
      } else {
        dataAreaText.value = "暂无数据";
        pointUniqueTable.value = [];
      }
    } else {
      // 2 失败
      dataAreaText.value = "暂无数据";
      pointUniqueTable.value = [];
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};
// 哪些属性信息显示--根据时间尺度及统计要素 type:时间尺度，flage：统计要素标识，tab：year,rank,ext;isHas：单月统计,单旬统计判断
const isColumnShow = (type, flage, tab, isHas) => {
  // false：单旬月年
  let flag = false;
  let intype = includesVal(type, queryObj.timeOption);
  if (queryObj.timeOption && queryObj.timeOption.indexOf("day") > -1) {
    flag = type === queryObj.timeOption;
  } else if (intype) {
    flag = true;
  } else if (queryObj.timeOption == "cnYear") {
    flag = type === queryObj.timeOption;
  } else {
    flag = false;
  }
  if (!flag) {
    return;
  }
  if (!queryObj.isMoreTime) {
    if (tab) {
      //单旬月年都没有
      if (tab === "none") {
        return false;
      }
      // 没有勾选任何扩展
      if (queryObj.otherMark.length == 0) {
        return false;
      } else {
        //单月统计
        if (isHas == "month") {
          if (queryObj.timeOption == "month") {
            return intype && queryObj.elementMark.includes(flage) && queryObj.otherMark.includes(tab);
          } else {
            return false;
          }
        }
        //旬值没有的数据
        else if (isHas == "noTen") {
          return false;
        } else {
          return intype && queryObj.elementMark.includes(flage) && queryObj.otherMark.includes(tab);
        }
      }
    } else {
      return intype && queryObj.elementMark.includes(flage);
    }
  }
  // true：多旬月年
  else {
    if (tab) {
      if (tab == "none") {
        return intype && queryObj.elementMark.includes(flage);
      } else {
        return false;
      }
    } else {
      return intype && queryObj.elementMark.includes(flage);
    }
  }
};
const includesVal = (str, val) => {
  if (str && str.indexOf(val) > -1) {
    return true;
  }
  return false;
};
//判断子表字段是否显示
const isShowFeildsTab2 = (value) => {
  let type = cacheArea.type === "" ? "province" : cacheArea.type;
  let objtype = cacheArea.objtype === "" ? prop.pointAreaType.objtype : cacheArea.objtype;
  let id = cacheArea.id === "" ? "0" : cacheArea.id;
  let showFeilds = true;
  if (value) {
    let yaosuArray = [];
    let otherO = allfeilds.other;
    if (type == "province" && id == "0") {
      //左侧选全国或省份时 小时站点表头
      yaosuArray = [otherO.sort, otherO.shengName];
    } else if (type == "province") {
      //左侧选全国或省份时 小时站点表头
      yaosuArray = [otherO.sort, otherO.cityName];
    } else if (objtype == "region") {
      // 左侧选区域时 小时站点表头
      yaosuArray = [otherO.sort, otherO.shengName];
    } else if (objtype == "basin") {
      // 左侧选流域 小时站点表头
      yaosuArray = [otherO.sort, otherO.areaName];
    } else if (objtype == "map") {
      // 左侧选流域 小时站点表头
      yaosuArray = [otherO.sort, otherO.shengName];
    } else if (type == "capitals") {
      // 新增省会城市功能查询页面
      //左侧选省会城市时 小时站点表头
      yaosuArray = [otherO.sort, otherO.cityName];
    } else if (type == "county") {
      // 新增城市功能查询页面
      //左侧选省会城市时 小时站点表头
      yaosuArray = [otherO.sort, otherO.cityName];
    }
    if (queryObj.timeOption === "dayIndex") {
      yaosuArray = [otherO.sort, otherO.shengName, otherO.cityName, otherO.countyName, otherO.sId];
    }
    showFeilds = yaosuArray.includes(value);
  }
  if (queryObj.timeOption === "hour" || queryObj.timeOption === "day" || queryObj.timeOption === "dayIndex") {
    return showFeilds;
  }
};
//判断主表字段是否显示
const isShowFeilds = (value) => {
  let showFeilds = true;
  if (value) {
    let yaosuArray = [];
    let otherO = allfeilds.other;
    let type = cacheArea.type === "" ? prop.pointAreaType.type : cacheArea.type;
    let name = cacheArea.name === "" ? prop.pointAreaType.name : cacheArea.name;
    if (type == "province" && name != "全国") {
      //左侧选全国或省份时 小时站点表头
      yaosuArray = [otherO.sName, otherO.cityName, otherO.sId, otherO.shengName];
    } else if (type == "capitals") {
      // 新增省会城市功能查询页面,
      yaosuArray = [otherO.sId, otherO.cityName, otherO.shengName];
    } else if (type == "county") {
      // 新增城市功能查询页面,
      yaosuArray = [otherO.sId, otherO.cityName, otherO.countyName];
    } else {
      yaosuArray = [otherO.sName, otherO.sId, otherO.shengName];
    }
    showFeilds = yaosuArray.includes(value);
  }
  return showFeilds;
};
// 站点数据排序
const pointSortChange = (val) => {
  pointSortDefault.value = val;
  if (!clickedFileter.value) {
    preVisible.value = false;
    // const list = ["preVisible", "winVisible", "temVisible", "bigWindVisible", "smallWindVisible", "highTempVisible", "lowTempVisible"];
    // list.forEach((item) => {
    //   this[item] = false;
    // });
  }
  const { column, prop, order } = val;
  // if (this.sortColumn === prop && this.sortOrder === order) {
  //   return;
  // }
  if (clickedFileter.value) {
    nextTick(() => {
      clickedFileter.value = false;
    });
    // if (!this.sortColum && !this.sortOrder) {
    //   pointStaTableRef.value.clearSort();
    //   return;
    // }

    // pointStaTableRef.value.sort(this.sortColumn, this.sortOrder);
    // return;
  }
  if (val.order === "ascending") {
    queryObj.sort = "ASC";
  } else {
    queryObj.sort = "DESC";
  }
  queryObj.sortName = val.prop;
  if (!isFirstLoad.value && !searchTableInit.value) {
    searchTableData();
  }
};
// 单站变化--查询时序图
const searchPointUniqueData = (val) => {
  let obj = Object.assign({}, val);
  if (queryObj.timeOption == "cnYear") {
    //历年同期
    checkedPointStationData.value = val;
  } else {
    if (val) {
      if (queryObj.timeOption == "ten" || queryObj.timeOption == "month" || queryObj.timeOption == "year") {
        if (queryObj.isMoreTime) {
          isShowSXT.value = true;
        } else {
          isShowSXT.value = false;
        }
      } else {
        isShowSXT.value = true;
      }
      echartsData.value = [];
      xAxisData.value = [];
      stationName.value = obj.stationName;
      checkedPointStationData.value = obj;
      queryObj.stationId = checkedPointStationData.value.stationId;
      getEchartsData();
    }
  }
};
const checkedEleChange = () => {
  chartYUnit.value = bottomCheckedElement.value[indexSelectedEleKey.value];
  if (indexSelectedEleKey.value == "pre" || indexSelectedEleKey.value == "avgPre") {
    chartYUnit.value = chartYUnit.value + "(mm)";
    chartYUnitName.value = "mm";
    sxtType.value = "bar";
  } else if (indexSelectedEleKey.value == "avgTemp" || indexSelectedEleKey.value == "maxTemp" || indexSelectedEleKey.value == "minTemp") {
    chartYUnit.value = chartYUnit.value + "(°C)";
    chartYUnitName.value = "°C";
    sxtType.value = "line";
  } else if (indexSelectedEleKey.value == "extWind") {
    chartYUnit.value = "风速(m/s)";
    chartYUnitName.value = "m/s";
    sxtType.value = "line";
  } else if (indexSelectedEleKey.value == "minVis") {
    chartYUnit.value = chartYUnit.value + "(km)";
    chartYUnitName.value = "km";
    sxtType.value = "line";
  } else if (indexSelectedEleKey.value == "snowDeep") {
    chartYUnit.value = chartYUnit.value + "(cm)";
    chartYUnitName.value = "cm";
    sxtType.value = "line";
  } else if (indexSelectedEleKey.value.indexOf("Day") > -1) {
    chartYUnit.value = chartYUnit.value + "(天)";
    chartYUnitName.value = "天";
    sxtType.value = "line";
  }
  if (sxtType.value == "line") {
    boundaryGap.value = false;
  } else {
    boundaryGap.value = true;
  }
  getEchartsData("elChange");
};
//查询时序图统计要素  witchType:用于区别点击【智能统计】的查询（不传递）  点击统计要素的查询（true）
const getInstSequenceElementData = (witchType) => {
  if (!witchType) {
    chartLoaing.value = true;
  }
  let chartSelParams = {
    timeOption: queryObj.timeOption,
    elementMark: queryObj.elementMark,
  };
  service.post(interfaceObj.getInstSequenceElementData, chartSelParams).then((res) => {
    if (res.code === 200) {
      bottomCheckedElement.value = res.data;
      if (!witchType) {
        let bottomCheckedElementStr = JSON.stringify(bottomCheckedElement.value);
        if (bottomCheckedElementStr != "{}") {
          isShowSXT.value = true;
          let n = 0;
          for (let key in bottomCheckedElement.value) {
            if (n == 0) {
              indexSelectedEleKey.value = key;
              checkedEleChange();
              break;
            }
            n++;
          }
        } else {
          isShowSXT.value = false;
        }
      }
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};

const getEchartsData = (type) => {
  let URL, PARAMERS;

  if (queryObj.timeOption == "cnYear") {
    //历年同期
    URL = interfaceObj.selectCnYearData;
    PARAMERS = queryObject.value[0];
  } else {
    //日统计
    let endTime = queryObj.endTime;
    let startTime = queryObj.startTime;
    if (queryObj.timeOption != "hour") {
      endTime = endTime + " 00:00:00";
      startTime = startTime + " 00:00:00";
    }

    if (!queryObj.stationId) {
      return false;
    }

    let chartParams = {
      preType: queryObj.preType, //结束时间
      staType: queryObj.staType, //类型
      startTime: startTime, //开始时间
      endTime: endTime, //结束时间
      stationId: queryObj.stationId, //站点id
      timeOption: queryObj.timeOption, //时间尺度
    };
    if (!queryObj.isMoreTime && (queryObj.timeOption == "ten" || queryObj.timeOption == "month" || queryObj.timeOption == "year")) {
      chartParams.endTime = startTime;
    }

    URL = interfaceObj.getInstSequenceData;
    PARAMERS = chartParams;
  }
  if (echartsData.value.length > 0) {
    elementData.value = [];
    echartsData.value.forEach((item) => {
      elementData.value.push(item[indexSelectedEleKey.value]);
    });

    // 定时器-解决echarts容器宽度变化的延迟
    setTimeout(() => {
      initChart(xAxisData.value, elementData.value, type, echartsData.value);
    }, 500);
  } else {
    if (concelAxios.value.length > 0) {
      concelAxios.value.forEach((item) => {
        item.cancel("结束缓存请求");
      });
      concelAxios.value = [];
    }
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    concelAxios.value.push(source);
    service
      .post(URL, PARAMERS, {
        cancelToken: source.token,
      })
      .then((res) => {
        chartLoaing.value = false;
        if (res.code === 200) {
          echartsData.value = res.data.list ? res.data.list : res.data;

          //小时
          if (queryObj.timeOption == "hour") {
            echartsData.value.map((item) => {
              item.dateTime = item.dateTime.substring(5, 7) + "月" + item.dateTime.substring(8, 10) + "日" + item.dateTime.substring(11, 13) + "时";
            });
          }
          //日
          if (queryObj.timeOption == "day" || queryObj.timeOption === "dayIndex") {
            echartsData.value.map((item) => {
              item.dateTime = item.dateTime.substring(5, 7) + "月" + item.dateTime.substring(8, 10) + "日";
            });
          }
          //旬
          else if (queryObj.timeOption == "ten") {
            echartsData.value.map((item) => {
              let dateTime = item.dateTime.split("-");
              let dateTimeYear = dateTime[0];
              let dateTimeMonth = dateTime[1];
              let tenTime2 = item.dateTime.substring(item.dateTime.lastIndexOf("-") + 1);
              if (tenTime2 * 1 == 1) {
                item.dateTime = dateTimeYear + "年" + dateTimeMonth + "月上旬";
              } else if (tenTime2 * 1 == 2) {
                item.dateTime = dateTimeYear + "年" + dateTimeMonth + "月中旬";
              } else if (tenTime2 * 1 == 3) {
                item.dateTime = dateTimeYear + "年" + dateTimeMonth + "月下旬";
              }
            });
          }
          //月
          else if (queryObj.timeOption == "month") {
            echartsData.value.map((item) => {
              let dateTime = item.dateTime.split("-");
              item.dateTime = dateTime[0] + "-" + dateTime[1];
            });
          }
          //年
          else if (queryObj.timeOption == "year ") {
            echartsData.value.map((item) => {
              let dateTime = item.dateTime;
              let yearTime = dateTime.substring(0, dateTime.indexOf("-"));
              item.dateTime = yearTime + "年";
            });
          }
          //历年同期
          else if (queryObj.timeOption == "cnYear") {
            for (let i = 0; i < echartsData.value.length; i++) {
              echartsData.value[i].dateTime = echartsData.value[i].year + "年";
            }
          }
          let indexHourDay;
          elementData.value = [];
          xAxisData.value = [];
          echartsData.value.forEach((item, index) => {
            // 小时统计，横轴跨天的第一个显示日期
            if (queryObj.timeOption == "hour") {
              if (index == 0) {
                indexHourDay = parseInt(item.dateTime.split("月")[1].split("日")[0]); //取出第一个月
              }
              let itemHourDay = parseInt(item.dateTime.split("月")[1].split("日")[0]); //每个日期的月
              if (itemHourDay > indexHourDay) {
                indexHourDay = itemHourDay;
                xAxisData.value.push(item.dateTime.split("日")[0] + "日"); //只有日期
              } else {
                xAxisData.value.push(item.dateTime.split("日")[1]); //只有小时
              }
            } else if (queryObj.timeOption == "year") {
              xAxisData.value.push(item.dateTime.substr(0, 4) + "年");
            } else {
              xAxisData.value.push(item.dateTime);
            }
            elementData.value.push(item[indexSelectedEleKey.value]);
          });

          // 定时器-解决echarts容器宽度变化的延迟
          setTimeout(() => {
            initChart(xAxisData.value, elementData.value, type, echartsData.value);
          }, 500);
        } else {
          ElMessage({
            type: "error",
            message: res.msg,
          });
        }
      });
  }
};
//根据统计要素，查询时序图  elChange-要销毁后再显示，有刻度值间隔的变化
const initChart = (xAxisData, elementData, type, echartsData) => {
  sxtType.value = elementData.length > 25 ? "line" : sxtType.value;
  let isMM = true;
  let maxValue = Math.max(...elementData);
  let minValue = Math.min(...elementData);
  //降水刻度值间隔  其他要素不做间隔
  splitNumber.value = 5;
  let intervalNum = 10;
  yAxisMax.value = Math.max(...elementData);
  yAxisMin.value = Math.min(...elementData);
  let minYaValue = yAxisMin.value;
  let maxYaValue = yAxisMax.value;
  // cnYear
  let minA = Math.abs(yAxisMin.value);
  let maxA = Math.abs(yAxisMax.value);
  if (chartYUnitName.value.indexOf("mm") > -1 || chartYUnitName.value.indexOf("cm") > -1) {
    if (maxYaValue <= 2.5) {
      intervalNum = 1.25;
    } else if (maxYaValue <= 5) {
      intervalNum = 2.5;
    } else if (maxYaValue <= 10) {
      intervalNum = 5;
    } else if (maxYaValue <= 15) {
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
    } else if (maxYaValue <= 1000) {
      intervalNum = 500;
    } else {
      intervalNum = 1000;
    }
    splitNumber.value = Math.ceil(maxA / intervalNum);
  } else if (chartYUnitName.value.indexOf("天") > -1) {
    intervalNum = 3;
    splitNumber.value = Math.ceil(maxA / intervalNum);
  } else if (chartYUnitName.value.indexOf("℃") > -1) {
    intervalNum = 4;
    splitNumber.value = Math.ceil(maxA / intervalNum);
  } else if (chartYUnitName.value.indexOf("m/s") > -1) {
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
  yAxisMin.value = minYaValue;
  yAxisMax.value = maxYaValue;
  // 要素切换后  销毁加载
  if (type) {
    echartsInit(document.getElementById("chartCon")).dispose();
    chartConEl = null;
  }
  if (!document.getElementById("chartCon")) {
    return;
  }
  chartConEl = echartsInit(document.getElementById("chartCon"));
  // 绘制图表
  let maxValueNum = 0;
  chartConEl.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: sxtType.value == "bar" ? "shadow" : "line", // 默认为直线，可选为：'line' | 'shadow'
        shadowStyle: {
          color: "rgba(255, 152, 96, 0.1)",
        },
      },
      formatter: function (params, ticket, callback) {
        const eData = echartsData[params[0].dataIndex];
        const dateTime = eData && eData.dateTime ? eData.dateTime : params[0].name;
        const dEvalue = eData && eData[indexSelectedEleKey.value] ? eData[indexSelectedEleKey.value] : params[0].value;
        return dateTime + ": <span style='color:#FF8D4F;font-weight:bold'>" + dEvalue + "</span>" + chartYUnitName.value;
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: boundaryGap.value,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#999",
        },
      },
      axisTick: {
        show: false,
      },
      data: xAxisData,
      axisLabel: {
        textStyle: {
          color: "#999",
          fontSize: 12,
          fontFamily: "HelveticaNeue",
        },
        interval: "auto", // 坐标轴刻度标签的显示间隔
        hideOverlap: true,
      },
      splitLine: {
        show: sxtType.value == "bar" ? false : true,
        lineStyle: {
          color: "rgba(0,0,0,0.15)",
          type: "dashed",
        },
      },
    },
    yAxis: isMM
      ? {
          name: chartYUnit.value,
          type: "value",
          //minInterval: 1,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#999",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#999",
              fontSize: 12,
              fontFamily: "HelveticaNeue",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(0,0,0,0.15)",
              type: "dashed",
            },
          },
          min: minYaValue,
          max: maxYaValue,
          //interval: intervalNum,
          splitNumber: splitNumber.value,
          minInterval: intervalNum,
          //minInterval: splitNumber.value,
        }
      : {
          name: chartYUnit.value,
          type: "value",
          minInterval: 1,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#999",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#999",
              fontSize: 12,
              fontFamily: "HelveticaNeue",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(0,0,0,0.15)",
              type: "dashed",
            },
          },
        },
    series: [
      {
        data: elementData,
        type: sxtType.value,
        barWidth: elementData.length > 17 ? "50%" : "20",
        smooth: true,
        symbolSize: 6,
        label: {
          show: true,
          precision: 1,
          position: "top",
          valueAnimation: true,
          color: "#999",
          formatter: (params) => {
            if (params.value === 0 && chartYUnitName.value.indexOf("mm") > -1) {
              return "";
            } else if (elementData.length > 26) {
              if (params.value == maxValue && maxValueNum !== 1) {
                maxValueNum = 1;
                return params.value;
              } else if (params.value == minValue && minValue !== 0) {
                return params.value;
              }
              return "";
            }
            return params.value;
          },
        },
        lineStyle: {
          color: "#FF8D4F",
        },
        itemStyle: {
          color: new echartsGraphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#FFBD99",
            },
            {
              offset: 1,
              color: "#FF8B4C",
            },
          ]),
          borderColor: "#FF9A64",
        },
        areaStyle: {
          color: new echartsGraphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(255, 141, 79, 0.14)",
            },
            {
              offset: 1,
              color: "rgba(255, 141, 79, 0)",
            },
          ]),
        },
      },
    ],
    grid: {
      top: 30,
      right: 40,
      bottom: 20,
      left: 50,
    },
  });

  window.onresize = () => {
    setTimeout(chartConEl?.resize, 500);
  };
};
const exportSXTData = () => {
  let URL = interfaceObj.exportlnstSequenceData,
    PARAMERS;

  if (queryObj.timeOption == "cnYear") {
    //历年同期
    return false;
  } else {
    let endTime = queryObj.endTime;
    let startTime = queryObj.startTime;
    if (queryObj.timeOption != "hour") {
      endTime = endTime + " 00:00:00";
      startTime = startTime + " 00:00:00";
    }

    if (!queryObj.stationId) {
      return false;
    }

    let chartParams = {
      preType: queryObj.preType, //结束时间
      staType: queryObj.staType, //类型
      startTime: startTime, //开始时间
      endTime: endTime, //结束时间
      stationId: queryObj.stationId, //站点id
      timeOption: queryObj.timeOption, //时间尺度
      searcheType: indexSelectedEleKey.value,
    };
    if (!queryObj.isMoreTime && (queryObj.timeOption == "ten" || queryObj.timeOption == "month" || queryObj.timeOption == "year")) {
      chartParams.endTime = startTime;
    }
    PARAMERS = chartParams;
  }
  service.post(URL, PARAMERS, { responseType: "blob" }).then((res) => {
    let url = window.URL.createObjectURL(new Blob([res.data]));
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    res.headers["content-disposition"] ? link.setAttribute("download", decodeURI(res.headers["content-disposition"].split("filename=")[1])) : null;
    document.body.appendChild(link);
    link.click();

    // 下载完成后，移除 <a> 元素并释放创建的 URL
    // document.body.removeChild(link);
    // window.URL.revokeObjectURL(url);
  });
};
//保存
const getVariThematics = () => {
  if (!chartConEl) return;
  let base64 = chartConEl.getDataURL();
  base64 = base64.split("data:image/png;base64,")[1];

  // 创建 blob 对象
  var byteCharacters = atob(base64);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], { type: "application/octet-stream" });

  // 下载
  var downloadElement = document.createElement("a");
  downloadElement.style.display = "none";
  var href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = `下载.png`; // 下载后文件名
  downloadElement.click(); // 点击下载
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};
// 获取表1查询条件
const getSortObj = () => {
  let defaultSort = {
    sortName: queryObj.sortName ? queryObj.sortName : queryObj.elementMark[0],
    sort: queryObj.sort ? queryObj.sort : "DESC",
  };
  if (queryObj.elementMark[0] === "firstFrostDay") {
    defaultSort.sortName = "firstFrostTime";
    defaultSort.sort = "ASC";
  } else if (queryObj.elementMark[0] === "minHighTemp") {
    defaultSort.sortName = "minHighTemp";
    defaultSort.sort = "ASC";
  } else if (queryObj.elementMark[0] === "minVis") {
    defaultSort.sortName = "minVis";
    defaultSort.sort = "ASC";
  } else if (queryObj.elementMark[0] === "avgLowTemp") {
    defaultSort.sortName = "avgLowTemp";
    defaultSort.sort = "ASC";
  }
  return defaultSort;
};
const getTable1Data = () => {
  let queryType = "";
  let sortObj = getSortObj();
  let queryData = {
    page: queryObj.page,
    size: 13,
    startTime: queryObj.startTime,
    endTime: queryObj.endTime,
    sort: sortObj.sort,
    sortName: sortObj.sortName,
    staType: queryObj.staType,
    preType: queryObj.preType,
    timeOption: queryObj.timeOption,
    year: queryObj.year,
    mon: queryObj.mon,
    ten: queryObj.ten,
    otherMark: queryObj.otherMark,
    isMoreTime: queryObj.isMoreTime,
    startYear: queryObj.startYear,
    startMon: queryObj.startMon,
    startDay: queryObj.startDay,
    endYear: queryObj.endYear,
    endMon: queryObj.endMon,
    endDay: queryObj.endDay,
  };
  // if (prop.pointAreaType.objtype == "map") {
  queryData.ids = queryObj.ids;
  queryData.noIds = queryObj.noIds;
  // }

  if (queryObj.areaCode) {
    queryData.areaCode = queryObj.areaCode;
    queryData.areaName = queryObj.areaName;
  }
  if (queryObj.areaMark) {
    queryData.areaMark = queryObj.areaMark;
    queryData.areaName = queryObj.areaName;
  }
  if (queryObj.latLons && queryObj.latLons.length > 0) {
    queryData.latLons = queryObj.latLons; // 多边形的数据
  } else if (queryObj.lon1) {
    queryData.lon1 = queryObj.lon1; //相对小的经度
    queryData.lon2 = queryObj.lon2; //相对大的经度
    queryData.lat1 = queryObj.lat1; //相对小的纬度
    queryData.lat2 = queryObj.lat2; //相对大的纬度
  } else {
    if (prop.pointAreaType.objtype == "map") {
      queryData.lon1 = 0; //相对小的经度
      queryData.lon2 = 0; //相对大的经度
      queryData.lat1 = 0; //相对小的纬度
      queryData.lat2 = 0; //相对大的纬度
    }
  }

  prop.statisticObjType.checkedMethodKey = "sta";
  let axiosdata;
  if (prop.statisticObjType.checkedMethodKey == "sta") {
    tongjiname1.value = "区域统计";
    if (queryObj.timeOption == "cnYear") {
      tongjiname2.value = "年份统计";
    } else {
      tongjiname2.value = "站点统计";
    }

    queryType = "post";
    queryData.elementMark = queryObj.elementMark;
    for (let key in wholeThresholdObj) {
      for (let key2 in wholeThresholdObj[key]) {
        wholeThresholdObj[key][key2] = Number(wholeThresholdObj[key][key2]);
      }
    }
    if (prop.statisticObjType.checkedTimeKey == "hour") {
      queryData = {
        ...queryData,
        ...wholeThresholdObj.winHourThreshold,
        ...wholeThresholdObj.tempThreshold,
      };
      // queryObj.sortName = "";
    } else if (prop.statisticObjType.checkedTimeKey == "day") {
      queryData = {
        ...queryData,
        ...wholeThresholdObj.preThreshold,
        ...wholeThresholdObj.winDayThreshold,
        ...wholeThresholdObj.highTempThreshold,
        ...wholeThresholdObj.lowTempThreshold,
        ...wholeThresholdObj.bigWindThreshold,
        ...wholeThresholdObj.avgSumTempThreshold,
      };
    }
    //queryData.sortName = queryObj.sortName;
    axiosdata = queryData;
  } else if (prop.statisticObjType.checkedMethodKey == "area") {
    tongjiname1.value = "站点统计";
    if (queryObj.timeOption == "cnYear") {
      tongjiname2.value = "年份统计";
    } else {
      tongjiname2.value = "区域统计";
    }
    queryType = "post";
    queryData.searcheTypes = queryObj.searcheTypes;
    //queryObj.sortName = "";
    if (prop.statisticObjType.checkedTimeKey == "hour") {
      queryData = {
        ...queryData,
        ...wholeThresholdObj.preAreaThreshold,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.temAreaThreshold,
      };
    } else if (prop.statisticObjType.checkedTimeKey == "day" || prop.statisticObjType.checkedTimeKey == "dayIndex") {
      queryData = {
        ...queryData,
        ...wholeThresholdObj.thePreNumPcDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.thePreNumDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.thePreAreaDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMinTempNumPcDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMinTempNum,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMinTempAreaDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxWindNumPcDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxWindNumDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxWindDayDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxTempNumPcDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxTempNum,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxTempAreaDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxPreDayDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxPreDayAnomalyDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxMinTempDayDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxMaxTempDayDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxCtPreDayDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theMaxAvgTempDayDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theAvgWindNumPcDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theAvgWindNumDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theAvgTempAreaDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theAvgPreDayDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theAvgMinTempDayDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theAvgMaxTempDayDay,
      };
      queryData = {
        ...queryData,
        ...wholeThresholdObj.theAvgAvgTempDayDay,
      };
    }
    //queryData.sortName = queryObj.sortName;
    axiosdata = queryData;
  }
  return [axiosdata, queryType];
};
// 站点统计表--智能报表
const showDataStatis = (type) => {
  dataStatisVisble.value = true;
  dataStatisType.value = type;
};
// 区域站排序
const regionSortChange = (val) => {
  regionSortDefault.value = val;
  if (val.order === "ascending") {
    queryRegionObj.sort = "ASC";
  } else {
    queryRegionObj.sort = "DESC";
  }
  queryRegionObj.sortName = val.prop;
  queryRegionObj.page = 1;
  if (!mergeRegionAreaInit.value) {
    searchTableDataRegion("sort");
  }
};
// 分页查询
const handleCurrentChange1 = (val) => {
  queryObj.page = val;
  searchTableData("isCache");
};
// 导出数据--站点/区域
const exportTableData = (type) => {
  queryObject.value = getTable1Data();
  let stationOBj = Object.assign({}, queryObj, queryObject.value[0]);
  let searchObj = type == "station" ? JSON.parse(JSON.stringify(stationOBj)) : JSON.parse(JSON.stringify(exportAreaObj.value));
  let requestUrl = "";
  // delete searchObj.page;
  // delete searchObj.size;
  if (queryObj.timeOption == "cnYear") {
    (searchObj.avgTempThreshold = 0), (searchObj.maxTempThreshold = 0), (searchObj.minTempThreshold = 0), (searchObj.preThreshold = 0);
  }
  if (searchObj.timeOption == "hour") {
    requestUrl = type == "station" ? interfaceObj.exportInstHourStaData : interfaceObj.exportInstHourAreaData;
  } else if (searchObj.timeOption == "day") {
    requestUrl = type == "station" ? interfaceObj.exportInstDayStaData : interfaceObj.exportInstDayAreaData;
  } else if (searchObj.timeOption == "dayIndex") {
    requestUrl = interfaceObj.getDayindexAreaDataExport;
  } else if (searchObj.timeOption == "cnYear") {
    requestUrl = interfaceObj.exportInstCnYearData;
    searchObj = queryObject.value[0];
  }
  //旬月年
  else if (searchObj.timeOption == "ten" || searchObj.timeOption == "month" || searchObj.timeOption == "year") {
    //多旬月年
    if (searchObj.timeOption == "month") {
      if (type == "station") {
        if (queryObj.isMoreTime) {
          requestUrl = interfaceObj.exportInstMultiStaData;
        } else {
          requestUrl = interfaceObj.exportInstSingleStaData;
        }
      } else {
        requestUrl = interfaceObj.exportInstMonAreaData;
      }
    } else if (searchObj.timeOption == "ten") {
      if (type == "station") {
        if (queryObj.isMoreTime) {
          requestUrl = interfaceObj.exportInstMultiStaData;
        } else {
          requestUrl = interfaceObj.exportInstSingleStaData;
        }
      } else {
        requestUrl = interfaceObj.exportInstTenAreaData;
      }
    }
    //单旬月年
    else {
      if (type == "station") {
        if (queryObj.isMoreTime) {
          requestUrl = interfaceObj.exportInstMultiStaData;
        } else {
          requestUrl = interfaceObj.exportInstSingleStaData;
        }
      } else {
        requestUrl = interfaceObj.exportInstYearAreaData;
      }
      // requestUrl = interfaceObj.exportInstYearAreaData;
    }
  }
  searchObj.requestType = exportAreaObj.value.requestType;
  // if (
  //   prop.pointAreaType.type == "province" &&
  //   prop.pointAreaType.id == "0"
  // ) {
  //   searchObj.requestType = "province";
  // } else if (prop.pointAreaType.type == "province") {
  //   if (searchObj.timeOption == "ten" ||
  //     searchObj.timeOption == "month" ||
  //     searchObj.timeOption == "year") {
  //     searchObj.requestType = "province";
  //   } else {
  //     searchObj.requestType = "city";
  //   }
  // } else if (prop.pointAreaType.objtype == "region") {
  //   searchObj.requestType = "region";
  // } else if (prop.pointAreaType.objtype == "basin") {
  //   searchObj.requestType = "basin";
  // } else if (prop.pointAreaType.objtype == "map") {
  //   searchObj.requestType = "range";
  // } else if (prop.pointAreaType.type == "capitals") { // 新增省会城市功能查询页面
  //   searchObj.requestType = "capitals";
  //   searchObj.areaCode = "";
  // }
  // if(searchObj.endTime.indexOf('-')>-1){
  //   let endTime = searchObj.endTime.split('-');
  //   searchObj.endTime = endTime.join('/');
  // }
  // if(searchObj.startTime.indexOf('-')>-1){
  //   let startTime = searchObj.startTime.split('-');
  //   searchObj.startTime = startTime.join('/');
  // }
  // let qsData = qs.stringify({ ...searchObj }, { arrayFormat: 'repeat' });
  //下载
  service.post(requestUrl, searchObj, { responseType: "blob" }).then((res) => {
    // service.get(requestUrl,{params:{...searchObj}},{ responseType: 'blob' }).then((res)=>{
    // service.get(requestUrl+'?'+qsData,{ responseType: 'blob'}).then((res)=>{
    let url = window.URL.createObjectURL(new Blob([res.data]));
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    res.headers["content-disposition"] ? link.setAttribute("download", decodeURI(res.headers["content-disposition"].split("filename=")[1])) : null;
    document.body.appendChild(link);
    link.click();

    // 下载完成后，移除 <a> 元素并释放创建的 URL
    // document.body.removeChild(link);
    // window.URL.revokeObjectURL(url);
  });
};
const forMateExtData = (val) => {
  val = val.replace(/0/g, "否").replace(/1/g, "是");
  return val;
};
const forValueExtData = (val) => {
  // let arr = val.split('/')
  // arr.forEach((item, index) => {
  //   if (!isNaN(item)) {
  //     arr[index] = Number(item).toFixed(2)
  //   }
  // })
  return val;
};
defineExpose({
  setPointStationData,
});
onMounted(() => {
  nextTick(() => {
    initChart(
      [
        "17时",
        "18时",
        "19时",
        "20时",
        "21时",
        "22时",
        "23时",
        "11月15日",
        "01时",
        "02时",
        "03时",
        "04时",
        "05时",
        "06时",
        "07时",
        "08时",
        "09时",
        "10时",
        "11时",
        "12时",
        "13时",
        "14时",
        "15时",
        "16时",
      ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      undefined,
      [
        {
          stationId: "59265",
          dateTime: "11月14日17时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 26.8,
          minTemp: 26.3,
          avgTemp: 26.3,
          extWind: 4.5,
          maxWind: 2.9,
          avgWind: 2.3,
          snowDeep: 0,
          minVis: 11.7,
        },
        {
          stationId: "59265",
          dateTime: "11月14日18时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 26.5,
          minTemp: 25.8,
          avgTemp: 25.8,
          extWind: 4.1,
          maxWind: 2.4,
          avgWind: 1.6,
          snowDeep: 0,
          minVis: 11.7,
        },
        {
          stationId: "59265",
          dateTime: "11月14日19时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 25.8,
          minTemp: 25.3,
          avgTemp: 25.3,
          extWind: 2.7,
          maxWind: 2,
          avgWind: 1.1,
          snowDeep: 0,
          minVis: 10.1,
        },
        {
          stationId: "59265",
          dateTime: "11月14日20时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 25.2,
          minTemp: 24.9,
          avgTemp: 25,
          extWind: 3.1,
          maxWind: 2.3,
          avgWind: 2.3,
          snowDeep: 0,
          minVis: 9.7,
        },
        {
          stationId: "59265",
          dateTime: "11月14日21时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 25,
          minTemp: 24.5,
          avgTemp: 24.5,
          extWind: 3.7,
          maxWind: 2.5,
          avgWind: 2.2,
          snowDeep: 0,
          minVis: 9.2,
        },
        {
          stationId: "59265",
          dateTime: "11月14日22时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 24.5,
          minTemp: 24,
          avgTemp: 24,
          extWind: 2.9,
          maxWind: 2.4,
          avgWind: 1.5,
          snowDeep: 0,
          minVis: 7.9,
        },
        {
          stationId: "59265",
          dateTime: "11月14日23时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 24,
          minTemp: 23.5,
          avgTemp: 23.5,
          extWind: 2.5,
          maxWind: 2,
          avgWind: 1.9,
          snowDeep: 0,
          minVis: 7.3,
        },
        {
          stationId: "59265",
          dateTime: "11月15日00时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 23.5,
          minTemp: 23.4,
          avgTemp: 23.5,
          extWind: 2.4,
          maxWind: 2.1,
          avgWind: 1.7,
          snowDeep: 0,
          minVis: 7.2,
        },
        {
          stationId: "59265",
          dateTime: "11月15日01时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 23.9,
          minTemp: 23.5,
          avgTemp: 23.6,
          extWind: 2,
          maxWind: 1.9,
          avgWind: 1.2,
          snowDeep: 0,
          minVis: 7.8,
        },
        {
          stationId: "59265",
          dateTime: "11月15日02时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 23.6,
          minTemp: 23.4,
          avgTemp: 23.4,
          extWind: 2.4,
          maxWind: 1.9,
          avgWind: 1.5,
          snowDeep: 0,
          minVis: 6.3,
        },
        {
          stationId: "59265",
          dateTime: "11月15日03时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 23.4,
          minTemp: 23.2,
          avgTemp: 23.2,
          extWind: 2.5,
          maxWind: 2.2,
          avgWind: 2.3,
          snowDeep: 0,
          minVis: 5.7,
        },
        {
          stationId: "59265",
          dateTime: "11月15日04时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 23.2,
          minTemp: 23.2,
          avgTemp: 23.2,
          extWind: 2.6,
          maxWind: 2.2,
          avgWind: 0.9,
          snowDeep: 0,
          minVis: 6.5,
        },
        {
          stationId: "59265",
          dateTime: "11月15日05时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0.5,
          snow: 0,
          maxTemp: 23.2,
          minTemp: 23.1,
          avgTemp: 23.1,
          extWind: 2.3,
          maxWind: 1.6,
          avgWind: 1.5,
          snowDeep: 0,
          minVis: 3.1,
        },
        {
          stationId: "59265",
          dateTime: "11月15日06时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 23.1,
          minTemp: 23,
          avgTemp: 23.1,
          extWind: 1.8,
          maxWind: 1.5,
          avgWind: 0.9,
          snowDeep: 0,
          minVis: 3.5,
        },
        {
          stationId: "59265",
          dateTime: "11月15日07时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 23.1,
          minTemp: 22.9,
          avgTemp: 22.9,
          extWind: 2.6,
          maxWind: 2.1,
          avgWind: 2.2,
          snowDeep: 0,
          minVis: 5.4,
        },
        {
          stationId: "59265",
          dateTime: "11月15日08时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 23.3,
          minTemp: 22.9,
          avgTemp: 23.3,
          extWind: 2.5,
          maxWind: 2.2,
          avgWind: 1.3,
          snowDeep: 0,
          minVis: 4.6,
        },
        {
          stationId: "59265",
          dateTime: "11月15日09时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 24.2,
          minTemp: 23.3,
          avgTemp: 24.2,
          extWind: 2,
          maxWind: 1.4,
          avgWind: 0.7,
          snowDeep: 0,
          minVis: 5.6,
        },
        {
          stationId: "59265",
          dateTime: "11月15日10时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 26,
          minTemp: 24.2,
          avgTemp: 26,
          extWind: 1.7,
          maxWind: 1,
          avgWind: 0.7,
          snowDeep: 0,
          minVis: 7.4,
        },
        {
          stationId: "59265",
          dateTime: "11月15日11时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 27.8,
          minTemp: 26,
          avgTemp: 27.8,
          extWind: 2.3,
          maxWind: 1.2,
          avgWind: 1.3,
          snowDeep: 0,
          minVis: 8.7,
        },
        {
          stationId: "59265",
          dateTime: "11月15日12时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 28.9,
          minTemp: 27.6,
          avgTemp: 28.9,
          extWind: 3.8,
          maxWind: 2.2,
          avgWind: 0.5,
          snowDeep: 0,
          minVis: 9.6,
        },
        {
          stationId: "59265",
          dateTime: "11月15日13时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 29.1,
          minTemp: 28.4,
          avgTemp: 29,
          extWind: 3.2,
          maxWind: 1.9,
          avgWind: 1.7,
          snowDeep: 0,
          minVis: 10.9,
        },
        {
          stationId: "59265",
          dateTime: "11月15日14时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 29.2,
          minTemp: 28.7,
          avgTemp: 29,
          extWind: 4,
          maxWind: 2.1,
          avgWind: 1.3,
          snowDeep: 0,
          minVis: 12.2,
        },
        {
          stationId: "59265",
          dateTime: "11月15日15时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 29.5,
          minTemp: 28.9,
          avgTemp: 29.4,
          extWind: 4.7,
          maxWind: 2.6,
          avgWind: 2.3,
          snowDeep: 0,
          minVis: 12.5,
        },
        {
          stationId: "59265",
          dateTime: "11月15日16时",
          year: null,
          mon: null,
          ten: null,
          date: null,
          pre: 0,
          snow: 0,
          maxTemp: 29.4,
          minTemp: 28.5,
          avgTemp: 28.5,
          extWind: 5.2,
          maxWind: 3.1,
          avgWind: 2.1,
          snowDeep: 0,
          minVis: 12.6,
        },
      ]
    );
  });
});
</script>

<style lang="scss">
.resultCon {
  display: flex;
  font-size: 12px;
  color: #666666;
  width: 100%;
  // height: calc(60% - 42px);
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
    &:hover {
      background: rgba(116, 116, 116, 0.6);
    }
  }
  .hightRow {
    box-shadow: 0px 1px 10px 2px rgba(0, 88, 210, 0.5) inset;
  }
  .el-table {
    background: transparent;
    tr {
      background: transparent;
    }
    .current-row {
      box-shadow: 0px 1px 10px 2px rgba(0, 88, 210, 0.5) inset;
      & > td {
        background: transparent;
        font-weight: bold;
        & > .cell {
          color: #155edc !important;
          & > span {
            color: #155edc !important;
          }
        }
      }
    }
    .el-table__body tr:hover > td {
      background: transparent;
    }
  }
  .leftResultCon {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, #f1faff 100%);
    height: 100%;
    .leftTableCon {
      // height: 100%;
      display: flex;
      flex-direction: column;
      background: url("@/assets/pic/statistical-analysis/leftTableBG.png") no-repeat right bottom;
    }
  }
  .rightResultCon,
  .leftResultCon1 {
    width: 50%;
    margin-right: 1vh;
    //表格表头对不齐的问题
    .el-table {
      th.gutter,
      colgroup.gutter {
        display: table-cell !important;
        width: 17px !important;
      }
      .el-table__row {
        cursor: pointer;
        background-color: transparent;
        height: 24px;
        line-height: 24px;
      }
    }
  }
  .rightResultCon {
    width: calc(50% - 1vh);
    margin-right: 0;
    &.dayIndexClass {
      width: calc(100% - 1vh);
    }
  }
  .leftResultCon2 {
    width: 100%;
    margin-right: 1vh;
    //表格表头对不齐的问题
    .el-table {
      th.gutter,
      colgroup.gutter {
        display: block !important;
      }
    }
    .leftTableCon {
      background-size: 25%;
    }
    .el-table__body-wrapper {
      height: calc(91.2vh - 24.4vh - 1vh - 3.6vh - 3.6vh - 1vh - 2.6vh - 1vh - 3.6vh - 15px);
      overflow-x: auto;
    }
  }
  .leftResultCon1 {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, #f1faff 100%);
    .normalTable {
      .el-table__body-wrapper {
        height: calc(91.2vh - 24.4vh - 1vh - 3.6vh - 3.6vh - 1vh - 2.6vh - 1vh - 3.6vh - 15px);
        overflow-x: auto;
      }
    }
    .leftTableCon {
      background-size: 50%;
    }
  }
  .defaultScrollbar {
    height: calc(100% - 24px);
    .el-scrollbar__wrap {
      overflow-x: hidden;
      // width: calc(100% - 2vh + 17px + 9px);
    }
  }
  .rightScrollbar {
    height: calc(91.6vh - 24vh - 3.6vh - 7vh);
    .el-table__body-wrapper {
      height: calc(57vh - 3.6vh - 1vh - 8px);
      overflow-y: auto;
      overflow-x: auto;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-scrollbar__bar .is-vertical {
      display: none;
    }
  }

  .rightTopScrollbar {
    .el-table__body-wrapper {
      height: calc(28vh - 3.6vh - 1vh - 8px);
      overflow-y: auto;
      overflow-x: auto;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
      padding-bottom: 0px;
    }
  }
  .rightBottomScrollbar {
    // height: calc(21.9vh + 2px);
    overflow-x: auto;
  }
  .allRightBotm {
    height: calc(73.4vh - 16.4vh);
    overflow-x: auto;
  }
  .chartCon {
    height: 160px;
    canvas {
      cursor: pointer;
    }
  }
  .allChartCon {
    height: calc(72.2vh - 18vh);
    canvas {
      cursor: pointer;
    }
  }
  .smallScrollbar {
    height: calc(25.1vh - 2px);
  }
  .bottomResultCon {
    position: relative;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, #f1faff 100%);
    margin-top: 0.5vw;
    .bottomTable {
      background: url("@/assets/pic/statistical-analysis/bottomTableBG.png") no-repeat center bottom;
      background-size: 100% 20%;
    }
  }
  .noTopMargin {
    margin-top: 0vw;
  }
  .normalTable {
    overflow: hidden;
    margin: 0vh 1vh 0 0;
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.16);
    border: 1px solid;
    border-image: linear-gradient(180deg, rgba(53, 165, 237, 0), rgba(53, 165, 237, 1)) 1 1;
    .tableTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 32px;
      height: 32px;
      font-size: 12px;
      background-size: 24vw 4vh;
      // border-bottom: 1px solid #c9eaff;
      box-shadow: 0px 1px 0px 0px #c9eaff;
      label {
        .tableTitleTime {
          color: rgba(21, 94, 220, 1);
          font-weight: bold;
          margin: 0 8px;
        }
        .tableTitleName {
          color: rgba(48, 48, 47, 1);
        }
        .tableTitleStation {
          background: #e2eaf9;
          border-radius: 2px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          font-weight: bold;
          color: #155edc;
          margin-left: 8px;
          padding: 0 8px;
        }
        margin-left: 0.52vw;
        font-size: 14px;
        display: flex;
        align-items: center;
        img {
          width: 24px;
        }
        &::before {
          color: #fff;
          margin-right: 1vh;
        }
      }
      .tableOperate {
        display: flex;
        font-weight: 500;
        color: #155edc;
        align-items: center;
        .downPic {
          width: 22px;
          height: 22px;
          font-size: 15px;
          font-weight: 700;
          text-align: center;
          line-height: 22px;
        }
        .singleOperate {
          margin: 0 0.8vh;
          display: flex;
          align-items: center;
          cursor: pointer;
          img {
            padding: 4px;
          }
        }
        .chartPic {
          background: #e2eaf9;
          box-shadow: 0px 2px 14px 0px rgba(21, 94, 220, 0.2);
          border-radius: 2px;
          border: 1px solid rgba(21, 94, 220, 0.3);
        }
        .tableExport {
          background: #ffffff;
          box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.3);
          border-radius: 2px;
        }
        //左侧表格查询样式
        .leftTableSearch {
          .el-input__inner {
            box-shadow: 0px 0px 4px 0px rgba(21, 94, 220, 0.2);
            border-radius: 4px;
            border: 1px solid #a3bfef;
          }
          .el-input__icon {
            color: #a3bfef;
          }
        }
      }
    }
    .chartTableTitle {
      label {
        img {
          width: 24px;
          margin: 0 3px;
        }
      }
    }
    .tableTitle2 {
      background-size: 23vw 4vh;
      .el-icon-new-right-js {
        font-size: 14px;
        font-family:
          PingFangSC-Medium,
          PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .downloadEcharts {
      z-index: 3;
      position: absolute;
      right: 10px;
      top: 40px;
      font-size: 18px;
      color: #999;
      cursor: pointer;
    }
    .el-table {
      width: 100%;
      background: transparent;
      border: 1px solid #dcdcdc;
      th {
        background: #e8f6fe;
        font-size: 12px;
        font-weight: normal;
        text-align: center;
        padding: 0;
        & > .cell {
          text-align: center;
          line-height: 28px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 500;
          color: #666666;
          display: flex;
          padding: 0;
          align-items: center;
          justify-content: center;
        }
        border-right: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
      }
      td {
        padding: 0;
        border-right: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        & > .cell {
          text-align: center;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: #666666;
        }
      }
      .caret-wrapper {
        width: 16px;
        height: 32px;
        .sort-caret.ascending {
          border-bottom-color: #666;
          top: 5px;
        }
        .sort-caret.descending {
          border-top-color: #666;
          bottom: 5px;
        }
      }
      .descending .sort-caret.descending {
        border-top-color: #155edc;
      }
      .ascending .sort-caret.ascending {
        border-bottom-color: #155edc;
      }
    }
  }
  .areaTableCon {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, #f1faff 100%);
    .normalTable {
      background: url("@/assets/pic/statistical-analysis/areaTableBG.png") no-repeat right bottom;
      background-size: 40%;
      margin-right: 0;
    }
  }
  .resultPagination {
    float: right;
    text-align: right;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    .el-pager li:not(.disabled).active {
      background: #e2eaf9;
      border-radius: 2px;
      border: 1px solid #155edc;
      font-weight: bold;
      color: #155edc;
      width: 20px;
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
.thresholdPopover {
  .el-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .thresholdName {
      width: 100px;
      height: 30px;
      line-height: 30px;
      margin-right: 20px;
      text-align: right;
    }
    .el-form-item {
      margin-right: 10px;
      margin-bottom: 0;
      .yzInput {
        border: 1px solid #ccc !important;
        padding: 5px 0px !important;
        border-radius: 5px !important;
        width: 80px;
        text-align: center !important;
      }
    }
  }
}
.thresholdIcon:hover {
  color: #049afe;
}
.el-scrollbar__bar.is-horizontal {
  left: auto;
}
//智能统计弹出层
.dataStatisDialogClass {
  border-radius: 10px;
  // width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, #f1faff 100%);
  box-shadow: 0px 2px 8px 0px #003ca2;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-dialog__header {
    height: 42px;
    line-height: 42px;
    padding: 0 22px;
    background: #fff;
    box-shadow: 0px 1px 3px 0px #c9eaff;
    border-radius: 10px 10px 0px 0px;
    margin: 0;
  }
  .dialogHead {
    img {
      width: 40px;
      margin-top: 2px;
      float: left;
    }
    span {
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #155edc;
      float: left;
      text-shadow: 0px 0px 2px 0px #c9eaff;
    }
  }
  .el-dialog__headerbtn {
    width: 42px;
    height: 42px;
    position: absolute;
    top: 0px;
    right: 10px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 20px;
    .el-dialog__close {
      color: #92979a;
    }
  }
  .el-dialog__body {
    padding: 16px 24px;
    .dialogContentDiv {
      .formRow {
        display: flex;
        justify-content: space-between;
        .el-form--inline .el-form-item {
          margin-right: 0px;
        }
      }
      .el-form-item__label {
        font-size: 12px;
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
        height: 14px;
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
}
.el-tooltip__popper {
  border: 1px solid #ddd !important;
  box-shadow: 2px 2px 6px #ddd;
  border-top-color: #ddd !important;
  background: #fff !important;
  color: #333 !important;
  .popper__arrow {
    border-top-color: #ddd !important;
    &::after {
      border-top-color: #fff !important;
    }
  }
}
</style>
