import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker"; # Eventually this has to be enabled but with a functioning config
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

createApp(App as object)
  .use(router)
  .use(store)
  .mount("#app");
