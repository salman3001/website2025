<script setup lang="ts">
import { ref } from "vue";
import { MediaType, MediaWindow } from ".";
import FormControl from "../forms/form-control.vue";
import { ArrowLeftIcon, EnvelopeIcon } from "@heroicons/vue/24/solid";
import useApiForm from "../composables/useApiForm";
import { apiRoutes } from "src/utils/apiRoutes";

const categories = ref<{ name: string; id: number }[]>([]);

const emit = defineEmits<{
  windowChange: [window: MediaWindow];
}>();

const mediaCreateForm = useApiForm({
  file: null,
  name: "",
  type: MediaType.Image,
  mediaCategoryId: "",
});

const submit = () => {
  mediaCreateForm.postForm(
    apiRoutes.media.index(),
    {},
    {
      onSucess(resData) {
        emit("windowChange", MediaWindow.MEDIA_LIST);
      },
    },
  );
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
    <br />
  </div>
  <br />

  <div>
    <form class="p-2" @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormControl
          name="Media Type"
          v-model="mediaCreateForm.type"
          :errors="mediaCreateForm?.errors?.type?.errors"
          type="select"
        >
          <option :value="MediaType.Image">
            {{ MediaType.Image }}
          </option>
          <option :value="MediaType.document">
            {{ MediaType.document }}
          </option>
          <option :value="MediaType.Audio">
            {{ MediaType.Audio }}
          </option>
          <option :value="MediaType.Video">
            {{ MediaType.Video }}
          </option>
        </FormControl>
        <FormControl
          name="Name"
          v-model="mediaCreateForm.name"
          :errors="mediaCreateForm?.errors?.name?.errors"
          placeholder="Media Name"
        />
        <FormControl
          name="Media Category"
          v-model="mediaCreateForm.mediaCategoryId"
          :errors="mediaCreateForm?.errors?.mediaCategoryId?.errors"
          type="select"
        >
          <option value="">Select Category</option>
          <option v-for="c in categories" :value="c.id">
            {{ c.name }}
          </option>
        </FormControl>
        <FormControl
          v-if="mediaCreateForm.type === MediaType.Image"
          name="Image"
          v-model="mediaCreateForm.file"
          :errors="mediaCreateForm?.errors?.file?.errors"
          placeholder="Image"
          type="file"
          accept=".jpeg,.jpg,.webp,.png"
        />
        <FormControl
          v-if="mediaCreateForm.type === MediaType.document"
          name="Document"
          v-model="mediaCreateForm.file"
          :errors="mediaCreateForm?.errors?.file?.errors"
          placeholder="Document"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
        />
        <FormControl
          v-if="mediaCreateForm.type === MediaType.Audio"
          name="Audio"
          v-model="mediaCreateForm.file"
          :errors="mediaCreateForm?.errors?.file?.errors"
          placeholder="Audio"
          type="file"
          accept=".mp3,.wav"
        />
        <FormControl
          v-if="mediaCreateForm.type === MediaType.Video"
          name="Video"
          v-model="mediaCreateForm.file"
          :errors="mediaCreateForm?.errors?.file?.errors"
          placeholder="Video"
          type="file"
          accept=".mp4,.avi"
        />
        <br />
      </div>
      <div class="text-end">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="mediaCreateForm.processing"
        >
          Create Media
        </button>
      </div>
    </form>
  </div>
</template>
