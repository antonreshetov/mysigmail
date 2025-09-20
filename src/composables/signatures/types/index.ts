export interface AddonBanner {
  image: string
  link: string
  width?: number
}
export interface AddonLogo {
  image: string
  link: string
}

export interface AddonMobileApp {
  appStore: string
  googlePlay: string
}

export interface AddonVideoConference {
  link: string
  text: string
  type: VideoConference
}

export interface AddonCTA {
  colorBg: string
  colorText: string
  link: string
  text: string
  type?: 'image' | 'text'
  image?: string
  width?: number
}

export type AddonValue
  = | string
    | AddonBanner
    | AddonMobileApp
    | AddonVideoConference
    | AddonCTA
    | AddonLogo

export type Addon
  = | 'banner'
    | 'disclaimer'
    | 'hangouts'
    | 'videoConference'
    | 'mobileApp'
    | 'cta'
    | 'logo'

export type Basic = 'text' | 'link' | 'email' | 'phone' | 'image' | 'hyperlink'
export type AvatarShape = 'square' | 'round' | 'rounded-corner'

export type Social
  = | 'facebook'
    | 'vk'
    | 'twitter'
    | 'instagram'
    | 'linkedin'
    | 'youtube'
    | 'skype'
    | 'telegram'
    | 'whatsapp'
    | 'dribbble'
    | 'behance'
    | 'github'
    | 'gitlab'
    | 'stackoverflow'
    | 'xing'
    | 'diaspora'
    | 'mastodon'
    | 'slack'
    | 'reddit'
    | 'gitter'
    | 'ok'
    | 'yelp'
    | 'zillow'
    | 'tiktok'
    | 'teams'
    | 'zoom'
    | 'whereby'
    | 'pinterest'
    | 'wechat'
    | 'unsplash'
    | 'hangouts'
    | 'soundcloud'
    | 'discord'
    | 'qq'
    | 'replit'
    | 'signal'
    | 'houzz'
    | 'shop'
    | 'web'
    | 'apple-music'
    | 'spotify'
    | 'rss'
    | 'google-business'

export type VideoConference = 'skype' | 'hangouts' | 'zoom'

export interface AddonTool {
  label: string
  type: Addon
  isNew: boolean
  value: AddonValue
}

export interface BasicTool {
  id?: string
  label: string
  main: boolean
  type: Basic
  value: string
  title?: string
  color?: 'main' | 'secondary' | 'default'
  underline?: boolean
}

export interface OptionsTool {
  avatar: boolean
  avatarShape: AvatarShape
  avatarSize: number
  bgColor: string
  bgTextColor?: string
  fontFamily: string
  fontSize: number
  jobSeparator: string
  labelSeparator?: string
  mainColor: string
  secondaryColor: string
  column1Width?: number
}

export interface SocialToolValue {
  icon: string
  label: string
  value: string
}
export interface SocialTool {
  icon: Social
  label: string
  value: string
}

export interface Signature {
  label: string
  name: string
  tools: {
    addons: AddonTool[]
    basic: BasicTool[]
    options: OptionsTool
    socials: SocialTool[]
    customSocialIcons?: Record<string, string>
  }
}
