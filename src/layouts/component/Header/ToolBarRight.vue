<template>
    <div class="tool-bar-right">
        <ThemeSetting />
        <div class="header-icon">
            <Message id="message" />
        </div>
        <span class="username">{{ username }}</span>
        <Avatar />
    </div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '@/stores/useUserInfoStore';
import { computed } from 'vue';
import Message from './components/Message.vue';
import Avatar from './components/Avatar.vue';
import ThemeSetting from './components/ThemeSetting.vue';
const userStore = useUserInfoStore();
const username = computed(()=>userStore.user?.Name??'管理员')
</script>

<style scoped>
.tool-bar-right{
    display: flex;
    align-items: center;
    gap: 15px;
    margin-right: 5%;
}
.username{
    font-family:unset;
    font-weight: 350;
}
</style>