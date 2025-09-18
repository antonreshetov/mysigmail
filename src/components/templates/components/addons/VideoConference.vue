<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { AddonVideoConference } from '@/composables/signatures/types'

import * as Base from '@/components/templates/components/base'
import { normalizeUrl } from '@/utils'

interface Props {
  tdStyle?: HTMLAttributes['style']
  enableAnalytics?: boolean
}

defineProps<Props>()

const { getAddonValue } = useSignatures()

const COLORS = {
  hangouts: '#03B066',
  skype: '#00BEF8',
  zoom: '#259DFF',
}

const LOGOS = {
  hangouts: '/assets/icons/hangouts.png',
  skype: '/assets/icons/skype.png',
  zoom: '/assets/icons/zoom.png',
}

const videoConference = computed(() => getAddonValue<AddonVideoConference>('videoConference'))

const logoUrl = computed(() => LOGOS[videoConference.value.type])

const leftCellStyle = computed(() => {
  const style = {
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
    backgroundColor: COLORS[videoConference.value.type],
    padding: '0 5px 0 0 !important',
  }
  return style
})

const rightCellStyle = computed(() => {
  const style = {
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
    backgroundColor: COLORS[videoConference.value.type],
    padding: '0 9px 0 0 !important',
    color: '#fff',
  }
  return style
})
</script>

<template>
  <Base.Table width="auto">
    <tr>
      <td :style="tdStyle">
        <Base.Link :href="normalizeUrl(videoConference.link)">
          <Base.Table width="auto">
            <tr>
              <td
                height="30"
                :style="leftCellStyle"
              >
                <img
                  :src="logoUrl"
                  width="24"
                  height="24"
                  style="display: table-cell"
                >
              </td>
              <td
                height="30"
                :style="rightCellStyle"
              >
                <div>{{ videoConference.text }}</div>
              </td>
            </tr>
          </Base.Table>
        </Base.Link>
      </td>
    </tr>
  </Base.Table>
</template>
