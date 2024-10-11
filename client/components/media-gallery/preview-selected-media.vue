<script setup lang="ts">
import { MediaType, type Media } from ".";

const config = useRuntimeConfig();

defineProps<{
  media: Media;
  name: string;
}>();
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <input type="text" :name="name" style="display: none" :value="media?.id" />
    <v-card width="200">
      <v-img
        v-if="media.type === MediaType.Image"
        class="bg-grey-lighten-2"
        height="125"
        :src="config.public.uploadsPath + media.url"
        cover
      ></v-img>
      <div v-if="media.type === MediaType.document">Document</div>
      <div v-if="media.type === MediaType.Audio">Audio</div>
      <div v-if="media.type === MediaType.Video">Vidoe</div>
      <v-card-title class="text-body-1"> {{ media.name }} </v-card-title>
    </v-card>
  </div>
</template>
