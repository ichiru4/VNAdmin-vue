import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("userInfo", {
    state: () => ({
        user: null as User.UserResponse|null,
    }),
    actions:{
        setUser(user:User.UserResponse){
            this.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        getUser(){
            const user = localStorage.getItem("user");
            if(user){
                this.user = JSON.parse(user);
            }
        },
        clearUser(){
            this.user = null;
            localStorage.removeItem("user");
        }
    }
});