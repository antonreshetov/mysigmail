import { useStorage } from '@vueuse/core'

import { useSonner } from '@/composables/useSonner'
import { useTemplateData } from '@/data/templates'
import { clone } from '@/utils'

import type { Addon, AddonValue, Signature, Social } from './types'

const { sonner } = useSonner()

const { templates } = useTemplateData()

const isInit = ref(false)

const selectedIdStore = useStorage('selected-signature-id', '')
const unsavedSignatureStore = useStorage('unsaved-signature', '')

const selectedId = ref<string>()
const installed = ref<Signature>(templates[0])

const mainFields = computed(() => {
  return installed.value.tools.basic.filter(i => i.type !== 'image')
})

const isMainFieldsEmpty = computed(() => mainFields.value.every(i => !i.value))

const imageField = computed(() => installed.value.tools.basic[0].value)

const nameField = computed(() => {
  if (isMainFieldsEmpty.value) {
    return templates[0].tools.basic[1]
  }
  return installed.value.tools.basic[1]
})

const jobFields = computed(() => {
  if (isMainFieldsEmpty.value) {
    return templates[0].tools.basic.slice(2, 4)
  }
  return mainFields.value.slice(1, 3)
})

const otherFields = computed(() => {
  if (isMainFieldsEmpty.value) {
    return templates[0].tools.basic.slice(4)
  }
  return mainFields.value.filter(i => !i.main)
})

const otherFieldsGroup2 = computed(() => {
  return mainFields.value.filter(i => ['Phone', 'Email'].includes(i.label))
})

const otherFieldsGroup3 = computed(() => {
  return mainFields.value.filter(i => i.label === 'Website')
})

const options = computed(() => installed.value.tools.options)

const fontBase = computed(() => {
  return {
    fontSize: `${options.value.fontSize}px`,
    fontFamily: options.value.fontFamily,
    margin: '0',
    lineHeight: '150%',
  }
})

const fontAccent = computed(() => {
  return {
    ...fontBase.value,
    fontSize: options.value && `${options.value.fontSize + 2}px`,
  }
})

const addons = computed(() => installed.value.tools.addons || [])

const socials = computed(() => installed.value.tools.socials || [])

const otherFieldsGroup4 = computed(() => {
  return socials
})

const customSocialIcons = computed({
  get: () => {
    if (!installed.value.tools.customSocialIcons)
      installed.value.tools.customSocialIcons = {}
    return installed.value.tools.customSocialIcons
  },
  set: value => (installed.value.tools.customSocialIcons = value),
})

const isImageFieldEmpty = computed(() => !imageField.value)

const isSocialsEmpty = computed(() => !socials.value.length)

const isAddonsEmpty = computed(() => !addons.value.length)

const isBgColorAvailable = computed(() => {
  const available = ['SignatureTemplate6', 'SignatureTemplate7']
  return available.includes(installed.value.name)
})

const isSecondColorAvailable = computed(() => {
  const available = [
    'SignatureTemplate1',
    'SignatureTemplate2',
    'SignatureTemplate3',
    'SignatureTemplate4',
    'SignatureTemplate5',
    'SignatureTemplate6',
    'SignatureTemplate8',
    'SignatureTemplate9',
    'SignatureTemplate10',
  ]
  return available.includes(installed.value.name)
})

const isColumnSizeAvailable = computed(() => {
  const available = ['SignatureTemplate2', 'SignatureTemplate5']
  return available.includes(installed.value.name)
})

function isAddonTool(type: Addon) {
  return installed.value.tools.addons.some(i => i.type === type)
}

function isOnlyAddon(type: Addon) {
  return installed.value.tools.addons.findIndex(i => i.type === type) > -1
}

function getAddonValue<T extends AddonValue>(type: Addon): T {
  return installed.value.tools.addons.find(i => i.type === type)?.value as T
}

function setAddonValue<T extends AddonValue>(type: Addon, value: T) {
  const addon = addons.value.find(i => i.type === type)

  if (addon) {
    addon.value = value
  }
}

