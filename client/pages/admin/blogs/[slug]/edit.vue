<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Blog } from "~/utils/types/modals";

const { slug } = useRoute().params;
const config = useRuntimeConfig();

const { data } = await useFetch<IResType<Blog>>(
  config.public.baseApi + apiRoutes.blogs.view(slug as string),
  {
    query: {
      select: [
        "title",
        "shortDesc",
        "longDesc",
        "isPublished",
        "blogCategorySlug",
        "image",
        "blogCategory",
        "tags",
        "seo",
      ],
    },
  },
);
</script>

<template>
  <v-container>
    <div>
      <VBtn
        text="Back"
        variant="tonal"
        size="small"
        prepend-icon="mdi-arrow-left"
        :to="routes.admin.blogs.index()"
      />
      <h1 class="text-h6">Edit Blog</h1>
    </div>
    <br />
    <FormsBlogCreateUpdate :blog="data?.data" />
  </v-container>
</template>
