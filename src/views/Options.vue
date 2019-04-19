<template>
  <div class="options">
    <el-form
      label-position="left"
      label-width="150px"
    >
      <el-form-item label="Main color">
        <el-color-picker
          ref="colorPicker"
          v-model="mainColor"
          @active-change="onPreviewMainColor"
        />
      </el-form-item>
      <el-form-item label="Secondary color">
        <el-color-picker
          ref="colorPicker2"
          v-model="secondaryColor"
          @active-change="onPreviewSecondaryColor"
        />
      </el-form-item>
      <el-form-item label="Avatar">
        <el-switch v-model="showAvatar" />
      </el-form-item>
      <el-collapse-transition>
        <div v-if="showAvatar">
          <el-form-item label="Avatar size">
            <el-slider
              v-model="avatarSize"
              :min="attributes.avatar.min"
              :max="attributes.avatar.max"
            />
          </el-form-item>
          <el-form-item label="Avatar shape">
            <el-select v-model="avatarShape">
              <el-option
                v-for="item in attributes.avatar.roundness"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.label ==='Round' && !isImageSquare"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-collapse-transition>
      <el-form-item label="Font family">
        <el-select v-model="fontFamily">
          <el-option-group
            v-for="group in attributes.font.family"
            :key="group.value"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="Font size">
        <el-select v-model="fontSize">
          <el-option
            v-for="item in attributes.font.size"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Job separator">
        <el-select v-model="separator">
          <el-option
            v-for="item in attributes.separator.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: '',

  data () {
    return {
    }
  },

  computed: {
    ...mapState(['options', 'attributes', 'projects', 'basic']),
    mainColor: {
      get () {
        return this.options.color.main
      },
      set (v) {
        this.$store.dispatch('updateOptions', { color: { main: v } })
        this.$store.commit('SET_COLOR', { mainPreview: undefined })
      }
    },
    secondaryColor: {
      get () {
        return this.options.color.secondary
      },
      set (v) {
        this.$store.dispatch('updateOptions', { color: { secondary: v } })
        this.$store.commit('SET_COLOR', { secondaryPreview: undefined })
      }
    },
    fontSize: {
      get () {
        return this.options.font.size
      },
      set (v) {
        this.$store.dispatch('updateOptions', { font: { size: v } })
      }
    },
    fontFamily: {
      get () {
        return this.options.font.family
      },
      set (v) {
        this.$store.dispatch('updateOptions', { font: { family: v } })
      }
    },
    showAvatar: {
      get () {
        return this.options.avatar.show
      },
      set (v) {
        this.$store.dispatch('updateOptions', { avatar: { show: v } })
      }
    },
    avatarShape: {
      get () {
        return this.options.avatar.roundness
      },
      set (v) {
        this.$store.dispatch('updateOptions', { avatar: { roundness: v } })
      }
    },
    avatarSize: {
      get () {
        return this.options.avatar.size
      },
      set (v) {
        this.$store.dispatch('updateOptions', { avatar: { size: v } })
      }
    },
    separator: {
      get () {
        return this.options.separator
      },
      set (v) {
        this.$store.dispatch('updateOptions', { separator: v })
      }
    },
    isImageSquare () {
      const img = document.createElement('img')
      img.src = this.basic.image.link
      return img.width === img.height
    }
  },

  watch: {
    'options.color.main' (v) {
      if (v === null) this.$store.commit('SET_COLOR', { main: '#000000' })
    },
    'options.color.secondary' (v) {
      if (v === null) this.$store.commit('SET_COLOR', { secondary: '#000000' })
    }
  },

  created () {
    this.$ga.page(this.$router)
  },

  mounted () {
    this.onCloseColorPicker()
  },

  methods: {
    onPreviewMainColor (v) {
      this.$store.commit('SET_COLOR', { mainPreview: v })
    },
    onPreviewSecondaryColor (v) {
      this.$store.commit('SET_COLOR', { secondaryPreview: v })
    },
    resetPreviewColor () {
      this.$store.commit('SET_COLOR', { mainPreview: undefined })
      this.$store.commit('SET_COLOR', { secondaryPreview: undefined })
    },
    onCloseColorPicker () {
      this.$refs.colorPicker.$children[0].$on('input', e => {
        if (!e) this.resetPreviewColor()
      })
      this.$refs.colorPicker2.$children[0].$on('input', e => {
        if (!e) this.resetPreviewColor()
      })
    }
  }
}
</script>

<style label="scss">
.options {
  margin-top: 30px;
}
</style>
