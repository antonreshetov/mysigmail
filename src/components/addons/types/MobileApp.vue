<template>
  <div class="mobile-app-addon">
    <div class="grid">
      <div class="col">
        <div class="mobile-app-addon__badge">
          <img
            :src="addons.mobileApp.appStore.img"
            alt=""
          >
        </div>
      </div>
      <div class="col">
        <el-input v-model="appStoreLink" />
      </div>
      <div class="col">
        <div class="mobile-app-addon__badge">
          <img
            :src="addons.mobileApp.googlePlay.img"
            alt=""
          >
        </div>
      </div>
      <div class="col">
        <el-input v-model="googlePlayLink" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MobileApp',

  data () {
    return {

    }
  },

  computed: {
    ...mapState(['addons']),
    appStoreLink: {
      get () {
        return this.addons.mobileApp.appStore.link
      },
      set (v) {
        this.$store.dispatch('updateMobileApp', { key: 'appStore', payload: { link: v } })
      }
    },
    googlePlayLink: {
      get () {
        return this.addons.mobileApp.googlePlay.link
      },
      set (v) {
        this.$store.dispatch('updateMobileApp', { key: 'googlePlay', payload: { link: v } })
      }
    }
  }
}
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-gap: 10px;
}
.mobile-app-addon {
  &__badge {
    img {
      width: 100%;
      max-height: 40px;
    }
  }
}
</style>
