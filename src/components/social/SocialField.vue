<template>
  <el-form-item :label="model.name">
    <el-row>
      <el-col :span="21">
        <el-input v-model="link" />
      </el-col>
      <el-col :span="3">
        <span
          class="social-field-action delete"
          @click="onDelete(index)"
        >
          <i class="el-icon-delete" />
        </span>
        <span class="social-field-action drag">
          <drag-icon />
        </span>
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script>
import { mapState } from 'vuex'
import DragIcon from '../../assets/image/menu.svg'

export default {
  name: 'SocialField',

  components: {
    DragIcon
  },

  props: {
    index: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: undefined
    }
  },

  computed: {
    ...mapState(['socials']),
    model () {
      return this.socials.installed.find(i => i.icon === this.icon)
    },
    link: {
      get () {
        return this.model.link
      },
      set (v) {
        this.$store.dispatch('updateSocial', { index: this.index, data: v })
      }
    }
  },

  methods: {
    onDelete () {
      this.$store.dispatch('removeSocial', this.index)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.social-field-action {
  padding: 5px 7px;
  cursor: pointer;
  i {
    color: #aaa;
  }
  &.delete {
    &:hover {
      i {
        color: $color-danger;
      }
    }
  }
}
.drag {
  cursor: move;
  svg {
    position: relative;
    top: 1px;
    width: 13px;
    fill: #aaa;
  }
}
</style>
