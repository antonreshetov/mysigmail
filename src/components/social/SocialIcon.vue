<template>
  <div
    class="socials__icon"
    :class="{'installed': isInstalled}"
    @click="addSocial"
  >
    <svg-icon
      width="20"
      height="20"
      :icon="model.icon"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SvgIcon from '../SvgIcon'

export default {
  name: 'SocialIcon',

  components: {
    SvgIcon
  },

  props: {
    name: {
      type: Object,
      default: () => {}
    },
    icon: {
      type: String,
      default: undefined
    },
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    ...mapState(['socials']),
    model () {
      return this.socials.list.find(i => i.name === this.data.name)
    },
    isInstalled () {
      if (this.socials.installed.length > 0) {
        return this.socials.installed.find(i => i.icon === this.data.icon)
      }
    }
  },

  methods: {
    addSocial () {
      this.$store.dispatch('addSocial', this.model)
    }
  }

}
</script>

<style lang="scss">
.socials__icon {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  width: 38px;
  border-radius: 5px;
  border: 1px solid #ddd;
  cursor: pointer;
  svg {
    fill: #ddd;
  }
  &.installed {
    svg {
      fill: #000;
    }
  }
}
</style>
