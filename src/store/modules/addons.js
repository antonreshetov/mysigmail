const placeholder =
  'This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.'
const mobileApp = {
  appStore: {
    img: `${process.env.VUE_APP_AWS_S3}/app-store-badge.png`,
    link: 'http://example.com'
  },
  googlePlay: {
    img: `${process.env.VUE_APP_AWS_S3}/google-play-badge.png`,
    link: 'http://example.com'
  }
}
export default {
  state: {
    installed: [],
    disclaimer: placeholder,
    mobileApp
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
      state.disclaimer = placeholder
      state.mobileApp = mobileApp
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
      state.mobileApp = mobileApp
    }
  },
  actions: {
    async addAddon ({ state, commit, dispatch, rootState }, addon) {
      commit('ADD_ADDON', addon)
      await dispatch('updateProject', rootState.projects.project)
    },
    async removeAddon ({ state, commit, dispatch, rootState }, name) {
      commit('REMOVE_ADDON', name)
      if (name === 'disclaimer') commit('SET_DISCLAIMER', placeholder)
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
