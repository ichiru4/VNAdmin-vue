import useAuthStore from "@/stores/useAuthStore";
import { get, post } from "@/utils/axiosInstance";
import axios from "axios";
import type { AxiosResponse } from "axios";
export interface LoginRequest {
    name: string;
    pass: string;
}

export interface BaseResponse<T> {
    status: number;
    success: boolean;
    message: string;
    msgDev?: string | null;
    response: T;
}

export interface PageRequest{
    page: number;
    size: number;
    key: string
}

export interface LoginResponse {
    success: boolean;
    token: string;
    expires_in: number;
    token_type: string;
}
//发送登录请求
export const login = async (params: LoginRequest) => {
    try {
        const response = await post<BaseResponse<LoginResponse>>('/Login', {
            name: params.name,
            pass: params.pass
        });
        return response;
    } catch (error) {
        throw new Error('请求失败')
    }

}


export const userInfo = async () => {
    const auth = useAuthStore();
    const token = auth.token;
    try {
        const response = await get<BaseResponse<User.UserResponse>>('/User/GetUserInfoByToken', { token });
        console.log(response);

        return response;
    } catch (error) {
        console.log(error);
        throw new Error('请求失败')
    }
}

export const getAuthMenuListApi = async (params: Menu.MenuRequest) => {
    const response = await get<BaseResponse<Menu.MenuOption>>('/permission/GetNavigationBar', { uid: params.uid });
    return response;
}