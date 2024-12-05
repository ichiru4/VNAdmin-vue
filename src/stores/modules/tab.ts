import { defineStore } from "pinia";
import type { TabsMenuProps, TabsState } from "../interface";
import router from "@/router";
import { useKeepAliveStore } from "../useKeepAliveStore";
import piniaPersistConfig from "../config/piniaPersist";

const keepAliveStore = useKeepAliveStore();

export const useTabStore = defineStore("tab", {
    state: (): TabsState => ({
        tabMenuList: [],
    }),
    actions: {
        addTabs(tabItem: TabsMenuProps) {
            if (this.tabMenuList.every(item => item.path !== tabItem.path)) {
                this.tabMenuList.push(tabItem);
            }
        },
        removeTabs(path: string, isCurrent: boolean) {
            const tabMenuList = this.tabMenuList;
            if (isCurrent) {
                tabMenuList.forEach((item, index) => {
                    if (item.path !== path) return;
                    const nextTab = tabMenuList[index + 1] || tabMenuList[index - 1];
                    if (!nextTab) return;
                    router.push(nextTab.path)
                })
            }
            this.tabMenuList = tabMenuList.filter(item => item.path !== path)
        },
        async closeTabOnSide(path: string, type: "left" | "right") {
            const currentIndex = this.tabMenuList.findIndex(item => item.path === path);
            if (currentIndex !== -1) {
                const range = type === "left" ? [0, currentIndex] : [currentIndex + 1, this.tabMenuList.length]
                this.tabMenuList = this.tabMenuList.filter((item, index) => {
                    return index < range[0] || index > range[1] || !item.close;
                })
            }
            keepAliveStore.setKeepAliveName(this.tabMenuList.map(item => item.name))
        },
        async closeOtherTabs(path: string) {
            const currentIndex = this.tabMenuList.findIndex(item => item.path === path);
            if (currentIndex !== -1) {
                this.tabMenuList = this.tabMenuList.filter((item, index) => {
                    return index === currentIndex || !item.close;
                })
            }
            keepAliveStore.setKeepAliveName(this.tabMenuList.map(item => item.name))
        },
        async setTabs(tabsMenuList: TabsMenuProps[]) {
            this.tabMenuList = tabsMenuList;
        },
        async setTabTitle(title: string) {
            this.tabMenuList.forEach(item => {
                if (item.path === location.hash.substring(1))
                    item.title = title;
            })
        },
        async closeAllTabs() {
            this.tabMenuList = [];
            localStorage.removeItem("vue3-tabs");
        }
    },
    persist: piniaPersistConfig("vue3-tabs")
    
});