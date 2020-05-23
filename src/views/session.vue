<template>
  <div>
    <router-link class="p-4 m-4" to="/">Home</router-link>
    <button @click="logout" class="m-4 p-4 rounded-full shadow-md">
      Log out
    </button>
    <h1 class="text-3xl font-bold p-2">Session</h1>
    <!-- <button class="bg-blue-500  text-white rounded-full p-4 m-4 shadow-lg"> -->
    <!-- Link your spotify account -->
    <!-- </button> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import firebase from "firebase";
import ReconnectingWebSocket from "reconnecting-websocket";
import router from "@/router";

async function useSession() {
  async function urlProvider() {
    const user = firebase.auth().currentUser;
    if (!user) throw Error("user isn't authenticated mara why?");
    const idToken = await user?.getIdToken();
    const socketScheme = window.location.protocol === "http:" ? "ws:" : "wss:";
    return `${socketScheme}//${window.location.host}/ws/session`;
  }
  const rws = new ReconnectingWebSocket(urlProvider);
  rws.onopen = () => {
    console.log("connection opened");
  };
  onUnmounted(rws.close);
  return {};
}

export default defineComponent({
  setup() {
    async function logout() {
      await firebase.auth().signOut();
      router.push("/");
    }
    return { logout, ...useSession() };
  }
});
</script>
