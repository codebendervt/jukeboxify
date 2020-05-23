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
import firebase from "firebase";
import router from "@/router";

function useAuth() {
  const loading = ref(false);

  async function ininApp() {
    loading.value = true;
    const result = await firebase.auth().getRedirectResult();
    loading.value = false;
    if (!result) return;
  }
  onMounted(() => {
    ininApp();
  });
  return { loading };
}

export default defineComponent({
  setup() {
    firebase.auth().onAuthStateChanged(async user => {
      console.log(user?.displayName + " is signed in");
      const route = router.currentRoute.value;
      if (route.query.returnUrl) {
        router.push(route.query.returnUrl as string);
      } else router.push("/");
    });
    function login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
    return { login, ...useAuth() };
  }
});
</script>
