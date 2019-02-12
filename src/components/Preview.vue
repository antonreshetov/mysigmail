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
          <div class="line long" />
          <div class="line long full" />
        </div>
        <div
          ref="preview"
          class="email-preview"
        >
          <component
            :is="selectTemplate"
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
            size="small"
            type="primary"
            @click="copyHTML"
          >Copy as HTML</el-button>
        </el-button-group>
        <br>
        <el-button
          v-if="!showSetup"
          size="small"
          type="text"
          @click="showSetup = !showSetup"
        >Show setup instruction</el-button>
        <el-button
          v-if="showSetup"
          size="small"
          type="text"
          @click="showSetup = !showSetup"
        >Hide setup instruction</el-button>
      </div>
      <div
        v-if="showSetup"
        class="setup-instruction"
      >
        <h3>Basic usage:</h3>
        <p>Click on "Copy as HTML" button and paste snippet of your signature into your email client settings.</p>
        <h3>Advance usage:</h3>
        <p>For some email clients, like gmail, you may using simply copy/paste highlight selection. Click on "Copy as Select" button and paste of your signature into your email client settings.</p>
      </div>
      <textarea
        ref="html"
        v-model="html"
        style="opacity: 0"
      />
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
    <div
      v-if="isProd"
      class="preview__footer"
    >
      <div class="support-project">
        <span>support the project, put a star to</span>
        <a
          href="https://github.com/antonreshetov/mysigmail"
          target="_blank"
        >
          <github-icon />
        </a>
        <span>repo :)</span>
      </div>
      <div class="version">
        <span>current version:&nbsp;{{ version }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EmailTemplate1 from './templates/EmailTemplate1'
import EmailTemplate2 from './templates/EmailTemplate2'
import EmailTemplate3 from './templates/EmailTemplate3'
import CarbonAd from './CarbonAd'
import GithubIcon from '../assets/image/github.svg'

export default {
  name: '',
  components: {
    // eslint-disable-next-line
    EmailTemplate1,
    // eslint-disable-next-line
    EmailTemplate2,
    // eslint-disable-next-line
    EmailTemplate3,
    CarbonAd,
    GithubIcon
  },

  data () {
    return {
      html: '',
      showSetup: false,
      showSource: false,
      version: require('../../package.json').version
    }
  },

  computed: {
    ...mapGetters({
      basic: 'getBasic',
      options: 'getOptions',
      template: 'getTemplate'
    }),
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
    copyHTML () {
      this.html = this.$refs.template.$el.outerHTML.replace(/<!---->/g, '')
      setTimeout(() => {
        this.$refs.html.select()
        document.execCommand('copy')
      }, 10)
      this.gaEventClick('copy as HTML')
    },
    copySelect () {
      if (window.getSelection) {
        let range = document.createRange()
        range.selectNode(this.$refs.preview.querySelector('.email-preview div'))
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        this.gaEventClick('copy as select')
      }
    },
    viewSource () {
      this.html = this.$refs.template.$el.outerHTML.replace(/<!---->/g, '')
      this.showSource = true
      this.gaEventClick('view source')
    },
    copySource () {
      this.$refs.dialogSource.select()
      document.execCommand('copy')
      this.gaEventClick('copy source')
    },
    onDonate () {
      this.gaEventClick('donate')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.preview {
  background-color: #f6f6f6;
  padding: 40px 50px 20px 50px;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 1fr 50px;
  &__header {
    margin-bottom: 20px;
  }
  &__inner {
    max-width: 900px;
  }
  &__footer {
    max-width: 900px;
    text-align: right;
    align-self: flex-end;
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
.support-project {
  color: #aaa;
  font-size: 12px;
  a {
    display: inline-block;
    padding: 0 5px;

    &:hover {
      svg {
        fill: $color-primary;
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
.version {
  color: #aaa;
  margin-top: 10px;
  font-size: 12px;
}
</style>
