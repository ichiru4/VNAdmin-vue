<template>
    <div class="tab-container">
        <el-tabs v-model="tabsMenuValue" type="card" class="demo-tabs" @tab-click="handleClick"
            @tab-remove="handleRemove">
            <el-tab-pane v-for="item in tabMenuList" :closable="item.close" :key="item.path" :name="item.path"
                :label="item.title">
                <template #label>
                    <RightClickMenu>
                        <template #default>
                            <div class="tab-title">
                                <el-icon v-show="item.icon && tabsIcon">
                                    <component :is="item.icon"></component>
                                </el-icon>
                                {{ item.title }}

                            </div>
                        </template>
                    </RightClickMenu>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script setup lang="ts">
import type { TabsMenuProps } from '@/stores/interface';
import { useTabStore } from '@/stores/modules/tab';
import { useGlobalStore } from '@/stores/useGlobalStore';
import { useKeepAliveStore } from '@/stores/useKeepAliveStore';
import { useMenuStore } from '@/stores/useMenuStore';
import type { TabPaneName, TabsPaneContext } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RightClickMenu from './components/RightClickMenu.vue';
const tabsMenuValue = ref('');
const globalStore = useGlobalStore()
const tabStore = useTabStore()
const tabMenuList = computed(() => tabStore.tabMenuList)
const tabsIcon = computed(() => globalStore.tabsIcon)
const router = useRouter()
const keepAliveStore = useKeepAliveStore();
const handleClick = (tab: TabsPaneContext) => {
    const fullPath = tab.props.name as string
    router.push(fullPath);
}
const authStore = useMenuStore()
const route = useRoute()
const handleRemove = (fullPath: TabPaneName) => {
    const name = tabStore.tabMenuList.filter(item => item.path === fullPath)[0].name || ''
    keepAliveStore.removeKeepAlive(name);
    tabStore.removeTabs(fullPath as string, fullPath == route.fullPath)
}

onMounted(() => {
    //  initTab();
})
watch(() => route.fullPath, () => {
    if (route.meta.isFull) {
    };
    tabsMenuValue.value = route.fullPath;
    const tabparam = {
        icon: route.meta.icon as string,
        title: route.meta.title as string,
        path: route.fullPath,
        name: route.name as string,
        close: route.path != '/'
    }
    tabStore.addTabs(tabparam)
    route.meta.isKeepAlive && keepAliveStore.addKeepAlive(route.name as string)
}, { immediate: true });

const initTab = () => {
    authStore.flatMenuListGet.forEach(item => {
        if (!item.IsButton) {
            const tabParam = {
                icon: item.meta.icon as string,
                title: item.meta.title as string,
                path: item.path as string,
                name: item.name as string,
                close: route.path != '/'
            };
            tabStore.addTabs(tabParam as TabsMenuProps)
        }
    })
}
</script>

<style scoped>
.tab-title {
    width: 100%;
    height: 100%;
}

/* */
</style>