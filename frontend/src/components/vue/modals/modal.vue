<script setup lang="ts">
const model = defineModel<boolean>({ required: true });
</script>

<template>
  <!-- Put this part before </body> tag -->
  <slot open />
  <input type="checkbox" id="my_modal_7" v-model="model" class="modal-toggle" />
  <div class="modal" role="dialog">
    <slot name="content" />
    <label class="modal-backdrop" @click="() => (model = false)">Close</label>
  </div>
</template>
