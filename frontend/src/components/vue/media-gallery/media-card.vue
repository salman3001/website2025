<script setup lang="ts">
import { config } from "src/utils/config";
import { MediaType, type Media } from ".";
import FormControl from "../forms/form-control.vue";

const model = defineModel<boolean | any[]>({ required: true });

defineProps<{
  media: Media;
  multiple?: boolean;
}>();
</script>

<template>
  <label
    :for="`media-${media.id}`"
    class="card bg-base-100 shadow-xl cursor-pointer"
  >
    <div class="flex items-center">
      <FormControl
        :name="`media-${media.id}`"
        className="checkbox-sm m-0 "
        v-model="model"
        :type="multiple ? 'checkbox' : 'radio'"
        hide-lable
        :value="media"
      />
      <div>{{ media.name }}</div>
    </div>
    <figure class="m-2 border rounded-lg">
      <img
        v-if="media.type === MediaType.Image"
        :src="config.uploadsPath + media.url"
        alt="Shoes"
        class="aspect-square"
      />
      <div v-if="media.type === MediaType.document">Document</div>
      <div v-if="media.type === MediaType.Audio">Audio</div>
      <div v-if="media.type === MediaType.Video">Vidoe</div>
    </figure>
  </label>
</template>
