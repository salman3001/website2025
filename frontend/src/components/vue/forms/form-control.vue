<script setup lang="ts">
const model = defineModel<any>({ required: true });

defineProps<{
  name: string;
  errors?: string[];
  type?: string;
  placeholder?: string;
  multiple?: boolean;
  accept?: string;
  className?: string;
  hideLable?: boolean;
  value?: any;
}>();

const handleFile = (e: Event) => {
  const file = (e.target as any)?.files[0];
  model.value = file;
};
</script>
<template>
  <!-- file -->
  <label class="form-control" v-if="type === 'file'">
    <div class="label" v-if="!hideLable">
      <span class="label-text">{{ name }}</span>
    </div>
    <input
      type="file"
      class="file-input file-input-bordered"
      :class="{
        [className ?? 'nxxx']: true,
        'file-input-error': errors ? true : false,
        'text-error': errors ? true : false,
        [className ?? 'nxxx']: true,
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
    <label class="label pb-1" :for="name" v-if="!hideLable">
      <span class="label-text">{{ name }}</span>
    </label>
    <textarea
      class="textarea textarea-bordered p-1"
      :class="{
        [className ?? 'nxxx']: true,
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
      <span class="label-text" v-if="!hideLable">{{ name }}</span>
      <input
        :id="name"
        type="checkbox"
        v-model="model"
        class="checkbox checkbox-primary"
        :class="{
          [className ?? 'nxxx']: true,
          'checkbox-error': errors ? true : false,
          'text-error': errors ? true : false,
        }"
        :value="value"
      />
    </label>
    <div class="label pt-1 gap-1 flex flex-wrap" v-if="errors">
      <span class="label-text-alt text-red-500" v-for="error in errors">
        {{ error }}
      </span>
    </div>
  </div>

  <!-- radio -->
  <div class="form-control py-2" v-else-if="type === 'radio'">
    <label class="label cursor-pointer w-max gap-2" :for="name">
      <span class="label-text" v-if="!hideLable">{{ name }}</span>
      <input
        type="radio"
        name="radio-10"
        class="radio radio-primary"
        :class="{
          [className ?? 'nxxx']: true,
          'radio-error': errors ? true : false,
          'text-error': errors ? true : false,
        }"
        v-model="model"
        :value="value"
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
    <label class="label pb-1" :for="name" v-if="!hideLable">
      <span class="label-text">{{ name }}</span>
    </label>
    <select
      class="select select-bordered"
      :class="{
        [className ?? 'nxxx']: true,
      }"
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
    <label class="label pb-1" :for="name" v-if="!hideLable">
      <span class="label-text">{{ name }}</span>
    </label>
    <label
      class="input input-bordered flex items-center gap-2"
      :class="{
        [className ?? 'nxxx']: true,
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
</template>
