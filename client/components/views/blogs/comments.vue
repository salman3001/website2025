<script setup lang="ts">
defineProps<{
  blogSlug: string;
  commentCount: number;
}>();

const { user } = useAuth();
</script>

<template>
  <v-card class="bg-background py-8 border-none">
    <v-card-item class="text-h6 font-weight-bold">
      Join The discussion! ({{ commentCount }} comments)
    </v-card-item>
    <v-card-item v-if="user">
      <FormsAddComment :blog-slug="blogSlug" type="blog" />
    </v-card-item>
    <v-card-item v-else>
      Please
      <NuxtLink class="text-primary" :to="routes.auth.signin()"
        >Sign in</NuxtLink
      >
      or
      <NuxtLink class="text-primary" :to="routes.auth.signup()"
        >Sign up</NuxtLink
      >
      for free to join in on the dicussion.
    </v-card-item>
  </v-card>

  <br />
  <v-card v-if="commentCount === 0" class="bg-background py-8 text-center">
    <v-card-item>
      <v-icon icon="mdi-message" size="64" color="primary"></v-icon>
    </v-card-item>
    <v-card-item>Be the first to Comment!</v-card-item>
  </v-card>
  <ListsComments v-else :blog-slug="blogSlug" type="blog" />
</template>
