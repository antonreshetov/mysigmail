<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { AddonLogo } from '@/composables/signatures/types'

interface Props {
  tdStyle?: HTMLAttributes['style']
  width?: number
}

const props = defineProps<Props>()

const { getAddonValue, options } = useSignatures()

const logo = getAddonValue<AddonLogo>('logo')

const computedWidth = computed(() => props.width || logo.width || options.value.avatarSize)
</script>

<template>
  <tr v-if="logo.image">
    <td
      :style="tdStyle"
      style="padding: 0px !important"
    >
      <a
        :href="logo.link"
        target="_blank"
      >
        <img
          :width="computedWidth"
          :src="logo.image"
          alt="logo"
          style="display: block"
        >
      </a>
    </td>
  </tr>
</template>
