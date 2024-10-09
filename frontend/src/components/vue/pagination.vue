<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  total: number;
  perPage: number;
  skip: number;
}>();

defineEmits<{
  change: [newPage: number];
}>();

const pages = computed(() => {
  const totalPages = Math.ceil(props.total / props.perPage);

  const pages: { num: number }[] = [];

  for (let i = 1; i < totalPages; i++) {
    pages.push({ num: i });
  }

  return pages;
});

const currentPage = computed(() => {
  if (props.skip < props.perPage) {
    return 1;
  }
  return props.skip / props.perPage + 1;
});
</script>

<template>
  <div class="join">
    <button
      v-for="page in pages"
      class="join-item btn btn-md"
      :class="{ 'btn-active': currentPage === page.num ? true : false }"
      @click="$emit('change', page.num)"
    >
      {{ page.num }}
    </button>
  </div>
</template>
