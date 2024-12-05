import { getAuthMenuListApi } from "@/api/loginApi";
import { defineStore } from "pinia";
import type { AuthState } from "./interface";
import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from "@/utils";

export const useMenuStore = defineStore("menu", {
    state: () :AuthState=> ({
          authButtonList: {},
          authMenuList: [],
          routeName: ""  
    }),
    getters: {
        authButtonListGet: (state) => state.authButtonList,
        authMenuListGet: state => state.authMenuList,
        showMenuListGet:state => getShowMenuList(state.authMenuList),
        flatMenuListGet: state => getFlatMenuList(state.authMenuList),
        breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
        
    },
    actions:{
        async getAuthMenuList(params: Menu.MenuRequest){
            const {response} = await getAuthMenuListApi(params);
            if(response)
            this.authMenuList = response.children ?? [];
        },
        async setRouteName(name:string){
            this.routeName=name;
        }
    }

});