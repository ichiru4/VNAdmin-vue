<template>
    <div class="theme">
        <el-icon color="#777575" class="no-inherit" :size="20" style="vertical-align: middle" @click="openDrawer"><Setting /></el-icon>
    </div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus';

const openDrawer = () => {
    mittBus.emit("openThemeDrawer")
}
</script>

<style scoped></style>