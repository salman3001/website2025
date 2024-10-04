<script setup lang="ts">
const model = defineModel<any>({ required: true });

defineProps<{
  name: string;
  errors?: string[];
  type?: string;
  placeholder?: string;
  multiple?: boolean;
  accept?: string;
}>();

const handleFile = (e: Event) => {
  const file = (e.target as any)?.files[0];
  model.value = file;
};
</script>
<template>
  <div>
    <!-- file -->
    <label class="form-control" v-if="type === 'file'">
      <div class="label">
        <span class="label-text">{{ name }}</span>
      </div>
      <input
        type="file"
        class="file-input file-input-bordered"
        :class="{
          'file-input-error': errors ? true : false,
          'text-error': errors ? true : false,
        }"
        :accept="accept"
        :id="name"
        :placeholder="placeholder"
        @change="handleFile"
      />
      <div class="label pt-1 gap-1 flex flex-wrap" v-if="errors">
        <span class="label-text-alt text-red-500" v-for="error in errors">
          {{ error }}
        </span>
      </div>
    </label>

    <!-- textarea -->
    <div class="form-control" v-else-if="type === 'textarea'">
      <label class="label pb-1" :for="name">
        <span class="label-text">{{ name }}</span>
      </label>
      <textarea
        class="textarea textarea-bordered p-1"
        :class="{
          'textarea-error': errors ? true : false,
          'text-error': errors ? true : false,
        }"
        :id="name"
        :placeholder="placeholder"
        v-model="model"
        rows="5"
      ></textarea>
      <div class="label pt-1 gap-1 flex flex-wrap" v-if="errors">
        <span class="label-text-alt text-red-500" v-for="error in errors">
          {{ error }}
        </span>
      </div>
    </div>

    <!-- checkbox -->
    <div class="form-control py-2" v-else-if="type === 'checkbox'">
      <label class="cursor-pointer label w-max gap-2" :for="name">
        <span class="label-text">{{ name }}</span>
        <input
          :id="name"
          type="checkbox"
          :checked="model"
          class="checkbox checkbox-primary"
          :class="{
            'checkbox-error': errors ? true : false,
            'text-error': errors ? true : false,
          }"
        />
      </label>
      <div class="label pt-1 gap-1 flex flex-wrap" v-if="errors">
        <span class="label-text-alt text-red-500" v-for="error in errors">
          {{ error }}
        </span>
      </div>
    </div>

    <!-- select -->
    <label v-else-if="type === 'select'" class="form-control py-2" :for="name">
      <label class="label pb-1" :for="name">
        <span class="label-text">{{ name }}</span>
      </label>
      <select
        class="select select-bordered"
        id="name"
        :multiple="multiple ? true : false"
      >
        <slot />
      </select>
      <div class="label pt-1 gap-1 flex flex-wrap" v-if="errors">
        <span class="label-text-alt text-red-500" v-for="error in errors">
          {{ error }}
        </span>
      </div>
    </label>

    <!-- text input -->
    <div class="form-control" v-else>
      <label class="label pb-1" :for="name">
        <span class="label-text">{{ name }}</span>
      </label>
      <label
        class="input input-bordered flex items-center gap-2"
        :class="{
          'input-error': errors ? true : false,
          'text-error': errors ? true : false,
        }"
      >
        <slot name="start-icon" />
        <input
          :id="name"
          :placeholder="placeholder"
          :type="type ?? 'text'"
          v-model="model"
          class="grow"
        />
        <slot name="end-icon" />
      </label>
      <div class="label pt-1 gap-1 flex flex-wrap" v-if="errors">
        <span class="label-text-alt text-red-500" v-for="error in errors">
          {{ error }}
        </span>
      </div>
    </div>
  </div>
</template>
