const actions = {
  async setList(vuexContext, payload) {
    vuexContext.commit("SET_LIST", payload);
  },
  async setNewLink(vuexContext, payload) {
    vuexContext.commit("SET_NEW_LINK", payload);
  },
};

export default actions;
