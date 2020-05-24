import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker"; # Eventually this has to be enabled but with a functioning config
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAEOLJIn6nJ4A-yYqkpOqCZME3UbVjudPU",
  authDomain: "jukeboxify.firebaseapp.com",
  databaseURL: "https://jukeboxify.firebaseio.com",
  projectId: "jukeboxify",
  storageBucket: "jukeboxify.appspot.com",
  messagingSenderId: "789920761267",
  appId: "1:789920761267:web:bfe623f6d99168e17c77c6"
};

firebase.initializeApp(config);

createApp(App as object)
  .use(router)
  .use(store)
  .mount("#app");
