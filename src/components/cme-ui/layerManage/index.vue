<template>
    <div class="meteoDataList">
        <template v-for="(item1) in meteoList">
            <div :class="{ infoList: true, active: currentMeteoIndex === item1.id }" @click="addlayers(item1)">
                <svg-icon style="color: white" name="wenduc" color="#fff"></svg-icon>
                <div class="text">{{ item1.name }}</div>
            </div>
        </template>

        <!-- 色斑图 -->
        <CME-GridRender ref="GridRender"></CME-GridRender>
        <!-- 风向杆 -->
        <CME-WindyBarb ref="WindyBarb"></CME-WindyBarb>
        <!-- 风流场 -->
        <CME-WindyStream ref="WindyStream"></CME-WindyStream>
    </div>
</template>

<script setup>
import {
    reactive,
    watch,
    onMounted,
    ref,
    getCurrentInstance,
    nextTick,
    watchEffect
} from 'vue'
import useCounterStore from '@/store/index.js'
const store = useCounterStore()//pinia实例

import mockApi from "@/api/mockApi.js";
const { proxy } = getCurrentInstance() //proxy事件源
const internalInstance = getCurrentInstance()//调用事件总线上的bus
const { $bus } = internalInstance.appContext.config.globalProperties//调用事件总线上的bus
let currentMeteoIndex = ref(null)//展示单独组件
let selectedLists = ref([])// 选中的展开模块
let meteoList = ref([
    {
        "name": "温度",
        "title": "温度",
        "id": "NAFP-TEM",
        "type": "grid",
        "element": "TEM",
        "showText": true,
        "icon": "left_wendu",
        "legendData": {
            "legend": [
                [-36, [128, 0, 124]],
                [-32, [0, 47, 134]],
                [-28, [26, 92, 166]],
                [-24, [32, 117, 210]],
                [-20, [60, 160, 240]],
                [-16, [117, 207, 255]],
                [-12, [151, 255, 244]],
                [-8, [189, 249, 255]],
                [-4, [242, 255, 255]],
                [0, [223, 255, 217]],
                [4, [196, 255, 183]],
                [8, [186, 254, 131]],
                [12, [252, 254, 156]],
                [16, [255, 243, 196]],
                [20, [255, 220, 168]],
                [24, [255, 175, 117]],
                [28, [253, 135, 132]],
                [32, [236, 91, 95]],
                [35, [255, 51, 51]],
                [37, [201, 1, 1]],
                [40, [153, 51, 1]],
                [100, [71, 14, 0, 0]]
            ]
        },
        "opacity": 0.8,
        "showHide": true,
        "radio": 2,
        "zIndex": 10,
        "normalize": false
    }, {
        "name": "风场",
        "title": "风场",
        "id": "NAFP-BARB",
        "type": "barb",
        "showText": true,
        "element": "WIN",
        "legendData": {
            "barbImg": "/pic/windLine/windy.png",
            "legend": [
                [0, [189, 249, 255]],
                [2, [242, 255, 255]],
                [4, [223, 255, 217]],
                [6, [196, 255, 183]],
                [8, [186, 254, 131]],
                [10, [252, 254, 156]],
                [12, [255, 243, 196]],
                [14, [255, 220, 168]],
                [16, [255, 175, 117]],
                [20, [253, 135, 132]],
                [22, [236, 91, 95]],
                [24, [255, 51, 51]]
            ]
        },
        "icon": "left_wendu",
        "opacity": 0.9,
        "showHide": true,
        "radio": 2,
        "scale": 100,
        "zIndex": 100,
        "nodata": -9990,
        "typeColor": "black",
        "distanceArrow": 80
    }, {
        "name": "风流场",
        "title": "风流场",
        "id": "NAFP-WIN",
        "type": "flow",
        "element": "windStream",
        "legendData": {
            "scala": 10,
            "numParticles": 5000,
            "fadeOpacity": 0.98,
            "speedFactor": 0.99,
            "dropRate": 0.01,
            "dropRateBump": 0.01,
            "factor": 10
        },
        "icon": "left_wendu",
        "opacity": 1,
        "showHide": true,
        "zIndex": 100
    },
])//当前所展示的气象要素
watch(
    () => store.dateTiem,
    (newVal, oldVal) => {
        console.log(newVal, "当前时间");
    },
);
// 初始化生命周期
onMounted(() => {
    onReloadSingleLayers()
})

