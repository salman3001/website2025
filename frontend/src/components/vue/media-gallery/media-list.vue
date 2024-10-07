<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MediaWindow, type Media, type MediaCategory } from ".";
import FormControl from "../forms/form-control.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import MediaCard from "./media-card.vue";
import Pagination from "../pagination.vue";
import useApiGet from "../composables/useApiGet";
import { apiRoutes } from "src/utils/apiRoutes";
import type { IPaginated } from "src/utils/types";

const { data: categories, exec: getCategories } = useApiGet<MediaCategory[]>();

const {
  data: medias,
  processing,
  exec: getMedias,
} = useApiGet<IPaginated<Media[]>>();

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

onMounted(() => {
  getCategories(apiRoutes.mediaCategory.index());
  getMedias(apiRoutes.media.index());
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
  <div class="flex items-center justify-between">
    <div class="space-x-2">
      <button
        class="btn btn-primary btn-sm"
        v-if="anyThingSelected"
        @click="() => emit('selected', selected)"
      >
        Select {{ selected?.length }}
      </button>
      <button
        class="btn btn-primary btn-sm btn-outline btn-error"
        v-if="anyThingSelected"
        @click="() => emit('delete', selected)"
      >
        Delete {{ selected?.length }}
      </button>
    </div>
  </div>
  <br />
  <div
    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[30rem] overflow-scroll p-4 outline outline-1 rounded-lg outline-gray-300"
  >
    <div v-if="processing">Loading..</div>
    <MediaCard
      v-else
      v-for="media in medias?.data"
      v-model="selected"
      :media="media"
      :multiple="multiple"
    />
  </div>
  <br />
  <div class="text-end">
    <Pagination />
  </div>
</template>
