<script setup lang="ts">
import { config } from "src/utils/config";
import { MediaType, type Media } from ".";

defineProps<{
  media: Media;
}>();
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-2">
      <button>remove</button>
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
