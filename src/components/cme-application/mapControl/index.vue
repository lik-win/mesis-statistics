<template>
    <!-- 底图操作弹框 -->
    <div class="handler-pop" v-if="props.showPop">
        <!-- 头部 -->
        <div class="setting_header">
            <span class="text"> 地图控制 </span>
            <svg-icon @click="operation" color="#000" class="gaunbi" name="right-layer-setting-close" width="20px"
                height="20px" style="cursor: pointer">
            </svg-icon>
        </div>
        <div class="Edit_Tool">
            <div class="Tool">
                <div class="Tool_top">
                    <span>底图切换</span>
                </div>
                <div class="Tool_content1">
                    <div class="radio-group">
                        <el-select v-model="mapurl" placeholder="Select" style="width: 100%" @change="switchMap">
                            <el-option v-for="item in mapdatas" :key="item.url" :label="item.name" :value="item.url" />
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="Tool">
                <div class="Tool_top">
                    <span>切换投影</span>
                </div>
                <div class="Tool_content1">
                    <div class="radio-group">
                        <el-select v-model="mapProjectionData" placeholder="Select" style="width: 100%"
                            @change="switchProjection">
                            <el-option v-for="item in mapProjection" :key="item.url" :label="item.name"
                                :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="Tool">
                <div class="Tool_top">
                    <span>地图分屏</span>
                </div>
                <div class="Tool_content1">
                    <div class="radio-group">
                        <el-select v-model="MultipleMaps" placeholder="Select" style="width: 100%"
                            @change="setMultipleMaps">
                            <el-option v-for="item in MultipleMapslist" :key="item" :label="item.name"
                                :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref, getCurrentInstance, defineProps } from 'vue'
import TileLayer from 'CME2D/layer/Tile.js';
import XYZ from 'CME2D/source/XYZ.js';
import { cme_projections } from "CME2D/CME2DCore/index.js";//切换投影方法
import useCounterStore from '@/store/index.js'
const internalInstance = getCurrentInstance()//调用事件总线上的axios
const { $bus } = internalInstance.appContext.config.globalProperties//调用事件总线上的axios
const emit = defineEmits(['MapOperation'])//emit接受事件
const store = useCounterStore()//pinia实例

const props = defineProps({
    maplist: {
        default: false,
    },
    projection: {
        default: false,
    },
    MultipleMapslist: {
        default: false,
    },
    showPop: {
        type: Boolean,
        default: false,
    },
})//props接受参数
let mapdatas = ref(props.maplist) //底图列表
let mapProjection = ref(props.projection) //投影列表
let MultipleMapslist = ref(props.MultipleMapslist)//分屏列表

let mapurl = ref() //底图url
let mapProjectionData = ref() //投影值
let MultipleMaps = ref() //分屏数值

