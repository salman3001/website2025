<template>
  <v-container class="my-5">
    <h2 class="text-h5 py-5">Featured Tutorials</h2>
    <v-row>
      <v-col v-for="b in [1, 2, 3, 4, 5, 6]" cols="12" sm="6" md="4" lg="3">
        <BlogCard />
      </v-col>
    </v-row>
  </v-container>
</template>
