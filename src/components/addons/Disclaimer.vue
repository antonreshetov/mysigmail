<script setup lang="ts">
import { disclaimerPresets } from '@/data/disclaimer-pressets'

const { getAddonValue, setAddonValue } = useSignatures()

const selectedPreset = ref('')

const value = computed({
  get: () => getAddonValue<string>('disclaimer'),
  set: (value) => {
    setAddonValue('disclaimer', value)
  },
})

watch(selectedPreset, v => (v ? (value.value = v) : null))
</script>

<template>
  <div class="space-y-3">
    <UiSelect v-model="selectedPreset">
      <UiSelectTrigger>
        <UiSelectValue placeholder="Select a preset" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem
          v-for="preset in disclaimerPresets"
          :key="preset.value"
          :value="preset.value"
        >
          {{ preset.label }}
        </UiSelectItem>
      </UiSelectContent>
    </UiSelect>
    <UiTextarea
      v-model="value"
      @update:model-value="selectedPreset = ''"
    />
    <p class="desc">
      Write your disclaimer text or select a preset.
    </p>
  </div>
</template>
