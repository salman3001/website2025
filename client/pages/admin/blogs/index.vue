<script setup lang="ts">
import { debouncedRef } from "@vueuse/core";
import type { IResType } from "~/utils/types";
import type { Blog } from "~/utils/types/modals";

const config = useRuntimeConfig();
const appConfig = useAppConfig();

const search = ref("");
const debaouncedSearch = debouncedRef(search, 1000);
const perPage = ref(5);
const page = ref(1);
const skip = computed(() => perPage.value * (page.value - 1));
const orderBy = ref<string>();

const { data, execute } = await useFetch<
  IResType<{ data: Blog[]; count: number }>
>(config.public.baseApi + apiRoutes.blogs.index(), {
  query: {
    skip: skip,
    take: perPage,
    search: debaouncedSearch,
    select: ["title", "slug", "isPublished", "createdAt", "image"],
    orderBy: orderBy,
  },
});

// Data table Headers
const headers = [
  { title: "Title", key: "title" },
  { title: "Date", key: "createdAt" },
  { title: "Status", key: "isPublished" },
  { title: "Action", key: "actions", sortable: false },
];

// watch(query, () => {
//   console.log(perPage);
// });
</script>

<template>
  <VContainer>
    <br />
    <VCard>
      <!-- 👉 Filters -->
      <VCardText>
        <div
          class="d-flex justify-sm-space-between justify-start flex-wrap ga-2"
        >
          <v-text-field
            v-model="search"
            placeholder="Search Blogs"
            style="max-inline-size: 200px; min-inline-size: 200px"
            hide-details
          />

          <div class="d-flex ga-2 align-center">
            <v-select
              v-model="perPage"
              style="min-inline-size: 6.25rem"
              :items="[5, 10, 20, 50, 100]"
              hide-details
            />
            <VBtn variant="tonal" prepend-icon="mdi-upload" text="Export" />
            <VBtn
              prepend-icon="mdi-plus"
              text="Create Blog"
              :to="routes.admin.blogs.create()"
              nuxt
            />
          </div>
        </div>
      </VCardText>
      <VDivider />

      <!-- 👉 Order Table -->
      <VDataTableServer
        v-model:items-per-page="perPage"
        v-model:page="page"
        :headers="headers"
        :items="data?.data?.data"
        item-value="order"
        :items-length="data?.data?.count || 0"
        show-select
        class="text-no-wrap"
        @update:sort-by="
          (v) => {
            if (v?.length > 0) {
              orderBy = `${v[0]['key']}:${v[0]['order']}`;
            }
          }
        "
      >
        <!-- Title-->
        <template #item.title="{ item }">
          <v-card width="200" class="ma-2 ma-0" density="compact">
            <v-card-text class="pa-0">
              <VImg
                v-if="item?.image?.url"
                :src="config.public.uploadsPath + item?.image?.url"
              />
              <VImg v-else :src="appConfig.noImageUrl" />
            </v-card-text>
            <v-card-title class="text-body-2" style="height: 50px">
              {{ item.title }}
            </v-card-title>
          </v-card>
        </template>

        <!-- Date -->
        <template #item.createdAt="{ item }">
          {{ new Date(item.createdAt).toDateString() }}
        </template>

        <!-- Status -->
        <template #item.isPublished="{ item }">
          <VChip
            v-if="item.isPublished"
            label
            size="small"
            text="Published"
            color="success"
          />
          <VChip v-else label size="small" text="Draft" color="warning" />
        </template>
        <!-- Actions -->
        <template #item.actions="{ item }">
          <VIcon icon="tabler-dots-vertical" />
          <VMenu activator="parent">
            <template #activator="{ props }">
              <VBtn
                size="small"
                variant="text"
                v-bind="props"
                icon="mdi-dots-vertical"
              >
              </VBtn>
            </template>
            <VList density="compact" slim>
              <VListItem
                slim
                value="view"
                prepend-icon="mdi-eye"
                :to="routes.admin.blogs.view(item.slug)"
                nuxt
              >
                View
              </VListItem>
              <VListItem
                slim
                value="Edit"
                prepend-icon="mdi-pencil"
                :to="routes.admin.blogs.edit(item.slug)"
                nuxt
              >
                Edit
              </VListItem>
              <VListItem
                slim
                value="Delete"
                prepend-icon="mdi-delete"
                :to="routes.admin.blogs.edit(item.slug)"
                nuxt
              >
                Delete
              </VListItem>
            </VList>
          </VMenu>
        </template>

        <!-- pagination -->
        <template #bottom>
          <TablePagination
            :page="Number(page)"
            :items-per-page="Number(perPage)"
            :total-items="Number(data?.data?.count)"
            @update:page="
              (p) => {
                page = p;
              }
            "
          />
        </template>
      </VDataTableServer>
    </VCard>
  </VContainer>
</template>
