import type { AddonTool } from '@/composables/signatures/types'

import { disclaimerPresets } from './disclaimer-pressets'

export const addons: AddonTool[] = [
  {
    label: 'Mobile App',
    type: 'mobileApp',
    isNew: false,
    value: {
      appStore: 'https://example.com',
      googlePlay: 'https://example.com',
    },
  },
  {
    label: 'Disclaimer',
    type: 'disclaimer',
    isNew: false,
    value: disclaimerPresets[0].value,
  },
  {
    label: 'Banner',
    type: 'banner',
    isNew: false,
    value: {
      image: '',
      link: '',
      width: 150,
    },
  },
  {
    label: 'Video Conference',
    type: 'videoConference',
    isNew: false,
    value: {
      type: 'hangouts',
      text: 'Meet me on Google Hangouts',
      link: '',
    },
  },
  {
    label: 'CTA',
    type: 'cta',
    isNew: false,
    value: {
      text: 'Get your coupon for a 20% discount',
      link: 'https://example.com',
      colorBg: '#ffa500',
      colorText: '#fff',
      image: '',
      width: 50,
      type: 'text',
    },
  },
  {
    label: 'Logo',
    type: 'logo',
    isNew: false,
    value: {
      image: '',
      link: '',
      width: 150,
    },
  },
]
