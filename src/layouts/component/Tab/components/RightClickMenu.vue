<template>
    <el-dropdown trigger="contextmenu">
        <slot></slot>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :icon="Plus" @click="closeCurrent">关闭当前</el-dropdown-item>
                <el-dropdown-item :icon="CircleCheck" @click="refresh">刷新</el-dropdown-item>

                <el-dropdown-item :icon="CirclePlusFilled"
                @click="closeLeft">
                    关闭左侧
                </el-dropdown-item>
                <el-dropdown-item :icon="CirclePlus" @click="closeRight">关闭右侧</el-dropdown-item>
                <el-dropdown-item :icon="Check" @click="closeOther">关闭其他</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import {
    ArrowDown,
    Check,
    CircleCheck,
    CirclePlus,
    CirclePlusFilled,
    Plus,
} from '@element-plus/icons-vue'

const closeCurrent = () => {
}

const refresh = ()=>{

}

const closeLeft = ()=>{

}

const closeRight = ()=>{

}

const closeOther = ()=>{
    
}
</script>

<style scoped></style>