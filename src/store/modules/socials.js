export default {
  state: {
    installed: [],
    list: [
      { name: 'Facebook', link: '', icon: 'facebook' },
      { name: 'VK', link: '', icon: 'vk' },
      { name: 'Twitter', link: '', icon: 'twitter' },
      { name: 'Instagram', link: '', icon: 'instagram' },
      { name: 'Linkedin', link: '', icon: 'linkedin' },
      { name: 'YouTube', link: '', icon: 'youtube' },
      { name: 'Skype', link: '', icon: 'skype' },
      { name: 'Telegram', link: '', icon: 'telegram' },
      { name: 'WhatsApp', link: '', icon: 'whatsapp' },
      { name: 'Dribbble', link: '', icon: 'dribbble' },
      { name: 'Behance', link: '', icon: 'behance' },
      { name: 'GitHub', link: '', icon: 'github' },
      { name: 'GitLab', link: '', icon: 'gitlab' },
      { name: 'StackOverflow', link: '', icon: 'stackoverflow' },
      { name: 'Xing', link: '', icon: 'xing' },
      { name: 'Diaspora', link: '', icon: 'diaspora' },
      { name: 'Mastodon', link: '', icon: 'mastodon' },
      { name: 'Slack', link: '', icon: 'slack' },
      { name: 'Reddit', link: '', icon: 'reddit' },
      { name: 'Gitter', link: '', icon: 'gitter' },
      { name: 'OK', link: '', icon: 'ok' }
    ]
  },
  getters: {},
  mutations: {
    ADD_SOCIAL (state, data) {
      const index = state.installed.findIndex(i => i.name === data.name)
      if (index === -1) state.installed.push(data)
    },
    REMOVE_SOCIAL (state, index) {
      state.installed.splice(index, 1)
    },
    SET_SOCIAL (state, { index, data }) {
      state.installed[index].link = data
    },
    SET_SOCIAL_STATE (state, data) {
      state = Object.assign(state, data)
    },
    SET_INSTALLED_STATE (state, data) {
      state.installed = data
    },
    RESET_SOCIAL (state) {
      state.installed = []
    }
  },
  actions: {
    async addSocial ({ state, commit, dispatch, rootState }, data) {
      commit('ADD_SOCIAL', data)
      await dispatch('updateProject', rootState.projects.project)
    },
    async removeSocial ({ state, commit, dispatch, rootState }, index) {
      commit('REMOVE_SOCIAL', index)
      await dispatch('updateProject', rootState.projects.project)
    },
    async updateSocial ({ commit, dispatch, rootState }, { index, data }) {
      commit('SET_SOCIAL', { index, data })
      await dispatch('updateProject', rootState.projects.project)
    },
    async updateSort ({ state, commit, dispatch, rootState }, data) {
      commit('SET_INSTALLED_STATE', data)
      await dispatch('updateProject', rootState.projects.project)
    }
  }
}
