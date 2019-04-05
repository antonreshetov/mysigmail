import templateList from '../../db/templates'

export default {
  state: {
    selected: 'SignatureTemplate1',
    list: templateList,
    promoteSignature: true
  },
  getters: {
    getTemplate: state => state
  },
  mutations: {
    SET_TEMPLATE_SELECTED (state, data) {
      state.selected = data
    },
    SET_PROMOTE_SIGNATURE (state, data) {
      state.promoteSignature = data
    }
  },
  actions: {
    async updateTemplate ({ state, commit, dispatch, rootState }, data) {
      commit('SET_TEMPLATE_SELECTED', data)
      await dispatch('updateProject', rootState.projects.project)
    }
  }
}
