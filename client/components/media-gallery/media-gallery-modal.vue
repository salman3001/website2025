<script setup lang="ts">
import { ref } from "vue";
import { MediaWindow, type Media } from ".";
import MediaList from "./media-list.vue";
import AddMedia from "./add-media.vue";
import ConfirmDelete from "./confirm-delete.vue";
import PreviewSelectedMedia from "./preview-selected-media.vue";

const open = ref(false);

const props = withDefaults(
  defineProps<{ multiple?: boolean; name: string }>(),
  {
    multiple: true,
    name: "mediaId",
  },
);

const selected = ref<Media[] | Media | undefined>(
  props.multiple === true ? [] : undefined,
);

const selectedForDelete = ref<Media[] | Media | undefined>(
  props.multiple === true ? [] : undefined,
);

const mediaWindow = ref<MediaWindow>(MediaWindow.MEDIA_LIST);

const openModal = () => {
  mediaWindow.value = MediaWindow.MEDIA_LIST;
  open.value = true;
};
</script>
<template>
  <v-dialog :max-width="1200">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="d-block mb-2"
        size="small"
        v-bind="activatorProps"
        text="Select Media"
        variant="tonal"
      ></v-btn>
      <div class="d-flex ga-2 flex-wrap">
        <PreviewSelectedMedia
          v-if="selected && Array.isArray(selected)"
          v-for="media in selected"
          :media="media"
          :name="name"
        />

        <PreviewSelectedMedia
          v-if="selected && !Array.isArray(selected)"
          :name="name"
          :media="selected"
        />
      </div>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Media Gallery">
        <template #append>
          <v-btn
            variant="text"
            size="small"
            @click="
              () => {
                isActive.value = false;
              }
            "
            icon="mdi-close"
          ></v-btn>
        </template>
        <v-card-text>
          <div v-if="mediaWindow === MediaWindow.MEDIA_LIST">
            <MediaList
              @windowChange="(v) => (mediaWindow = v)"
              :medias="[1, 2, 3, 4, 5]"
              v-model="selected"
              :multiple="multiple"
              @selected="
                (v) => {
                  selected = v;
                  isActive.value = false;
                }
              "
              @delete="
                (v) => {
                  selectedForDelete = v;
                  mediaWindow = MediaWindow.CONFIRM_DELETE;
                }
              "
            />
          </div>
          <div v-if="mediaWindow === MediaWindow.CONFIRM_DELETE">
            <ConfirmDelete
              @windowChange="(v) => (mediaWindow = v)"
              :selected-for-delete="selectedForDelete"
            />
          </div>
          <div v-if="mediaWindow === MediaWindow.ADD_MEDIA">
            <AddMedia
              @windowChange="(v) => (mediaWindow = v)"
              @close="() => (isActive.value = false)"
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
