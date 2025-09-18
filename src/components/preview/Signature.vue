<script setup lang="ts">
import Template1 from '@/components/templates/Template1.vue'
import Template2 from '@/components/templates/Template2.vue'
import Template3 from '@/components/templates/Template3.vue'
import Template4 from '@/components/templates/Template4.vue'
import Template5 from '@/components/templates/Template5.vue'
import Template6 from '@/components/templates/Template6.vue'
import Template7 from '@/components/templates/Template7.vue'
import Template8 from '@/components/templates/Template8.vue'
import Template9 from '@/components/templates/Template9.vue'
// import { useCopySignature } from '@/composables/useCopySignature'

const { getHtml } = useCopySignature()
const { installed } = useSignatures()

onMounted(() => {
  watch(
    installed,
    () => {
      nextTick(() => {
        getHtml()
      })
    },
    { immediate: true, deep: true },
  )
})

// Легаси названия шаблонов
const templates: Record<string, Component> = {
  SignatureTemplate1: Template1,
  SignatureTemplate2: Template2,
  SignatureTemplate3: Template3,
  SignatureTemplate4: Template4,
  SignatureTemplate5: Template5,
  SignatureTemplate6: Template6,
  SignatureTemplate7: Template7,
  SignatureTemplate8: Template8,
  SignatureTemplate9: Template9,
}
</script>

<template>
  <div data-slot="signature">
    <component :is="templates[installed.name]" />
  </div>
</template>
