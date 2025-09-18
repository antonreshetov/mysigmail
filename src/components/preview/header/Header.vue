<script setup lang="ts">
const { isHtmlLarge, onCopyHTML, onCopySelect } = useCopySignature()
const { downloadJSON, installed, uploadJSON } = useSignatures()
const { sonner } = useSonner()

const inputRef = ref<HTMLInputElement>()

function onDownload() {
  downloadJSON(installed.value)
}

function onFileSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]

  if (!file)
    return

  const reader = new FileReader()

  reader.onload = async () => {
    await uploadJSON(reader.result as string)
    sonner({
      title: 'Success',
      type: 'success',
      description: 'Signature uploaded successfully',
    })
  }

  reader.readAsText(file)
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div />
    <div class="flex gap-2">
      <UiButton
        variant="outline"
        @click="inputRef?.click()"
      >
        Upload JSON
      </UiButton>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="outline">
            Get Signature
            <UilAngleDown class="ml-1 -mr-1 opacity-50 w-5 h-5" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent _class="w-32">
          <UiDropdownMenuItem @click="onCopySelect">
            Copy as Select
          </UiDropdownMenuItem>
          <UiDropdownMenuItem @click="onCopyHTML">
            Copy as HTML
          </UiDropdownMenuItem>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem @click="onDownload">
            Download JSON
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>
  </div>
  <div
    v-if="isHtmlLarge"
    class="mt-3"
  >
    <UiAlert>
      <UilExclamationTriangle
        name="uil:exclamation-triangle"
        class="size-4"
      />
      <UiAlertTitle> Signature is too large </UiAlertTitle>
      <UiAlertDescription>
        The HTML code for the signature exceeds 10,000 characters, which may be too much for some
        email clients (e.g., Outlook or Gmail). We recommend reducing the size: remove unnecessary
        add-ons or shorten the text.
      </UiAlertDescription>
    </UiAlert>
  </div>
  <input
    ref="inputRef"
    style="display: none"
    type="file"
    accept=".json"
    @change="onFileSelected"
  >
</template>
