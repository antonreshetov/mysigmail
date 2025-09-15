<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  name: string
  icon: Component
  isActive?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="px-[6px] my-[6px]">
    <div
      class="flex flex-col items-center text-center p-3 hover:bg-secondary rounded-md"
      :class="{
        '!bg-primary text-primary-foreground': isActive,
      }"
    >
      <component
        :is="icon"
        class="w-5 h-5 mb-1"
      />
      <div class="text-xs">
        {{ name }}
      </div>
    </div>
  </div>
</template>
