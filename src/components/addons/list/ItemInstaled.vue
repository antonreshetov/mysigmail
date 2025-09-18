<script setup lang="ts">
import type { Addon } from '@/composables/signatures/types'

interface Props {
  name: string
  type: Addon
}

const props = defineProps<Props>()

const { addons } = useSignatures()

const isOpen = ref(false)

function deleteAddon() {
  const index = addons.value?.findIndex(addon => addon.type === props.type)
  if (index !== undefined) {
    addons.value?.splice(index, 1)
  }
}
</script>

<template>
  <div class="border rounded p-2">
    <div
      :data-open="isOpen"
      class="flex items-center justify-between cursor-pointer data-[open=true]:pb-2"
      @click.stop="isOpen = !isOpen"
    >
      <div class="select-none font-semibold">
        {{ name }}
      </div>
      <div class="flex">
        <UiButton
          variant="ghost"
          size="icon-xs"
        >
          <UilPen />
        </UiButton>
        <UiButton
          variant="ghost"
          size="icon-xs"
          @click.stop="deleteAddon"
        >
          <UilTrashAlt class="text-destructive" />
        </UiButton>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="p-2"
    >
      <AddonsDisclaimer v-if="type === 'disclaimer'" />
      <AddonsCta v-if="type === 'cta'" />
      <AddonsBanner v-if="type === 'banner'" />
      <AddonsVideoConference v-if="type === 'videoConference'" />
      <AddonsMobileApp v-if="type === 'mobileApp'" />
      <AddonsLogo v-if="type === 'logo'" />
    </div>
  </div>
</template>
