<template>
    <div>
        <section>
            <Toolbar :button-list="buttonList"></Toolbar>
        </section>
        <AddPermissonDialog ref="addPermissonRef" />
        <el-table :data="tableData" row-key="id">
            <el-table-column type="selection" width="55" />
            <el-table-column :prop="Object.keys(item)[index + 1]" :label="Object.keys(item)[index + 1]"
                v-for="(item, index) in tableData" />
        </el-table>

        <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :total="1" hide-on-single-page />
        </div>

    </div>

</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/useMenuStore';
import { getButtonList } from '@/utils';
import mittBusT from '@/utils/mittBusT';
import { ref, onMounted } from 'vue'
import Toolbar from '@/components/Toolbar.vue'
import { reactive, computed } from 'vue'
import type { ElForm } from 'element-plus';
import AddPermissonDialog from './components/AddPermissonDialog.vue';
import { mapTree } from '@/utils/TreeMapper';

const buttonList = ref<Menu.MenuOption[]>([])
const authStore = useMenuStore();
const menu = authStore.authMenuListGet
const addPermissonRef = ref<InstanceType<typeof AddPermissonDialog> | null>(null);
const handleAdd = () => {
    if (addPermissonRef.value) addPermissonRef.value.handleAdd();
}
const functionMap: Record<string, Function> = {
    'handleAdd': handleAdd
}
const callFunction = (item: Menu.MenuOption) => {
    const filters = { name: item.search };
    if (item.Func && typeof item.Func === 'string') {
        const func = functionMap[item.Func];
        if (typeof func === 'function') {
            func(filters)
        } else {
            console.error(`function ${item.Func} not in functionMap`)
        }
    } else {
        console.error(` func property is invalid`)
    }

}



//表格数据映射展示
const mapToTable = (item: Menu.MenuOption): TableData => ({
    id: item.id,
    name: item.name,
    path: item.path,
    sort: item.order,   
    isbutton:item.IsButton,
    component: item.component,
    IsButton: item.IsButton,
});

const tableData = computed(() => mapTree(menu, mapToTable))
interface TableData {
    id: string
    name: string
    path: string
    sort: number
    isbutton: boolean
    component: string | (() => Promise<unknown>) | undefined
    IsButton: boolean
    hasChildren?: boolean
    children?: TableData[]
}


// const selectable = (row: User) => ![1, 31].includes(row.id)


onMounted(async () => {
    buttonList.value = getButtonList(window.location.pathname, authStore.authMenuListGet)
    mittBusT.on('callFunction', callFunction)
})
</script>


<style scoped></style>