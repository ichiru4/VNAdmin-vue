<template>
    <template v-for="subItem in menuList" :key="subItem.name">
        <el-sub-menu v-if="subItem.children?.length" :index="subItem.name" style="color:black"
        >
            <template #title>
                <el-icon>
                    <component :is="'HomeFilled'"></component>
                </el-icon>
                <span class="sle">{{ subItem.meta.title }}</span>
            </template>
            <Submenu :menu-list="subItem.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="subItem.path"  @click="handleClickMenu(subItem)">
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
import { ref } from "vue";
import { useRouter } from "vue-router";
defineProps<{ menuList: Menu.MenuOption[] }>();
const router = useRouter();
const activeMenu = ref<string | null>(null); // 用于存储当前激活的菜单项
const handleClickMenu = (subItem: Menu.MenuOption) => {
    if (subItem.meta.isLink)return window.open(subItem.meta.isLink, "_blank");
    activeMenu.value = subItem.path;

    router.push(subItem.path);
};
</script>
<style scoped>

</style>
