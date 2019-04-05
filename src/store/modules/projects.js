import {
  getAllProjects,
  saveProject,
  updateProjectById
} from '../../db/indexedDB'

export default {
  state: {
    project: {},
    projects: []
  },
  getters: {
    getProjects: state => state
  },
  mutations: {
    SET_PROJECT (state, data) {
      state.project = data
    },
    SET_PROJECTS (state, data) {
      state.projects = data
    }
  },
  actions: {
    async getProjects ({ commit }) {
      let res = await getAllProjects()
      res = res.filter(i => i.id !== 'currentProject')
      commit('SET_PROJECTS', res)
    },
    async newProject ({ commit, dispatch, state, rootState }, data) {
      dispatch('resetProject')

      const project = {
        template: 'SignatureTemplate1',
        basic: { ...rootState.basic },
        options: { ...rootState.options },
        addons: {
          installed: []
        },
        socials: {
          installed: []
        }
      }

      await saveProject(project)
      await dispatch('getProjects')
      await dispatch('setProject', state.projects[state.projects.length - 1])
    },
    async importProject ({ state, commit, dispatch, rootState }, data) {
      await saveProject(data)
      await dispatch('getProjects')
      await dispatch('setProject', data)
    },
    async updateProject ({ commit, dispatch, rootState }, data) {
      const addons = { ...rootState.addons }

      if (addons.installed.length === 0) {
        for (let i in addons) {
          delete addons[i]
        }
      }
      const socials = { ...rootState.socials }
      if (socials.installed.length === 0) {
        for (let i in socials) {
          delete socials[i]
        }
      }

      const options = { ...rootState.options }
      delete options.color.mainPreview
      delete options.color.secondaryPreview

      const project = {
        ...data,
        template: rootState.template.selected,
        addons,
        socials: {
          installed: rootState.socials.installed
        },
        basic: { ...rootState.basic },
        options
      }

      await updateProjectById(project)
      await dispatch('getProjects')
      commit('SET_PROJECT', data)
    },
    async setProject ({ commit, dispatch }, data) {
      dispatch('resetProject')

      // Fallback to set correct name of signature template
      // TODO: remove later
      if (data.template === 'EmailTemplate1') {
        data.template = 'SignatureTemplate1'
      }

      commit('SET_PROJECT', data)
      commit('SET_BASIC_STATE', data.basic)
      commit('SET_OPTION_STATE', data.options)
      commit('SET_TEMPLATE_SELECTED', data.template)
      commit('SET_ADDONS_STATE', data.addons)
      commit('SET_SOCIAL_STATE', data.socials)
      await saveProject({ id: 'currentProject', projectId: data.id }, true)
    },
    async setCurrentProject ({ state, commit, dispatch }) {
      let res = await getAllProjects()
      res = res.find(i => i.id === 'currentProject')

      const project = state.projects.find(item => item.id === res.projectId)

      if (project) {
        dispatch('setProject', project)
      } else {
        dispatch('setProject', state.projects[0])
      }
    },
    async addInitialProject ({ state, dispatch }) {
      await dispatch('getProjects')

      if (state.projects.length === 0) {
        await dispatch('newProject')
        await dispatch('setProject', state.projects[0])
      } else {
        await dispatch('setCurrentProject')
      }
    },
    resetProject ({ state, commit, dispatch, rootState }) {
      commit('RESET_BASIC_FIELDS')
      commit('RESET_OPTIONS')
      commit('RESET_ADDONS')
      commit('RESET_SOCIAL')
    }
  }
}
