<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { BasicTool } from '@/composables/signatures/types'

import * as Base from '@/components/templates/components/base'

import { getAnchorAttrs } from '../utils'

interface Props {
  model: BasicTool
  type?: string
  enableAnalytics?: boolean
  tdStyle?: HTMLAttributes['style']
  display?: string
  showLabel?: boolean
  separator?: string
  font?: object
  labelColor?: string
  textColor?: string
}

withDefaults(defineProps<Props>(), {
  type: 'td',
  display: 'block',
  showLabel: true,
})
</script>

<template>
  <tr>
    <td
      valign="top"
      :style="tdStyle"
      style="font-size: 0"
    >
      <p
        v-if="model.value"
        :style="{ ...font, display }"
      >
        <span
          v-if="showLabel && model.label && model.type !== 'hyperlink'"
          style="padding-right: 0px; font-weight: 600"
          v-bind="$attrs"
          :style="{ color: labelColor }"
        >{{ model.label }}:&nbsp;&nbsp;</span>
        <Base.Link
          v-if="model.type !== 'text'"
          v-bind="getAnchorAttrs(model, textColor || '#010101', enableAnalytics, analyticTag)"
          :style="{ textDecoration: model.underline === false ? 'none' : 'underline' }"
          :title="model.title"
        >
          <template v-if="model.type === 'hyperlink'">
            {{ model.label }}
          </template>
          <template v-else>
            {{ model.value }}
          </template>
        </Base.Link>
        <span
          v-if="model.type === 'text'"
          :style="{ color: textColor || '#010101' }"
          v-bind="$attrs"
        >{{ model.value }}</span>
      </p>
    </td>
  </tr>
</template>
