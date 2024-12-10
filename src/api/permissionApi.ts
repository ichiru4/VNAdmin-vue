import { get, post } from "@/utils/axiosInstance";
import type { BaseResponse } from "./loginApi";
export interface permissionList {
    id: string;
    pid: string
    label: string;
    children: permissionList[] | null;
    isButton: boolean;
    buttons: permissionList[] | null
}

export interface Permission {
    MenuType: string;
    Code: string; // 菜单代码
    Name: string; // 菜单名称
    IsButton: boolean; // 是否是按钮
    IsHide: boolean; // 是否隐藏
    IskeepAlive: boolean; // 是否保持活跃
    Func: string | null; // 功能，可能为 null
    OrderSort: number; // 排序
    Icon: string |null; // 图标
    IconNew: string; // 图标
    Description: string; // 描述
    Enabled: boolean; // 是否启用
    CreateId: string; // 创建 ID
    CreateBy: string; // 创建者
    CreateTime: string; // 创建时间
    ModifyId: string | null; // 修改 ID，可能为 null
    ModifyBy: string | null; // 修改者，可能为 null
    ModifyTime: string; // 修改时间
    IsDeleted: boolean; // 是否已删除
    PnameArr: string[]; // 上级名称数组
    PCodeArr: string[]; // 上级代码数组
    MName: string | null; // 模块名称，可能为 null
    hasChildren: boolean; // 是否有子菜单
    Children: any[]; // 子菜单数组
    Module: any | null; // 模块，可能为 null
    Pid: string; // 上级 ID
    Mid: string; // 模块 ID
    PidArr: string[]; // 上级 ID 数组
  }

export interface permissionByRole {
    id: string[];
    btnId: string[];
}

export interface AssignRequest {
    pids: string[],
    rid: string
};
export const getPermissonsList = async () => {
    try {
        const response = await get<BaseResponse<permissionList>>('/permission/GetAllPermissonTree');
        return response
    } catch (error) {
        console.log(error);
        throw new Error('获取权限列表失败');
    }
}

export const getPermissonsListWithNoButton = async () => {
    try {
        const response = await get<BaseResponse<permissionList>>('/permission/GetAllPermissonTree', { needbtn: false });
        return response
    } catch (error) {
        console.log(error);
        throw new Error('获取权限列表失败');
    }
}


export const getPermissonsListByRoleId = async (rid: string) => {
    try {
        const response = await get<BaseResponse<permissionByRole>>('/permission/GetPermissonListByRoleId', { roleId: rid });
        return response
    } catch (error) {
        console.log(error);
        throw new Error('获取失败');
    }
}


export const assignPermissons = async (data: AssignRequest) => {
    try {
        const response = await post<BaseResponse<any>>('/permission/AssignPermission', data);

        return response
    } catch (error) {
        console.log(error);
        throw new Error('操作失败');
    }
}

export const addPermisson = async (data: Permission) => {
    try {
        const response = await post<BaseResponse<any>>('/permission/Post', data);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('操作失败');
    }
}