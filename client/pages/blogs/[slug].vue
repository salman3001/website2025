<script setup lang="ts">
import RenderMarkdown from "~/components/render-markdown.vue";
import type { IResType } from "~/utils/types";
import type { Blog } from "~/utils/types/modals";

const { slug } = useRoute().params;
const appConfig = useAppConfig();

const { data } = await useFetcherGet<IResType<Blog>>(
  apiRoutes.blogs.view(slug as string),
  {
    query: {
      select: [
        "title",
        "slug",
        "shortDesc",
        "longDesc",
        "createdAt",
        "views",
        "image",
        "blogCategory",
        "author",
        "seo",
        "tags",
      ],
      take: 20,
      skip: 0,
    },
  },
);
</script>

<template>
  <v-container>
    <h1>{{ data?.data?.title }}</h1>
    <br />
    <p>{{ data?.data?.shortDesc }}</p>
    <br />
    <v-card class="bg-background">
      <v-row justify="start" class="pa-2 text-center py-8">
        <v-col cols="12" sm="4" class="d-flex justify-center">
          <div class="d-flex ga-6">
            <v-avatar
              image="https://cdn.vuetifyjs.com/images/john.jpg"
              size="48"
            />
            <div>
              <div class="text-subtitle-1">Author</div>
              <div class="text-medium-emphasis">John Doe</div>
            </div>
          </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="6" sm="3">
          <div class="text-subtitle-1">Published</div>
          <div class="text-medium-emphasis">
            {{ Date.now().toString() }}
          </div></v-col
        >

        <v-divider vertical></v-divider>
        <v-col cols="6" sm="3">
          <div class="text-subtitle-1">Comments</div>
          <div class="text-medium-emphasis">3</div></v-col
        >
      </v-row>
    </v-card>
    <br />
    <div class="d-flex justify-center">
      <v-img
        :src="
          data?.data?.image
            ? $config.public.uploadsPath + data.data?.image?.url
            : appConfig.noImageUrl
        "
        max-width="700"
        max-height="400"
        cover
      ></v-img>
    </div>
    <br />
    <RenderMarkdown :content="data?.data?.longDesc || ''" />
  </v-container>
</template>
