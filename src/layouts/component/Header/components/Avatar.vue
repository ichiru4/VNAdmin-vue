<template>
    <el-dropdown trigger="click">
        <div class="avatar">
            <img src="@/assets/images/avatar.jpg" alt="">

        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="openDialog('infoRef')">
                    <el-icon>
                        <User />
                    </el-icon>个人信息
                </el-dropdown-item>
                <el-dropdown-item @click="openDialog('passwordRef')"> <el-icon>
                        <Edit />
                    </el-icon>修改密码
                </el-dropdown-item>
                <el-dropdown-item divided @click="logout"> <el-icon>
                        <SwitchButton />
                    </el-icon>退出登录
                </el-dropdown-item> </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { useTabStore } from '@/stores/modules/tab';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InfoDialog from './InfoDialog.vue';
import PasswordDialog from './PasswordDialog.vue';
const router = useRouter()
const infoRef = ref<InstanceType<typeof InfoDialog> | null>(null)
const passwordRef = ref<InstanceType<typeof PasswordDialog> | null>(null)
const openDialog = (ref: string) => {
    if (ref === 'infoRef') infoRef.value?.openDialog();
    if (ref === 'passwordRef') passwordRef.value?.openDialog();
}
const tabStore = useTabStore()
const logout = () => {
    ElMessageBox.confirm('确认退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log(router)
        tabStore.closeAllTabs();

        router.push("/login/");
        ElMessage.success('退出登录成功');

    })
}
</script>
<style scoped>
.avatar {
    width: 40px;
    height: 40px;
}

.avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>