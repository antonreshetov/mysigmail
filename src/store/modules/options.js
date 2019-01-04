const initState = {
  avatar: {
    size: 100,
    roundness: 0
  },
  font: {
    size: 12,
    family: 'Arial, Helvetica, sans-serif'
  },
  color: {
    main: '#409eff',
    secondary: '#409eff'
  },
  separator: '/'
}

export default {
  state: {
    avatar: {
      size: 100,
      roundness: 0
    },
    font: {
      size: 12,
      family: 'Arial, Helvetica, sans-serif'
    },
    color: {
      main: '#409eff',
      secondary: '#409eff'
    },
    separator: '/'
  },

  getters: {
    getOptions: state => state
  },
  mutations: {
    SET_OPTIONS (state, data) {
      state.options = { ...state.options, ...data }
    },
    SET_COLOR (state, data) {
      state.color = { ...state.color, ...data }
    },
    SET_AVATAR (state, data) {
      state.avatar = { ...state.avatar, ...data }
    },
    SET_FONT (state, data) {
      state.font = { ...state.font, ...data }
    },
    SET_SEPARATOR (state, data) {
      state.separator = data
    },
    RESET_OPTIONS (state) {
      Object.keys(initState).forEach(k => {
        state[k] = initState[k]
      })
    },
    SET_OPTION_STATE (state, data) {
      state = Object.assign(state, data)
    }
  },
  actions: {
    async updateAvatar ({ rootState, dispatch, commit }, data) {
      commit('SET_AVATAR', data)
      if (rootState.projects.project.id) {
        await dispatch('updateProject', rootState.projects.project)
      }
    },
    async updateColor ({ rootState, dispatch, commit }, data) {
      commit('SET_COLOR', data)
      if (rootState.projects.project.id) {
        await dispatch('updateProject', rootState.projects.project)
      }
    },
    async updateFont ({ rootState, dispatch, commit }, data) {
      commit('SET_FONT', data)
      if (rootState.projects.project.id) {
        await dispatch('updateProject', rootState.projects.project)
      }
    },
    async updateSeparator ({ rootState, dispatch, commit }, data) {
      commit('SET_SEPARATOR', data)
      if (rootState.projects.project.id) {
        await dispatch('updateProject', rootState.projects.project)
      }
    }
  }
}
