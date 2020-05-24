<template>
  <div>
    <h1>You're not connected yet</h1>
    <p class="p-6">
      There'll be like details explaining the different scopes required
    </p>
    <a
      v-if="connected === false"
      :href="
        `/api/spotify/authorize${returnUrl ? '?returnUrl=' + returnUrl : ''}`
      "
      class="m-4 p-4 bg-yellow-500 text-white"
      >Conenct spotify
    </a>
    <router-link to="/session">Continue</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";
import store from "@/store";
export default defineComponent({
  setup() {
    const connected = ref<boolean>();
    const route = router.currentRoute.value;
    const accessToken = route.query.access_token;
    const refreshToken = route.query.refresh_token;
    const expiresIn = route.query.expires_in;

    if (accessToken && refreshToken && expiresIn) {
      // save tokens to store
      store.dispatch("spotifyAuth", { accessToken, refreshToken, expiresIn });
      connected.value = true;
    } else {
      // check store
      connected.value = store.getters.spotifyLinked();
    }

    return { connected };
  }
});
</script>
