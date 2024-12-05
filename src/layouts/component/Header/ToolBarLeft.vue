<template>
    <div class="tool-bar-left">
        <CollapseIcon />
        <Breadcrumb v-if="globalStore.breadcrumb" />
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/useGlobalStore';
import Breadcrumb from './components/Breadcrumb.vue';
import CollapseIcon from './components/CollapseIcon.vue';
const globalStore = useGlobalStore();

</script>

<style scoped>
.tool-bar-left {
    display: flex;
    flex: 0 0 auto;
}
</style>