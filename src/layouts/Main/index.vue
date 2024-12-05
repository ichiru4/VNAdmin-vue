<template>
    <Tab v-if="tabs"/>
    <el-main>
        <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
                <KeepAlive :include="keepAliveName">
                    <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
                </KeepAlive>
            </transition>
        </router-view>
    </el-main>
    <el-footer v-if="footer">
        <div>footer</div>
    </el-footer>

</template>

<script setup lang="ts">
import { useKeepAliveStore } from '@/stores/useKeepAliveStore';
import { storeToRefs } from 'pinia';
import { computed, provide, ref } from 'vue'
import Tab from '@/layouts/component/Tab/index.vue'
import { useGlobalStore } from '@/stores/useGlobalStore';
const isRouterShow = ref(true)
const globalStore = useGlobalStore()
const {tabs} = storeToRefs(globalStore)
const keepAliveStore = useKeepAliveStore()
const { keepAliveName } = storeToRefs(keepAliveStore)
const {footer} = storeToRefs(globalStore)
const refreshCurrentPage = (val: boolean) => {
    isRouterShow.value = val
}
provide("refresh", refreshCurrentPage)

</script>

<style scoped></style>