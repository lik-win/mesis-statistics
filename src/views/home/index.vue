<template>
  <div class="home">
    <el-container>
      <el-header height="50px">
        <!-- 头部导航栏 -->
        <headerNav></headerNav>
      </el-header>
      <el-main>
        <div class="content">
          <!-- map地图 -->
          <div class="map-wrapper" ref="mapWrapperRef">
            <map2d v-for="(mode, index) in MultipleMaps" :name="mode" :key="index" :view=view />
            <map2d v-if="!MultipleMaps.length" name="default" :view=view />
          </div>

          <!-- 左侧内容 -->
          <div class="content-leftSide">
            <!-- 工具列表 -->
            <settingControl class="leftSide-toolList"></settingControl>
          </div>

          <!-- 右侧内容 -->
          <div class="content-rightSide">
            <!-- 图层列表 -->
            <layerManage class="rightSide-layersList"></layerManage>
            <!-- 图例、图层控制 -->
            <layerSetting class="rightSide-layersControl"></layerSetting>
          </div>

          <!-- 底部内容 -->
          <div class="content-bottom">
            <!-- 时间轴 -->
            <timeLine :timeData="timeData" @getMapData="getMapData" class="bottom-timeLine"></timeLine>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, nextTick, onMounted } from 'vue'
import headerNav from "@/components/cme-ui/headerNav/index.vue";
import map2d from "@/components/cme-base/baseMap/map2D.vue";
import layerManage from "@/components/cme-ui/layerManage/index.vue";
import layerSetting from "@/components/cme-ui/layerSetting/index.vue";
import settingControl from "@/components/cme-ui/settingControl/index.vue";
import timeLine from "@/components/cme-ui/timeLine/index.vue";
import View from "CME2D/View.js";
import useCounterStore from '@/store/index.js'
const store = useCounterStore()//pinia实例

let timeData = reactive({
  timeLineData: [
    {
      date: "03-12",
      week: "周二",
      time: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00"
      ]
    },
    {
      date: "03-13",
      week: "周三",
      time: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00"
      ]
    },
    {
      date: "03-14",
      week: "周四",
      time: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00"
      ]
    },
    {
      date: "03-15",
      week: "周五",
      time: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00"
      ]
    },
    {
      date: "03-16",
      week: "周六",
      time: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00"
      ]
    },
  ],
  activeDate: [0, 7],//第一个数组对象中item数组第n个选中
  timerTime: 2000,   //定时器执行间隔时间(毫秒)
});

let mapWrapperRef = ref(null) //地图容器
let MultipleMaps = ref([]);//地图实例

let view = new View({ //地图视图
  center: [106, 35],
  projection: "EPSG:4326",
  zoom: 5,
})

watch(
  () => store.MultipleMaps,
  (newVal, oldVal) => {
    MultipleMaps.value = newVal
    setMapWrapperSize()
  },
);
onMounted(() => {
  setMapWrapperSize()
})
// 分屏方法（目前写的实例是1，2，3，4分屏，支持扩展）
let setMapWrapperSize = () => {
  mapWrapperRef.value.style.boxSizing = 'border-box'
  let colums = 'repeat(1, 1fr)'
  let rows = 'repeat(1, 1fr)'
  nextTick(() => {
    const maps = mapWrapperRef.value.querySelectorAll('.map-wrapper')
    maps.forEach(map => {
      map.style = ""
    })
  })
  if (MultipleMaps.value.length === 4) {
    colums = 'repeat(2, 1fr)'
    rows = 'repeat(2, 1fr)'
  } else if (MultipleMaps.value.length === 3) {
    colums = 'repeat(2, 1fr)'
    rows = 'repeat(2, 1fr)'
    nextTick(() => {
      const maps = mapWrapperRef.value.querySelectorAll('.map-wrapper')
      const map = maps[maps.length - 1]
      map.style.gridColumn = '1 / 4';
    })
  } else if (MultipleMaps.value.length === 2) {
    colums = 'repeat(2, 1fr)'
    rows = 'repeat(1, 1fr)'
  }
  mapWrapperRef.value.style.gridTemplateColumns = colums
  mapWrapperRef.value.style.gridTemplateRows = rows
}

//时间轴执行函数
const getMapData = (time, flag) => {
  //模拟请求后台接口,获取数据,地图渲染成功,将flag设置为true,定时器才会执行
  setTimeout(() => {
    flag.value = true;

  }, 500);
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;

    .el-header {
      padding: 0;
    }

    .el-main {
      padding: 0;
      width: 100%;
      height: 100%;

      .content {
        width: 100%;
        height: 100%;

        .map-wrapper {
          width: 100%;
          height: 100%;
          display: grid;
          position: relative;


        }

        .content-rightSide {
          z-index: 999;

          .rightSide-layersList {
            position: fixed;
            bottom: 170px;
            right: 20px;
          }

          .rightSide-layersControl {
            position: fixed;
            right: 20px;
            bottom: 67.2px;
          }
        }

        .content-leftSide {
          z-index: 999;

          .leftSide-toolList {
            position: fixed;
            bottom: 100px;
            left: 20px;
          }
        }

        .content-bottom {
          z-index: 999;

          .bottom-timeLine {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