// 初始化生命周期
onMounted(() => {
    // 获取底图用的url和地图投影
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    map.forEach(function (item, index) {
        const baseLayer = item.getAllLayers()[0]//获取当前map的底图
        mapurl.value = baseLayer.getSource().getUrls()[0]
        mapProjectionData.value = item.getView().getProjection().code_;
    });
    if (map.length) {
        MultipleMaps.value = MultipleMapslist.value[map.length - 1].value
    }
})
// 切换底图
let switchMap = () => {
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    map.forEach(function (item, index) {
        const baseLayer = item.getAllLayers()[0]//获取当前map的底图
        item.removeLayer(baseLayer)//移除该底图
        const mapLayers = item.getLayers();//获取当前地图中的所有图层
        let newLayer = new TileLayer({
            preload: Infinity,//开启预加载模式
            source: new XYZ({
                url: mapurl.value
            }),
        });
        mapLayers.insertAt(0, newLayer)//将新的图层对象插入到第一个位置。
    });
}
// 切换地图投影
let switchProjection = () => {
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    let mapProjcet = new cme_projections();
    let view = mapProjcet.changeMapProject({
        map: map[0],
        target: mapProjectionData.value//投影的新坐标系
    })
    map.forEach(function (item, index) {
        if (index != 0) {
            item.setView(view);//设置新的视图
        }
    });
    if (store.mapLayersObj[0]) {
        $bus.emit('reloadSingleLayers', store.mapLayersObj[0])
    }

}
// 切换分屏
let setMultipleMaps = () => {
    if (MultipleMaps.value==1){
         store.MultipleMaps = []
         return
    }
    let maplist=[]
    for (let i = 1; i <= MultipleMaps.value; i++) {
        maplist.push("map"+i)
    }
        console.log(maplist,"MultipleMaps.value");
    store.MultipleMaps = maplist

}
// 关闭弹框
let operation = () => {
    emit("MapOperation")
}
</script>
<style scoped lang='scss'>
.handler-pop {
    z-index: 1000;
    position: absolute;
    left: 50px;
    bottom: 140px;
    width: 253px;
    background-color: rgb(234, 237, 245);
    border-radius: 15px;

    .setting_header {
        display: flex;
        height: 50px;
        color: rgb(0 0 0);
        align-items: center;
        padding-left: 20.0064px;

        .text {
            color: rgba(42, 51, 64, 1);
            font-size: 17.0112px;
            font-weight: 600;
        }

        .gaunbi {
            position: absolute;
            right: 20.0064px;
        }
    }

    .Edit_Tool {
        background-color: #f6f8fc;
        padding: 0 15px 15px;
        border-radius: 0 0 20px 20px;

        .Tool_top {
            height: 36px;
            display: flex;
            border-bottom: 2px #c9d0e2 solid;
            align-items: center;

            span {
                font-size: 14.9936px;
                font-weight: 500;
                color: #000;
            }
        }

        .Tool_content {
            width: 100%;
            padding-top: .4032px;

            ul {
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                gap: 10.0032px;
                margin: 14px 0 0 0;

                .icondan {
                    display: flex;
                    flex-direction: column;
                    width: 50.9952px;
                    align-items: center;
                    height: 63.9936px;
                    justify-content: space-between;
                    margin-bottom: 5.3184px;
                    padding: 1.9968px;
                    text-align: center;

                    .iconFrame {
                        height: 39.9936px;
                        width: 39.9936px;
                        background-color: rgba(137, 110, 255, 0.1);
                        border-radius: 10.0032px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .Selected {
                        background-color: rgba(137, 110, 255) !important;
                    }

                    span {
                        white-space: nowrap;
                        font-size: 13.056px;
                    }
                }
            }
        }

        .Tool_content1 {
            width: 100%;
            padding: 12px 0;

            ::v-deep(.el-radio__input.is-checked .el-radio__inner) {
                border-color: rgb(137, 110, 255);
                background: #fff;
            }

            ::v-deep(.el-radio__inner::after) {
                background-color: rgb(137, 110, 255);
            }

            .radio-group {
                .el-radio-group {
                    width: 100%;
                    height: 70px;
                    padding: 12.9984px 0;

                    .is-active {
                        ::v-deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
                            background-color: rgba(137, 110, 255, 1);
                            border-color: #8d8282;
                        }
                    }

                    .el-radio-button {
                        width: 50%;

                        ::v-deep(.el-radio-button__inner) {
                            width: 90%;
                            border-radius: 24px;
                            background-color: rgba(137, 110, 255, 0.1);
                        }
                    }
                }
            }

            .formlist {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 6.0096px 0;

                .spanss {
                    font-size: 12px;
                    flex: 0.25;
                }

                .el-radio-group {
                    flex: 0.8;

                    .el-radio {
                        margin-right: 12.9984px;
                    }
                }
            }

            .QJclose {
                display: inline-flex;
                align-items: center;
                flex-wrap: wrap;
                flex-direction: row;
                gap: 10.0032px;

                .Selected {
                    background-color: rgba(137, 110, 255, 0.2) !important;
                }

                .QJpiece {
                    width: 120px;
                    background-color: rgba(137, 110, 255, 0.05);
                    height: 24px;
                    color: rgb(51, 51, 51);
                    font-size: 12px;
                    border: .9984px solid rgba(137, 110, 255, 0.3);
                    border-radius: 8.0064px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .Colorpiece {
                        width: 12px;
                        height: 12px;
                        border-radius: 2.9952px;

                        margin-left: 10px;
                    }

                    span {
                        margin-left: 10px;
                    }
                }

                .el-radio-group {
                    display: inline-flex;
                    align-items: center;
                    flex-wrap: wrap;
                    font-size: 0;
                    flex-direction: row;
                    gap: 14.9952px;

                    ::v-deep(.el-radio.is-bordered.el-radio--small) {
                        width: 44%;
                        padding: 6px;
                        margin: 0;
                    }
                }
            }

            .Dianzhi {
                display: flex;
                flex-direction: column;
                margin: 10px 0;

                .spanss {
                    padding-bottom: 10px;
                    font-size: 12px;
                }

                .bujingqu {
                    .el-button--small.is-round {
                        padding: 5px 29px;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
}
</style>