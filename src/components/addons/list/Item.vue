<script setup lang="ts">
interface Props {
  name: string
  isNew?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex items-center justify-between px-2 py-3 cursor-pointer hover:text-primary border-b first:border-t"
  >
    <div>
      {{ name }}
    </div>
    <UiButton
      variant="ghost"
      size="icon-xs"
    >
      <UilPlus class="size-4" />
    </UiButton>
  </div>
</template>
