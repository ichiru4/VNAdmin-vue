import { defineStore } from "pinia";
import piniaPersistConfig from "./config/piniaPersist";

export const useGlobalStore = defineStore("global", {
    state: () => ({
        layout: "vertical",
        accordion: true,
        isCollapse: false,
        breadcrumbIcon : true,
        breadcrumb: true,
        tabsIcon: true,
        tabs: true,
        footer: true,
    }),
    actions:{
        setGlobalstate(...args:any){
            this.$patch({[args[0]]:args[1]});
        }
    },
    persist: piniaPersistConfig("vue3-global")
});

