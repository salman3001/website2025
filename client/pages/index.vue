<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <v-container fluid class="pa-0">
    <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <div
        class="d-flex flex-column justify-center align-center fill-height text-white pa-10"
      >
        <h1 class="text-h3 font-weight-thin mb-4">
          Welcome to {{ $config.public.appName }}
        </h1>

        <h4 class="subheading text-h4">
          Your one stop to learn full stack development
        </h4>
        <br />
        <div class="d-flex flex-column ga-4">
          <v-btn v-if="user" variant="outlined" color="none"
            >New to {{ $config.public.appName }}? Signup</v-btn
          >
          <v-btn color="none" variant="tonal">Blogs</v-btn>
          <v-btn color="none" variant="tonal">Tutorials</v-btn>
        </div>
      </div>
    </v-parallax>
  </v-container>
  <v-container> Featured Blogs </v-container>
  <v-container> Tags </v-container>
</template>
