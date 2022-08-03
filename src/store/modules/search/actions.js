const actions = {
  async setSearchInput(vuexContext, payload) {
    vuexContext.commit("SET_SEARCH_INPUT_VALUE", payload);
  },
};

export default actions;
