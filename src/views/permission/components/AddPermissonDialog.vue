<template>
    <div>
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" align-center="true">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addFormRef">
                <el-form-item prop="Mid" label="父级菜单" width sortable>
                    <div class="m-4">
                        <el-cascader v-model="addForm.Pid" :options="options" clearable filterable
                            :props="{ checkStrictly: true, }" :placeholder="isIndex?'主目录':'请选择父级菜单'" :disabled="isIndex" />
                    </div>
                </el-form-item>
                <el-form-item label="菜单名称" prop="Name">
                    <el-input v-model="addForm.Name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="菜单类型">
                    <el-radio-group @change="clkType" v-model="addForm.MenuType">
                        <el-radio label="目录"></el-radio>
                        <el-radio label="菜单"></el-radio>
                        <el-radio label="按钮"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item prop="Code" v-if="codeVisible">
                    <template #label>
                        <div style="display: flex; align-items: center;text-wrap: nowrap;">
                            <el-icon class="icon-question" style="margin-right: 5px;">
                                <el-tooltip placement="left"
                                    content="<div>如果是目录，默认路由地址为'-'<br />如果是按钮，默认为空格<br />如果是外链，请带上协议，比如 https://www.baidu.com<br /></div>"
                                    raw-content>
                                    <QuestionFilled />
                                </el-tooltip>
                            </el-icon>
                            路由地址
                        </div>
                    </template>
                    <el-input v-model="addForm.Code"  auto-complete="off"
                        placeholder="请输入路由地址"></el-input>
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
                <el-form-item label="按钮事件" prop="Func" v-if="isButton">
                    <el-input v-model="addForm.Func" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="IsHide" label="是否隐藏" width sortable>
                    <el-switch v-model="addForm.IsHide"></el-switch>
                </el-form-item>
                <el-form-item prop="IskeepAlive" label="keepAlive" width sortable>
                    <el-switch v-model="addForm.IskeepAlive"></el-switch>
                </el-form-item>
                <!-- TODO: 菜单图标,API接口 -->
                <!-- <el-form-item prop="Mid" label="API接口" width sortable>
                    <el-select style="width: 100%" v-model="addForm.Mid" placeholder="请选择API">
                        <el-option :key="0" :value="0" :label="'无需api'"></el-option>
                        <el-option v-for="item in modules" :key="item.Id" :value="item.Id" :label="item.LinkUrl">
                            <span style="float: left">{{ item.LinkUrl }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{
                                item.Name
                            }}</span>
                        </el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" >提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/useMenuStore';
import { addForm } from '../permissonFunction';
import { mapTree } from '@/utils/TreeMapper';
import { ref } from 'vue';
import { ElMessage, type ElForm } from 'element-plus';
import { addPermisson } from '@/api/permissionApi';
const addFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const addFormVisible = ref(false);
const codeVisible = ref(false);
const isButton = ref(false);
const handleAdd = () => 
{
    options.value = [];
    addFormRef.value?.resetFields();
    addForm.Pid = "0";
    console.log("clear form")
    addForm.MenuType = '目录'
    addFormVisible.value = true;
    clkType();
    options.value = mapTree(menu, mapToOptionsMenu, false);
}
const authStore = useMenuStore();
//对话框表单
const clkType = () => {
    addFormRef.value?.resetFields();
    isIndex.value = addForm.MenuType === '目录';
    codeVisible.value = addForm.MenuType === '菜单';
    isButton.value = addForm.MenuType === '按钮';
}

const menu = authStore.authMenuListGet;
//级联选择器
const isIndex = ref(true);
interface optionsMenu {
    value: string;
    label: string;
    children?: optionsMenu[];
}
const mapToOptionsMenu = (item: Menu.MenuOption): optionsMenu => ({
    value: item.id,
    label: item.name,
})
const options = ref();
//提交
const addSubmit =async () =>{
    if(addForm.MenuType === '目录'){
        addForm.Code = '-';
    };
    if(addForm.MenuType === '按钮'){
        addForm.Code = ' ';
        addForm.IsButton = true;
    };
    addForm.Pid=addForm.Pid[addForm.Pid.length-1]
    const response =  await addPermisson(addForm);
    if(response.success){
        ElMessage.success('添加成功');
    }else{
        ElMessage.error('添加失败');
    }
    console.log(response);
}

defineExpose({ handleAdd });  
</script>

<style scoped></style>