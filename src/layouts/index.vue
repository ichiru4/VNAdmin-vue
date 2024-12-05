<template>
 <component :is="LayoutComponents[layout as LayoutType]" ></component>
 <ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import type { Component } from 'vue';
import ThemeDrawer from "./component/ThemeDrawer/index.vue"
import type { LayoutType } from '@/stores/interface/index';
import LayoutVertical from "./LayoutVertical/index.vue"
import LayoutTransverse from "./LayoutTransverse/index.vue"
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/useGlobalStore';
const LayoutComponents :Record<LayoutType,Component>={
    vertical: LayoutVertical,
    transverse: LayoutTransverse
}
const {layout} = storeToRefs(useGlobalStore())
</script>

<style scoped>

</style>