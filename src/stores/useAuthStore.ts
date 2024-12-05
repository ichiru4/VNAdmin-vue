import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", {
    state:()=>({
        token: localStorage.getItem('token') || '',
    }),
    actions:{
        setToken( newToken:string){
            this.token = newToken;
            localStorage.setItem('token', newToken);
        },
        clearToken(){
            this.token = '';
            localStorage.removeItem('token');
        }
    }
});

export default useAuthStore;