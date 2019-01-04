import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import attributes from './modules/attributes'
import projects from './modules/projects'
import basic from './modules/basic'
import options from './modules/options'
import template from './modules/template'
import addons from './modules/addons'
import socials from './modules/socials'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    attributes,
    projects,
    basic,
    options,
    template,
    addons,
    socials
  }
})
