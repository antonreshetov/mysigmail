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
            <el-button
              class="upload"
              @click="openCropDialog"
            >Upload image</el-button>
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
    <!-- Upload image dialog -->
    <el-dialog
      title="Upload and crop image"
      :visible.sync="showCropDialog"
    >
      <div class="crop-preview-wrapper">

        <div
          v-show="cropPreview"
          class="crop-preview"
        >
          <img
            ref="cropper"
            :src="cropPreview"
            alt="crop-preview"
          >
        </div>
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
        <div
          v-if="cropPreview"
          class="aspect-ratio-buttons"
        >
          <el-radio-group
            v-model="aspectRatio"
            size="mini"
            @change="changeAspectRation"
          >
            <el-radio-button :label="1">1:1</el-radio-button>
            <el-radio-button :label="4 / 3">4:3</el-radio-button>
            <el-radio-button :label="2 / 3">2:3</el-radio-button>
            <el-radio-button :label="16 / 9">16:9</el-radio-button>
            <el-radio-button :label="NaN">Free</el-radio-button>
          </el-radio-group>
        </div>
        <div class="upload-action">
          <el-button @click="$refs.uploadButton.click()">Select image</el-button>
          <el-button
            v-if="cropPreview"
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
import FieldItem from './FieldItem'
import S3 from 'aws-sdk/clients/s3'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

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
      fileRaw: '',
      imageLink: '',
      showDialog: false,
      showCropDialog: false,
      showAlert: false,
      isLt10: false,
      cropper: undefined,
      aspectRatio: 1
    }
  },

  computed: {
    ...mapState(['attributes', 'basic']),
    cropPreview () {
      if (this.fileRaw) {
        return URL.createObjectURL(this.fileRaw)
      }
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
      this.$store.dispatch('updateImage', { link: this.imageUrl })
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

      return new Promise((resolve, reject) => {
        if (!isJPG && !isPNG) {
          const message = 'Uploaded file should be a .jpg or .png.'

          this.$message({ message, type: 'error' })
          reject(new Error(message))
        }

        resolve(true)
      })
    },
    async onChange (file, fileList) {
      try {
        await this.checkUploadedFile(file.raw)
        this.fileRaw = file.raw
        this.initCropper()
      } catch (err) {
        console.error(err)
      }
    },
    async onUpload (data) {
      const url = await this.uploadToS3()

      this.$store.dispatch('updateImage', { link: url })
      this.showCropDialog = false
      this.fileRaw = ''
    },
    async uploadToS3 () {
      const bucket = new S3({
        accessKeyId: process.env.VUE_APP_AWS_S3_ID,
        secretAccessKey: process.env.VUE_APP_AWS_S3_KEY,
        region: process.env.VUE_APP_AWS_S3_REGION
      })

      const name = this.fileRaw.name
      const ext = name.match(/.jpg|.jpeg|.png$/i)[0]
      const date = new Date().toJSON().substr(0, 10)
      const file = `${date}-${guid()}${ext}`
      const key = `upload/${file}`
      const croppedImage = await this.getCroppedImage()

      return new Promise((resolve, reject) => {
        bucket.putObject({
          Bucket: process.env.VUE_APP_AWS_S3_BASKET,
          Key: key,
          ContentType: this.fileRaw.type,
          Body: croppedImage.blob
        }, (err, data) => {
          if (err) return reject(err)
          const res = process.env.VUE_APP_AWS_S3_URL + '/' + key
          return resolve(res)
        })
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
    changeAspectRation (aspect) {
      this.aspectRatio = aspect
      this.cropper.setAspectRatio(this.aspectRatio)
    },
    getCroppedImage () {
      const width = 200
      const height = 200
      const quality = 0.9

      return new Promise(resolve => {
        this.cropper.getCroppedCanvas({
          width,
          height,
          imageSmoothingQuality: 'medium'
        }).toBlob(blob => {
          resolve({
            blob: blob,
            url: URL.createObjectURL(blob)
          })
        }, this.fileRaw.type, quality)
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
  border-bottom: 1px dashed;
  .el-popover__reference {
    cursor: pointer;
  }
}
.crop-preview-wrapper {
   overflow: hidden;
   padding-bottom: 5px;
}
.crop-preview {
  padding: 2px 0;
  max-height: 250px;
  padding-bottom: 20px;
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
.upload-action, .aspect-ratio-buttons {
  text-align: center;
}
.aspect-ratio-buttons {
  margin-bottom: 10px;
}
</style>
