<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { AvatarShape } from '@/composables/signatures/types'

import * as Base from '../base'

interface Props {
  show?: boolean
  src?: string
  size?: number
  shape?: AvatarShape
  tdStyle?: HTMLAttributes['style']
}

const props = defineProps<Props>()

const { installed } = useSignatures()

const roundness = computed(() => {
  let value = 0

  if (props.shape === 'round')
    value = 100
  if (props.shape === 'rounded-corner')
    value = 5

  return value
})

const placeholder = computed(() => {
  let img = '/assets/avatar.png'

  const template = ['SignatureTemplate6', 'SignatureTemplate7']

  if (installed.value?.name && template.includes(installed.value.name)) {
    img = '/assets/avatar-2.png'
  }

  return img
})
</script>

<template>
  <Base.Table width="auto">
    <tr>
      <td :style="tdStyle">
        <img
          :width="size"
          :src="src ? src : placeholder"
          :style="{
            'max-width': `${size}px`,
            'width': `${size}px`,
            'border-radius': `${roundness}px`,
            'display': 'block',
          }"
          border="0"
          alt="avatar"
        >
      </td>
    </tr>
  </Base.Table>
</template>
