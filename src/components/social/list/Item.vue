<script setup lang="ts">
import type { SocialData } from '@/data/socials'

interface Props {
  item: SocialData
}

const props = defineProps<Props>()

const { socials } = useSignatures()

const isActive = computed(() => {
  return socials.value.some(social => social.icon === props.item.icon)
})
</script>

<template>
  <div class="size-9 cursor-pointer border rounded flex items-center justify-center">
    <img
      :src="`/assets/icons/${item.icon}.png`"
      :alt="item.name"
      class="invert dark:invert-0 opacity-20 size-7"
      :class="{ 'opacity-100': isActive }"
    >
  </div>
</template>
