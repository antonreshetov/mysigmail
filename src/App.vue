<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

const { init } = useSignatures()

onMounted(() => {
  init()
})
</script>

<template>
  <RouterView />
  <Toaster />
</template>
