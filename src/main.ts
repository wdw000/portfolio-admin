import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import axios from "axios";

const pinia = createPinia();

export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

createApp(App).use(pinia).mount("#app");
