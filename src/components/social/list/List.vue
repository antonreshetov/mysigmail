<script setup lang="ts">
import Draggable from 'vuedraggable'

import type { Social } from '@/composables/signatures/types'
import type { SocialData } from '@/data/socials'

import { socials as socialData } from '@/data/socials'

const { installed, socials } = useSignatures()

function onClick(social: SocialData) {
  const index = socials.value.findIndex(s => s.icon === social.icon)

  if (index !== -1) {
    socials.value.splice(index, 1)
  }
  else {
    socials.value.push({
      icon: social.icon as Social,
      label: social.name,
      value: '',
    })
  }
}

const socialList = computed({
  get: () => socials.value,
  set: (value) => {
    installed.value.tools.socials = value
  },
})
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-10 gap-4">
      <SocialListItem
        v-for="social in socialData"
        :key="social.name"
        :item="social"
        @click="onClick(social)"
      />
    </div>
    <UiFieldForm>
      <Draggable
        v-model="socialList"
        handle=".handle"
      >
        <template #item="{ element }">
          <UiFieldFormItem
            :label="element.label"
            class="mb-4"
          >
            <div class="flex items-center gap-2">
              <SocialUrlInput :type="element.icon" />
              <UilElipsisDoubleVAlt class="handle cursor-grab text-muted-foreground" />
            </div>
          </UiFieldFormItem>
        </template>
      </Draggable>
    </UiFieldForm>
  </div>
</template>

<style>
.sortable-ghost {
  outline: 1px dashed var(--primary);
  outline-offset: 5px;
  border-radius: 0.5rem;
  background-color: var(--background);
}
</style>
