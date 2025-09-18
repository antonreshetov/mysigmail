<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('text-sm font-medium flex items-center h-7', props.class)">
    <slot />
  </div>
</template>
