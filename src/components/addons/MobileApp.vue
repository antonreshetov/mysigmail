<script setup lang="ts">
import type { AddonMobileApp } from '@/composables/signatures/types'

const { getAddonValue, patchAddonValue } = useSignatures()

const appStore = computed({
  get: () => getAddonValue<AddonMobileApp>('mobileApp').appStore,
  set: (value) => {
    patchAddonValue<AddonMobileApp>('mobileApp', 'appStore', value)
  },
})

const googlePlay = computed({
  get: () => getAddonValue<AddonMobileApp>('mobileApp').googlePlay,
  set: (value) => {
    patchAddonValue<AddonMobileApp>('mobileApp', 'googlePlay', value)
  },
})
</script>

<template>
  <UiFieldForm>
    <UiFieldFormItem label="App Store">
      <UiInput v-model="appStore" />
    </UiFieldFormItem>
    <UiFieldFormItem label="Google Play">
      <UiInput v-model="googlePlay" />
    </UiFieldFormItem>
  </UiFieldForm>
</template>
