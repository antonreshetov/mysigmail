<script setup lang="ts">
import { attributes } from '@/data/attributes'
import { clone } from '@/utils'

interface Props {
  index: number
  value: BasicTool
}

const props = defineProps<Props>()

const { installed } = useSignatures()

const localValue = ref(clone<BasicTool>(props.value))

// +1 потому что первый элемент это изображение
const index = props.index + 1

function update(tool: BasicTool) {
  if (!installed.value)
    return

  const { label, type, value } = tool

  installed.value.tools.basic[index].label = label
  installed.value.tools.basic[index].type = type
  installed.value.tools.basic[index].value = value
}

function onRemoveField() {
  if (!installed.value)
    return
  installed.value.tools.basic.splice(index, 1)
}

watch(localValue, v => update(v), { deep: true })
</script>

<template>
  <UiFieldForm label-position="top">
    <UiFieldFormItem>
      <template #label>
        <UiFieldFormLabel>
          <div class="flex items-center justify-between w-full">
            <div class="grow">
              {{ localValue.label }}
            </div>
            <div class="flex items-center">
              <UiPopover>
                <UiPopoverTrigger
                  tabindex="-1"
                  as-child
                >
                  <UiButton
                    variant="ghost"
                    size="icon-xs"
                  >
                    <UilSetting class="cursor-pointer" />
                  </UiButton>
                </UiPopoverTrigger>
                <UiPopoverContent>
                  <UiFieldForm
                    label-position="top"
                    class="grid grid-cols-2 gap-4 space-y-0"
                  >
                    <UiFieldFormItem label="Label">
                      <UiInput v-model="localValue.label" />
                    </UiFieldFormItem>
                    <UiFieldFormItem label="Type">
                      <UiSelect v-model="localValue.type">
                        <UiSelectTrigger class="w-full">
                          <UiSelectValue placeholder="Select a timezone" />
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
                </UiPopoverContent>
              </UiPopover>
              <UiButton
                v-if="!localValue.main"
                variant="ghost"
                size="icon-xs"
                @click="onRemoveField"
              >
                <UilTrashAlt class="text-destructive" />
              </UiButton>
            </div>
          </div>
        </UiFieldFormLabel>
      </template>
      <UiInput v-model="localValue.value" />
    </UiFieldFormItem>
  </UiFieldForm>
</template>
