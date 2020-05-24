import { createStore } from "vuex";
import VuexPersistance from "vuex-persist";

interface SpotifyState {
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
}
interface RootState {
  spotifyRefreshToken: string;
  auth: SpotifyState;
}

const persist = new VuexPersistance<RootState>({
  reducer: state => ({ auth: state.auth })
});

export default createStore<RootState>({
  state: {
    spotifyRefreshToken: "",
    auth: {}
  },
  mutations: {},
  getters: {
    som: stote => {
      return stote.spotifyRefreshToken;
    },
    spotifyLinked: (state: RootState) => () => !!state.auth.refreshToken
  },
  actions: {
    connectSpotify: context => {
      console.log("connect");
    }
  },
  modules: {},
  plugins: [persist.plugin]
});
