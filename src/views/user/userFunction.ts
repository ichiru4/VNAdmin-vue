import type { PageRequest } from '@/api/loginApi'
import { getAllUsers } from '@/api/userApi'
import { ref } from 'vue'
export const listloading = ref(false)
export const userList = ref<User.UserResponse[]>([])
export async function handleQuery(filters: { name: string }) : Promise<User.UserResponse[]> {
    const param = ref<PageRequest>({
        page: 1,
        size: 0,
        key: filters.name
    })
    listloading.value = true
    try {
        const {response} = await getAllUsers(param.value);
        userList.value = response; 
        return response;
    }finally{
        listloading.value = false
    }
}