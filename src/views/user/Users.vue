<template>
    <section>
        <Toolbar :button-list="buttonList"></Toolbar>
    </section>
</template>

<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue';
import { useMenuStore } from '@/stores/useMenuStore';
import { getButtonList } from '@/utils';
import mittBus from '@/utils/mittBus';
import mittBusT from '@/utils/mittBusT';
import { handleError, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { handleQuery } from './userFunction';
const route = useRoute();
const router = useRouter();
const buttonList = ref<Menu.MenuOption[]>([]);
const authStore = useMenuStore();
const functionMap:Record<string, Function> = {
    'handleQuery': handleQuery
}
const callFunction = (item: Menu.MenuOption) => {
    const filters = {name:item.search};
    if(item.Func&& typeof item.Func === 'string'){
        const func = functionMap[item.Func];
        if(typeof func === 'function'){
            func(filters)
        }else{
            console.error(`function ${item.Func} not in functionMap`)
        }
    }else{
        console.error(` func property is invalid`)
    }

}

onMounted(async () => {
    buttonList.value = getButtonList(window.location.pathname, authStore.authMenuListGet)
    mittBusT.on('callFunction', callFunction)
    console.log(buttonList.value)

})

onUnmounted(() => {
    mittBusT.off('callFunction', callFunction)
})
</script>



<style scoped></style>