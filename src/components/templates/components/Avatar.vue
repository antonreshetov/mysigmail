<template>
  <div
    v-if="showAvatar"
    style="margin-right: 10px;"
    :style="computedStyle"
  >
    <img
      v-if="src"
      :src="src"
      :style="{
        'width': size + 'px',
        'border-radius': roundness + 'px',
      }"
      alt="avatar"
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Avatar',

  props: {
    showAvatar: {
      type: Boolean,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    roundness: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapState(['basic']),
    computedStyle () {
      const style = {
        width: this.size + 'px',
        borderRadius: this.roundness + 'px'
      }

      if (!this.basic.image.link) {
        style.height = this.size + 'px'
        style.background = `#eee`
      }

      return style
    }
  }
}
</script>
