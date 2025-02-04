<template>
  <div class="w-64 rounded-sm border border-black text-black">
    <div class="relative border-b border-black">
      <button @click="toggleFavorites" class="absolute right-2 top-2 w-8">
        <SolidHeart
          class="w-8 transition"
          :class="isInFavorites ? 'fill-red-500 stroke-red-500' : 'fill-transparent stroke-black'"
        />
      </button>
      <img :src="image" :alt="title" class="h-64 w-full rounded-md object-cover" v-if="image" />
      <div v-else class="flex h-64 items-center justify-center bg-gray-300">
        <ImageNotFound class="h-2w-16 w-16 fill-gray-500" />
      </div>
      <p class="absolute bottom-1 m-auto w-full text-center text-sm font-medium opacity-75">
        {{ releaseDate }}
      </p>
    </div>
    <div>
      <h2 class="mt-2 text-center text-lg font-semibold">{{ title }}</h2>
      <div class="flex items-center justify-center gap-7">
        <div class="flex items-center gap-1 text-sm opacity-75">
          <SolidStar class="w-4" />
          <span class="text-lg font-bold">{{ rating }}</span>
        </div>
        <p class="text-sm opacity-75">{{ genre }}</p>
      </div>
      <p class="mt-2 text-center text-lg font-semibold text-blue-400">{{ formatted }}</p>
    </div>
    <button
      @click="toggleCart"
      class="mt-2 w-full rounded-sm py-2 font-semibold text-white"
      :class="isInCart ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'"
    >
      {{ isInCart ? 'Remover' : 'Adicionar' }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCart } from '../composables/useCart'
import { useFavorites } from '../composables/useFavorites'
import ImageNotFound from '../assets/icons/ImageNotFound.vue'
import SolidStar from '../assets/icons/SolidStar.vue'
import SolidHeart from '../assets/icons/SolidHeart.vue'
import { usePriceFormatter } from '../composables/usePriceFormatter'

export default defineComponent({
  components: {
    ImageNotFound,
    SolidStar,
    SolidHeart
  },
  props: {
    title: String,
    genre: String,
    image: String,
    releaseDate: String,
    rating: Number,
    price: Number
  },
  setup(props) {
    const { isInCart, toggleCart } = useCart(props.title!, props.image!, props.price!)
    const { isInFavorites, toggleFavorites } = useFavorites(
      props.title!,
      props.image!,
      props.price!
    )

    const { formattedPrice } = usePriceFormatter()

    const formatted = formattedPrice(props.price || 0)

    return { isInCart, toggleCart, isInFavorites, toggleFavorites, formatted }
  }
})
</script>
