<template>
    <div>
        <section>
            <Toolbar :button-list="buttonList"></Toolbar>
        </section>
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addFormRef">
                <el-form-item label="菜单名称" prop="Name">
                    <el-input v-model="addForm.Name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="菜单类型">
                    <el-radio-group @change="clkType" v-model="addForm.MenuType">
                        <el-radio label="目录"></el-radio>
                        <el-radio label="页面"></el-radio>
                        <el-radio label="按钮"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="路由地址" prop="Code">
                    <el-tooltip placement="top"
                        content="<div>如果是目录，请填‘-’字符<br />如果是按钮，请输入空格即可<br />如果是外链，请带上协议，比如 https://www.baidu.com<br /></div>"
                        raw-content>
                        <el-input v-model="addForm.Code" :disabled="addCodeDisabled" auto-complete="off"></el-input>
                    </el-tooltip>

                </el-form-item>
                <el-form-item label="描述" prop="Description">
                    <el-input v-model="addForm.Description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="Enabled">
                    <el-select v-model="addForm.Enabled" placeholder="请选择状态">
                        <el-option label="激活" :value="true"></el-option>
                        <el-option label="禁用" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="OrderSort">
                    <el-input v-model="addForm.OrderSort" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="IsButton" label="是否按钮" width sortable>
                    <el-switch v-model="addForm.IsButton"></el-switch>
                </el-form-item>
                <el-form-item label="按钮事件" prop="Func">
                    <el-input v-model="addForm.Func" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="IsHide" label="隐藏菜单" width sortable>
                    <el-switch v-model="addForm.IsHide"></el-switch>
                </el-form-item>
                <el-form-item prop="IskeepAlive" label="keepAlive" width sortable>
                    <el-switch v-model="addForm.IskeepAlive"></el-switch>
                </el-form-item>
                <el-form-item prop="PidArr" v-if="options && options.length > 0" label="父级菜单" width sortable>
                    <el-cascader placeholder="请选择，支持搜索功能" style="width: 400px" v-model="addForm.PidArr"
                        :options="options" filterable :key="isResouceShow"
                        :props="{ checkStrictly: true, expandTrigger: 'hover' }" v-if="!editLoading"></el-cascader>
                    <el-cascader placeholder="加载中..." style="width: 400px" v-if="editLoading"></el-cascader>
                </el-form-item>

                <el-form-item prop="Mid" label="API接口" width sortable>
                    <el-select style="width: 100%" v-model="addForm.Mid" placeholder="请选择API">
                        <el-option :key="0" :value="0" :label="'无需api'"></el-option>
                        <el-option v-for="item in modules" :key="item.Id" :value="item.Id" :label="item.LinkUrl">
                            <span style="float: left">{{ item.LinkUrl }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{
                                item.Name
                                }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/useMenuStore';
import { getButtonList } from '@/utils';
import mittBusT from '@/utils/mittBusT';
import { ref, onMounted } from 'vue'
import Toolbar from '@/components/Toolbar.vue'
import { addForm } from './permissonFunction';
const buttonList = ref<Menu.MenuOption[]>([])
const authStore = useMenuStore();
const addFormVisible = ref(false);

const handleAdd = () => {
    addFormVisible.value = true;
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

onMounted(async () => {
    buttonList.value = getButtonList(window.location.pathname, authStore.authMenuListGet)
    mittBusT.on('callFunction', callFunction)
    console.log(buttonList.value)

})
</script>


<style scoped></style>