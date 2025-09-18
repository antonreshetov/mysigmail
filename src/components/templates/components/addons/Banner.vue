<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { AddonBanner } from '@/composables/signatures/types'

import * as Base from '@/components/templates/components/base'
import { normalizeUrl } from '@/utils'

interface Props {
  tdStyle?: HTMLAttributes['style']
  enableAnalytics?: boolean
}

defineProps<Props>()

const { getAddonValue } = useSignatures()

const DEFAULT_BANNER_IMAGE = `/assets/mysigmail-promo-banner.png`

const banner = computed(() => getAddonValue<AddonBanner>('banner'))
</script>

<template>
  <Base.Table width="auto">
    <tr>
      <td
        valign="top"
        :style="tdStyle"
      >
        <a
          :href="normalizeUrl(banner.link)"
          target="_blank"
        >
          <img
            :src="banner.image || DEFAULT_BANNER_IMAGE"
            alt="banner"
            :style="{ maxWidth: banner.width ? `${banner.width}%` : '100%' }"
          >
        </a>
      </td>
    </tr>
  </Base.Table>
</template>
