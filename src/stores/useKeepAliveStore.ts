import { defineStore } from "pinia";
import type { KeepAliveState } from "./interface";

export const useKeepAliveStore = defineStore("keepAlive", {
    state: (): KeepAliveState => ({
        keepAliveName: []
    }),
    actions: {
        async addKeepAlive(name: string) {
            !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
        },
        async removeKeepAlive(name: string) {
            this.keepAliveName.splice(this.keepAliveName.indexOf(name), 1);
        },
        async setKeepAliveName(keepAliveName: string[] = []) {
            this.keepAliveName = keepAliveName;
        }
    }
});
