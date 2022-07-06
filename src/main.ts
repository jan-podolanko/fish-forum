import { createApp } from "vue";
import { createStore } from 'vuex';
import App from "./App.vue";
import router from "./router";

export const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
})


const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
