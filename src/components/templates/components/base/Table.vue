<script setup lang="ts">
interface Props {
  width?: string | number
  responsive?: boolean
  borderCollapse?: boolean
}

withDefaults(defineProps<Props>(), {
  responsive: true,
  width: 550,
  borderCollapse: true,
})
</script>

<template>
  <table
    data-base-table
    cellpadding="0"
    cellspacing="0"
    border="0"
    role="presentation"
    style="margin: 0px; border-spacing: 0 !important"
    :style="{ borderCollapse: borderCollapse ? 'collapse' : 'separate' }"
    :class="{ wrapper: responsive }"
    :width="width"
  >
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<style lang="scss" scoped></style>
