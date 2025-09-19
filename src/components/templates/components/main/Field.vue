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
  analyticTag?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'td',
  display: 'block',
  showLabel: true,
})

const { options } = useSignatures()

const computedTextColor = computed(() => {
  if (props.model.color === 'main')
    return options.value.mainColor

  if (props.model.color === 'secondary')
    return options.value.secondaryColor

  return props.textColor || '#010101'
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
        >{{ model.label }}{{ options?.labelSeparator ?? ':' }}&nbsp;&nbsp;</span>
        <Base.Link
          v-if="model.type !== 'text'"
          v-bind="
            getAnchorAttrs(model.type === 'hyperlink' ? { ...model, type: 'link' } : model, {
              color: computedTextColor,
              enableAnalytics,
              analyticTag,
            })
          "
          :style="{
            textDecoration:
              model.type === 'hyperlink' && model.underline ? 'underline' : 'none !important',
          }"
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
          :style="{ color: computedTextColor }"
          v-bind="$attrs"
        >{{
          model.value
        }}</span>
      </p>
    </td>
  </tr>
</template>
