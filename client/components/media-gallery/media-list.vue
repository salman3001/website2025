<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MediaWindow, type Media, type MediaCategory } from ".";
import MediaCard from "./media-card.vue";
import type { IResType } from "~/utils/types";

const config = useRuntimeConfig();

const { data: categories, execute: getCategories } = useFetch<
  IResType<{ data: MediaCategory[]; count: number }>
>(config.public.baseApi + apiRoutes.mediaCategory.index(), {
  immediate: false,
  server: false,
  lazy: true,
});

const categoryId = ref<MediaCategory[]>();
const search = ref("");
const perPage = ref(5);
const page = ref(1);
const skip = computed(() => perPage.value * (page.value - 1));

const { data: medias, execute: getMedias } = useFetch<
  IResType<{ data: Media[]; count: number }>
>(config.public.baseApi + apiRoutes.media.index(), {
  immediate: false,
  server: false,
  lazy: true,
  query: {
    skip: skip,
    take: perPage,
    search: search,
  },
});

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

onMounted(async () => {
  getCategories();
  getMedias();
});
</script>
<template>
  <v-row>
    <v-col :cols="12" sm="6" md="4">
      <VBtn
        text="Add Media"
        variant="tonal"
        prepend-icon="mdi-plus"
        @click="() => emit('windowChange', MediaWindow.ADD_MEDIA)"
      ></VBtn>
    </v-col>

    <v-col :cols="12" sm="6" md="4">
      <VSelect
        v-if="categories?.data?.data"
        v-model="categoryId"
        :items="categories?.data?.data"
        item-title="name"
        item-value="id"
        placeholder="Select Category"
      />
    </v-col>
  </v-row>
  <div class="d-flex ga-2">
    <v-btn
      v-if="anyThingSelected"
      @click="() => emit('delete', selected)"
      variant="outlined"
      color="error"
    >
      Delete {{ selected?.length }}
    </v-btn>
    <v-btn v-if="anyThingSelected" @click="() => emit('selected', selected)">
      Select {{ selected?.length }}
    </v-btn>
  </div>
  <br />
  <div class="d-flex ga-2 flex-wrap justify-center items-center">
    <div v-if="!medias?.data?.data">Loading..</div>
    <MediaCard
      v-else
      v-for="media in medias?.data?.data"
      v-model="selected"
      :media="media"
      :multiple="multiple"
    />
  </div>
  <br />
  <div v-if="medias" class="text-end">
    <TablePagination
      :page="Number(page)"
      :items-per-page="Number(perPage)"
      :total-items="Number(medias?.data?.count)"
      @update:page="
        (p) => {
          page = p;
        }
      "
    />
  </div>
</template>
