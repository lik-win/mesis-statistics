<template>
    <div class="layer-seting">
        <!-- 图层控制、图例控制 -->
        <div class="layer-seting-list">
            <div class="layer-seting-list-item" v-for="(layer, index) in layerLists" :key="layer.id">
                <div class="handler">
                    <span v-show="layer.showHide" @click="showHide(layer)"><el-icon color="#fff">
                            <View />
                        </el-icon></span>
                    <span v-show="!layer.showHide" @click="showHide(layer)"><el-icon color="#fff">
                            <Hide />
                        </el-icon></span>
                    <span @click="handler(layer)">
                        <el-icon color="#fff">
                            <Setting />
                        </el-icon></span>
                    <span @click="del(layer)"><el-icon color="#fff">
                            <Delete />
                        </el-icon></span>
                    <span v-show="index != 0" @click="goTop(layer, index)"><el-icon color="#fff">
                            <Top />
                        </el-icon></span>
                    <span v-show="index != (layerLists.length - 1)" @click="goBottom(layer, index)"><el-icon
                            color="#fff">
                            <Bottom />
                        </el-icon></span>
                </div>
                <ul v-if="layer.legendData && layer.legendData.legend" class="colorBar tranform">
                    <div class="legend_name">
                        <div class="name">{{ layer.name }}
                            &nbsp;
                        </div>
                    </div>
                    <li v-if="layer.radio == 1"
                        :style="{ 'position': 'absolute', 'width': '100%', 'background': `linear-gradient(to right,${layer.legendcolorlsit})` }">
                    </li>
                    <li v-for="(color, index) in layer.legendData.legend" :key="index" v-show="color[1][3] != 0">
                        <div v-if="layer.legendData.legend.length >= 0 && layer.legendData.legend.length < 10">
                            <label v-if="(color[1].length != 4 || color[1][3] != 0) && index % 1 == 0">{{ color[0]
                                }}</label>
                        </div>
                        <div v-if="layer.legendData.legend.length >= 10 && layer.legendData.legend.length < 15">
                            <label v-if="(color[1].length != 4 || color[1][3] != 0) && index % 2 == 0">{{ color[0]
                                }}</label>
                        </div>
                        <div v-if="layer.legendData.legend.length >= 15 && layer.legendData.legend.length < 20">
                            <label v-if="(color[1].length != 4 || color[1][3] != 0) && index % 3 == 0">{{ color[0]
                                }}</label>
                        </div>
                        <div v-if="layer.legendData.legend.length >= 20">
                            <label v-if="(color[1].length != 4 || color[1][3] != 0) && index % 4 == 0">{{ color[0]
                                }}</label>
                        </div>
                        <span v-show="layer.radio == 2 || !layer.radio"
                            :style="{ 'backgroundColor': `rgb(${color[1].join(',')})` }"></span>
                    </li>
                </ul>
                <ul v-else class="colorBarnone">
                    <div class="legend_name">
                        <div class="name ">{{ layer.name }}
                            &nbsp;
                        </div>
                    </div>
                </ul>


            </div>
        </div>
        <div class="handler-pop" v-show="showPop" :style="{
                'bottom': showPopBootom + 'px',
                width: '253px',
                padding: ' 0 20px',
            }">
            <h2>{{ currentLayer.name }}<label @click="closeShowPop"><el-icon>
                        <Close />
                    </el-icon></label></h2>
            <el-form ref="form">
                <el-form-item label="透明度：">
                    <el-input-number size="small" v-model="currentEle" :step="0.1" @change="handleChange" :min="0"
                        :max="1"></el-input-number>
                </el-form-item>
                <template v-if="currentLayer.type === 'grid'">
                    <el-form-item label="渲染方式" v-if="radio !== null">
                        <el-radio-group v-model="radio" @change="RenderLegend">
                            <el-radio :label=1>渐变图</el-radio>
                            <el-radio :label=2>色斑图</el-radio>
                        </el-radio-group>

                    </el-form-item>
                </template>

            </el-form>
            <div>

            </div>
        </div>
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
const emit = defineEmits(['renderLayerData'])//emit接受事件
const internalInstance = getCurrentInstance()//调用事件总线上的axios
const { $bus } = internalInstance.appContext.config.globalProperties//调用事件总线上的axios
const { proxy } = getCurrentInstance() //proxy事件源

let layerLists = ref([])  // 图层列表
let currentLayer = ref([])  // 要操作的图层
let currentEle = ref(1)   // 要操作的元素
let showPop = ref(false) //设置是否显示
let showPopBootom = ref(0)  // 设置距底部多少px
let options = ref([])  // 图例选择
let valuess = ref(null)  // 图例值
let radio = ref(null)  // 渲染方式
let datetime = ref("")  // 当前时间
let layerConfig = ref({})  // 图层中的样式配置

