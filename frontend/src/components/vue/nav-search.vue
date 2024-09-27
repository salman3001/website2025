<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <label
    class="input input-sm input-bordered items-center gap-2 hidden sm:flex"
  >
    <input type="text" class="grow max-w-16" placeholder="Search" />
    <kbd class="kbd kbd-sm text-primary">⌘</kbd>
    <kbd class="kbd kbd-sm text-primary">K</kbd>
  </label>

  <button class="btn btn-outline btn-primary btn-sm block sm:hidden">
    <MagnifyingGlassIcon class="size-5" />
  </button>
</template>