function patchAddonValue<T extends AddonValue>(type: Addon, key: keyof T, value: T[keyof T]) {
  const addon = addons.value.find(i => i.type === type)
  if (addon) {
    ;(addon.value as Record<string, any>)[key as string] = value
  }
}

function getSocialValue(type: Social) {
  return socials.value.find(i => i.icon === type)?.value
}

function setSocialValue(type: Social, value: string) {
  const social = socials.value.find(i => i.icon === type)
  if (social) {
    social.value = value
  }
}

function resetInstalledToDefault() {
  installed.value = clone(templates[0])
  installed.value.tools.basic.forEach(i => (i.value = ''))
}

function setTemplate(signature: Signature) {
  installed.value.name = signature.name
  installed.value.label = signature.label

  installed.value.tools.options.avatarSize = signature.tools.options.avatarSize
  installed.value.tools.options.avatarShape = signature.tools.options.avatarShape

  if (!installed.value.tools.options.bgColor) {
    installed.value.tools.options.bgColor = signature.tools.options.bgColor
    installed.value.tools.options.bgTextColor = signature.tools.options.bgTextColor
  }

  if (!installed.value.tools.options.column1Width) {
    installed.value.tools.options.column1Width = signature.tools.options.column1Width
  }
}

function downloadJSON(signature: Signature) {
  const data = JSON.stringify(signature)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'mysigmail-signature.json'
  a.click()
  URL.revokeObjectURL(url)
}

async function uploadJSON(json: string) {
  let data: any
  try {
    data = JSON.parse(json)
  }
  catch {
    sonner({ title: 'Invalid JSON format', type: 'error' })
    throw new Error('Invalid JSON format')
  }

  if (typeof data !== 'object' || data === null) {
    sonner({ title: 'Invalid signature: not an object', type: 'error' })
    throw new Error('Invalid signature: not an object')
  }

  if (typeof data.label !== 'string' || typeof data.name !== 'string') {
    sonner({ title: 'Invalid signature: missing or invalid label/name', type: 'error' })
    throw new Error('Invalid signature: missing or invalid label/name')
  }

  if (!data.tools || typeof data.tools !== 'object') {
    sonner({ title: 'Invalid signature: missing tools', type: 'error' })
    throw new Error('Invalid signature: missing tools')
  }

  if (
    !Array.isArray(data.tools.addons)
    || !Array.isArray(data.tools.basic)
    || !Array.isArray(data.tools.socials)
  ) {
    sonner({ title: 'Invalid signature: tools arrays are invalid', type: 'error' })
    throw new Error('Invalid signature: tools arrays are invalid')
  }

  if (typeof data.tools.options !== 'object' || data.tools.options === null) {
    sonner({ title: 'Invalid signature: options is invalid', type: 'error' })
    throw new Error('Invalid signature: options is invalid')
  }

  installed.value = data as Signature
}

function init() {
  const unsavedSignature = unsavedSignatureStore.value

  if (unsavedSignature) {
    try {
      const data = JSON.parse(unsavedSignature)
      installed.value = data
      unsavedSignatureStore.value = ''
    }
    catch (err) {
      console.error(err)
      resetInstalledToDefault()
    }
  }
}

watch(installed, () => (unsavedSignatureStore.value = JSON.stringify(installed.value)), {
  deep: true,
})

export function useSignatures() {
  return {
    addons,
    customSocialIcons,
    downloadJSON,
    fontAccent,
    fontBase,
    getAddonValue,
    getSocialValue,
    imageField,
    init,
    installed,
    isAddonsEmpty,
    isAddonTool,
    isBgColorAvailable,
    isColumnSizeAvailable,
    isImageFieldEmpty,
    isInit,
    isMainFieldsEmpty,
    isOnlyAddon,
    isSecondColorAvailable,
    isSocialsEmpty,
    jobFields,
    mainFields,
    nameField,
    options,
    otherFields,
    otherFieldsGroup2,
    otherFieldsGroup3,
    otherFieldsGroup4,
    patchAddonValue,
    resetInstalledToDefault,
    selectedId,
    selectedIdStore,
    setAddonValue,
    setSocialValue,
    setTemplate,
    socials,
    uploadJSON,
  }
}
