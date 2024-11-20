<template>
    <div class="header-page">
        <div class="nav-panel">
            <ul>
                <li :class="{ 'current': item.path == curNav }" v-for="(item, index) in navList" :key="index"
                    @click="navHandle(item)">{{ item.meta.title }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
const navList = ref([]);
const curNav = ref();

onMounted(() => {
    navList.value = router.options.routes
    curNav.value = route.path
});

/**
 * 导航点击事件
 * @item 导航数据
 * */
const navHandle = (item) => {
    curNav.value = item.path;
    router.push(item.path);
};
</script>

<style scoped lang="scss">
.header-page {
    width: 100%;
    background-color: #282E39;
    height: 100%;
    color: #FFFFFF;
    padding-right: 20px;
    line-height: 50px;

    .nav-panel {
        ul {
            display: flex;
            justify-content: center;

            li {
                padding: 0 58px;
                border-right: 1px solid #444D5D;
                position: relative;
                cursor: pointer;

                &:first-child {
                    border-left: 1px solid #444D5D;
                }

                &.current,
                &:hover {
                    background: #444D5D;

                    &::after {
                        content: '';
                        width: 100%;
                        height: 5px;
                        background: #1E6CEB;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }
            }

        }
    }
}
</style>