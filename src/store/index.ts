import { createStore } from "vuex";
import VuexPersistance from "vuex-persist";

interface SpotifyAuth {
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
}
interface RootState {
  spotifyRefreshToken: string;
  auth: SpotifyAuth;
}

const persist = new VuexPersistance<RootState>({
  reducer: state => ({ auth: state.auth })
});

export default createStore<RootState>({
  state: {
    spotifyRefreshToken: "",
    auth: {}
  },
  mutations: {
    saveSpotifyRefreshToken: (state, payload) => {
      state.auth.refreshToken = payload;
    },
    saveSpotifyAccessToken: (state, payload) => {
      state.auth.accessToken = payload;
    }
  },
  getters: {
    som: stote => {
      return stote.spotifyRefreshToken;
    },
    spotifyLinked: (state: RootState) => () => !!state.auth.refreshToken
  },
  actions: {
    spotifyAuth: (context, payload: SpotifyAuth) => {
      const { commit } = context;
      commit("saveSpotifyRefreshToken", payload.refreshToken);
      commit("saveSpotifyAccessToken", payload.accessToken);
    }
  },
  modules: {},
  plugins: [persist.plugin]
});
