<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-form">
                <div class="login-logo">
                    <img src="@/assets/logo.svg" alt="logo">
                    <h2 class="login-title">NET.VUE3</h2>
                </div>
                    <LoginForm />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import  LoginForm  from "./components/LoginForm.vue";
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>