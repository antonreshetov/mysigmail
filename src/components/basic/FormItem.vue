<script setup lang="ts">
import { attributes } from '@/data/attributes'

interface Props {
  index: number
}

const props = defineProps<Props>()

const { installed } = useSignatures()

// +1 because the first element is an image
const itemIndex = props.index + 1
const item = computed(() => installed.value!.tools.basic[itemIndex])

function onRemoveField() {
  if (!installed.value)
    return
  installed.value.tools.basic.splice(itemIndex, 1)
}

watchEffect(() => {
  if (item.value) {
    if (item.value.type === 'hyperlink') {
      if (item.value.title === undefined)
        item.value.title = ''
      if (item.value.underline === undefined)
        item.value.underline = false
    }
    else if (item.value.color === undefined) {
      item.value.color = 'default'
    }
  }
})
</script>

<template>
  <UiFieldForm label-position="top">
    <UiFieldFormItem>
      <template #label>
        <UiFieldFormLabel>
          <div class="flex items-center justify-between w-full">
            <div
              v-if="item"
              class="grow"
            >
              {{ item.label }}
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
                      <UiInput v-model="item.label" />
                    </UiFieldFormItem>
                    <UiFieldFormItem label="Type">
                      <UiSelect v-model="item.type">
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
                    <UiFieldFormItem
                      label="Background Color"
                      class="col-span-1"
                    >
                      <UiInput v-model="item.bgColor" />
                    </UiFieldFormItem>
                    <UiFieldFormItem
                      label="Text Color"
                      class="col-span-1"
                    >
                      <UiInput v-model="item.textColor" />
                    </UiFieldFormItem>
                    <template v-if="item.type === 'hyperlink'">
                      <UiFieldFormItem
                        label="Link Title (Tooltip)"
                        class="col-span-2"
                      >
                        <UiInput
                          v-model="item.title"
                          placeholder="e.g., Book a time on my calendar"
                        />
                      </UiFieldFormItem>
                      <UiFieldFormItem class="col-span-2">
                        <div class="flex items-center gap-2">
                          <UiCheckbox
                            :id="`underline-checkbox-${item.id}`"
                            v-model:checked="item.underline"
                          />
                          <label :for="`underline-checkbox-${item.id}`">Display with underline</label>
                        </div>
                      </UiFieldFormItem>
                    </template>
                    <UiFieldFormItem
                      v-if="item.type !== 'hyperlink'"
                      label="Color"
                      class="col-span-2"
                    >
                      <UiSelect v-model="item.color">
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
                  </UiFieldForm>
                </UiPopoverContent>
              </UiPopover>
              <UiButton
                v-if="item && !item.main"
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
      <UiInput
        v-if="item"
        v-model="item.value"
      />
    </UiFieldFormItem>
  </UiFieldForm>
</template>
