<script setup lang="ts">
import { main } from './navigation'
</script>

<template>
  <div data-sidebar-nav>
    <template
      v-for="i in main"
      :key="i.path"
    >
      <a
        v-if="i.path.startsWith('http')"
        :href="i.path"
      >
        <SidebarNavItem
          :icon="i.icon"
          :name="i.name"
        />
      </a>
      <RouterLink
        v-else
        v-slot="{ navigate, isActive }"
        :to="i.path"
      >
        <SidebarNavItem
          :icon="i.icon"
          :name="i.name"
          :is-active="isActive"
          @click="navigate"
        />
      </RouterLink>
    </template>
  </div>
</template>
