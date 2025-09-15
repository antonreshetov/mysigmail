<script setup lang="ts"></script>

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
      <HeaderColorMode />
    </div>
  </div>
</template>
