<!--
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-28 16:06:47
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-04-08 15:23:16
 * @FilePath: \cme\src\components\cme-base\baseMap\map2D.vue
 * @Description: map2D标签
-->
<template>
    <div class="map-wrapper" data-html2canvas-ignore>
        <div class="map" ref="mapRef"></div>
    </div>
</template>

<script setup>
import { onMounted, ref,  getCurrentInstance } from 'vue'
import maplist from '@/config/maplist.json'
import { initMap } from './mapConfig'

const props = defineProps(['view']) // view实例
const internalInstance = getCurrentInstance()//调用事件总线
const mapRef = ref(null)//地图实例

onMounted(() => {
    const maps = internalInstance?.appContext.config.globalProperties.$Map2D //事件总线map存放位置
    const data = initMap(mapRef.value, maplist[2].url, props.view) //初始化地图返回地图实例
    maps.push(data)//向事件总线上添加map地图
});

</script>

<style scoped lang="scss">
.map-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}

.map {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(28, 41, 84);
    box-sizing: border-box;
}
</style>