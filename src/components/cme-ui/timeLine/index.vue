<template>
    <div class="map_time_axis">

        <div class="control-btn">
            <el-tooltip effect="light" content="向后" popper-class="el_tooltip" placement="top-start" :offset="10">
                <button type="button" class="to_current" @click="preHandle">
                    <img src="../../../assets/pic/timeLine/prev.png" />
                </button>
            </el-tooltip>
            <el-tooltip effect="light"
                :content="controlBtn.curIsPlay ? `${controlBtn.suspendContent}` : `${controlBtn.playContent}`"
                popper-class="el_tooltip" placement="top-start" :offset="10">
                <button type="button" class="to_current" @click="playHandle">
                    <img src="../../../assets/pic/timeLine/stop.png" v-if="controlBtn.curIsPlay" />
                    <img src="../../../assets/pic/timeLine/play.png" v-else />
                </button>
            </el-tooltip>
            <el-tooltip effect="light" content="向前" popper-class="el_tooltip" placement="top-start" :offset="10">
                <button type="button" class="to_current" @click="nextHandle">
                    <img src="../../../assets/pic/timeLine/next.png" />
                </button>
            </el-tooltip>
            <el-tooltip effect="light" content="回到当前" popper-class="el_tooltip" placement="top-start" :offset="10">
                <button type="button" class="to_current" @click="currentHandle">
                    <img src="../../../assets/pic/timeLine/refresh.png" />
                </button>
            </el-tooltip>
        </div>

        <div class="axis">
            <div class="diy_tooltip" :style="['left:' + diyTooltipLeft + 'px']">
                {{ curDateTime }}
            </div>
            <div class="slider-wrap">
                <div class="move-slider" :style="['width:' + diyTooltipLeft + 'px']"></div>
            </div>
            <div class="date-list-box">
                <ul class="date_list" ref="axisDateListBox">
                    <li class="date-items-box" v-for="(item, dest) in timeData.timeLineData" :key="dest">
                        <ul>
                            <li v-for="(time, index) in item.time" @click="timeHandleClick($event, index)" :key="index">
                                <div class="diy_tooltip date-tooltip">
                                    {{ time }}
                                </div>
                            </li>
                        </ul>
                        <div>
                            <span>{{ item.date }}</span>
                            <span>{{ item.week }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import useCounterStore from '@/store/index.js'
const store = useCounterStore()//pinia实例

const props = defineProps({
    timeData: Object
});

const emits = defineEmits(['getMapData']);

//时间轴执行下一步标识
let runFlag = ref(true);

//时间轴时间盒子
let axisDateListBox = ref();

/**/
let activeIndex = reactive([]);

//移动日期提示框及时间轴
let diyTooltipLeft = ref(0);

//定时器标识
let timer = reactive(null);

//移动日期提示框内容
let curDateTime = ref();

//时间父容器
let items = [];

//时间子容器
let subItems = [];
let itemWidth = 0;
let subItemWidth = 0;
watch(
    () => curDateTime.value,
    (newVal, oldVal) => {
        store.dateTiem = newVal
    },
);


onMounted(() => {
    let el = axisDateListBox.value;
    items = el.children;//子元素
    if (!items || items.length == 0) return;
    let totalWidth = el.offsetWidth; //获取时间轴元素宽度
    itemWidth = totalWidth / items.length;//平均宽度
    subItems = items[0].children[0].children;
    subItemWidth = itemWidth / subItems.length;
    initTimeLine();
});

let controlBtn = reactive({
    curIsPlay: false,
    suspendContent: '暂停',
    playContent: '播放'
});

/**
 * 初始化时间轴时间位置
 * */
const initTimeLine = () => {
    let pindex = props.timeData.activeDate[0];
    let sindex = props.timeData.activeDate[1];
    moveSlider(pindex, sindex);
    handleRenderMap();
}

/**
 * 时间点位点击事件
 */
const timeHandleClick = (event, index) => {
    controlBtn.curIsPlay = false;
    clearInterval(timer);
    let target = event.target; //目标元素子li标签
    let parentNode = target.offsetParent; //目标父元素li标签
    let parentNodeWidth = parentNode.offsetWidth; //父元素宽度
    let parentNodeOffsetLeft = parentNode.offsetLeft;//父元素left值
    let left = target.offsetLeft + parentNodeOffsetLeft;//目标元素加上父元素left值
    diyTooltipLeft.value = left;//移动日期提示框及时间轴
    let pindex = Math.round(parentNodeOffsetLeft / parentNodeWidth);
    let item = props.timeData.timeLineData[pindex];//
    curDateTime.value = item.date + ' ' + item.time[index];
    activeIndex[0] = pindex;
    activeIndex[1] = index;
    handleRenderMap();
}

/**
 * 上一时刻
 */
const preHandle = () => {
    controlBtn.curIsPlay = false;
    clearInterval(timer);
    let pindex = activeIndex[0];
    let sindex = activeIndex[1];
    if (pindex == 0 && sindex == 0) return;

    if (pindex != 0 && sindex == 0) {
        sindex = subItems.length - 1;
        --pindex;
    } else {
        --sindex;
    }
    moveSlider(pindex, sindex);
    handleRenderMap();
}

/**
 * 下一时刻
 */
const nextHandle = () => {
    controlBtn.curIsPlay = false;
    clearInterval(timer);

    let data = playAndNext();
    if (data) {
        const { pindex, sindex } = data;
        moveSlider(pindex, sindex);
        handleRenderMap();
    }
}

/**
 * 播放
 */
const playHandle = () => {
    controlBtn.curIsPlay = !controlBtn.curIsPlay;
    if (controlBtn.curIsPlay) {
        timer = setInterval(() => {
            if (!runFlag.value) {
                return;
            }
            runFlag.value = false;

            let data = playAndNext();
            if (data) {
                const { pindex, sindex } = data;
                moveSlider(pindex, sindex);
                handleRenderMap();
            }
        }, props.timeData.timerTime)
    } else {
        clearInterval(timer);
    }
}

/**
 * 当前时刻
 */
const currentHandle = () => {
    controlBtn.curIsPlay = false;
    clearInterval(timer);
    initTimeLine();
}

/**
 * 调用地图
 */
const handleRenderMap = () => {
    emits('getMapData', curDateTime.value, runFlag);
}

const playAndNext = () => {
    let pindex = activeIndex[0];
    let sindex = activeIndex[1];
    if (pindex == items.length - 1 && sindex == subItems.length - 1) {
        clearInterval(timer);
        controlBtn.curIsPlay = false;
        return;
    }

    if (sindex == subItems.length - 1) {
        ++pindex;
        sindex = 0;
    } else {
        ++sindex
    }
    return { pindex, sindex };
}

/**
 * 移动日期提示框及时间轴
 */
const moveSlider = (pindex, sindex) => {
    activeIndex[0] = pindex;
    activeIndex[1] = sindex;
    let item = props.timeData.timeLineData[pindex];//
    diyTooltipLeft.value = pindex * itemWidth + sindex * Math.round(subItemWidth);
    curDateTime.value = item.date + ' ' + item.time[sindex];
}

</script>

<style lang="scss">
@import './timeLine';
</style>