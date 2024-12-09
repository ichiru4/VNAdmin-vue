<template>
    <el-container class="layout">
        <el-aside>
            <div class="aside-box">
                <div class="logo">
                    <img class="logo-img" src="@/assets/logo.svg" alt="">
                    <span class="logo-text">{{ title }}</span>
                </div>
                <el-scrollbar>
                    <el-menu :router="false" :defalut-active="activeMenu" :collapse="isCollapse"
                        :unique-opened="accordion" :collapse-transition="false">
                        <Submenu :menu-list="menuList" />
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-container>
            <el-header>
                <ToolBarLeft />
                <ToolBarRight />
            </el-header>
            <Main />
        </el-container>
    </el-container>

</template>

<script setup lang="ts">
import ToolBarRight from '../component/Header/ToolBarRight.vue';
import Main from '@/layouts/Main/index.vue'
import { useMenuStore } from '@/stores/useMenuStore';
import Submenu from '../component/Menu/Submenu.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@/stores/useGlobalStore'
import ToolBarLeft from '../component/Header/ToolBarLeft.vue';
const route = useRoute();
const authStore = useMenuStore();
const globalStore = useGlobalStore();
const isCollapse = computed(()=>globalStore.isCollapse)
const accordion = computed(()=>globalStore.accordion)
const menuList = computed(()=>authStore.showMenuListGet)
const activeMenu = computed(()=>(route.meta.activeMenu?route.meta.activeMenu:route.path)as string)
const title = 'VN-Admin'
</script>

<style scoped lang="scss">
@use './index.scss';
</style>