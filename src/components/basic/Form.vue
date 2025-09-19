<script setup lang="ts">
const { installed, mainFields } = useSignatures()

const image = computed({
  get: () => installed.value?.tools.basic[0].value || '',
  set: (value: string) => {
    if (!installed.value)
      return
    installed.value.tools.basic[0].value = value
  },
})

function onUploaded(url: string) {
  image.value = url
}
</script>

<template>
  <div>
    <UiFieldForm label-position="top">
      <UiFieldFormItem label="Image">
        <div class="flex items-center gap-2">
          <UiInput
            v-model="image"
            placeholder="https://"
          />
          <UiUpload @uploaded="onUploaded" />
        </div>
      </UiFieldFormItem>
    </UiFieldForm>
    <div class="mt-6 grid grid-cols-2 gap-4">
      <BasicFormItem
        v-for="(i, index) in mainFields"
        :key="i.id!"
        :index="index"
        :value="i"
      />
    </div>
    <BasicAddNewField />
  </div>
</template>
