<script setup lang="ts">
import { ColorPicker } from 'vue-color-kit'

const color = defineModel<string>({ required: true })
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger>
      <div
        class="h-8 w-full rounded-md border"
        :style="{ backgroundColor: color }"
      />
    </UiPopoverTrigger>
    <UiPopoverContent>
      <ColorPicker
        :color="color"
        @update:color="color = $event"
      />
    </UiPopoverContent>
  </UiPopover>
</template>
