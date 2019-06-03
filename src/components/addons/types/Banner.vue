<template>
  <div class="banner">
    <el-row :gutter="20">
      <el-col :span="24">
        <upload
          :crop-width="600"
          @upload="onUpload"
        />
      </el-col>
      <el-col :span="16">
        <el-input
          v-model="bannerImage"
          placeholder="http://"
          clearable
          @clear="onClearImageLink"
        />
        <div class="desc">
          <p>You can upload image or add the public link to image.</p>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button
          style="width: 100%;"
          @click="onAddImageLink"
        >Add link</el-button>
      </el-col>
      <el-col :span="24">
        <p>Banner linking to</p>
        <el-input
          v-model="bannerLink"
          placeholder="http://"
          clearable
        />

      </el-col>
    </el-row>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import { mapState } from 'vuex'

export default {
  name: 'Banner',

  components: {
    Upload
  },

  data () {
    return {
      url: ''
    }
  },

  computed: {
    ...mapState(['addons']),
    bannerImage: {
      get () {
        return this.addons.banner.image
      },
      set (v) {
        this.url = v
      }
    },
    bannerLink: {
      get () {
        return this.addons.banner.link
      },
      set (v) {
        this.$store.dispatch('updateBanner', { link: v })
      }
    }
  },

  methods: {
    onUpload (url) {
      this.$store.dispatch('updateBanner', { image: url })
    },
    onAddImageLink () {
      this.$store.dispatch('updateBanner', { image: this.url })
    },
    onClearImageLink () {
      this.imageLink = ''
      this.onAddImageLink()
    }
  }
}
</script>

<style lang="scss">
.banner {
  .upload {
    margin-bottom: 20px;
    p {
      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
