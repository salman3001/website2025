<script setup lang="ts">
import { MediaType, type Media } from ".";

const model = defineModel<boolean | any[]>({ required: true });

defineProps<{
  media: Media;
  multiple?: boolean;
}>();
</script>

<template>
  <label :for="`media-${media.id}`" class="cursor-pointer border rounded-lg">
    <VCheckbox
      v-if="multiple"
      :name="`media-${media.id}`"
      :id="`media-${media.id}`"
      v-model="model"
      :value="media"
    />
    <v-radio
      v-else
      :name="`media-${media.id}`"
      :id="`media-${media.id}`"
      v-model="model"
      :value="media"
    >
    </v-radio>
    <v-card width="200">
      <v-img
        v-if="media.type === MediaType.Image"
        class="bg-grey-lighten-2"
        height="125"
        :src="$config.public.uploadsPath + media.url"
        cover
      ></v-img>
      <div v-if="media.type === MediaType.document">Document</div>
      <div v-if="media.type === MediaType.Audio">Audio</div>
      <div v-if="media.type === MediaType.Video">Vidoe</div>
      <v-card-title class="text-body-1"> {{ media.name }} </v-card-title>
    </v-card>
  </label>
</template>
