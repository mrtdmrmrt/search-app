import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";

export const list = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
