<script setup lang="ts">
import type { AvatarShape } from '@/composables/signatures/types'

import { attributes } from '@/data/attributes'

const { isBgColorAvailable, isColumnSizeAvailable, isSecondColorAvailable, options }
  = useSignatures()

const avatarSize = computed({
  get: () => [options.value.avatarSize],
  set: (value) => {
    options.value.avatarSize = value[0]
  },
})

const column1Width = computed({
  get: () => [options.value.column1Width ?? 50],
  set: (value) => {
    options.value.column1Width = value[0]
  },
})

const mainColor = computed({
  get: () => options.value.mainColor,
  set: (val: string) => {
    options.value.mainColor = val
  },
})

const secondaryColor = computed({
  get: () => options.value.secondaryColor,
  set: (val: string) => {
    options.value.secondaryColor = val
  },
})

const bgColor = computed({
  get: () => options.value.bgColor,
  set: (val: string) => {
    options.value.bgColor = val
  },
})

const bgTextColor = computed({
  get: () => options.value.bgTextColor,
  set: (val: string) => {
    options.value.bgTextColor = val
  },
})

const avatar = computed({
  get: () => options.value.avatar,
  set: (val: boolean) => {
    options.value.avatar = val
  },
})

const avatarShape = computed({
  get: () => options.value.avatarShape,
  set: (val: AvatarShape) => {
    options.value.avatarShape = val
  },
})

const fontFamily = computed({
  get: () => options.value.fontFamily,
  set: (val: string) => {
    options.value.fontFamily = val
  },
})

const fontSize = computed({
  get: () => options.value.fontSize,
  set: (val: number) => {
    options.value.fontSize = val
  },
})

const labelSeparator = computed({
  get: () => options.value.labelSeparator || 'none',
  set: (val: string) => {
    options.value.labelSeparator = val === 'none' ? '' : val
  },
})

const jobSeparator = computed({
  get: () => options.value.jobSeparator,
  set: (val: string) => {
    options.value.jobSeparator = val
  },
})
</script>

<template>
  <div>
    <h3>Color</h3>
    <UiFieldForm class="mb-4">
      <UiFieldFormItem label="Main">
        <UiColorPicker v-model="mainColor" />
      </UiFieldFormItem>
      <UiFieldFormItem
        v-if="isSecondColorAvailable"
        label="Secondary"
      >
        <UiColorPicker v-model="secondaryColor" />
      </UiFieldFormItem>
      <UiFieldFormItem
        v-if="isBgColorAvailable"
        label="Background"
      >
        <UiColorPicker v-model="bgColor" />
      </UiFieldFormItem>
      <UiFieldFormItem
        v-if="isBgColorAvailable"
        label="Background text"
      >
        <UiColorPicker v-model="bgTextColor" />
      </UiFieldFormItem>
    </UiFieldForm>
    <h3>Photo / Logo</h3>
    <UiFieldForm class="mb-4">
      <UiFieldFormItem label="Show">
        <UiSwitch v-model="avatar" />
      </UiFieldFormItem>
      <UiFieldFormItem
        label="Size"
        :description="`Width in percentage. Current: ${avatarSize[0]}%`"
      >
        <div class="flex items-center h-5">
          <UiSlider
            v-model="avatarSize"
            :max="150"
            :min="50"
          />
        </div>
      </UiFieldFormItem>
      <UiFieldFormItem label="Shape">
        <UiSelect v-model="avatarShape">
          <UiSelectTrigger>
            <UiSelectValue placeholder="Select a value" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem
                v-for="item in attributes.avatar.roundness"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFieldFormItem>
    </UiFieldForm>
    <template v-if="isColumnSizeAvailable">
      <h3>Column Size</h3>
      <UiFieldForm class="mb-4">
        <UiFieldFormItem
          label="Column 1"
          :description="`Width in percentage. Current: ${column1Width[0]}%`"
        >
          <div class="flex items-center h-5">
            <UiSlider
              v-model="column1Width"
              :max="100"
              :min="10"
            />
          </div>
        </UiFieldFormItem>
      </UiFieldForm>
    </template>
    <h3>Font</h3>
    <UiFieldForm class="mb-4">
      <UiFieldFormItem label="Family">
        <UiSelect v-model="fontFamily">
          <UiSelectTrigger>
            <UiSelectValue placeholder="Select a value" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectGroup
              v-for="(group, index) in attributes.font.family"
              :key="index"
            >
              <UiSelectLabel>{{ group.label }}</UiSelectLabel>
              <UiSelectItem
                v-for="item in group.options"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFieldFormItem>
      <UiFieldFormItem label="Size">
        <UiSelect v-model="fontSize">
          <UiSelectTrigger>
            <UiSelectValue placeholder="Select a value" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem
                v-for="item in attributes.font.size"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFieldFormItem>
    </UiFieldForm>
    <h3>Other</h3>
    <UiFieldForm class="mb-4">
      <UiFieldFormItem label="Job separator">
        <UiSelect v-model="jobSeparator">
          <UiSelectTrigger>
            <UiSelectValue placeholder="Select a value" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem
                v-for="item in attributes.separator.options"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFieldFormItem>
      <UiFieldFormItem label="Label separator">
        <UiSelect v-model="labelSeparator">
          <UiSelectTrigger>
            <UiSelectValue placeholder="Select a value" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem
                v-for="item in attributes.labelSeparator.options"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFieldFormItem>
    </UiFieldForm>
  </div>
</template>

<style lang="scss"></style>
