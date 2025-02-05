<template>
  <div
    class="cart-item flex items-center justify-start"
    :class="{
      'h-24 w-full gap-4': size === 'large',
      'h-16 w-full gap-2': size === 'small'
    }"
  >
    <img
      :src="item.image"
      :alt="item.title"
      :class="{
        'h-10 w-10 rounded-sm object-contain': size === 'large',
        'h-10 w-10 rounded-sm object-cover': size === 'small'
      }"
      v-if="item.image"
    />
    <div
      v-else
      :class="{
        'flex h-16 w-16 items-center justify-center rounded-sm bg-gray-300 p-2': size === 'large',
        'flex h-10 w-10 items-center justify-center rounded-sm bg-gray-300 p-1': size === 'small'
      }"
    >
      <ImageNotFound class="h-5 w-5 fill-gray-500" />
    </div>
    <h3
      :class="{ 'text-xl': size === 'large', 'text-base': size === 'small' }"
      class="min-w-[180px]"
    >
      {{ item.title }}
    </h3>
    <span
      class="text-center"
      :class="{ 'min-w-[40px]': size === 'large', 'min-w-[20px]': size === 'small' }"
      >1</span
    >
    <p :class="{ 'text-lg': size === 'large', 'text-sm': size === 'small' }" class="w-max">
      {{ formattedPrice(item.price) }}
    </p>
    <button @click="$emit('remove', item.title)" class="absolute right-4 text-red-500">
      <SolidTrash class="h-4 w-4" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ImageNotFound from '../assets/icons/ImageNotFound.vue'
import SolidTrash from '../assets/icons/SolidTrash.vue'

export default defineComponent({
  components: {
    ImageNotFound,
    SolidTrash
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    formattedPrice: {
      type: Function,
      required: true
    },
    size: {
      type: String,
      default: 'small',
      validator: (value: string) => ['small', 'large'].includes(value)
    }
  }
})
</script>
