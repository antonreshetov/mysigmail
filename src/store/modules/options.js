import { merge } from 'lodash-es'

const INIT_STATE = {
  avatar: {
    size: 100,
    roundness: 0,
    show: true
  },
  font: {
    size: 12,
    family: 'Arial, Helvetica, sans-serif'
  },
  color: {
    main: '#409eff',
    mainPreview: undefined,
    secondary: '#409eff',
    secondaryPreview: undefined
  },
  separator: '/'
}

export default {
  state: {
    avatar: {
      size: 100,
      roundness: 0,
      show: true
    },
    font: {
      size: 12,
      family: 'Arial, Helvetica, sans-serif'
    },
    color: {
      main: '#409eff',
      mainPreview: undefined,
      secondary: '#409eff',
      secondaryPreview: undefined
    },
    separator: '/'
  },

  getters: {
    getOptions: state => state
  },
  mutations: {
    SET_OPTIONS (state, data) {
      state = merge(state, data)
    },
    SET_COLOR (state, data) {
      state.color = { ...state.color, ...data }
    },
    RESET_OPTIONS (state) {
      Object.keys(INIT_STATE).forEach(k => {
        state[k] = INIT_STATE[k]
      })
    },
    SET_OPTION_STATE (state, data) {
      state = Object.assign(state, data)
    }
  },
  actions: {
    async updateOptions ({ commit, dispatch, rootState }, data) {
      commit('SET_OPTIONS', data)
      if (rootState.projects.project.id) {
        await dispatch('updateProject', rootState.projects.project)
      }
    }
  }
}
