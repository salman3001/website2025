<script setup lang="ts">
import type { Media } from "~/components/media-gallery";
import type { IResType } from "~/utils/types";
import type { Blog, BlogCategory, Tag } from "~/utils/types/modals";

const props = defineProps<{
  blog?: Blog;
}>();

const { errors, exec, loading } = useFetcher();
const config = useRuntimeConfig();

const { data: categories } = await useFetch<
  IResType<{ data: BlogCategory[]; count: number }>
>(config.public.baseApi + apiRoutes.blogCategory.index(), {
  query: {
    take: 1000,
  },
});

const { data: tags } = await useFetch<IResType<{ data: Tag[]; count: number }>>(
  config.public.baseApi + apiRoutes.tags.index(),
  {
    query: {
      take: 1000,
    },
  },
);

const media = ref<Media[]>(props?.blog?.image ? [props?.blog?.image] : []);

const form = reactive({
  title: props?.blog?.title || "",
  shortDesc: props?.blog?.shortDesc || "",
  longDesc: props?.blog?.longDesc || "",
  isPublished: props?.blog?.isPublished || false,
  blogCategorySlug: props?.blog?.blogCategorySlug || "",
  tagSlugs: props?.blog?.tags?.map((t) => t.slug) || [],
  seo: {
    title: props?.blog?.seo?.title || "",
    keyword: props?.blog?.seo?.keyword || "",
    desc: props?.blog?.seo?.desc || "",
  },
});

const createBlog = async () => {
  exec(
    apiRoutes.blogs.create(),
    {
      method: "post",
      body: {
        ...toRaw(form),
        mediaId: media.value ? media.value[0]?.id : undefined,
      },
    },
    {
      onSuccess: (res) => {
        navigateTo(routes.admin.blogs.index());
      },
    },
  );
};
</script>

<template>
  <VForm
    @submit.prevent="
      () => {
        createBlog();
      }
    "
  >
    <VRow>
      <!-- Thumbnail -->
      <VCol cols="12">
        <MediaGalleryModal name="mediaId" v-model="media" />
      </VCol>

      <!-- Title -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.title"
          autofocus
          label="Title"
          placeholder="Blog Title"
          :error-messages="errors?.title?.errors"
        />
      </VCol>

      <!-- Category -->
      <VCol cols="12" md="6">
        <VSelect
          v-model="form.blogCategorySlug"
          label="Category"
          placeholder="Select Category"
          :error-messages="errors?.blogCategorySlug?.errors"
          :items="categories?.data?.data || []"
          item-title="name"
          item-value="slug"
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
        <MarkDownEditor v-model="form.longDesc" />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.seo.title"
          label="Seo Title"
          placeholder="Seo Title"
          :error-messages="errors?.seo?.title?.errors"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.seo.keyword"
          label="Seo Keywords"
          placeholder="Seo Keywords"
          :error-messages="errors?.seo?.keyword?.errors"
        />
      </VCol>

      <!-- Seo Desc -->
      <VCol cols="12">
        <VTextarea
          v-model="form.seo.desc"
          label="SEO Description"
          :error-messages="errors?.seo?.desc?.errors"
        />
      </VCol>

      <!-- create Blog -->
      <VCol cols="12" class="text-end">
        <VBtn type="submit" color="primary" :disabled="loading">
          Create Blog
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
