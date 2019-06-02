<template>
  <div class="basic">
    <el-form>
      <el-form-item>
        <div class="image-preview-wrapper">
          <div
            class="image-preview"
            :style="{'background-image': `url(${imageUrl})` }"
          />
          <div class="image-preview__actions">
            <upload
              :crop-width="200"
              :crop-height="200"
              @upload="onUpload"
            />
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input
                  v-model="imageUrl"
                  placeholder="http://"
                  clearable
                  @clear="onClearImageLink"
                />
              </el-col>
              <el-col :span="8">
                <el-button @click="onAddLink">Add link</el-button>
              </el-col>
            </el-row>
            <div class="desc">
              <p>You can upload image or add the public link to image.</p>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in basic.fields"
          :key="item.id"
          :span="12"
        >
          <field-item
            :is-addon-field="index > 5"
            :index="index"
          />
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%;"
          @click="onAddField"
        >Add custom field</el-button>
      </el-form-item>
    </el-form>
    <!-- Add new field dialog -->
    <el-dialog
      title="Add new field"
      :visible.sync="showDialog"
    >
      <el-alert
        v-if="showAlert"
        title="Label is exist"
        type="error"
        :closable="false"
      />
      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Label">
              <el-input
                ref="fieldName"
                v-model.trim="fieldName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Value">
              <el-input v-model.trim="filedValue" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Type">
              <el-select
                v-model="filedType"
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
        </el-row>
        <el-form-item style="text-align: right;">
          <el-button
            type="primary"
            @click="addField"
          >Add field</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { guid } from '../util/helpers'
import FieldItem from './FieldItem'
import Upload from '@/components/Upload'

export default {
  name: 'Basic',

  components: {
    FieldItem,
    Upload
  },

  data () {
    return {
      fieldName: '',
      filedValue: '',
      filedType: 'text',
      imageLink: '',
      showDialog: false,
      showAlert: false
    }
  },

  computed: {
    ...mapState(['attributes', 'basic']),
    imageUrl: {
      get () {
        return this.basic.image.link
      },
      set (v) {
        this.$store.dispatch('updateImage', { link: v })
      }
    }
  },

  created () {
    this.$ga.page(this.$router)
  },

  methods: {
    addField () {
      const newFiled = {
        name: this.fieldName,
        value: this.filedValue,
        type: this.filedType,
        id: guid()
      }

      this.$store.dispatch('addField', newFiled)
      this.fieldName = ''
      this.filedValue = ''
      this.showDialog = false
    },
    onAddField () {
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.fieldName.focus()
      })
    },
    onAddLink () {
      this.$store.dispatch('updateImage', { link: this.imageUrl })
    },
    onClearImageLink () {
      this.imageLink = ''
      this.onAddLink()
    },
    onUpload (url) {
      this.$store.dispatch('updateImage', { link: url })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.image-preview-wrapper {
  display: flex;
  margin-top: 20px;
  .image-preview {
    margin-right: 30px;
    width: 100px;
    height: 100px;
    background-color: #eee;
    border-radius: 100%;
    background-size: 100px;
    background-position: center center;
    background-size: cover;
    flex-shrink: 0;
    overflow: hidden;
    &__actions {
      width: 100%;
      .upload {
        margin-bottom: 20px;
      }
    }
  }
  .remove-image {
    padding: 10px;
    cursor: pointer;
    &:hover {
      i {
        color: #909399;
      }
    }
    i {
      color: #c0c4cc;
    }
  }

  .el-button {
    height: 40px;
  }
  .el-upload {
    display: inline-block;
    margin-bottom: 20px;
  }
}
.remove-field {
  display: inline-block;
  cursor: pointer;
}
.edit {
  i {
    color: $color-primary;
  }
  &:hover {
    i {
      color: darken($color-primary, 20%);
    }
  }
}
.delete {
  i {
    color: red;
  }
  &:hover {
    i {
      color: darken(red, 20%);
    }
  }
}
.image-tips {
  border-bottom: 1px dashed;
  .el-popover__reference {
    cursor: pointer;
  }
}
</style>
