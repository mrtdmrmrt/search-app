const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
  SET_NEW_LINK(state, payload) {
    state.list.data.push(payload);
  },
};

export default mutations;
