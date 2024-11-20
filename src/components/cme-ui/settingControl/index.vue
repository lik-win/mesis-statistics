<template>
  <div>
    <!-- 左侧按钮选择 -->
    <div class="setting_control">
      <!-- 按钮 -->
      <div class="control_item" v-for="(item) in datalist" :key="item.id" @click="ev_select(item)">
        <svg-icon :name="item.icon" data-title="item.icon"> </svg-icon>
        <span class="tooltip-text">{{ item.chnName }}</span>
      </div>
    </div>
    <!-- 地图操作弹框 -->
    <mapControl :maplist="maplist" :projection="projection" :showPop="showPop" :MultipleMapslist="MultipleMapslist"
      @MapOperation="MapOperation()">
    </mapControl>
  </div>
</template>

<script setup>
import {
  onMounted,
  ref,
  getCurrentInstance,
} from 'vue'
import maplist from '@/config/maplist.json'
import projection from '@/config/projection.json'
import MultipleMapslist from '@/config/MultipleMapslist.json'
import mapControl from "@/components/cme-application/mapControl/index.vue"
import toolbox from '@/config/toolbox.json'
const internalInstance = getCurrentInstance()//调用事件总线

let showPop = ref(false)//地图操作弹框
let showPopBootom = ref(0)//地图操作弹框距底高度
let datalist = ref(toolbox) //工具列表



// 初始化生命周期
onMounted(() => {
  showPopBootom.value = datalist.value.length * 37

})


// 点击执行工具箱
let ev_select = (item) => {
  if (item && item.type) {
    if (item.type == "fullScreen") {
      fullScreen()
    }
    if (item.type == "zoomIn") {
      zoomIn()
    }
    if (item.type == "zoomOut") {
      zoomOut()
    }
    if (item.type == "MapOperation") {
      MapOperation()

    }

  } else {
    console.error(`方法 ${methodName} 不存在`);
  }
}




// 全屏切换
let fullScreen = () => {
  if (!document.fullscreenElement) {
    // 进入全屏模式
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari 和 Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  } else {
    // 退出全屏模式
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari 和 Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
}

// 放大地图
let zoomIn = () => {
  let view = internalInstance?.appContext.config.globalProperties.$Map2D.getView();
  // 让地图的zoom增加1，从而实现地图放大
  view.setZoom(view.getZoom() + 1);
}

// 缩小地图
let zoomOut = () => {
  let view = internalInstance?.appContext.config.globalProperties.$Map2D.getView();
  // 让地图的zoom增加1，从而实现地图放大
  view.setZoom(view.getZoom() - 1);
}

// 地图操作
let MapOperation = () => {
  showPop.value = !showPop.value
}







</script>

<style scoped lang="scss">
.slider-demo-block {
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 200;
  top: 491.0016px;
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}


.setting_control {
  width: 32.0064px;
  border-radius: 19.008px;
  backdrop-filter: blur(1.9968px);
  display: flex;
  gap: 3.9936px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .control_item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32.0064px
      /* 32/192 */
    ;
    height: 32.0064px
      /* 32/192 */
    ;
    background: rgba(28, 41, 84, .3);
    border-radius: 19.008px
      /* 19/192 */
    ;
    backdrop-filter: blur(1.9968px);
  }
}


.tooltip-text {
  display: none;
  position: absolute;
  left: 37.9968px;
  font-size: 12px;
  width: 50.9952px;
  text-align: center;
  background-color: #1394bbbd;
  color: #fff;
  border-radius: 16.992px;
  padding: 10.0032px;

}

.control_item:hover span {
  display: block;
  /* 鼠标悬停时显示说明文字 */
}
</style>
