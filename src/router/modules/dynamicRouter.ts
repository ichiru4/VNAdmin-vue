import router from "@/router/index"
import useAuthStore from "@/stores/useAuthStore";
import { useMenuStore } from "@/stores/useMenuStore";
import { pathToUpperComponent } from "@/utils";
import { ElNotification } from "element-plus";

import type { RouteRecordRaw } from "vue-router";


const modules = import.meta.glob("@/views/**/*.vue");

export const initDynamicRouter = async (params: Menu.MenuRequest) => {

    const userStore = useAuthStore();
    const authStore = useMenuStore();

    try {
        await authStore.getAuthMenuList(params);
        if (!authStore.authMenuList.length) {
            if (userStore.token) {
                ElNotification({
                    title: "无权限访问",
                    message: "当前账号无任何菜单权限，请联系管理员开通",
                    type: "warning",
                    duration: 3000
                })
            }
            userStore.setToken("");
            router.replace("/login")
            return Promise.reject("No permission");
        }


        authStore.flatMenuListGet.forEach(item => {
            item.children && delete item.children;
            if (item.path && !item.IsButton && item.path != " " && typeof item.path == "string" && item.path != '-') {
                if (item.path == '/') {
                    item.component = modules["/src/views/home/index.vue"];
                } else if (item.path.indexOf('/:id') !== -1) {
                    item.component = modules["/src/views" + item.path.replace('/:id', '') + ".vue"];
                } else {
                    item.component = modules["/src/views" + pathToUpperComponent(item.path) + ".vue"];
                }

                router.addRoute("layout", item as unknown as RouteRecordRaw);
            }
        });

    } catch (error) {
        userStore.setToken("");
        router.replace("/login")
        return Promise.reject(error);
    }
}