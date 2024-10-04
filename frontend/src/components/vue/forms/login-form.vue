<script setup lang="ts">
import { apiRoutes } from "src/utils/apiRoutes";
import useApiForm from "../composables/useApiForm";
import { navigate } from "astro:transitions/client";
import { routes } from "src/utils/routes";
import { setAuth } from "src/scripts/stores/authStore";
import FormControl from "./form-control.vue";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/vue/24/solid";

const loginForm = useApiForm({ email: "", password: "" });

const submit = () =>
  loginForm.post(
    apiRoutes.auth.signin(),
    {},
    {
      onSucess: (data) => {
        const user = data?.user;
        const token = data?.token;

        setAuth({ user, token });
        navigate(routes.web.home());
      },
    },
  );
</script>

<template>
  <form class="z-10 sm:min-w-80" @submit.prevent="submit">
    <div class="py-12 px-4 sm:px-6 md:px-8 bg-base-100 mx-auto rounded-2xl">
      <div class="mb-4">
        <h3 class="font-semibold text-2xl text-gray-800">Sign In</h3>
        <p class="text-gray-500">Please sign in to your account.</p>
      </div>

      <FormControl
        name="Email"
        v-model="loginForm.email"
        :errors="loginForm?.errors?.email?.errors"
        placeholder="user@email.com"
      >
        <template #start-icon>
          <EnvelopeIcon class="size-4" />
        </template>
      </FormControl>
      <FormControl
        name="Password"
        v-model="loginForm.password"
        :errors="loginForm?.errors?.password?.errors"
        placeholder="*******"
        type="password"
      >
        <template #start-icon>
          <LockClosedIcon class="size-4" />
        </template>
      </FormControl>
      <br />

      <div>
        <button type="submit" class="btn w-full btn-primary">Sign in</button>
      </div>
    </div>
  </form>
</template>
