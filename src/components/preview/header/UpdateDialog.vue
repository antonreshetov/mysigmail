<script setup lang="ts">
import { useFocus } from '@vueuse/core'

import { useHeaderPreview } from './composables'

const { openDialog } = useHeaderPreview()

const { getSignatures, selectedId, signatureRaw, updateSignature } = useSignatures()
const { gtag } = useGtag()

const firstFiled = ref()
const isPending = ref(false)

useFocus(firstFiled, { initialValue: true })

const localName = ref()

const name = computed({
  get() {
    return signatureRaw.value?.name
  },
  set(value) {
    localName.value = value
  },
})

async function onSave() {
  isPending.value = true
  try {
    await updateSignature(selectedId.value!, {
      name: localName.value.trim(),
    })
    await getSignatures()
    openDialog.value = false

    gtag('event', 'rename_signature', {
      event_label: 'Rename signature',
      event_category: 'app_interaction',
    })
  }
  finally {
    isPending.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="openDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename</DialogTitle>
      </DialogHeader>
      <div class="space-y-4">
        <FormField name="label">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <UiInput
              ref="firstFiled"
              v-model="name"
            />
          </FormItem>
        </FormField>
      </div>
      <DialogFooter>
        <Button
          class="w-full mt-4"
          :disabled="isPending"
          @click="onSave"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
