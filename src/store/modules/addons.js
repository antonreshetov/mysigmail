import data from './data'

export default {
  state: {
    installed: [],
    disclaimer: data.addons.disclaimer,
    mobileApp: data.addons.mobileApp
  },
  getters: {},
  mutations: {
    ADD_ADDON (state, addon) {
      const index = state.installed.findIndex(i => i.name === addon.name)
      if (index === -1) state.installed.push(addon)
    },
    REMOVE_ADDON (state, name) {
      const index = state.installed.findIndex(i => i.name === name)
      state.installed.splice(index, 1)
    },
    RESET_ADDONS (state) {
      state.installed = []
      state.disclaimer = data.addons.disclaimer
      state.mobileApp = data.addons.mobileApp
    },
    SET_ADDONS_STATE (state, data) {
      state = Object.assign(state, data)
    },
    SET_DISCLAIMER (state, data) {
      state.disclaimer = data
    },
    SET_MOBILE_APP (state, data) {
      state.mobileApp[data.key] = { ...state.mobileApp[data.key], ...data.payload }
    },
    RESET_MOBILE_APP (state) {
      state.mobileApp = data.addons.mobileApp
    }
  },
  actions: {
    async addAddon ({ state, commit, dispatch, rootState }, addon) {
      commit('ADD_ADDON', addon)
      await dispatch('updateProject', rootState.projects.project)
    },
    async removeAddon ({ state, commit, dispatch, rootState }, name) {
      commit('REMOVE_ADDON', name)
      if (name === 'disclaimer') commit('SET_DISCLAIMER', data.addons.disclaimer)
      if (name === 'mobileApp') commit('RESET_MOBILE_APP')
      await dispatch('updateProject', rootState.projects.project)
    },
    async updateDisclaimer ({ state, commit, dispatch, rootState }, data) {
      commit('SET_DISCLAIMER', data)
      await dispatch('updateProject', rootState.projects.project)
    },
    async updateMobileApp ({ state, commit, dispatch, rootState }, data) {
      commit('SET_MOBILE_APP', data)
      await dispatch('updateProject', rootState.projects.project)
    }
  }
}
