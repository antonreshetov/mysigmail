import { nanoid } from 'nanoid'

import type {
  AddonTool,
  BasicTool,
  OptionsTool,
  Signature,
  SocialTool,
} from '@/composables/signatures/types'

export interface Template extends Signature {
  preview?: string
  isNew?: boolean
}

export function useTemplateData() {
  const DEFAULTS = {
    basic: [
      {
        id: nanoid(8),
        label: 'Avatar',
        type: 'image',
        main: true,
        value: '',
      },
      {
        id: nanoid(8),
        label: 'Full Name',
        type: 'text',
        main: true,
        value: 'John Doe',
      },
      {
        id: nanoid(8),
        label: 'Job Title',
        type: 'text',
        main: true,
        value: 'Frontend developer',
      },
      {
        id: nanoid(8),
        label: 'Company',
        type: 'text',
        main: true,
        value: 'JohnDoe LLC',
      },
      {
        id: nanoid(8),
        label: 'Website',
        type: 'link',
        main: true,
        value: 'https://example.com',
      },
      {
        id: nanoid(8),
        label: 'Email',
        type: 'email',
        main: true,
        value: 'johndoe@example.com',
      },
      {
        id: nanoid(8),
        label: 'Phone',
        type: 'phone',
        main: true,
        value: '+ 1 123 456 7890',
      },
    ] as BasicTool[],
    options: {
      mainColor: '#396BDD',
      secondaryColor: '#396BDD',
      bgColor: '#3D6693',
      bgTextColor: '#fff',
      avatar: true,
      avatarSize: 120,
      avatarShape: 'square',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 12,
      jobSeparator: '/',
    } as OptionsTool,
    addons: [
      {
        label: 'Disclaimer',
        type: 'disclaimer',
        isNew: false,
        value:
          'If you like MySigMail, you can share it on social networks by telling your friends about our service and get a 20% discount coupon. To participate, follow us @mysigmail, write a tweet with a link to @mysigmail and https://mysigmail.com. Or just click on the banner above for tweet and follow us. Email us at contact@mysigmail.com about tweeting and get a coupon.',
      },
      {
        label: 'Banner',
        type: 'banner',
        isNew: false,
        value: {
          image: '/assets/mysigmail-promo-banner.png',
          link: 'https://twitter.com/intent/tweet?url=&text=Take%20a%20look%20at%20this%20awesome%20email%20signature%20generator%20%40mysigmail%20https%3A%2F%2Fmysigmail.com.',
        },
      },
      {
        label: 'Video Conference',
        type: 'videoConference',
        isNew: false,
        value: {
          text: 'Meet me on Google Hangouts',
          type: 'hangouts',
          link: '',
        },
      },
    ] as AddonTool[],
    socials: [
      {
        icon: 'facebook',
        value: 'https://example.com',
        label: 'Facebook',
      },
      {
        icon: 'twitter',
        value: 'https://example.com',
        label: 'Twitter',
      },
      {
        icon: 'linkedin',
        value: 'https://example.com',
        label: 'LinkedIn',
      },
      {
        icon: 'instagram',
        value: 'https://example.com',
        label: 'Instagram',
      },
    ] as SocialTool[],
  }

  const templates: Template[] = [
    {
      name: 'SignatureTemplate1',
      label: 'Template #1',
      isNew: false,
      tools: {
        basic: DEFAULTS.basic,
        options: DEFAULTS.options,
        addons: DEFAULTS.addons,
        socials: DEFAULTS.socials,
      },
      preview: 'template-1.png',
    },
    {
      name: 'SignatureTemplate8',
      label: 'Template #8',
      isNew: false,
      tools: {
        basic: DEFAULTS.basic,
        options: DEFAULTS.options,
        addons: DEFAULTS.addons,
        socials: DEFAULTS.socials,
      },
      preview: 'template-8.png',
    },
    {
      name: 'SignatureTemplate2',
      label: 'Template #2',
      isNew: false,
      tools: {
        basic: DEFAULTS.basic,
        options: {
          ...DEFAULTS.options,
          avatarSize: 96,
          jobSeparator: 'br',
          column1Width: 20,
        },
        addons: DEFAULTS.addons,
        socials: DEFAULTS.socials,
      },
      preview: 'template-2.png',
    },
    {
      name: 'SignatureTemplate3',
      label: 'Template #3',
      isNew: false,
      tools: {
        basic: DEFAULTS.basic,
        options: {
          ...DEFAULTS.options,
          avatarSize: 86,
          jobSeparator: 'br',
        },
        addons: DEFAULTS.addons,
        socials: DEFAULTS.socials,
      },
      preview: 'template-3.png',
    },
    {
      name: 'SignatureTemplate4',
      label: 'Template #4',
      isNew: false,
      tools: {
        basic: DEFAULTS.basic,
        options: {
          ...DEFAULTS.options,
          avatarSize: 94,
          jobSeparator: 'br',
        },
        addons: DEFAULTS.addons,
        socials: DEFAULTS.socials,
      },
      preview: 'template-4.png',
    },
    {
      name: 'SignatureTemplate5',
      label: 'Template #5',
      isNew: false,
      tools: {
        basic: DEFAULTS.basic,
        options: {
          ...DEFAULTS.options,
          avatarSize: 94,
          jobSeparator: 'br',
          column1Width: 20,
        },
        addons: DEFAULTS.addons,
        socials: DEFAULTS.socials,
      },
      preview: 'template-5.png',
    },
    {
      name: 'SignatureTemplate6',
      label: 'Template #6',
      isNew: false,
      tools: {
        basic: DEFAULTS.basic,
        options: {
          ...DEFAULTS.options,
          mainColor: '#3D6693',
          secondaryColor: '#3D6693',
          bgColor: '#3D6693',
          avatarSize: 74,
          jobSeparator: 'br',
        },
        addons: DEFAULTS.addons,
        socials: DEFAULTS.socials,
      },
      preview: 'template-6.png',
    },
    {
      name: 'SignatureTemplate7',
      label: 'Template #7',
      isNew: false,
      tools: {
        basic: DEFAULTS.basic,
        options: {
          ...DEFAULTS.options,
          mainColor: '#5A7CAA',
          bgColor: '#3D6693',
          avatarSize: 68,
          avatarShape: 'round',
          jobSeparator: '/',
        },
        addons: DEFAULTS.addons,
        socials: DEFAULTS.socials,
      },
      preview: 'template-7.png',
    },
    {
      name: 'SignatureTemplate9',
      label: 'Template #9',
      isNew: false,
      tools: {
        basic: DEFAULTS.basic,
        options: {
          ...DEFAULTS.options,
          avatarSize: 96,
        },
        addons: DEFAULTS.addons,
        socials: DEFAULTS.socials,
      },
      preview: 'template-9.png',
    },
  ]

  return {
    templates,
    DEFAULTS,
  }
}
