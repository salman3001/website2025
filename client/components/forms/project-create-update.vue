<script setup lang="ts">
import type { Media } from "~/components/media-gallery";
import type { IResType } from "~/utils/types";
import type { Project, Tag } from "~/utils/types/modals";

const props = defineProps<{
  project?: Project;
  type: "update" | "create";
}>();

const { errors, exec, loading } = useFetcher();
const config = useRuntimeConfig();

const { data: tags } = await useFetch<IResType<{ data: Tag[]; count: number }>>(
  config.public.baseApi + apiRoutes.tags.index(),
  {
    query: {
      take: 1000,
    },
  },
);

const media = ref<Media[]>(
  props?.project?.images ? props?.project?.images : [],
);

const form = reactive({
  title: props?.project?.title || "",
  shortDesc: props?.project?.shortDesc || "",
  desc: props?.project?.desc || "",
  isPublished: props?.project?.isPublished || false,
  video: props?.project?.video || "",
  tagSlugs: props?.project?.tags?.map((tag) => tag.slug) || [],
});

const createProject = async () => {
  exec(
    props.type === "create"
      ? apiRoutes.projects.create()
      : apiRoutes.projects.update(props.project?.id!),
    {
      method: props.type === "create" ? "post" : "patch",
      body: {
        ...toRaw(form),
        mediaIds: media.value ? media.value.map((m) => m.id) : [],
      },
    },
    {
      onSuccess: (res) => {
        navigateTo(routes.admin.projects.index());
      },
    },
  );
};
</script>

<template>
  <VForm
    @submit.prevent="
      () => {
        createProject();
      }
    "
  >
    <VRow>
      <!-- Thumbnail -->
      <VCol cols="12">
        <MediaGalleryModal name="mediaIds" v-model="media" />
      </VCol>

      <!-- Title -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.title"
          autofocus
          label="Title"
          placeholder="Project Title"
          :error-messages="errors?.title?.errors"
        />
      </VCol>

      <!-- tags -->
      <VCol cols="12" md="6">
        <VSelect
          v-model="form.tagSlugs"
          label="Tags"
          placeholder="Select Tags"
          :error-messages="errors?.tagSlugs?.errors"
          :items="tags?.data?.data || []"
          item-title="name"
          item-value="slug"
          multiple
        />
      </VCol>

      <!-- Publish -->
      <VCol cols="12" md="6">
        <VCheckbox
          v-model="form.isPublished"
          :error-messages="errors?.isPublished?.errors"
          label="Pusblish"
        />
      </VCol>

      <!-- video -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.video"
          label="Video Url"
          placeholder="Video Url"
          :error-messages="errors?.video?.errors"
        />
      </VCol>

      <!-- Short Desc -->
      <VCol cols="12">
        <VTextarea
          v-model="form.shortDesc"
          label="Short Description"
          :error-messages="errors?.shortDesc?.errors"
        />
      </VCol>

      <!-- Long Desc -->
      <VCol cols="12">
        <MarkDownEditor v-model="form.desc" />
      </VCol>

      <!-- create project -->
      <VCol cols="12" class="text-end">
        <VBtn type="submit" color="primary" :disabled="loading">
          {{ type === "create" ? "Create Project" : "Update Project" }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
