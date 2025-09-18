<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import * as Base from '@/components/templates/components/base'
import { normalizeUrl } from '@/utils'

interface Props {
  tdStyle?: HTMLAttributes['style']
  center?: boolean
  enableAnalytics?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  center: false,
})

const { options, socials } = useSignatures()

const computedStyle = computed(() => {
  let style = {}

  if (props.tdStyle) {
    style = props.tdStyle
  }

  if (props.center) {
    return {
      ...style,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }

  return style
})
</script>

<template>
  <Base.Table
    style="font-size: 0"
    :style="computedStyle"
    width="auto"
  >
    <tr>
      <template
        v-for="(i, index) in socials"
        :key="index"
      >
        <td
          align="center"
          style="padding: 0px !important"
        >
          <p
            style="margin: 0; border-radius: 3px"
            :style="{ backgroundColor: options && options.mainColor }"
          >
            <a
              :href="normalizeUrl(i.value)"
              style="display: inline-block; border-radius: 3px"
            >
              <img
                width="20"
                height="20"
                :src="`/assets/icons/${i.icon}.png`"
                :alt="`social-icon-${i.icon}`"
                style="display: table-cell; vertical-align: middle; border-radius: 3px"
                :style="{ backgroundColor: options && options.mainColor }"
              >
            </a>
          </p>
        </td>
        <td
          v-if="index < socials.length - 1"
          :key="`${index}space`"
          width="2"
        />
      </template>
    </tr>
  </Base.Table>
</template>
