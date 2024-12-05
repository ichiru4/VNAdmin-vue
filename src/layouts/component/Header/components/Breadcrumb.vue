<template>
    <div class="breadcrumb">
        <el-breadcrumb separator-icon="ArrowRight">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
                    <div class="breadcrumb-item" @click="onBreadcrumbClick(item, index)">
                        <el-icon v-show="item.meta.title && globalStore.breadcrumbIcon" class="icon">
                            <component :is="item.meta.icon ? item.meta.icon : item.iconCls"></component>
                        </el-icon>
                        <span class="breadcrumb-item-title">{{ item.meta.title }}</span>
                    </div>

                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>

    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/useGlobalStore';
import { useMenuStore } from '@/stores/useMenuStore';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const globalStore = useGlobalStore();
const route = useRoute();
const router = useRouter();
const authStore = useMenuStore();
const breadcrumbList = computed(() => {
    let breadcrumbData = authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? [];
    if (breadcrumbData[0].path !== '/') {
       breadcrumbData= [{ path: '/', meta: { icon: "HomeFilled", title: "首页" }},...breadcrumbData]
    }
    return breadcrumbData;
})  

const onBreadcrumbClick = (item: Menu.MenuOption, index: number) => {
    if (index < breadcrumbList.value.length - 2)
        router.push(item.path)
}
</script>

<style scoped>
.breadcrumb {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-direction: row;
}

.el-breadcrumb {
    height: 100%;
}

.el-breadcrumb__item {

    height: 100%;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 2px;
    width: 100%;
    height: 100%;
}

.el-breadcrumb__item::v-deep(.el-breadcrumb__inner) {
    height: 100%
}

.icon {
    height: 100%;
}

.breadcrumb-item-title {
    height: 100%;
    display: flex;
    align-items: center;
}
</style>