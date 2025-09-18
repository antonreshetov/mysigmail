<script setup lang="ts">
import type { AddonCTA } from '@/composables/signatures/types'

const { getAddonValue, patchAddonValue } = useSignatures()

const type = computed({
  get: () => getAddonValue<AddonCTA>('cta').type,
  set: (value) => {
    patchAddonValue<AddonCTA>('cta', 'type', value)
  },
})

const text = computed({
  get: () => getAddonValue<AddonCTA>('cta').text,
  set: (value) => {
    patchAddonValue<AddonCTA>('cta', 'text', value)
  },
})

const image = computed({
  get: () => getAddonValue<AddonCTA>('cta').image,
  set: (value) => {
    patchAddonValue<AddonCTA>('cta', 'image', value)
  },
})

const link = computed({
  get: () => getAddonValue<AddonCTA>('cta').link,
  set: (value) => {
    patchAddonValue<AddonCTA>('cta', 'link', value)
  },
})

const bgColor = computed({
  get: () => getAddonValue<AddonCTA>('cta').colorBg,
  set: (value) => {
    patchAddonValue<AddonCTA>('cta', 'colorBg', value)
  },
})

const textColor = computed({
  get: () => getAddonValue<AddonCTA>('cta').colorText,
  set: (value) => {
    patchAddonValue<AddonCTA>('cta', 'colorText', value)
  },
})

const width = computed({
  get: () => [getAddonValue<AddonCTA>('cta').width ?? 50],
  set: (value) => {
    patchAddonValue<AddonCTA>('cta', 'width', value[0])
  },
})

function onUploaded(path: string) {
  image.value = path
}
</script>

<template>
  <UiFieldForm>
    <UiFieldFormItem label="Enable Image">
      <UiSwitch
        :model-value="type === 'image'"
        @update:model-value="type = $event ? 'image' : 'text'"
      />
    </UiFieldFormItem>
    <template v-if="type === 'text'">
      <UiFieldFormItem label="Text">
        <UiInput v-model="text" />
      </UiFieldFormItem>
      <UiFieldFormItem label="Link">
        <UiInput v-model="link" />
      </UiFieldFormItem>
      <UiFieldFormItem label="Background Color">
        <UiColorPicker v-model="bgColor" />
      </UiFieldFormItem>
      <UiFieldFormItem label="Text Color">
        <UiColorPicker v-model="textColor" />
      </UiFieldFormItem>
    </template>
    <template v-if="type === 'image'">
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
    </template>
  </UiFieldForm>
</template>
