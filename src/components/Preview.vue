<template>
  <div class="preview">
    <div class="preview__inner">
      <div class="preview__header">
        <el-row>
          <el-col :span="12">
            <h2>Signature preview</h2>
          </el-col>
          <el-col
            :span="12"
            style="text-align: right;"
          >
            <el-select
              v-model="selectTemplate"
              placeholder="Select template"
            >
              <el-option
                v-for="item in template.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
              <el-option
                value="-1"
                disabled
              >Soon more templates</el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="email">
        <div class="email-content">
          <div
            class="line short"
            style="margin-bottom: 30px;"
          />
          <div class="flex">
            <div class="column-1">
              <div class="line long full" />
              <div class="line long full" />
              <div class="line long full" />
              <div class="line long full" />
              <div class="line long full" />
              <div class="line long full" />
            </div>
            <div class="column-2">
              <carbon-ad v-if="isProd" />
            </div>
          </div>
          <div class="line long" />
          <div class="line long full" />
          <div class="line long full" />
        </div>
        <div
          ref="preview"
          class="email-preview"
        >
          <component
            :is="signatureTemplate"
            ref="template"
          />
        </div>
      </div>
      <div class="actions">
        <el-button-group>
          <el-button
            size="small"
            type
            @click="viewSource"
          >View source</el-button>
          <el-button
            size="small"
            @click="copySelect"
          >Copy as Select</el-button>
          <el-button
            ref="copyHTML"
            size="small"
            type="primary"
            @click="copyHTML"
          >Copy as HTML</el-button>
        </el-button-group>
        <br>
        <el-popover
          placement="top"
          width="260"
        >
          <el-button
            slot="reference"
            size="small"
            type="text"
          >Show setup instruction</el-button>
          <h3>Basic usage:</h3>
          <p>Click on "Copy as HTML" button and paste snippet of your signature into your email client settings.</p>
          <h3>Advance usage:</h3>
          <p>For some email clients, like gmail, you may using simply copy/paste highlight selection. Click on "Copy as Select" button and paste of your signature into your email client settings.</p>
        </el-popover>
      </div>
      <textarea
        ref="html"
        style="opacity: 0"
      />
    </div>
    <div class="preview__footer">
      <div class="preview__footer-inner">
        <donate />
        <div class="version">
          <span><a href="mailto:reshetov.art@gmail.com">contact us</a></span>
          <span>v{{ version }}</span>
          <span>
            <a
              href="https://github.com/antonreshetov/mysigmail"
              target="_blank"
            >
              <github-icon />
            </a>
          </span>
        </div>
      </div>
    </div>
    <el-dialog
      title="Your email signature"
      :visible.sync="showSource"
    >
      <p>Copy the HTML code below and paste it to your signature file</p>
      <br>
      <el-input
        ref="dialogSource"
        v-model="html"
        type="textarea"
        :rows="10"
      />
      <div
        style="text-align: right;"
        class="dialog-actions"
      >
        <el-button
          type="primary"
          @click="copySource"
        >Copy</el-button>
      </div>
    </el-dialog>
    <success-promo :show.sync="showSuccessPromo" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import CarbonAd from './CarbonAd'
import GithubIcon from '../assets/image/github.svg'
import SuccessPromo from './SuccessPromo'
import Donate from './Donate'

export default {
  name: 'Preview',

  components: {
    CarbonAd,
    GithubIcon,
    SuccessPromo,
    Donate
  },

  data () {
    return {
      html: '',
      showSource: false,
      showSuccessPromo: false,
      version: require('../../package.json').version
    }
  },

  computed: {
    ...mapState(['template']),
    ...mapGetters({
      basic: 'getBasic',
      options: 'getOptions',
      template: 'getTemplate'
    }),
    signatureTemplate () {
      const template = this.template.selected
      return () => import(`./templates/${template}`)
    },
    selectTemplate: {
      get () {
        return this.template.selected
      },
      set (v) {
        this.$store.dispatch('updateTemplate', v)
      }
    },
    isProd () {
      return process.env.NODE_ENV === 'production'
    }
  },

  methods: {
    parseHTML () {
      return this.$refs.template.$el.outerHTML.replace(/<!---->/g, '')
    },
    copyHTML () {
      this.$refs.html.innerHTML = this.parseHTML()
      this.$refs.html.select()
      document.execCommand('copy')
      this.gaEventClick('copy as HTML')
      this.showSuccessPromo = true
    },
    copySelect () {
      if (window.getSelection) {
        let range = document.createRange()
        range.selectNode(this.$refs.preview.querySelector('.email-preview div'))
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        this.gaEventClick('copy as select')
        this.showSuccessPromo = true
      }
    },
    viewSource () {
      this.html = this.parseHTML()
      this.showSource = true
      this.gaEventClick('view source')
    },
    copySource () {
      this.$refs.dialogSource.select()
      document.execCommand('copy')
      this.gaEventClick('copy source')
      this.showSource = false
      this.showSuccessPromo = true
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

$padding-inner: 40px 50px 20px 50px;

.preview {
  background-color: #f6f6f6;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 1fr 50px;
  &__header {
    margin-bottom: 20px;
  }
  &__inner {
    max-width: 900px;
    padding: $padding-inner;
  }
  &__footer {
    max-width: 900px;
    text-align: right;
    align-self: flex-end;
    padding: $padding-inner;
  }
  h2 {
    line-height: 0;
  }
  p {
    margin: 0;
  }
  .actions {
    text-align: right;
    margin-top: 20px;
  }
}
.email {
  min-height: 350px;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  &-content {
    padding: 20px;
    p {
      line-height: 1.5em;
      margin-bottom: 10px;
      font-size: 13px;
    }
    .line {
      height: 10px;
      background-color: #eee;
      margin: 10px 0;
      border-radius: 2px;
      &.short {
        width: 30%;
      }
      &.long {
        width: 90%;
      }
      &.half {
        width: 50%;
      }
      &.full {
        width: 100%;
      }
    }
    .flex {
      display: flex;
      width: 100%;
      margin-bottom: -10px;
      .column-1 {
        .line {
          &:first-of-type {
            margin-top: 0;
          }
        }
      }
      .column-1,
      .column-2 {
        flex-grow: 1;
      }
      .column-1 {
        width: 100%;
      }
      .column-2 {
        flex-shrink: 0;
        min-width: 320px;
      }
    }
  }
  &-preview {
    padding: 20px;
  }
  .placeholder {
    height: 100px;
    width: 100px;
    background-color: #eee;
    line-height: 0;
    font-size: 0;
  }
}
.setup-instruction {
  font-size: 12px;
}
.dialog-actions {
  text-align: right;
  margin-top: 20px;
}
.version {
  color: #aaa;
  margin-top: 10px;
  font-size: 12px;
  a {
    color: #aaa;
  }
  span {
    + span {
      &::before {
        content: "•";
        padding: 0 5px;
      }
    }
  }
  svg {
    width: 20px;
    position: relative;
    top: 5px;
    transition: all 0.2s;
  }
}
.link {
  text-decoration: underline;
  color: $color-primary;
  cursor: pointer;
}
</style>
