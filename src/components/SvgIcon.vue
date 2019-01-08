<template>
  <component :is="selected"></component>
</template>

<script>
import FacebookIcon from '../assets/image/facebook.svg'
import BehanceIcon from '../assets/image/behance.svg'
import GithubIcon from '../assets/image/github.svg'
import InstagramIcon from '../assets/image/instagram.svg'
import LinkedinIcon from '../assets/image/linkedin.svg'
import TelegramIcon from '../assets/image/telegram.svg'
import TwitterIcon from '../assets/image/twitter.svg'
import VkIcon from '../assets/image/vk.svg'
import WhatsappIcon from '../assets/image/whatsapp.svg'
import YoutubeIcon from '../assets/image/youtube.svg'
import SkypeIcon from '../assets/image/skype.svg'
import DribbbleIcon from '../assets/image/dribbble.svg'
import StackoverflowIcon from '../assets/image/stackoverflow.svg'
import XingIcon from '../assets/image/xing.svg'

export default {
  name: 'SvgIcon',

  props: {
    icon: String
  },

  components: {
    /* eslint-disable vue/no-unused-components */
    FacebookIcon,
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    VkIcon,
    WhatsappIcon,
    BehanceIcon,
    YoutubeIcon,
    SkypeIcon,
    DribbbleIcon,
    StackoverflowIcon,
    XingIcon
  },

  data () {
    return {
      selected: `${this.icon}Icon`
    }
  }
}
</script>

<style lang="scss">
</style>
