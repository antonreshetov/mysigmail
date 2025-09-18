<script setup lang="ts">
const { isHtmlLarge, onCopyHTML, onCopySelect } = useCopySignature()

const open = ref(false)
</script>

<template>
  <div class="flex items-center justify-between">
    <div />
    <div class="flex gap-2">
      <UiDialog v-model:open="open">
        <UiDialogTrigger>
          <UiButton variant="link">
            Support MySigMail
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle>Made with ❤️, Powered by You</UiDialogTitle>
          </UiDialogHeader>
          <UiDialogDescription>
            MySigMail is built and maintained with love as an open-source project. If you find it
            useful, consider supporting us — your contribution helps us keep improving and building
            new features for the community.
          </UiDialogDescription>
          <div class="flex flex-col gap-2">
            <UiButton as-child>
              <a
                href="https://paypal.me/antongithub"
                target="_blank"
              > PayPal </a>
            </UiButton>
            <UiButton as-child>
              <a
                href="https://opencollective.com/masscode"
                target="_blank"
              > Open Collective </a>
            </UiButton>
          </div>
        </UiDialogContent>
      </UiDialog>
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
