<script setup lang="ts">
import type { Social } from '@/composables/signatures/types'

interface Props {
  type: Social
}

const props = defineProps<Props>()

const { getSocialValue, setSocialValue } = useSignatures()

const url = computed({
  get: () => getSocialValue(props.type),
  set: value => setSocialValue(props.type, value ?? ''),
})
</script>

<template>
  <UiInput
    v-model="url"
    type="text"
    class="w-full"
  />
</template>
