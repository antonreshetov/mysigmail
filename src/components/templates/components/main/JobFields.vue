<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { BasicTool } from '@/composables/signatures/types'

import * as Base from '@/components/templates/components/base'

import { getAnchorAttrs } from '../utils'

interface Props {
  model: BasicTool[]
  type?: string
  name?: string
  tdStyle?: HTMLAttributes['style']
  display?: string
  showLabel?: boolean
  separator?: string
  font?: object
  labelColor?: string
  textColor?: string
  separatorStyle?: HTMLAttributes['style']
}

const props = withDefaults(defineProps<Props>(), {
  type: 'td',
  display: 'block',
  showLabel: true,
})

const { options } = useSignatures()

function getComputedTextColor(item: BasicTool) {
  if (item.color === 'main')
    return options.value.mainColor

  if (item.color === 'secondary')
    return options.value.secondaryColor

  return props.textColor || item.textColor || '#000'
}
</script>

<template>
  <tr>
    <td
      valign="top"
      :style="tdStyle"
      style="font-size: 0"
    >
      <template v-if="separator !== 'br'">
        <p :style="{ ...font, backgroundColor: model[0]?.bgColor }">
          <span
            v-for="(i, index) in model"
            :key="index"
          >
            <span
              v-if="separator && separator !== 'br' && index > 0"
              style="padding: 0 0px"
              :style="separatorStyle"
            >&nbsp;&nbsp;{{ separator }}&nbsp;&nbsp;</span>
            <span
              v-if="showLabel && i.label"
              style="padding-right: 0px; font-weight: 600"
              v-bind="$attrs"
              :style="{ color: labelColor }"
            >{{ i.label }}{{ options?.labelSeparator ?? ':' }}&nbsp;&nbsp;</span>
            <Base.Link
              v-if="i.type !== 'text'"
              v-bind="getAnchorAttrs(i, { color: getComputedTextColor(i) })"
            >
              {{ i.value }}
            </Base.Link>
            <span
              v-if="i.type === 'text'"
              :style="{ color: getComputedTextColor(i) }"
              v-bind="$attrs"
            >{{ i.value }}</span>
          </span>
        </p>
      </template>
      <template v-if="separator === 'br'">
        <p
          v-for="(i, index) in model"
          :key="index"
          :style="{ ...font, backgroundColor: i.bgColor }"
        >
          <span
            v-if="showLabel && i.label"
            style="padding-right: 0px; font-weight: 600"
            v-bind="$attrs"
            :style="{ color: labelColor }"
          >{{ i.label }}{{ options?.labelSeparator ?? ':' }}&nbsp;&nbsp;</span>
          <Base.Link
            v-if="i.type !== 'text'"
            v-bind="getAnchorAttrs(i, { color: getComputedTextColor(i) })"
          >
            {{ i.value }}
          </Base.Link>
          <span
            v-if="i.type === 'text'"
            :style="{ color: getComputedTextColor(i) }"
            v-bind="$attrs"
          >{{ i.value }}</span>
        </p>
      </template>
    </td>
  </tr>
</template>

<style lang="scss"></style>
