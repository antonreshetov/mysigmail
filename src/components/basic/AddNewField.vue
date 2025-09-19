<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import { nanoid } from 'nanoid'
import { watch } from 'vue'

import type { BasicTool } from '@/composables/signatures/types'

import { attributes } from '@/data/attributes'
import { clone } from '@/utils'

const { installed } = useSignatures()

const field = ref<BasicTool>({
  id: nanoid(8),
  label: '',
  value: '',
  main: false,
  type: attributes.types[0].value as BasicTool['type'],
  underline: true,
  color: 'default',
})

const open = ref(false)
const firstField = ref()

useFocus(firstField, { initialValue: true })

function onAddField() {
  if (!installed.value)
    return
  installed.value.tools.basic.push(clone(field.value))
  open.value = false
  reset()
}

function reset() {
  field.value.id = nanoid(8)
  field.value.label = ''
  field.value.value = ''
  field.value.main = false
  field.value.type = attributes.types[0].value as BasicTool['type']
  field.value.underline = true
  field.value.color = 'default'
}

watch(
  () => field.value.type,
  (newType) => {
    if (newType === 'hyperlink' && typeof field.value.underline === 'undefined') {
      field.value.underline = true
    }
    else if (newType !== 'hyperlink' && typeof field.value.color === 'undefined') {
      field.value.color = 'default'
      field.value.underline = true
    }
  },
)
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogTrigger class="w-full mt-7">
      <UiButton class="w-full">
        Add Custom Field
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Add Custom Field</UiDialogTitle>
      </UiDialogHeader>
      <UiFieldForm label-position="top">
        <UiFieldFormItem label="Label">
          <UiInput
            ref="firstField"
            v-model="field.label"
          />
        </UiFieldFormItem>
        <UiFieldFormItem label="Value">
          <UiInput
            v-model="field.value"
            :placeholder="field.type === 'hyperlink' ? 'https://example.com' : ''"
          />
        </UiFieldFormItem>
        <UiFieldFormItem label="Type">
          <UiSelect v-model="field.type">
            <UiSelectTrigger>
              <UiSelectValue />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem
                  v-for="i in attributes.types"
                  :key="i.value"
                  :value="i.value"
                >
                  {{ i.label }}
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </UiFieldFormItem>
        <template v-if="field.type === 'hyperlink'">
          <UiFieldFormItem label="Link Title (Tooltip)">
            <UiInput
              v-model="field.title"
              placeholder="e.g., Book a time on my calendar"
            />
          </UiFieldFormItem>
          <UiFieldFormItem>
            <div class="flex items-center gap-2">
              <UiCheckbox
                id="underline-checkbox"
                v-model:checked="field.underline"
              />
              <label for="underline-checkbox">Display with underline</label>
            </div>
          </UiFieldFormItem>
        </template>
        <template v-else>
          <UiFieldFormItem label="Color">
            <UiSelect v-model="field.color">
              <UiSelectTrigger>
                <UiSelectValue />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem value="default">
                    Default
                  </UiSelectItem>
                  <UiSelectItem value="main">
                    Main Color
                  </UiSelectItem>
                  <UiSelectItem value="secondary">
                    Secondary Color
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </UiFieldFormItem>
        </template>
      </UiFieldForm>
      <UiDialogFooter>
        <UiButton
          class="w-full mt-3"
          @click="onAddField"
        >
          Add Field
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
