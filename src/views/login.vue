<template>
  <div>
    <h1 class="text-3xl">Login</h1>
    <button
      @click="login"
      class="m-12 p-4 rounded-full shadow-md bg-red-500 text-white"
    >
      Click me!
    </button>
    <h1 v-if="loading" class="text-4xl">Loading</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import router from "@/router";

function useAuth() {
  const loading = ref(false);

  async function ininApp() {
    firebase.auth().onAuthStateChanged(async () => {
      const route = router.currentRoute.value;
      if (route.query.returnUrl) {
        router.push(route.query.returnUrl as string);
      } else router.push("/");
    });
    loading.value = true;
    const result = await firebase.auth().getRedirectResult();
    loading.value = false;
    if (!result) return;
  }

  function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
  onMounted(() => {
    ininApp();
  });
  return { loading, login };
}

export default defineComponent({
  setup() {
    return { ...useAuth() };
  }
});
</script>
