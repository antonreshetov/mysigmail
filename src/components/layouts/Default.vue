<script setup lang="ts"></script>

<template>
  <div
    data-layout-default
    class="h-screen grid grid-cols-[85px_550px_1fr] grid-rows-[50px_1fr]"
  >
    <Header class="col-span-3 border-b" />
    <Sidebar class="border-r overflow-y-auto" />
    <div
      data-main
      class="px-6 py-4 overflow-y-auto"
    >
      <div class="mb-4">
        <h1 class="text-2xl font-semibold leading-thin mb-2">
          {{ $route.meta.title }}
        </h1>
        <p
          v-if="$route.meta.description"
          class="text-sm text-muted-foreground"
        >
          {{ $route.meta.description }}
        </p>
      </div>
      <div>
        <slot />
      </div>
    </div>
    <div
      data-preview
      class="bg-accent dark:bg-accent/20 p-6 overflow-y-auto"
    >
      <Preview />
    </div>
  </div>
</template>
