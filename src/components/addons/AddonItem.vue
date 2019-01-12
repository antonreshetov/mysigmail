<template>
  <div class="addon-item">
    <div
      class="addon-item__header"
      :style="{
        'border-bottom-left-radius': open ? 0 : '3px',
        'border-bottom-right-radius': open ? 0 : '3px'
      }"
      @click="onEdit"
    >
      <div class="addon-item__header-title">{{ title }}</div>
      <div class="addon-item__header-actions">
        <!-- <el-button size="mini" type="text" @click="onEdit">
          Edit
          <i class="el-icon-setting"></i>
        </el-button>-->
        <el-button
          size="mini"
          type="text"
          @click.stop="onDelete"
        >
          Delete
          <i class="el-icon-delete" />
        </el-button>
      </div>
    </div>
    <div
      v-if="open"
      class="addon-item__body"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddonItem',

  props: {
    title: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: undefined
    }
  },

  data () {
    return {
      open: false
    }
  },

  computed: {
    isSlot () {
      return this.$slots.default
    }
  },

  methods: {
    onEdit () {
      this.open = !this.open
    },
    onDelete () {
      this.$store.dispatch('removeAddon', this.name)
    }
  }
}
</script>

<style lang="scss">
.addon-item {
  &__header {
    display: grid;
    grid-template-columns: 2fr 1fr;
    border: 1px solid #e4e7ed;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: #f2f6fc;
    padding: 10px 15px;
    align-items: center;
    cursor: pointer;
    &-actions {
      text-align: right;
    }
  }
  &__body {
    border: 1px solid #e4e7ed;
    border-top: none;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 15px;
  }
  + .addon-item {
    margin-top: 10px;
  }
}
</style>
