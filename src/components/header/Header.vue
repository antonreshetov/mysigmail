<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <div
    data-header
    class="p-3 pr-6 flex justify-between"
  >
    <RouterLink to="/basic">
      <div class="w-[var(--sidebar-width)]">
        <img
          src="/logo.svg"
          alt="MySigMail"
          class="w-[59px] dark:invert"
        >
      </div>
    </RouterLink>
    <div class="flex items-center gap-6">
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
      <HeaderColorMode />
    </div>
  </div>
</template>
