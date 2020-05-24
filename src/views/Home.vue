<template>
  <div class="p-12">
    <h1 class="text-center text-2xl font-bold">Auxless spotify</h1>
    <div class="flex justify-center">
      <button
        @click="startSession"
        class="bg-blue-500 hover:bg-blue-600 m-4 mr-12 text-white p-4 rounded-full"
      >
        Start session
      </button>
      <button class="bg-gray-300 hover:bg-gray-400 p-4 m-4 rounded-full">
        Join session
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import store from "@/store";

export default defineComponent({
  name: "Home",
  setup() {
    function startSession() {
      const spotifyLinked = store.getters.spotifyLinked();
      if (spotifyLinked) return router.push("/session");
      router.push({ path: "/connect", query: { returnUrl: "/session" } });
    }
    return { startSession };
  }
});
</script>
