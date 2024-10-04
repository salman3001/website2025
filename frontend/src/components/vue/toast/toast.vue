<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { useToast } from "./useToast";

const { messages, timeouts } = useToast();

onBeforeUnmount(() => {
  timeouts.value.forEach((t) => {
    clearTimeout(t);
  });
});
</script>

<template>
  <div class="toast toast-top z-50">
    <div v-for="message in messages" class="alert alert-info">
      <span>{{ message.message }} ashd kkash dk</span>
    </div>
  </div>
</template>
