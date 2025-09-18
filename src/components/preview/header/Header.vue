<script setup lang="ts">
const { isHtmlLarge, onCopyHTML, onCopySelect } = useCopySignature()
</script>

<template>
  <div class="flex items-center justify-between">
    <div />
    <div class="flex gap-2">
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="outline">
            Get Signature

            <UilAngleDown class="ml-1 -mr-1 opacity-50 w-5 h-5" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent class="w-32">
          <UiDropdownMenuItem @click="onCopySelect">
            Copy as Select
          </UiDropdownMenuItem>
          <UiDropdownMenuItem @click="onCopyHTML">
            Copy as HTML
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
</template>