watch(
    () => store.mapLayersObj,
    (newVal, oldVal) => {
        showPop.value = false
        layerLists.value = newVal
        layerLists.value.forEach((item) => {
            currentEle.value = item.opacity
            if (item.legendData.legend) {
                let legendcolorlsit = [];
                item.legendData.legend.forEach((data) => {
                    const color = data[1];
                    legendcolorlsit.push(
                        `rgb(${color.slice(0, 3).join(", ")})`,
                    );
                });
                item.legendcolorlsit = legendcolorlsit;
            }
        })
    },
);

// 删除
let del = (layer) => {
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    proxy.$confirm('确定要删除' + layer.name + '吗？')
        .then(_ => {
            showPop.value = false
            map.forEach(function (item, index) {
                const mapLayers = item.getAllLayers()
                const currentLayer = []
                mapLayers.map((datas) => {
                    if (datas.values_.layerName == layer.id) {
                        currentLayer.push(datas)
                    }
                })
                for (let i = 0; i < currentLayer.length; i++) {
                    item.removeLayer(currentLayer[i])
                    currentLayer[i]._remove()//释放底层数据
                }
                layerLists.value = layerLists.value.filter(datas => datas.id != layer.id)
                if (layerLists.value.legend > 0) {
                    store.mapLayersObj = [layerLists.value]
                } else {
                    store.mapLayersObj = []
                }
            })


        })
        .catch(_ => { });
}
// 上移
let goTop = (layer, index) => {
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    map.forEach(function (item, index) {
        const mapLayers = item.getAllLayers();
        layerLists.value[index] = layerLists.value[index - 1];
        layerLists.value[index - 1] = layer;
        for (let i = 0; i < layerLists.value.length; i++) {
            for (let j = 0; j < mapLayers.length; j++) {
                if (mapLayers[j].values_.layerName == layerLists.value[i].id) {
                    mapLayers[j].setZIndex(layerLists.value.length - i)
                }
            }
        }
    });


}
// 下移
let goBottom = (layer, index) => {
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    map.forEach(function (item, index) {
        const mapLayers = item.getAllLayers()
        // 过滤掉地图底图图层
        const currentLayer = mapLayers.filter(datas => datas.className_ !== "ol-layer")
        layerLists.value[index] = layerLists.value[index + 1];
        layerLists.value[index + 1] = layer;
        for (let i = 0; i < layerLists.value.length; i++) {
            for (let j = 0; j < mapLayers.length; j++) {
                if (mapLayers[j].values_.layerName == layerLists.value[i].id) {
                    mapLayers[j].setZIndex(layerLists.value.length - i)
                }
            }
        }
    })


}
// 初始化设置
let handler = (layer) => {
    showPop.value = true
    currentLayer.value = layer
    currentEle.value = layer.opacity
    showPopBootom.value = layerLists.value.length * 35
    radio.value = layer.radio
}
// 关闭设置
let closeShowPop = () => {
    showPop.value = false
    currentLayer.value = {}
    showPopBootom.value = 0
    currentEle.value = 1
}
// 透明度控制
let handleChange = () => {
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    map.forEach(function (item, index) {
        const mapLayers = item.getAllLayers();
        const currentLayer1 = []
        mapLayers.map((datas) => {
            if (datas.values_.layerName == currentLayer.value.id) {
                currentLayer1.push(datas)
            }
        })
        for (let j = 0; j < currentLayer1.length; j++) {

            currentLayer1[j].setOpacity(currentEle.value)
        }
        currentLayer.value.Opacity = currentEle.value
    })


}
// 改变渲染方式(当前操作的图层)
let RenderLegend = () => {
    console.log(currentLayer.value);
    currentLayer.value.radio = radio.value
    $bus.emit('reloadSingleLayers', currentLayer.value)
}
// 显示隐藏
let showHide = (itemss) => {
    const obj = store.mapLayersObj
    let asd = obj.find(item => item.id === itemss.id);

    if (asd) {
        asd.showHide = !itemss.showHide
    }
    const map = internalInstance?.appContext.config.globalProperties.$Map2D;
    map.forEach(function (item, index) {
        const mapLayers = item.getAllLayers();
        const layer = mapLayers.filter((datas) => datas.values_.layerName == itemss.id)
        if (layer) {
            for (let i = 0; i < layer.length; i++) {
                layer[i].setVisible(asd.showHide)
            }
        }
    })

}
</script>

