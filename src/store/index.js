import Vue from "vue";
import Vuex from "vuex";

import { search, list } from "./modules";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search,
    list,
  },
  plugins: [
    createPersistedState({
      paths: ["search", "list"],
    }),
  ],
});
