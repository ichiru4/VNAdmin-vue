<template>
    <div class="assign-container">
        <el-card class="role-card" body-style="padding: 0">
            <template #header>
                <div class="card-header">
                    <span>权限</span>
                </div>
            </template>
            <div class="role-list">
                <p v-for="(item, index) in roles" :key="index" class="text-item">{{ item }}</p>
            </div>
        </el-card>
        <el-card class="permission-card">
            <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange" />
        </el-card>
    </div>


</template>

<script setup lang="ts">
import { getAllRoles } from '@/api/roleApi';
import { computed, onMounted, ref } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node'
let count = 1

interface Tree {
    name: string
}

const props = {
    label: 'name',
    children: 'zones',
}

const handleCheckChange = (
    data: Tree,
    checked: boolean,
    indeterminate: boolean
) => {
    console.log(data, checked, indeterminate)
}

const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
    if (node.level === 0) {
        return resolve([{ name: 'Root1' }, { name: 'Root2' }])
    }
    if (node.level > 3) return resolve([])

    let hasChild = false
    if (node.data.name === 'region1') {
        hasChild = true
    } else if (node.data.name === 'region2') {
        hasChild = false
    } else {
        hasChild = Math.random() > 0.5
    }

    setTimeout(() => {
        let data: Tree[] = []
        if (hasChild) {
            data = [
                {
                    name: `zone${count++}`,
                },
                {
                    name: `zone${count++}`,
                },
            ]
        } else {
            data = []
        }

        resolve(data)
    }, 500)
}

const roles = ref();
onMounted(async () => {
    const res = await getAllRoles();
    roles.value = res.response.map(r => r.Name);
})
</script>

<style scoped>
.assign-container {
    width: 100%;
    display: flex;
    gap: 40px;
    /* padding-left:20px; */
    padding-right:40px;

}

.role-card {
    flex: 3;
}
.role-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    min-height: 400px;
}

.permission-card {
    flex: 7;
    
}
</style>