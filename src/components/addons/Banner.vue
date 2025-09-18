<script setup lang="ts">
import type { AddonBanner } from '@/composables/signatures/types'

const { getAddonValue, patchAddonValue } = useSignatures()

const image = computed({
  get: () => getAddonValue<AddonBanner>('banner').image,
  set: (value) => {
    patchAddonValue<AddonBanner>('banner', 'image', value)
  },
})

const link = computed({
  get: () => getAddonValue<AddonBanner>('banner').link,
  set: (value) => {
    patchAddonValue<AddonBanner>('banner', 'link', value)
  },
})

const width = computed({
  get: () => [getAddonValue<AddonBanner>('banner').width ?? 100],
  set: (value) => {
    patchAddonValue<AddonBanner>('banner', 'width', value[0])
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
    <UiFieldFormItem
      label="Width"
      :description="`Width in percentage. Current: ${width}%`"
    >
      <div class="flex items-center h-5">
        <UiSlider
          v-model="width"
          :min="10"
          :max="100"
        />
      </div>
    </UiFieldFormItem>
  </UiFieldForm>
</template>
