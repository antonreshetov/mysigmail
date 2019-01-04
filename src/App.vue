<template>
  <div id="app" v-page-loading="app.loading">
    <sidebar></sidebar>
    <config-panel></config-panel>
    <preview></preview>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import ConfigPanel from './components/ConfigPanel'
import Preview from './components/Preview'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Sidebar,
    ConfigPanel,
    Preview
  },

  async created () {
    this.$store.commit('SET_LOADING', true)
    await this.$store.dispatch('addInitialProject')
    this.$store.commit('SET_LOADING', false)
  },

  computed: {
    ...mapState(['app', 'basic', 'options'])
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
#app {
  display: grid;
  grid-template-columns: 85px 550px 1fr;
  height: 100vh;
}
.desc {
  flex-grow: 1;
  font-size: 12px;
  line-height: 1.5em;
  color: #aaa;
}
</style>
