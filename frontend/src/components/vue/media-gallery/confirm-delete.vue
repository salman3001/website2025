<script setup lang="ts">
import { ref } from "vue";
import { MediaWindow, type Media } from ".";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";

defineProps<{ selectedForDelete: Media[] | Media | undefined }>();

const emit = defineEmits<{
  windowChange: [window: MediaWindow];
}>();
</script>

<template>
  <div class="flex justify-between items-center">
    <button
      class="btn btn-sm btn-primary"
      @click="() => emit('windowChange', MediaWindow.MEDIA_LIST)"
    >
      <ArrowLeftIcon class="size-6" />
      Back
    </button>
    <div></div>
  </div>
  <br />
  <div>Confirm Delete {{ selectedForDelete }}</div>
</template>
