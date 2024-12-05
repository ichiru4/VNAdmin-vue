<template>
    <div class="form-container">
        <el-form style="width: 100%;" ref="LoginFormRef" :model="loginForm" :rules="loginRules" size="large"
            label-width="auto">
            <el-form-item prop="name">
                <el-input style="margin-bottom: 10px;" v-model="loginForm.name" placeholder="请输入用户名">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <user />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <!-- autocomplete="new-password" -->
                <el-input style="margin-bottom: 10px;" v-model="loginForm.pass" type="password" placeholder="请输入密码" show-password
                    
                    @keydown.enter="handleLogin(LoginFormRef)">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <lock />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="login-form-btn">
            <el-button style="width: 50%;" :icon="CircleClose" round size="large" @click="resetForm()">重置</el-button>
            <el-button style="width: 50%; margin: 0;" :icon="UserFilled" round size="large" type="primary"
                @click="handleLogin(LoginFormRef)">登录</el-button>
        </div> 
    </div>

</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { CircleClose, UserFilled } from '@element-plus/icons-vue';
import { login, userInfo, type LoginRequest } from '@/api/loginApi';
import useAuthStore from '@/stores/useAuthStore';
import { ElMessage, ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '@/stores/useUserInfoStore';
import { initDynamicRouter } from '@/router/modules/dynamicRouter';
import Menu from 'element-plus/es/components/menu/src/utils/menu-bar.mjs';
const auth = useAuthStore();
const userInfoStore = useUserInfoStore();
const router = useRouter();
const LoginFormRef = ref<any>(null);
const loginForm = ref<LoginRequest>({
    name: '',
    pass: ''
})
const loginRules = reactive({
    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const resetForm = () => {
    if (LoginFormRef.value) {
        LoginFormRef.value.resetFields();
    }
}
const loading = ref(false);

const handleLogin = (form: any) => {
    if (!form) return;
    form.validate(async (valid: any) => {
        if (!valid) {
            return;
        }
        try {
            const response = await login(loginForm.value);
            if (response.success) {
                auth.setToken(response.response.token);         
                const res =  await userInfo();
                userInfoStore.setUser(res.response);

                const menu :Menu.MenuRequest ={ uid:res.response.Id}
                await initDynamicRouter(menu)
                ElNotification({
                    title: '首页',
                    message: '登录成功',
                    type: 'success',
                    duration: 3000,
                })
                router.push({ name: 'layout' })
            } else {
                ElMessage.error(response.message || "请求失败，请稍后重试");
            }
        }
        finally {
            loading.value = false;
        }
    })
}
onMounted(() => {
    resetForm();
});
</script>


<style scoped>
.login-form-btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 30px;
}
.form-container{
    width: 100%;
}

</style>