<script setup lang="ts">
const { slug } = useRoute().params;
</script>

<template>
  <v-container> Blogs - {{ slug }}</v-container>
</template>
