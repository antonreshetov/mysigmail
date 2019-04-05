import fields from '../../db/main-fields'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      filterFields: ['Full name', 'Job title', 'Company'],
      s3url: process.env.VUE_APP_AWS_S3_URL
    }
  },

  computed: {
    ...mapState(['basic', 'options', 'addons', 'socials', 'template']),
    image () {
      return this.basic.image.link
    },
    isEmpty () {
      return this.basic.fields.every(item => item.value.length === 0)
    },
    mainFields () {
      if (this.isEmpty) {
        return fields.basicPlaceholder.filter(item =>
          this.filterFields.includes(item.name)
        )
      }
      return this.basic.fields.filter(item =>
        this.filterFields.includes(item.name)
      )
    },
    otherFields () {
      if (this.isEmpty) {
        return fields.basicPlaceholder.filter(
          item => !this.filterFields.includes(item.name)
        )
      }
      return this.basic.fields.filter(
        item => !this.filterFields.includes(item.name)
      )
    },
    showAvatar () {
      return this.options.avatar.show
    },
    fontBase () {
      return {
        fontSize: `${this.options.font.size}px`,
        fontFamily: this.options.font.family
      }
    }
  },
  methods: {
    formatLink (value) {
      return /^https?/.test(value) ? value : `http://${value}`
    },
    isAdded (name) {
      return this.addons.installed.findIndex(i => i.name === name) > -1
    }
  }
}
