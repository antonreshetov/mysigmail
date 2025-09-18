<script setup lang="ts">
import { cn } from '@/lib/utils'

import { formKeys } from './keys'

interface Props {
  labelWidth?: string
  labelPosition?: 'left' | 'top'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  labelWidth: '160px',
  labelPosition: 'left',
})

provide(formKeys, {
  labelWidth: props.labelWidth,
  labelPosition: props.labelPosition,
})
</script>

<template>
  <div :class="cn('space-y-6', props.class)">
    <slot />
  </div>
</template>
