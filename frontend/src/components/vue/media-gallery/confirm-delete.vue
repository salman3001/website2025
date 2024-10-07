<script setup lang="ts">
import { MediaWindow, type Media } from ".";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import useApiForm from "../composables/useApiForm";
import { apiRoutes } from "src/utils/apiRoutes";

const props = defineProps<{ selectedForDelete: Media[] | Media | undefined }>();

const { deleteRecord } = useApiForm({});

const emit = defineEmits<{
  windowChange: [window: MediaWindow];
}>();

const confirmAction = async () => {
  if (props.selectedForDelete) {
    if (Array.isArray(props.selectedForDelete)) {
      const tasks = props.selectedForDelete.map((media) =>
        deleteRecord(apiRoutes.media.delete(media.id), {}),
      );
      await Promise.all(tasks);
      emit("windowChange", MediaWindow.MEDIA_LIST);
    } else {
      deleteRecord(
        apiRoutes.media.delete(props.selectedForDelete.id),
        {},
        {
          onSucess: () => {
            emit("windowChange", MediaWindow.MEDIA_LIST);
          },
        },
      );
    }
  }
};
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
  <div>
    <ul class="menu menu-lg">
      <li>
        <h2 class="menu-title">
          Are you Sure you want to delete following media
        </h2>
        <ul v-if="selectedForDelete">
          <li
            class="list-disc"
            v-if="Array.isArray(selectedForDelete)"
            v-for="(media, i) in selectedForDelete"
          >
            {{ i + 1 }}->{{ media.name }}
          </li>
          <li v-else>{{ selectedForDelete.name }}</li>
        </ul>
      </li>
    </ul>
    <br />
    <div class="text-end" @click="confirmAction">
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</template>
