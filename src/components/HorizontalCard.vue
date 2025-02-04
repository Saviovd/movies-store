<template>
  <div class="cart-item flex items-center justify-start gap-2">
    <img
      :src="item.image"
      :alt="item.title"
      class="h-10 w-10 rounded-sm object-cover"
      v-if="item.image"
    />
    <div v-else class="flex h-10 w-10 items-center justify-center rounded-sm bg-gray-300 p-1">
      <ImageNotFound class="h-5 w-5 fill-gray-500" />
    </div>
    <h3 class="min-w-[180px]">{{ item.title }}</h3>
    <span class="min-w-[20px] text-center">1</span>
    <p class="w-max">{{ formattedPrice(item.price) }}</p>
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
    }
  }
})
</script>
