<template>
    <div class="assign-container">
        <el-card class="role-card" body-style="padding: 0">
            <template #header>
                <div class="clearfix">
                    <span>权限</span>
                    <el-button style="float: right; " :disabled="refreshBtnDisabled" @click="refresh">
                        刷新
                    </el-button>
                </div>
            </template>
            <div class="role-list">
                <p v-for="role in roles" :key="role.Id" @click="operate(role.Id)"
                    :class="{ active: role.Id === operateRoleId }" class="role-item">{{ role.Name }}</p>
            </div>
        </el-card>

        <el-card class="permission-card">
            <template #header>
                <div class="clearfix">
                    <span>菜单</span>
                    <el-button @click="saveAssign" style="float: right;color:dodgerblue; ">
                        保存
                    </el-button>
                </div>
            </template>
            <el-tree :data="data" show-checkbox ref="treeRef" node-key="id" :default-expand-all="true">
                <template #default="{ node, data }">
                    <span class="custom-tree-node">
                        <span>{{ node.label }}</span> <!-- 假设每个节点有一个 label 属性 -->
                        <span>
                            <el-checkbox-group v-model="assignBtns">
                                <el-checkbox v-if="data.buttons != null" v-for="btn in data.buttons"
                                    :value="btn.id.toString()">
                                    {{ btn.label }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </span>
                    </span>
                </template>
            </el-tree>
        </el-card>
    </div>


</template>

<script setup lang="ts">
import { getAllRoles, type RoleResponse } from '@/api/roleApi';
import { computed, onMounted, ref } from 'vue';
import { assignPermissons, getPermissonsList, getPermissonsListByRoleId, getPermissonsListWithNoButton, type AssignRequest, type permissionList } from '@/api/permissionApi';
import { ElMessage } from 'element-plus';

const operateRoleId = ref<string | null>(null)
const roles = ref<RoleResponse[]>();
const data = ref<permissionList>();
const data1 = ref<permissionList>();
const treeRef = ref<any>();
const refreshBtnDisabled = ref(false);
const assignBtns = ref<string[]>([]);
const operate = (roleId: string) => {
    if (roleId === operateRoleId.value) {
    } else {
        operateRoleId.value = roleId;
        getPermissonId();
    }
}

const getPermissonId = async () => {
    if (operateRoleId.value) {
        const response = await getPermissonsListByRoleId(operateRoleId.value)
        treeRef.value.setCheckedKeys(response.response.id);
        console.log(response.response.id)
        assignBtns.value = response.response.btnId;
    }
}

const refresh = async () => {
    //TODO 刷新按钮禁用 后端接口防刷

    operateRoleId.value = null;
    treeRef.value.setCheckedKeys([]);
    assignBtns.value = [];
    handleQuery();

}

const saveAssign = async () => {
    const checkedKeys = treeRef.value.getCheckedKeys();
    const checkedBtns = assignBtns.value;
    const checkedPermissons = [...checkedKeys, ...checkedBtns];

    const para = { pids: checkedPermissons, rid: operateRoleId.value }
    if (para.pids && para.rid) {
        const postData: AssignRequest = {
            pids: para.pids,
            rid: para.rid,
        }
        const response = await assignPermissons(postData);
        if (response.success) {
            ElMessage.success('保存成功')
        } else {
            ElMessage.error('保存失败')
        }
    }

}

const handleQuery = async () => {
    const res = await getAllRoles();
    roles.value = res.response;

    const response = await getPermissonsListWithNoButton();
    data1.value = response.response;
    data.value = JSON.parse(JSON.stringify(data1.value));

}
onMounted(async () => {
    handleQuery()
})

</script>

<style scoped>
.assign-container {
    width: 100%;
    display: flex;
    gap: 40px;
    /* padding-left:20px; */
    padding-right: 40px;

}

.role-card {
    flex: 3;
}

.role-list {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    gap: 10px;
    padding: 20px;
    min-height: 400px;
}

.permission-card {
    flex: 7;
}

.custom-tree-node {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.clearfix {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -5px;
    margin-bottom: -5px;
}

.active {
    background-color: rgb(243, 249, 255);
}

.role-item {
    cursor: pointer;
    padding: 10px;
    border-radius: 30px;
    padding-left: 30px;
}
</style>