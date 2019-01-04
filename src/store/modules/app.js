export default {
  state: {
    loading: false
  },
  getters: {
    getApp: state => state
  },
  mutations: {
    SET_LOADING (state, data) {
      state.loading = data
    }
  },
  actions: {}
}
