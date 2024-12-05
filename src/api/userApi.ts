import { get } from "@/utils/axiosInstance";
import type { BaseResponse, PageRequest } from "./loginApi";

export const getAllUsers = async (params:PageRequest) => {
    try {
        const response = await get<BaseResponse<User.UserResponse[]>>('/User/GetAllUsers', {
            page: params.page,
            size: params.size,
            key: params.key
        });
        return response;
    } catch (error) {
        throw new Error('请求失败')
    }

}
