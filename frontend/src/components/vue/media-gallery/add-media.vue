<script setup lang="ts">
import { ref } from "vue";
import { MediaWindow } from ".";
import FormControl from "../forms/form-control.vue";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/vue/24/solid";

const categories = ref<{ name: string; id: number }[]>([]);

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
  <div>Add Media</div>
</template>
