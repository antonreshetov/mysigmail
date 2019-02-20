<template>
  <div class="basic">
    <el-form>
      <el-form-item>
        <div class="image-preview-wrapper">
          <div
            class="image-preview"
            :style="{'background-image': `url(${image})` }"
          />
          <div class="image-preview__actions">
            <el-button
              class="upload"
              @click="openCropDialog"
            >Upload image</el-button>
            <span
              v-if="basic.image.base64"
              class="remove-image"
              @click="onClearImage"
            >
              <i class="el-icon-circle-close" />
            </span>
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
              <p>The uploaded image will be converted to base64.
                <el-popover
                  placement="top"
                  width="300"
                  trigger="click"
                  class="image-tips"
                >
                  <p>Some email client, like Gmail and Outlook do not support or may not display embedded images on base64 at all.</p>
                  <p>Use an image link instead of embedding it as base64.</p>
                  <span slot="reference">Tips.</span>
                </el-popover>
              </p>
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
    <!-- Upload image dialog -->
    <el-dialog
      title="Upload and crop image"
      :visible.sync="showCropDialog"
    >
      <div
        v-show="image"
        class="crop-preview"
      >
        <img
          ref="cropper"
          :src="image"
          alt="crop-preview"
        >
      </div>
      <el-upload
        ref="upload"
        action=""
        :on-change="onChange"
        :http-request="onUpload"
        :before-upload="onBeforeUpload"
        :multiple="false"
        :show-file-list="false"
        :auto-upload="false"
      >
        <div slot="trigger">
          <button
            ref="uploadButton"
            style="display: none;"
          />
        </div>
        <div class="upload-action">
          <el-button @click="$refs.uploadButton.click()">Select image</el-button>
          <el-button
            v-if="image"
            type="success"
            @click="onUpload"
          >Save</el-button>
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { guid } from '../util/helpers'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import FieldItem from './FieldItem'

export default {
  name: '',

  components: {
    FieldItem
  },

  data () {
    return {
      fieldName: '',
      filedValue: '',
      filedType: 'text',
      imageLink: '',
      showDialog: false,
      showCropDialog: false,
      showAlert: false,
      isLt10: false,
      cropper: undefined
    }
  },

  computed: {
    ...mapState(['attributes', 'basic']),
    image () {
      return this.basic.image.link
        ? this.basic.image.link
        : this.basic.image.base64
    },
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
      this.$store.dispatch('updateImage', { base64: '', link: this.imageUrl })
    },
    onClearImage () {
      this.$refs.upload.clearFiles()
      this.fileBase64 = ''
      this.$store.dispatch('updateImage', { base64: this.fileBase64 })
    },
    onClearImageLink () {
      this.imageLink = ''
      this.onAddLink()
    },
    onBeforeUpload (file) {
      this.checkUploadedFile(file)
    },
    checkUploadedFile (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      this.isLt10 = file.size < 10000

      return new Promise((resolve, reject) => {
        if (!isJPG && !isPNG) {
          const message = 'Uploaded file should be a .jpg or .png.'

          this.$message({ message, type: 'error' })

          reject(new Error(message))
          return
        }

        if (!this.isLt10) {
          this.$message({
            message: 'Warning, uploaded file is more than 10KB, and will be compressed.',
            type: 'warning'
          })
          resolve(true)
        }

        resolve(true)
      })
    },
    async onChange (file, fileList) {
      try {
        await this.checkUploadedFile(file.raw)
        const fileBase64 = await this.getBase64ImageFromBlob(file.raw)

        this.fileList = fileList
        this.$store.dispatch('updateImage', { base64: fileBase64, link: '' })

        this.initCropper()
      } catch (err) {
        console.error(err)
      }
    },
    async onUpload (data) {
      const res = await this.getCroppedImage()
      let fileBase64 = await this.getBase64ImageFromBlob(res.blob)

      if (!this.isLt10) fileBase64 = await this.compressImage(fileBase64)

      this.$store.dispatch('updateImage', { base64: fileBase64, link: '' })
      this.showCropDialog = false
    },
    async compressImage (base64) {
      const canvas = document.createElement('canvas')
      const img = document.createElement('img')

      return new Promise((resolve, reject) => {
        img.onload = function () {
          let width = img.width
          let height = img.height

          const maxHeight = 200
          const maxWidth = 200

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height *= maxWidth / width)
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width *= maxHeight / height)
              height = maxHeight
            }
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)

          resolve(canvas.toDataURL('image/jpeg', 0.7))
        }

        img.onerror = function (err) {
          reject(err)
        }

        img.src = base64
      })
    },
    getBase64ImageFromBlob (blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.addEventListener(
          'load',
          function () {
            resolve(reader.result)
          },
          false
        )

        reader.onerror = (err) => {
          return reject(new Error(err))
        }
        reader.readAsDataURL(blob)
      })
    },
    openCropDialog () {
      this.showCropDialog = true
      this.$nextTick(() => {
        this.initCropper()
      })
    },
    initCropper () {
      if (typeof this.cropper === 'object') {
        this.cropper.destroy()
      }
      this.$nextTick(() => {
        this.cropper = new Cropper(this.$refs.cropper, {
          aspectRatio: 1,
          viewMode: 1,
          autoCropArea: 1
        })
      })
    },
    getCroppedImage () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve({
            blob: blob,
            url: URL.createObjectURL(blob)
          })
        })
      })
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
  // display: block;
  // text-align: right;
  // position: relative;
  border-bottom: 1px dashed;
  .el-popover__reference {
    cursor: pointer;
  }
}
.crop-preview {
  padding: 2px 0;
  overflow: hidden;
  max-height: 250px;
  margin-bottom: 20px;
  img {
     max-width: 100%;
  }
  &__placeholder {
    width: 100%;
    height: 200px;
    background-color: #eee;
    border: 1px dashed $color-info;
    border-radius: 3px;
  }
}
.upload-action {
  text-align: center;
}
</style>