<style scoped lang="scss">
.layer-seting {

    .handler-pop {
        position: absolute;
        bottom: 0;
        right: 0;
        background: #fff;
        border-radius: 11px;
    }

    h2 {
        line-height: 30.0096px;
        color: #000;
        font-size: 13.9968px;
        border-bottom: .9984px solid #fff;
        position: relative;

        label {
            position: absolute;
            right: 10.0032px;
            top: 0px;
            cursor: pointer;
        }
    }

    .layer-seting-list-item {
        margin-bottom: 4.992px
            /* 5/192 */
        ;
        display: flex;
        height: 18px;
        flex-direction: column;
        cursor: pointer;
        border-radius: 10.0032px;
        font-size: .0833rem;
        align-items: center;
        padding-bottom: 4.992px;
        position: relative;

        &:hover {
            .tranform {
                transform: translateX(-100px);
            }
        }

        .handler {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            align-items: center;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 24.9984px;
            font-size: 18px
                /* 18/192 */
            ;

            span {
                width: 18px;
                height: 18px;
                text-align: center;
                line-height: 24.9984px;
                border-radius: 20.0064px;
                background: rgba(125, 125, 125, 0.3);
                margin: 0 1.9968px;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;

                .el-icon {
                    font-size: 16px;
                }


            }
        }



        .colorBar {
            position: relative;
            display: flex;
            justify-content: flex-end;
            margin: 0;
            align-items: center;
            transition: all .5s;
            height: 30px;
            width: 493.9968px;

            .legend_name {
                position: absolute;
                top: 50%;
                transform: translate(-110%, -50%);
                left: 0;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: #000000;
                text-shadow: 0 1.9968px 8.0064px rgba(0, 0, 0, 0.7);
                white-space: nowrap;

                .name {
                    color: #FFFFFF !important;
                    font-size: 12.9984px
                        /* 13/192 */
                    ;
                    text-shadow: 0 1.9968px
                        /* 2/192 */
                        8.0064px
                        /* 8/192 */
                        rgba(0, 0, 0, 0.7);
                }

                .datetime {
                    color: #FFFFFF !important;

                    font-size: 12.9984px
                        /* 13/192 */
                    ;
                    text-shadow: 0 1.9968px
                        /* 2/192 */
                        8.0064px
                        /* 8/192 */
                        rgba(0, 0, 0, 0.7);
                }
            }

            li {

                flex: 1;
                position: relative;
                height: 100%;
                // width: 49.9968px;
                border-radius: 1.9968px;

                label {
                    position: absolute;
                    left: 1.9968px;
                    top: .4992px;
                    font-size: 12.9984px;
                    color: #000000;
                    text-shadow: -0.9984px 0 white, 0 .9984px white, .9984px 0 white, 0 -0.9984px white;
                    z-index: 10;
                }

                .svg-label {
                    left: 22.9248px;
                    top: 12.0192px;
                    font-size: 12.9984px;
                    width: 96px;
                }

                span {
                    // height: 20px;
                    height: 100%;
                    display: block;
                    box-sizing: content-box !important;
                }
            }

            li:first-child {
                span {
                    border-radius: 20.0064px 0 0 20.0064px;
                    background-color: #fff;
                }
            }

            li:last-child {
                span {
                    border-radius: 0 20.0064px 20.0064px 0;
                }
            }

            li:first-child {
                span {
                    border-radius: 20.0064px 0 0 20.0064px;
                    background-color: #fff;
                }
            }
        }

        .colorBarnone {
            position: relative;
            margin: 0;
            height: 18px;

            .legend_name {
                position: absolute;
                top: 47%;
                transform: translate(-110%, -50%);
                right: 18px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: #000000;
                text-shadow: 0 1.9968px 8.0064px rgba(0, 0, 0, 0.7);
                white-space: nowrap;

                .name {
                    color: #FFFFFF !important;
                    font-size: 12.9984px
                        /* 13/192 */
                    ;
                    text-shadow: 0 1.9968px
                        /* 2/192 */
                        8.0064px
                        /* 8/192 */
                        rgba(0, 0, 0, 0.7);
                }

                .datetime {
                    color: #FFFFFF !important;

                    font-size: 12.9984px
                        /* 13/192 */
                    ;
                    text-shadow: 0 1.9968px
                        /* 2/192 */
                        8.0064px
                        /* 8/192 */
                        rgba(0, 0, 0, 0.7);
                }
            }
        }
    }

    .name {
        font-size: 16px;
    }
}
</style>
