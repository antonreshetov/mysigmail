<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import * as Base from '@/components/templates/components/base'

interface Props {
  tdStyle?: HTMLAttributes['style']
}

defineProps<Props>()

const { getAddonValue, options } = useSignatures()

const disclaimer = computed(() => getAddonValue<string>('disclaimer'))

const computedStyle = computed(() => {
  const style: HTMLAttributes['style'] = {
    color: '#888',
  }

  if (options.value) {
    style.fontSize = `${options.value.fontSize}px`
    style.fontFamily = options.value.fontFamily
    style.lineHeight = '14pt'
  }

  return style
})
</script>

<template>
  <Base.Table width="auto">
    <tr>
      <td :style="tdStyle">
        <p :style="computedStyle">
          {{ disclaimer }}
        </p>
      </td>
    </tr>
  </Base.Table>
</template>
