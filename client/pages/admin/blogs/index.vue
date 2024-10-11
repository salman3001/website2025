<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Blog } from "~/utils/types/modals";

const config = useRuntimeConfig();

const search = ref("");
const perPage = ref(5);
const page = ref(1);
const skip = computed(() => perPage.value * (page.value - 1));

const { data, execute } = await useFetch<
  IResType<{ data: Blog[]; count: number }>
>(config.public.baseApi + apiRoutes.blogs.index(), {
  query: {
    skip: skip,
    take: perPage,
    search: search,
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
      >
        <!-- Title-->
        <template #item.id="{ item }">
          <NuxtLink :to="routes.admin.blogs.view(item.slug)" nuxt>
            #{{ item.title }}
          </NuxtLink>
        </template>

        <!-- Date -->
        <template #item.created_at="{ item }">
          {{ new Date(item.createdAt).toDateString() }}
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip v-if="item.isPublished" label size="small" title="Published" />
          <VChip v-else label size="small" title="Draft" />
        </template>
        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <VIcon icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  value="view"
                  :to="routes.admin.blogs.view(item.slug)"
                  nuxt
                >
                  View
                </VListItem>
              </VList>
            </VMenu>
          </IconBtn>
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
