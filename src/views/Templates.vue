<script setup lang="ts">
import { useTemplateData } from '@/data/templates'

const { templates } = useTemplateData()

const { installed, setTemplate } = useSignatures()
</script>

<template>
  <LayoutsDefault>
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="template in templates"
        :key="template.name"
        class="border rounded-md overflow-hidden cursor-pointer bg-white"
        :class="installed.name === template.name ? 'border-primary' : ''"
      >
        <img
          :src="`/assets/templates/${template.preview}`"
          @click="setTemplate(template)"
        >
      </div>
    </div>
  </LayoutsDefault>
</template>
