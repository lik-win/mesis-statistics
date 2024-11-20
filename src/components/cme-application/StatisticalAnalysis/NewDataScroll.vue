<template>
  <div class="stationNewsCon">
    <div class="stationNews">
      <div class="newsIcon">
        <img src="@/assets/pic/statistical-analysis/newsIcon.png" width="16px" />
      </div>
      <el-tooltip popper-class="descriptionInfo" effect="light" :content="staDescriptionArr" placement="top-start" v-if="isShow">
        <div id="descriptionCon" class="descriptionCon">
          <MarqueeText :duration="80" :paused="paused" @mouseover="stopScroll" @mouseout="startScroll">{{ staDescriptionArr }}</MarqueeText>
        </div>
      </el-tooltip>
      <div id="descriptionCon" class="descriptionCon" v-text="staDescriptionArr" v-else></div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, toRefs, watch, watchEffect } from "vue";
import MarqueeText from "vue-marquee-text-component";
const props = defineProps({
  staDescription: {
    type: String,
    default: "",
  },
});
const { staDescription } = toRefs(props);
let disWidth;
const staDescriptionArr = ref("");
const animate = ref(false);
const timer = ref(null);
const isShow = ref(true);
const paused = ref(false);
String.prototype.pxWidth = function (font) {
  let canvas = String.prototype.pxWidth.canvas || (String.prototype.pxWidth.canvas = document.createElement("canvas")),
    context = canvas.getContext("2d");
  font && (context.font = font);
  let metrics = context.measureText(this);
  return metrics.width;
};
const stopScroll = () => {
  paused.value = true;
};
const startScroll = () => {
  paused.value = false;
};
watch(
  staDescription,
  (val) => {
    staDescriptionArr.value = val;
    isShow.value = false;
    if (val) {
      let inputWidth = val.pxWidth("normal 14px Microsoft YaHei");
      nextTick(() => {
        if (document.getElementById("descriptionCon")) {
          disWidth = document.getElementById("descriptionCon").offsetWidth;
          if (inputWidth > disWidth) {
            isShow.value = true;
          }
        }
      });
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss">
.stationNewsCon {
  margin: 4px 0;
  .stationNews {
    height: 32px;
    display: flex;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    border: 1px solid rgba(255, 139, 76, 0.5);
  }
  .newsIcon {
    display: flex;
    align-items: center;
    height: 32px;
    width: 32px;
    background: #fceee6;
    box-shadow: 0px 0px 6px 0px #ff8b4c;
    border-radius: 30px;
    margin-right: 10px;
    img {
      margin: 0 auto;
    }
  }
  .descriptionCon {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    cursor: pointer;
    font-size: 14px;
    color: #595959;
  }
}
.newContent {
  display: flex;
  width: 100%;
}
.descriptionInfo {
  font-size: 14px;
  width: 88%;
  border: 1px solid #ddd !important;
  box-shadow: 2px 2px 6px #ddd;
  .popper__arrow {
    border-top-color: #ddd !important;
  }
}
</style>
