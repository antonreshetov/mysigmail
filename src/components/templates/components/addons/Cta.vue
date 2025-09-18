<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { AddonCTA } from '@/composables/signatures/types'

import * as Base from '@/components/templates/components/base'
import { normalizeUrl } from '@/utils'

interface Props {
  tdStyle?: HTMLAttributes['style']
  enableAnalytics?: boolean
}

defineProps<Props>()

const { getAddonValue } = useSignatures()

const cta = computed(() => getAddonValue<AddonCTA>('cta'))

const computedStyle = computed(() => {
  return {
    borderRadius: '3px',
    backgroundColor: cta.value.colorBg,
    padding: '0 9px',
    color: cta.value.colorText,
  }
})

const isImage = computed(() => cta.value.type === 'image')

const defaultCtaImage = `/assets/cta-demo.png`
</script>

<template>
  <Base.Table width="auto">
    <tr>
      <td
        valign="top"
        :style="tdStyle"
      >
        <Base.Link :href="normalizeUrl(cta.link)">
          <Base.Table
            v-if="!isImage"
            width="auto"
          >
            <tr>
              <td
                height="30"
                :style="computedStyle"
              >
                {{ cta.text }}
              </td>
            </tr>
          </Base.Table>
          <img
            v-else
            :src="cta.image || defaultCtaImage"
            alt="cta"
            :style="{ maxWidth: cta.width ? `${cta.width}%` : '100%' }"
          >
        </Base.Link>
      </td>
    </tr>
  </Base.Table>
</template>
