<script setup lang="ts">
import { ref } from "vue";
import Modal from "../modals/modal.vue";
import { MediaWindow, type Media } from ".";
import MediaList from "./media-list.vue";
import AddMedia from "./add-media.vue";
import ConfirmDelete from "./confirm-delete.vue";
import PreviewSelectedMedia from "./preview-selected-media.vue";

const open = ref(false);

const props = withDefaults(defineProps<{ multiple?: boolean }>(), {
  multiple: true,
});

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

const closeModal = () => {
  open.value = false;
};
</script>
<template>
  <Modal v-model="open">
    <div>
      <button @click="openModal">Select Media</button>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <PreviewSelectedMedia
          v-if="selected && Array.isArray(selected)"
          v-for="media in selected"
          :media="media"
        />
        <PreviewSelectedMedia
          v-if="selected && !Array.isArray(selected)"
          :media="selected"
        />
      </div>
    </div>
    <template #content>
      <div class="modal-box max-w-full h-full m-10">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="closeModal"
        >
          ✕
        </button>
        <h3 class="text-lg font-bold">Media Gallery</h3>
        <br />

        <div v-if="mediaWindow === MediaWindow.MEDIA_LIST">
          <MediaList
            @windowChange="(v) => (mediaWindow = v)"
            :medias="[1, 2, 3, 4, 5]"
            v-model="selected"
            :multiple="multiple"
            @selected="
              (v) => {
                selected = v;
                closeModal();
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
            @close="closeModal"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>
