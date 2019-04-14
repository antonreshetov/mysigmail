<template>
  <component :is="selected" />
</template>

<script>
import FacebookIcon from '../assets/image/facebook.svg'
import BehanceIcon from '../assets/image/behance.svg'
import GithubIcon from '../assets/image/github.svg'
import GitlabIcon from '../assets/image/gitlab.svg'
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
import SlackIcon from '../assets/image/slack.svg'
import MastodonIcon from '../assets/image/mastodon.svg'
import DiasporaIcon from '../assets/image/diaspora.svg'
import RedditIcon from '../assets/image/reddit.svg'
import GitterIcon from '../assets/image/gitter.svg'
import OkIcon from '../assets/image/ok.svg'

export default {
  name: 'SvgIcon',

  components: {
    /* eslint-disable vue/no-unused-components */
    FacebookIcon,
    GithubIcon,
    GitlabIcon,
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
    XingIcon,
    SlackIcon,
    DiasporaIcon,
    MastodonIcon,
    RedditIcon,
    GitterIcon,
    OkIcon
  },

  props: {
    icon: {
      type: String,
      default: undefined
    }
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
