<template>
    <el-col v-if="buttonList != null && buttonList.length > 0" :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" @submit.prevent>
            <el-form-item>
                <el-input v-model="searchVal" clearable placeholder="请输入内容">
                </el-input>
            </el-form-item>
            <el-form-item v-for="item in buttonList" :key="item.id">
                <el-button :type="item.Func && (/handleDel|stop/i.test(item.Func) ? 'danger' : 'primary')"
                    v-if="!item.IsHide" @click="callFunc(item)"> {{ item.name }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus';
import emmitter from '@/utils/mittBusT';
import { defineProps, ref, toRaw} from 'vue'
const props = defineProps<{buttonList:Menu.MenuOption[]}>()
const searchVal = ref('')   
const callFunc =(item:Menu.MenuOption)=>{
    const rawItem = toRaw(item);
    rawItem.search = searchVal.value;
    emmitter.emit("callFunction", rawItem)
}
</script>

<style scoped>
</style>