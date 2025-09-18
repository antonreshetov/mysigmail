<script setup lang="ts">
interface Props {
  leftPadding?: boolean
  rightPadding?: boolean
  width?: string
  color?: string
}

withDefaults(defineProps<Props>(), {
  width: '1px',
  color: '#ddd',
})
</script>

<template>
  <td v-if="leftPadding">
&nbsp;&nbsp;
  </td>
  <td :style="{ borderLeft: `${width} solid ${color}` }" />
  <td v-if="rightPadding">
&nbsp;&nbsp;
  </td>
</template>
