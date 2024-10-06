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
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-2">
      <FormControl
        :name="`media-${media.id}`"
        v-model="model"
        :type="multiple ? 'checkbox' : 'radio'"
        hide-lable
        :value="media"
      />
      <p>{{ media.name }}</p>
    </div>
    <figure>
      <img
        v-if="media.type === MediaType.Image"
        :src="config.uploadsPath + media.url"
        alt="Shoes"
      />
      <div v-if="media.type === MediaType.document">Document</div>
      <div v-if="media.type === MediaType.Audio">Audio</div>
      <div v-if="media.type === MediaType.Video">Vidoe</div>
    </figure>
  </div>
</template>
