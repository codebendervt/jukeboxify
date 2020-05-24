<template>
  <div>
    <router-link class="p-4 m-4" to="/">Home</router-link>
    <button @click="logout" class="m-4 p-4 rounded-full shadow-md">
      Log out
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import router from "@/router";
import store from "@/store";
import axios from "axios";

async function useSession() {
  const user = firebase.auth().currentUser;
  if (!user) return; // TODO: there's a better way to do this
  const uid = user.uid;
  const defaultDatabase = firebase.database();
  const reference = defaultDatabase.ref(`users/${uid}/session`);
  function onSessionCallback(dataSnapshot: firebase.database.DataSnapshot) {
    console.log("on data", dataSnapshot.toJSON());
    /* do nothing yet*/
  }

  onMounted(() => {
    reference.on("value", onSessionCallback);
  });

  onUnmounted(() => {
    reference.off("value", onSessionCallback);
  });
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
