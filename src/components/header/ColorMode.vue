<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Monitor, Moon, Sun } from 'lucide-vue-next'

const { store } = useColorMode()

interface Options {
  label: string
  value: 'light' | 'dark' | 'auto'
  icon: typeof Sun | typeof Moon | typeof Monitor
}

const options: Options[] = [
  { label: 'Light', value: 'light', icon: Sun },
  { label: 'Dark', value: 'dark', icon: Moon },
  { label: 'System', value: 'auto', icon: Monitor },
]

const icon = computed(() => {
  switch (store.value) {
    case 'light':
      return Sun
    case 'dark':
      return Moon
    case 'auto':
      return Monitor
    default:
      return Sun
  }
})

function onSelect(value: 'light' | 'dark' | 'auto') {
  store.value = value
}
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        size="icon-xs"
        variant="ghost"
      >
        <component
          :is="icon"
          class="size-4"
        />
        <Terminal />
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="w-32">
      <UiDropdownMenuItem
        v-for="i in options"
        :key="i.value"
        @click="onSelect(i.value)"
      >
        <div class="flex items-center gap-2">
          <component
            :is="i.icon"
            class="size-4"
          />
          <span>{{ i.label }}</span>
        </div>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
