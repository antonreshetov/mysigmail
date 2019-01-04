import templateList from '../../db/templates'

export default {
  state: {
    selected: 'EmailTemplate1',
    list: templateList
  },
  getters: {
    getTemplate: state => state
  },
  mutations: {
    SET_TEMPLATE_SELECTED (state, data) {
      state.selected = data
    }
  },
  actions: {
    async updateTemplate ({ state, commit, dispatch, rootState }, data) {
      commit('SET_TEMPLATE_SELECTED', data)
      await dispatch('updateProject', rootState.projects.project)
    }
  }
}
