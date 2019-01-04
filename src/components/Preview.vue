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
      <div class="donate" @click="onDonate">
        <a
          href="https://paypal.me/antonreshetov"
          target="_blank"
          class="btn-donate paypal"
        >buy me a coffee
          <coffee-icon></coffee-icon>
        </a>
      </div>
      <div class="copyright">
        Development with
        <heart-icon/>by
        <a href="https://github.com/antonreshetov">Anton Reshetov</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EmailTemplate1 from './templates/EmailTemplate1'
import HeartIcon from '../assets/image/heart.svg'
import CoffeeIcon from '../assets/image/coffee-cup.svg'

export default {
  name: '',
  components: {
    // eslint-disable-next-line
    EmailTemplate1,
    HeartIcon,
    CoffeeIcon
  },

  data () {
    return {
      html: '',
      showSetup: false,
      showSource: false
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
.copyright {
  font-size: 11px;
  color: #aaa;
  svg {
    fill: #aaa;
    width: 12px;
    position: relative;
    top: 2px;
    padding: 0 4px 0 2px;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: #555;
    }
  }
}
.btn-donate {
  display: inline-block;
  text-decoration: none;
  // padding: 5px 5px;
  // background-color: orange;
  color: orange;
  line-height: 25px;
  &:hover {
    color: lighten(orange, 20%);
    svg {
      fill: lighten(orange, 20%);
    }
  }
  svg {
    position: relative;
    top: 4px;
    width: 24px;
    fill: orange;
  }
}
</style>
