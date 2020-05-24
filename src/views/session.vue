<template>
  <div>
    <div>Spotify connected</div>
    <div>
      <span>Conenct</span>
      <a href="/api/spotify/authorize">Here</a>
    </div>
    <router-link class="p-4 m-4" to="/">Home</router-link>
    <button @click="logout" class="m-4 p-4 rounded-full shadow-md">
      Log out
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, onDeactivated } from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import ReconnectingWebSocket from "reconnecting-websocket";
import router from "@/router";

function useSession() {
  async function urlProvider() {
    const user = firebase.auth().currentUser;
    if (!user) throw Error("user isn't authenticated mara why?");
    const idToken = await user?.getIdToken();
    const socketScheme = window.location.protocol === "http:" ? "ws:" : "wss:";
    return `${socketScheme}//${window.location.host}/ws/session?token=${idToken}`;
  }

  function init() {
    const rws = new ReconnectingWebSocket(urlProvider);
    rws.onopen = () => {
      console.log("connection opened");
    };
    onDeactivated(() => rws?.close());
    onUnmounted(() => rws?.close());
    console.log("initialising session");
  }

  return { initSession: init };
}

export default defineComponent({
  setup() {
    async function logout() {
      await firebase.auth().signOut();
      router.push("/");
    }

    return { logout };
  }
});
</script>
