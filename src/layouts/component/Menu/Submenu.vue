<template>
    <template v-for="subItem in menuList" :key="subItem.name">
        <el-sub-menu v-if="subItem.children?.length" :index="subItem.name">
            <template #title>
                <el-icon>
                    <component :is="'HomeFilled'"></component>
                </el-icon>
                <span class="sle">{{ subItem.meta.title }}</span>
            </template>
            <Submenu :menu-list="subItem.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
            <el-icon>
                <component :is="'Menu'"></component>
            </el-icon>
            <template #title>
                <span class="sle">{{ subItem.meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
defineProps<{ menuList: Menu.MenuOption[] }>();
const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOption) => {
    if (subItem.meta.isLink)return window.open(subItem.meta.isLink, "_blank");
    router.push(subItem.path);
};
</script>
