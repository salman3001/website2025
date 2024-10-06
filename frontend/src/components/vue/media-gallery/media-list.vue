<script setup lang="ts">
import { computed, ref } from "vue";
import { MediaWindow, type Media, MediaType } from ".";
import FormControl from "../forms/form-control.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import MediaCard from "./media-card.vue";
import Pagination from "../pagination.vue";

const categories = ref<{ name: string; id: number }[]>([]);

const medias: Media[] = [
  {
    id: 1,
    name: "media 1",
    mediaCategoryId: 1,
    type: MediaType.Image,
    url: "uploads/images/1727002279405f8333f2a-4f2f-4069-a609-6f0a3e883cb7.webp",
  },
  {
    id: 2,
    name: "media 3",
    mediaCategoryId: 1,
    type: MediaType.document,
    url: "uploads/images/1727002279405f8333f2a-4f2f-4069-a609-6f0a3e883cb7.webp",
  },
];

defineProps<{
  multiple?: boolean;
}>();

const emit = defineEmits<{
  windowChange: [window: MediaWindow];
  selected: [values: Media[]];
  delete: [values: Media[]];
}>();

const selected = ref([]);

const anyThingSelected = computed(() => {
  if (selected.value instanceof Array && selected.value.length > 0) {
    return true;
  } else if (
    !(selected.value instanceof Array) &&
    ![undefined, null].includes(selected.value as unknown as null)
  ) {
    return true;
  } else {
    return false;
  }
});
</script>
<template>
  <div class="flex justify-between items-center">
    <button
      class="btn btn-sm btn-primary"
      @click="() => emit('windowChange', MediaWindow.ADD_MEDIA)"
    >
      <PlusIcon class="size-6" />
      Add Media
    </button>
    <div>
      <FormControl
        type="select"
        name="categoryId"
        v-model="categories"
        className="select-sm"
        hideLable
        placeholder="Select Category"
      >
        <option disabled selected>Category</option>
        <option
          v-for="category in categories"
          :value="category.id"
          :key="category.id"
        >
          {{ category.name }}
        </option>
      </FormControl>
    </div>
  </div>
  <br />
  <div
    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[30rem] overflow-scroll p-4 outline outline-1 rounded-lg outline-gray-300"
  >
    <MediaCard
      v-for="media in medias"
      v-model="selected"
      :media="media"
      :multiple="multiple"
    />
  </div>

  <br />
  <div class="flex items-center justify-between">
    <div class="space-x-2">
      <button
        class="btn btn-primary"
        v-if="anyThingSelected"
        @click="() => emit('selected', selected)"
      >
        Select
      </button>
      <button
        class="btn btn-primary"
        v-if="anyThingSelected"
        @click="() => emit('delete', selected)"
      >
        Delete
      </button>
    </div>
    <Pagination />
  </div>
</template>
