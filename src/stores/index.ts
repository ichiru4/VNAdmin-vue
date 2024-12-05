import { createPinia } from "pinia";
import piniaPluginPersisitedState from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersisitedState)

export default pinia;