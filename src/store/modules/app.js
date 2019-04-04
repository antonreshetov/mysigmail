export default {
  state: {
    loading: false,
    promoteSignature: true
  },
  getters: {
    getApp: state => state
  },
  mutations: {
    SET_LOADING (state, data) {
      state.loading = data
    },
    SET_PROMOTE_SIGNATURE (state, data) {
      state.promoteSignature = data
    }
  },
  actions: {}
}
