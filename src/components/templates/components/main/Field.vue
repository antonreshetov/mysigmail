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
  // если установить чисто черный то некоторые клиенты
  // перекрашивают в дефолтный для ссылок
  textColor: '#010101',
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
          v-if="showLabel && model.label"
          style="padding-right: 0px; font-weight: 600"
          v-bind="$attrs"
          :style="{ color: labelColor }"
        >{{ model.label }}:&nbsp;&nbsp;</span>
        <Base.Link
          v-if="model.type !== 'text'"
          v-bind="getAnchorAttrs(model, textColor, enableAnalytics, analyticTag)"
        >
          {{ model.value }}
        </Base.Link>
        <span
          v-if="model.type === 'text'"
          :style="{ color: textColor }"
          v-bind="$attrs"
        >{{
          model.value
        }}</span>
      </p>
    </td>
  </tr>
</template>
