const placeholder =
  'This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.'

export default {
  state: {
    installed: [],
    disclaimer: placeholder
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
      state[name] = ''
    },
    SET_DISCLAIMER (state, data) {
      state.disclaimer = data
    },
    RESET_ADDONS (state) {
      state.installed = []
      state.disclaimer = placeholder
    },
    SET_ADDONS_STATE (state, data) {
      state = Object.assign(state, data)
    }
  },
  actions: {
    async addAddon ({ state, commit, dispatch, rootState }, addon) {
      commit('ADD_ADDON', addon)
      await dispatch('updateProject', rootState.projects.project)
    },
    async updateDisclaimer ({ state, commit, dispatch, rootState }, data) {
      commit('SET_DISCLAIMER', data)
      await dispatch('updateProject', rootState.projects.project)
    },
    async removeAddon ({ state, commit, dispatch, rootState }, name) {
      commit('REMOVE_ADDON', name)
      if (name === 'disclaimer') commit('SET_DISCLAIMER', placeholder)
      await dispatch('updateProject', rootState.projects.project)
    }
  }
}
