<template>
  <div class="about">
    <p v-if="token">{{ token }}</p>
    <p v-else>no token</p>
    <!-- <p>This is the about page</p> -->
     <div>
      <el-button @click="handleClick">Default</el-button>
     </div>
  </div>
</template>

<script setup lang="ts">
import { userInfo } from '@/api/loginApi';
import useAuthStore from '@/stores/useAuthStore';
const auth = useAuthStore();
const token = auth.token;
const handleClick = async () => {
   const a=await userInfo();
   console.log(a.response);
   
}
</script>
<style scoped>
.about{
  width: 100%;
  max-width: 100vh;
}
p{
  overflow-wrap: break-word;
  white-space: normal;
}
</style>
