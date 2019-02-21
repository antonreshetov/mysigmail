<template>
  <div class="disclaimer-addon">
    <el-input
      v-model="disclaimer"
      type="textarea"
      :rows="6"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Disclaimer',

  computed: {
    ...mapState(['addons']),
    disclaimer: {
      get () {
        return this.addons.disclaimer
      },
      set (v) {
        this.$store.dispatch('updateDisclaimer', v)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
