<template>
  <div class="social">
    <div class="socials">
      <social-icon
        v-for="i in socials.list"
        :key="i.name"
        :data="i"
      />
    </div>
    <h3 />
    <el-form label-position="top">
      <draggable
        v-model="sort"
        :options="{handle: '.drag'}"
      >
        <social-field
          v-for="(i, index) in socials.installed"
          :key="i.name"
          :icon="i.icon"
          :index="index"
        />
      </draggable>
      <el-form-item />
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SocialIcon from '../components/social/SocialIcon'
import SocialField from '../components/social/SocialField'
import draggable from 'vuedraggable'

export default {
  name: '',

  components: {
    SocialIcon,
    SocialField,
    draggable
  },

  data () {
    return {
      draggableOptions: {
        handle: '.drag'
      }
    }
  },

  computed: {
    ...mapState(['socials']),
    sort: {
      get () {
        return this.socials.installed
      },
      set (v) {
        this.$store.dispatch('updateSort', v)
      }
    }
  },

  created () {
    this.$ga.page(this.$router)
  },

  methods: {
    addSocial () {

    },
    isInstalled (name) {
      return this.social.installed.findIndex(i => i.name === name) > -1
    },
    onDelete (index) {
      this.$store.dispatch('removeSocial', index)
    },
    onDrag () {

    }
  }
}
</script>

<style lang="scss">
.socials {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(10, auto);
  grid-auto-columns: 1fr;
}
</style>
