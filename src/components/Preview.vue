<template>
  <div class="preview">
    <div class="preview__inner">
      <div class="preview__header">
        <el-row>
          <el-col :span="12">
            <h2>Signature preview</h2>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-select placeholder="Select template" v-model="selectTemplate">
              <el-option
                v-for="item in template.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
              <el-option value="-1" disabled>Soon more templates</el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="email">
        <div class="email-content">
          <div class="line short"></div>
          <br>
          <div class="line long full"></div>
          <div class="line long"></div>
          <div class="line long full"></div>
          <div class="line long full"></div>
          <div class="line long"></div>
        </div>
        <div class="email-preview" ref="preview">
          <component ref="template" :is="selectTemplate"></component>
        </div>
      </div>
      <div class="actions">
        <el-button-group>
          <el-button size="small" type="" @click="viewSource">View source</el-button>
          <el-button size="small" @click="copySelect">Copy as Select</el-button>
          <el-button size="small" type="primary" @click="copyHTML">Copy as HTML</el-button>
        </el-button-group>
        <br>
        <el-button
          size="small"
          v-if="!showSetup"
          type="text"
          @click="showSetup = !showSetup"
        >Show setup instruction</el-button>
        <el-button
          size="small"
          v-if="showSetup"
          type="text"
          @click="showSetup = !showSetup"
        >Hide setup instruction</el-button>
      </div>
      <div class="setup-instruction" v-if="showSetup">
        <h3>Basic usage:</h3>
        <p>Click on "Copy as HTML" button and paste snippet of your signature into your email client settings.</p>
        <h3>Advance usage:</h3>
        <p>For some email clients, like gmail, you may using simply copy/paste highlight selection. Click on "Copy as Select" button and paste of your signature into your email client settings.</p>
      </div>
      <textarea ref="html" v-model="html" style="opacity: 0"></textarea>
    </div>
    <el-dialog title="Your email signature" :visible.sync="showSource">
      <p>Copy the HTML code below and paste it to your signature file</p>
      <br>
      <el-input type="textarea" v-model="html" :rows="10" ref="dialogSource"></el-input>
      <div style="text-align: right;" class="dialog-actions">
        <el-button type="primary" @click="copySource">Copy</el-button>
      </div>
    </el-dialog>
    <div class="preview__footer" v-if="showSignature">
      <div class="support-project">
        <span>support the project, put a star to</span>
        <a href="https://github.com/antonreshetov/mysigmail" target="_blank">
          <github-icon></github-icon>
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
import EmailTemplate1WithoutAvatar from './templates/EmailTemplate1WithoutAvatar'
import GithubIcon from '../assets/image/github.svg'

export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    EmailTemplate1,
    // eslint-disable-next-line vue/no-unused-components
    EmailTemplate1WithoutAvatar,
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
    showSignature () {
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
        range.selectNode(this.$refs.preview.querySelector('table'))
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
@import '../assets/scss/variables.scss';

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
      &.full {
        width: 100%;
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
