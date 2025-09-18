<script setup lang="ts">
import { formKeys } from './keys'

interface Props {
  label?: string
  description?: string
}

defineProps<Props>()

const formProps = inject(formKeys)!
</script>

<template>
  <div
    v-if="formProps.labelPosition === 'left'"
    class="grid relative"
    :style="{ gridTemplateColumns: `${formProps.labelWidth} 1fr` }"
  >
    <UiFieldFormLabel v-if="label">
      {{ label }}
    </UiFieldFormLabel>
    <slot
      v-else
      name="label"
    />
    <div class="w-full">
      <slot />
    </div>
    <template v-if="description">
      <div />
      <UiFieldFormDescription>
        {{ description }}
      </UiFieldFormDescription>
    </template>
    <template v-else>
      <div />
      <slot name="description" />
    </template>
  </div>
  <div
    v-else
    class="space-y-1"
  >
    <UiFieldFormLabel v-if="label">
      {{ label }}
    </UiFieldFormLabel>
    <slot
      v-else
      name="label"
    />
    <div class="w-full">
      <slot />
    </div>
    <UiFieldFormDescription v-if="description">
      {{ description }}
    </UiFieldFormDescription>
    <template v-else>
      <div />
      <slot name="description" />
    </template>
  </div>
</template>
