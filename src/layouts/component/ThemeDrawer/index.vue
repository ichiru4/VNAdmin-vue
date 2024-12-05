<template>
    <el-drawer v-model="drawerVisible" title="布局设置" size="300px">
        <el-divider class="divider" content-position="center">
            <el-icon>
                <Notification />
            </el-icon> 布局样式
        </el-divider>
        
        
        <div class="layout-style">
            <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
                <div :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]"
                    @click="setLayout('vertical')">
                    <div class="layout-dark"></div>
                    <div class="layout-container">
                        <div class="layout-light"></div>
                        <div class="layout-content">
                        </div>
                    </div>
                    <el-icon v-if="layout == 'vertical'">
                        <CircleCheckFilled />
                    </el-icon>
                </div>
            </el-tooltip>
            <el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
                <div :class="['layout-item layout-transverse', { 'is-active': layout == 'transverse' }]"
                    @click="setLayout('transverse')">
                    <div class="layout-dark"></div>
                    <div class="layout-content"></div>
                    <el-icon v-if="layout == 'transverse'">
                        <CircleCheckFilled />
                    </el-icon>
                </div>
            </el-tooltip>
        </div>
        <el-divider class="divider" content-position="center"> <el-icon>
                <Setting />
            </el-icon> 界面设置 </el-divider>
        <div class="theme-item-container">
            <div class="theme-item"> <span>菜单折叠</span> <el-switch v-model="isCollapse" /> </div>
            <div class="theme-item"> <span>菜单手风琴</span> <el-switch v-model="accordion" /> </div>
            <div class="theme-item"> <span>面包屑</span> <el-switch v-model="breadcrumb" /> </div>
            <div class="theme-item"> <span>面包屑图标</span> <el-switch v-model="breadcrumbIcon" /> </div>
            <div class="theme-item"> <span>标签栏</span> <el-switch v-model="tabs" /> </div>
            <div class="theme-item"> <span>标签栏图标</span> <el-switch v-model="tabsIcon" /> </div>
            <div class="theme-item"> <span>页脚</span> <el-switch v-model="footer" /> </div>

        </div>

    </el-drawer>
</template>

<script setup lang="ts">
import {useGlobalStore}  from '@/stores/useGlobalStore';
import mittBus from '@/utils/mittBus';
import { storeToRefs } from 'pinia';
import type { Store } from 'pinia';
import { ref } from 'vue';
const globalStore = useGlobalStore();
const { layout, isCollapse ,accordion ,breadcrumb ,breadcrumbIcon ,tabs ,tabsIcon ,footer } = storeToRefs(globalStore);
const drawerVisible = ref(false);
mittBus.on("openThemeDrawer", () => {
    drawerVisible.value = true
});
const setLayout = (type: string) => {
    if(type === 'transverse'){
        globalStore.layout = 'transverse';
    }
    if(type ==='vertical'){
        globalStore.layout ='vertical';
    }
 };

</script>

<style scoped lang="scss">
@use "./index.scss"
</style>