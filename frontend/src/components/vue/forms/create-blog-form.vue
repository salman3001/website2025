<script setup lang="ts">
import { apiRoutes } from "src/utils/apiRoutes";
import useApiForm from "../composables/useApiForm";
import { navigate } from "astro:transitions/client";
import { routes } from "src/utils/routes";
import FormControl from "./form-control.vue";

const loginForm = useApiForm({
  image: null,
  title: "",
  shortDesc: "",
  longDesc: "",
  isPublished: false,
  blogCategorySlug: "",
  tagSlugs: [],
  seo: {
    title: "",
    keyword: "",
    desc: "",
  },
});

const submit = () =>
  loginForm.postForm(
    apiRoutes.blogs.create(),
    {},
    {
      onSucess: () => {
        navigate(routes.admin.blogs.index());
      },
    },
  );
</script>

<template>
  <form class="p-2" @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <FormControl
        name="Image"
        v-model="loginForm.image"
        :errors="loginForm?.errors?.image?.errors"
        placeholder="Image"
        type="file"
        accept=".jpeg,.jpg,.webp,.png"
      />
      <FormControl
        name="Title"
        v-model="loginForm.title"
        :errors="loginForm?.errors?.title?.errors"
        placeholder="Blog Title"
      />
      <FormControl
        class="col-span-1 md:col-span-2 lg:col-span-3"
        name="Short Description"
        v-model="loginForm.shortDesc"
        :errors="loginForm?.errors?.shortDesc?.errors"
        type="textarea"
      />
      <FormControl
        class="col-span-1 md:col-span-2 lg:col-span-3"
        name="Long Description"
        v-model="loginForm.longDesc"
        :errors="loginForm?.errors?.longDesc?.errors"
        type="textarea"
      />
      <FormControl
        name="Publish"
        v-model="loginForm.isPublished"
        :errors="loginForm?.errors?.isPublished?.errors"
        type="checkbox"
      />
      <FormControl
        name="Catgeory"
        v-model="loginForm.tagSlugs"
        :errors="loginForm?.errors?.tagSlugs?.errors"
        type="select"
      >
        <option disabled selected>Pick one</option>
        <option>Star Wars</option>
        <option>Harry Potter</option>
        <option>Lord of the Rings</option>
        <option>Planet of the Apes</option>
        <option>Star Trek</option>
      </FormControl>
      <FormControl
        name="Tags"
        v-model="loginForm.tagSlugs"
        :errors="loginForm?.errors?.tagSlugs?.errors"
        type="select"
        multiple
      >
        <option disabled selected>Pick one</option>
        <option>Star Wars</option>
        <option>Harry Potter</option>
        <option>Lord of the Rings</option>
        <option>Planet of the Apes</option>
        <option>Star Trek</option>
      </FormControl>
      <FormControl
        name="Seo Title"
        v-model="loginForm.seo.title"
        :errors="loginForm?.errors?.seo?.title?.errors"
        placeholder="Seo Title"
      />
      <FormControl
        name="Seo Keywords"
        v-model="loginForm.seo.keyword"
        :errors="loginForm?.errors?.seo?.keyword?.errors"
        placeholder="Seo Keywords"
      />
      <FormControl
        name="Seo Description"
        class="col-span-1 md:col-span-2 lg:col-span-3"
        v-model="loginForm.seo.desc"
        :errors="loginForm?.errors?.seo?.desc?.errors"
        placeholder="Seo Description"
        type="textarea"
      />
    </div>
    <br />
    <div class="text-end">
      <button type="submit" class="btn btn-primary">Create</button>
    </div>
  </form>
</template>
