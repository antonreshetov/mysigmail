<script setup lang="ts">
import type { AddonLogo } from '@/composables/signatures/types'

const { getAddonValue, patchAddonValue } = useSignatures()

const image = computed({
  get: () => getAddonValue<AddonLogo>('logo').image,
  set: (value) => {
    patchAddonValue<AddonLogo>('logo', 'image', value)
  },
})

const link = computed({
  get: () => getAddonValue<AddonLogo>('logo').link,
  set: (value) => {
    patchAddonValue<AddonLogo>('logo', 'link', value)
  },
})

function onUploaded(path: string) {
  image.value = path
}
</script>

<template>
  <UiFieldForm>
    <UiFieldFormItem
      label="Image"
      description="You can upload image or paste the public link to image."
    >
      <div class="flex items-center gap-2">
        <UiInput
          v-model="image"
          placeholder="https://example.com/image.png"
        />
        <UiUpload @uploaded="onUploaded" />
      </div>
    </UiFieldFormItem>
    <UiFieldFormItem label="Link">
      <UiInput v-model="link" />
    </UiFieldFormItem>
  </UiFieldForm>
</template>
