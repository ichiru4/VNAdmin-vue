import { get } from "@/utils/axiosInstance";
import type { BaseResponse } from "./loginApi"
export interface RoleResponse {
    Id: string;
    Name: string;
}
export const getAllRoles = async () => {
    try {
        const response = await get<BaseResponse<RoleResponse[]>>('/Role/GetAllRoles');
        return response
    } catch (error) {
        console.log(error)
        throw new Error("请求失败")
    }
}
