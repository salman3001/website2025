<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { BlogCategory } from "~/utils/types/modals";

const { slug } = useRoute().params;
const config = useRuntimeConfig();

const { data } = await useFetch<IResType<BlogCategory>>(
  config.public.baseApi + apiRoutes.blogCategory.view(slug as string),
  {
    query: {
      select: ["name", "slug", "desc"],
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
        :to="routes.admin.blogCategories.index()"
      />
      <h1 class="text-h6">Edit Blog Category</h1>
    </div>
    <br />
    <FormsBlogCategoryCreateUpdate :blog-category="data?.data" type="update" />
  </v-container>
</template>
