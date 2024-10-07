<script setup lang="ts">
const open = defineModel<boolean>({ required: true });
</script>

<template>
  <!-- Put this part before </body> tag -->
  <slot open />
  <!-- <input type="checkbox" id="my_modal_7" v-model="model" class="modal-toggle" /> -->
  <div class="modal modal-open" role="dialog" v-if="open">
    <slot name="content" />
    <label class="modal-backdrop" @click="() => (open = false)">Close</label>
  </div>
</template>
