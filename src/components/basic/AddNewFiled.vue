<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import { nanoid } from 'nanoid'

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
})

const open = ref(false)
const firstFiled = ref()

useFocus(firstFiled, { initialValue: true })

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
}
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
            ref="firstFiled"
            v-model="field.label"
          />
        </UiFieldFormItem>
        <UiFieldFormItem label="Value">
          <UiInput v-model="field.value" />
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
