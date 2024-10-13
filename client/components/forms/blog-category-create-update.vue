<script setup lang="ts">
import type { BlogCategory, Tag } from "~/utils/types/modals";

const props = defineProps<{
  blogCategory?: BlogCategory;
  type: "update" | "create";
}>();

const { errors, exec, loading } = useFetcher();

const form = reactive({
  name: props?.blogCategory?.name || "",
  desc: props?.blogCategory?.desc || "",
});

const createBlogCategory = async () => {
  exec(
    props.type === "create"
      ? apiRoutes.blogCategory.create()
      : apiRoutes.blogCategory.update(props.blogCategory?.slug!),
    {
      method: props.type === "create" ? "post" : "patch",
      body: toRaw(form),
    },
    {
      onSuccess: (res) => {
        navigateTo(routes.admin.blogCategories.index());
      },
    },
  );
};
</script>

<template>
  <VForm
    @submit.prevent="
      () => {
        createBlogCategory();
      }
    "
  >
    <VRow>
      <!-- Name -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.name"
          autofocus
          label="Category Name"
          placeholder="Category Name"
          :error-messages="errors?.name?.errors"
        />
      </VCol>

      <!-- Short Desc -->
      <VCol cols="12">
        <VTextarea
          v-model="form.desc"
          label="Short Description"
          :error-messages="errors?.desc?.errors"
        />
      </VCol>

      <!-- create blogCategory -->
      <VCol cols="12" class="text-end">
        <VBtn type="submit" color="primary" :disabled="loading">
          {{ type === "create" ? "Create" : "Update" }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
