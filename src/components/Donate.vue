<template>
  <div class="donate">
    <el-popover
      v-model="show"
      placement="top"
      width="350"
    >
      <p>MySigMail is a free & open source project that develops one person without funding.</p>
      <p>If you liked the project, you may donate to support development and grow up 🌱</p>
      <ul>
        <li>BTC - 1di5dpLQpcryUke4e5eq1NJv4if9faLhJ</li>
        <li><a
          href="https://ko-fi.com/antonreshetov"
          target="_blank"
        >Ko-fi</a></li>
        <li><a
          href="https://www.paypal.me/antonreshetov"
          target="_blank"
        >PayPal</a></li>
        <li><a
          href="https://www.patreon.com/antonreshetov"
          target="_blank"
        >Patreon</a></li>
        <li><a
          href="https://opencollective.com/mysigmail"
          target="_blank"
        >Open Collective</a></li>
      </ul>
      <p>Or just share the project to your friends.</p>
      <p>You a blogger? Please tell about the project to subscribers.</p>
      <p>Finally, you can <span
        :class="{'link': !template.promoteSignature}"
        @click="togglePromo(true)"
      >leave</span> a promotional message in the signature, or <span
        :class="{'link': template.promoteSignature}"
        @click="togglePromo(false)"
      >delete</span> it, but it will be sad 😭</p>
      <div
        slot="reference"
        class="support-shield"
        @click="onClickHelp"
      >
        Donate
      </div>
    </el-popover>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Donate',

  data () {
    return {
      show: false
    }
  },

  computed: {
    ...mapState(['template'])
  },

  methods: {
    togglePromo (bool) {
      this.$store.commit('SET_PROMOTE_SIGNATURE', bool)
      if (bool) {
        this.gaEventClick('remove promote signature')
      } else {
        this.gaEventClick('add promote signature')
      }
    },
    onClickHelp () {
      this.gaEventClick('help open')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.donate {
  color: #aaa;
  font-size: 12px;
  .support-shield {
    display: inline-block;
    padding: 12px 20px;
    color: #444;
    border-radius: 5px;
    font-weight: bold;
    border: 2px solid lighten(orange, 25%);
    outline: none;
    cursor: pointer;
    transition: all .2s;
    &:hover {
      border-color: orange;
    }
  }
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
.el-popover {
  h3, p {
    &:first-child {
      margin-top: 0px;
    }
  }
}
</style>
