<script setup lang="ts">
import 'vanilla-colorful'

interface Props {
  presets?: string[]
}

withDefaults(defineProps<Props>(), {
  presets: () => ['#F56C6C', '#E6A23C', '#67C23A', '#396BDD', '#000000', '#FFFFFF'],
})

const model = defineModel<string>()

function onChange(event: Event & { target: { color: string } }) {
  model.value = event.target.color
}
</script>

<template>
  <div>
    <UiPopover>
      <UiPopoverTrigger>
        <div
          class="w-7 h-7 border rounded cursor-pointer"
          :style="{ backgroundColor: model }"
        />
      </UiPopoverTrigger>
      <UiPopoverContent>
        <div class="space-y-2">
          <hex-color-picker
            data-color-picker
            class="w-auto"
            :color="model"
            @color-changed="onChange"
          />
          <div
            v-if="presets"
            class="flex gap-2"
          >
            <div
              v-for="preset in presets"
              :key="preset"
            >
              <div
                class="size-6 border rounded cursor-pointer"
                :style="{ backgroundColor: preset }"
                @click="model = preset"
              />
            </div>
          </div>
          <UiInput v-model="model" />
        </div>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<style>
[data-color-picker]::part(saturation) {
  border-radius: 6px 6px 0 0;
}

[data-color-picker]::part(hue) {
  border-radius: 0 0 6px 6px;
}
</style>
