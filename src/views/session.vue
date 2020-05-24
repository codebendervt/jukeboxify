<template>
  <div>
    <router-link class="p-4 m-4" to="/">Home</router-link>
    <button @click="logout" class="m-4 p-4 rounded-full shadow-md">
      Log out
    </button>

    <script src="https://sdk.scdn.co/spotify-player.js"></script>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onUnmounted,
  onDeactivated,
  onMounted,
  onUpdated
} from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import ReconnectingWebSocket from "reconnecting-websocket";
import router from "@/router";
import store from "@/store";
window.onSpotifyWebPlaybackSDKReady = () => {
  /**do nothing yet */
};
async function waitForSpotifyWebPlaybackSDKToLoad() {
  return new Promise(resolve => {
    if (window.Spotify) {
      resolve(window.Spotify);
    } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve(window.Spotify);
      };
    }
  });
}

async function initialisePlayer() {
  const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
  const player = new Player({
    name: "Jukeboxify",
    getOAuthToken: (done: Function) => done(store.state.auth.accessToken)
  });

  // Error handling
  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener("player_state_changed", state => {
    console.log(state);
  });

  // Ready
  // eslint-disable-next-line @typescript-eslint/camelcase
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
  });

  // Not Ready
  // eslint-disable-next-line @typescript-eslint/camelcase
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });
  return player;
}

async function useSession() {
  // eslint-disable-next-line prefer-const
  let player;

  onMounted(async () => {
    if (!player) {
      player = await initialisePlayer();
      const connected = player.connect();
    }
  });

  onUnmounted(() => {
    player?.disconnect();
  });

  // async function urlProvider() {
  //   const user = firebase.auth().currentUser;
  //   if (!user) throw Error("user isn't authenticated mara why?");
  //   const idToken = await user?.getIdToken();
  //   const socketScheme = window.location.protocol === "http:" ? "ws:" : "wss:";
  //   return `${socketScheme}//${window.location.host}/ws/session?token=${idToken}`;
  // }

  // const rws = new ReconnectingWebSocket(urlProvider, [], { startClosed: true });

  // function init() {
  //   const rws = new ReconnectingWebSocket(urlProvider);
  //   rws.onopen = () => {
  //     console.log("connection opened");
  //   };
  //   onUnmounted(() => rws?.close());
  // }

  // onMounted(() => {
  // rws.reconnect();
  // const connected = player.connect();
  // console.log(connected);
  // });

  // onUpdated(() => {
  // console.log("updated");
  // });

  // onUnmounted(() => {
  // player.disconnect();
  // });

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
