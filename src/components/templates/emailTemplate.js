import fields from '../../db/main-fields'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      filterFields: ['Full name', 'Job title', 'Company']
    }
  },

  computed: {
    ...mapState(['basic', 'options', 'addons', 'socials']),
    image () {
      return this.basic.image.link
        ? this.basic.image.link
        : this.basic.image.base64
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
      return !this.options.avatar.hidden
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
