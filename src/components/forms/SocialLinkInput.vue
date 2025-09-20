<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import type { Social } from '@/composables/signatures/types'

const props = defineProps({
  networkName: {
    type: String,
    required: true,
  },
})

const { customSocialIcons, getSocialValue, setSocialValue } = useSignatures()

const url = computed({
  get: () => getSocialValue(props.networkName as Social),
  set: value => setSocialValue(props.networkName as Social, value ?? ''),
})

// This local ref controls which UI (default or custom) is shown.
// It's initialized based on whether a custom icon already exists in the state.
const iconType = ref(
  Object.prototype.hasOwnProperty.call(customSocialIcons.value, props.networkName)
    ? 'custom'
    : 'default',
)

// When the user switches back to "Default", we must remove the custom icon data
// from the state to ensure the fallback to the Iconify icon works correctly.
watch(iconType, (newType) => {
  if (newType === 'default') {
    delete customSocialIcons.value[props.networkName]
  }
})
</script>

<template>
  <div class="social-link-editor space-y-3">
    <label
      :for="`${networkName}-url`"
      class="capitalize"
    >{{ networkName }} URL</label>
    <UiInput
      :id="`${networkName}-url`"
      v-model="url"
      type="text"
      class="w-full"
    />

    <div class="icon-choice">
      <label>
        <input
          v-model="iconType"
          type="radio"
          :name="`${networkName}-icon-type`"
          value="default"
        >
        Default Icon
      </label>
      <label>
        <input
          v-model="iconType"
          type="radio"
          :name="`${networkName}-icon-type`"
          value="custom"
        >
        Custom Icon
      </label>
    </div>

    <div v-if="iconType === 'custom'">
      <label :for="`${networkName}-icon-url`">Custom Icon URL</label>
      <UiInput
        :id="`${networkName}-icon-url`"
        v-model="customSocialIcons[networkName]"
        type="text"
        placeholder="https://example.com/icon.png"
      />
      <p class="instructions">
        Provide a direct URL to your hosted icon image (e.g., PNG, SVG, or GIF).
      </p>
    </div>
  </div>
</template>

<style scoped>
.icon-choice {
  display: flex;
  gap: 1rem;
}
.instructions {
  font-size: 0.8rem;
  color: #666;
}
.capitalize {
  text-transform: capitalize;
}
</style>
