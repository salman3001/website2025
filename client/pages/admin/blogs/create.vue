<script setup lang="ts">
const { errors, exec, loading } = useFetcher();

const form = reactive({
  mediaId: null as null | number,
  title: "",
  shortDesc: "",
  longDesc: "",
  IsPublished: false,
  blogCategorySlug: "",
  tagSlugs: [] as string[],
  seo: {
    title: "",
    keyword: "",
    desc: "",
  },
});

const login = async () => {
  exec(
    apiRoutes.blogs.create(),
    { method: "post", body: toRaw(form) },
    {
      onSuccess: (res) => {
        navigateTo(routes.admin.blogs.index());
      },
    },
  );
};
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
      <h1 class="text-h6">Create Blog</h1>
    </div>
    <br />
    <VForm
      @submit.prevent="
        () => {
          login();
        }
      "
    >
      <VRow>
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
            :items="['asdas', 'dasasd']"
          />
        </VCol>

        <!-- tags -->
        <VCol cols="12" md="6">
          <VSelect
            v-model="form.tagSlugs"
            label="Tags"
            placeholder="Select Tags"
            :error-messages="errors?.tagSlugs?.errors"
            :items="['asdas', 'dasasd']"
            multiple
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
          <VTextarea
            v-model="form.longDesc"
            label="Long Description"
            :error-messages="errors?.longDesc?.errors"
          />
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
        <VCol cols="12" class="text-center">
          <VBtn type="submit" color="primary" :disabled="loading">
            Create Blog
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </v-container>
</template>