// 执行不同类型图层添加方法
let addlayers = (values) => {
    if (currentMeteoIndex.value) {
        emptylayers()//清空图层
    }
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    map.forEach(function (item, index) {
        // 获取需要加载图层的url
        mockApi.layersAll({
            projection: item.getView().getProjection().code_,//投影
            element: values.element,//要素
        }).then((res) => {
            console.log(res, "res")
            currentMeteoIndex.value = values.id;
            console.log('values ==>', values);
            if (values.type == "grid") {
                console.log("单要素图层", values);
                proxy.$refs.GridRender.addLayer(item, res.data[0].url, values)//传入map，传入url
            } else if (values.type == "barb") {
                console.log("风向杆图层", values);
                proxy.$refs.WindyBarb.addLayer(item, res.data[0].url, values)//传入map，传入url
            } else if (values.type == "flow") {
                console.log("风流场图层", values);
                proxy.$refs.WindyStream.addLayer(item, res.data[0].url, values)//传入map，传入url
            }

            nextTick(() => {
                // 全局记录所有的图层数据
                store.mapLayersObj = [values]
            });
        })
    });



}
// 清空图层
let emptylayers = () => {
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    map.forEach(function (item, index) {
        const mapLayers = item.getAllLayers();
        mapLayers.forEach((datas) => {
            if (datas.values_.layerName) {
                item.removeLayer(datas);//删除图层
                datas._remove()//释放底层数据
            }
        });
        store.mapLayersObj = []
    });


};
// 重新加载单个图层
let reloadSingleLayers = (item) => {
    deleteSingleLayer(item.id); //传入图层id进行删除
    nextTick(() => {
        addlayers(item); //进行重新渲染
    });
};
// 删除单张图层
let deleteSingleLayer = (id) => {
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    map.forEach(function (item, index) {
        const mapLayers = item.getAllLayers()
        mapLayers.map((datas) => {
            if (datas.values_.layerName == id) {
                item.removeLayer(datas)
                datas._remove()//释放底层数据
            }
        })
        let layerLists = store.mapLayersObj.filter(datas => datas.id != id)
        if (layerLists.legend > 0) {
            store.mapLayersObj = [layerLists]
        } else {
            store.mapLayersObj = []
        }
    });

}
// 挂载全局事件
let onReloadSingleLayers = () => {
    $bus.on("reloadSingleLayers", (item) => { reloadSingleLayers(item) });
}
</script>

<style lang="scss">
.meteoDataList {
    padding: 10.0032px 0;
    width: 32.0064px;
    border-radius: 25px;
    background: rgba(28, 41, 84, 0.6);
    justify-content: flex-start;
    align-items: center;
    display: flex;
    flex-direction: column;

    .infoList {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 32.0064px;
        height: 32.0064px;
    }

    .active {
        background: rgba(137, 110, 255, 1);
        border-radius: 24px;
    }

    .text {
        text-shadow: -1px 0 rgb(255 255 255), 0 1px rgb(255, 255, 255), 1px 0 rgb(255, 255, 255), 0 -1px rgb(255, 255, 255);
        color: #5d6ab4;
        font-weight: 600;
        font-size: 13.9968px;
        font-family: AlibabaPuHuiTi_2_55_Regular;
        position: absolute;
        top: 50%;
        transform: translate(-110%, -50%);
        left: 0;
        white-space: nowrap;
    }
}
</style>
