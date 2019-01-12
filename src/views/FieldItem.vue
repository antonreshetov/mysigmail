<template>
  <el-form-item :label="name || 'No label'">
    <el-popover
      v-model="popover"
      placement="top"
      title="Edit field"
      width="350"
      trigger="manual"
    >
      <div>
        <el-form size="small">
          <el-col :span="12">
            <el-form-item label="Label">
              <el-input v-model.trim="name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Type">
              <el-select
                v-model="type"
                style="width:100%;"
              >
                <el-option
                  v-for="item in attributes.types"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item style="text-align: right;">
              <el-button
                type="danger"
                @click="onRemoveFiled"
              >Remove</el-button>
              <el-button @click="popover = false">Close</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div
        slot="reference"
        class="popover-pos"
      />
    </el-popover>
    <i
      v-if="isAddonField"
      class="field-settings el-icon-setting"
      @click="onEdit"
    />
    <el-input
      v-model.trim="value"
      tabindex="1"
    />
  </el-form-item>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: '',

  props: {
    isAddonField: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      popover: false
    }
  },

  computed: {
    ...mapState(['basic', 'attributes']),
    value: {
      get () {
        return this.basic.fields[this.index].value
      },
      set (v) {
        this.$store.dispatch('updateField', { index: this.index, data: { value: v } })
      }
    },
    name: {
      get () {
        return this.basic.fields[this.index].name
      },
      set (v) {
        this.$store.dispatch('updateField', { index: this.index, data: { name: v } })
      }
    },
    type: {
      get () {
        return this.basic.fields[this.index].type
      },
      set (v) {
        this.$store.dispatch('updateField', { index: this.index, data: { type: v } })
      }
    }
  },

  methods: {
    onEdit () {
      this.popover = !this.popover
    },
    onRemoveFiled () {
      this.$store.dispatch('removeField', this.index)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.field-settings {
  position: absolute;
  right: -10px;
  top: 4px;
  color: $color-info;
  cursor: pointer;
  padding: 10px;
  &:hover {
    color: $color-primary;
  }
}
.popover-pos {
  position: relative;
  top: 20px;
}
</style>
