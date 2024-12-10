import type { Permission } from "@/api/permissionApi";
import { reactive } from "vue";
export const addForm = reactive<Permission>({
    MenuType: "",
    Code: "",  // 默认代码为空字符串
    Name: "",  // 默认名称为空字符串
    IsButton: false,  // 默认不是按钮
    IsHide: false,  // 默认不隐藏
    IskeepAlive: false,  // 默认不保持活跃
    Func: null,  // 默认没有功能
    OrderSort: 0,  // 默认排序为 0
    Icon:null,  // 默认图标为空字符串
    IconNew: "",  // 默认图标为空字符串
    Description: "",  // 默认描述为空字符串
    Enabled: true,  // 默认启用
    CreateId: "",  // 默认创建 ID 为空字符串
    CreateBy: "",  // 默认创建者为空字符串
    CreateTime: "",  // 默认创建时间为空字符串
    ModifyId: null,  // 默认没有修改 ID
    ModifyBy: null,  // 默认没有修改者
    ModifyTime: "",  // 默认修改时间为空字符串
    IsDeleted: false,  // 默认未删除
    PnameArr: [],  // 默认上级名称数组为空
    PCodeArr: [],  // 默认上级代码数组为空
    MName: null,  // 默认没有模块名称
    hasChildren: false,  // 默认没有子菜单
    Children: [],  // 默认子菜单数组为空
    Module: null,  // 默认没有模块
    Pid: "0",  // 默认上级 ID 为空字符串
    Mid: "0",  // 默认模块 ID 为空字符串
    PidArr: [],  // 默认上级 ID 数组为空
});