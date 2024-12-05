<template>
    <el-badge :value="1" :max="99" class="item">
        <el-popover placement="bottom" width="auto" trigger="click">
            <template #reference>
                <el-icon color="#777575" class="no-inherit" :size="20" style="vertical-align: middle">
                    <Bell />
                </el-icon>
            </template>
            <div class="message-container">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane :label="`通知(${notification})`" name="first">
                        <div class="notification-container">
                            <div class="notification-item">
                                <img src="@/assets/images/avatar.jpg">
                                <div class="flex-column">
                                    <span>你收到了10条他的私信</span>
                                    <span class="timeBefore">1分钟前</span>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="`消息(${message})`" name="second">Config</el-tab-pane>
                    <el-tab-pane :label="`待办(${todo})`" name="third">Role</el-tab-pane>
                </el-tabs>
            </div>
        </el-popover>
    </el-badge>

</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
import { ref } from 'vue';
const notification = ref(10);
const message = ref(7);
const todo = ref(3);
const activeName = ref('first');
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
}
</script>

<style scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.message-container::v-deep(.demo-tabs) {
    display: flex;
    justify-content: center;
}

.notification-item {
    display: flex;
    align-items: center;
}

.notification-item img {
    width: 35px;
    border-radius: 4px;
    margin-right: 10px;
}

.flex-column {
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.timeBefore{
    color:rgb(133, 133, 133);
    font-size:12px;
}
</style>