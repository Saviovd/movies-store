<template>
  <div
    class="flex h-max w-5/12 flex-col justify-between rounded-sm border border-black text-black shadow-lg transition-shadow hover:shadow-xl sm:w-48 md:w-56 lg:w-64"
  >
    <div class="relative border-b border-black">
      <button @click="toggleFavorites" class="absolute right-2 top-2 w-8">
        <SolidHeart
          class="w-8 transition"
          :class="isInFavorites ? 'fill-red-800 stroke-red-800' : 'fill-transparent stroke-red-800'"
        />
      </button>

      <img :src="image" :alt="title" class="h-auto w-full rounded-t-sm object-top" v-if="image" />
      <div
        v-else
        class="flex h-52 items-center justify-center rounded-t-sm bg-gray-300 sm:h-[260px] md:h-[340px] lg:h-[440px]"
      >
        <ImageNotFound class="h-12 w-12 fill-gray-500 sm:h-16 sm:w-16" />
      </div>

      <p
        class="absolute bottom-0 m-auto w-full rounded py-1 text-center text-xs font-semibold sm:text-sm"
      >
        {{ formattedReleaseDate }}
      </p>
    </div>

    <div class="p-2 sm:p-4">
      <h2
        class="line-clamp-2 overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-bold sm:text-lg"
      >
        {{ title }}
      </h2>
      <div class="mt-2 flex items-center justify-center gap-4">
        <div class="flex items-center gap-1 text-xs sm:text-sm">
          <SolidStar class="w-3 sm:w-4" />
          <span class="text-sm font-bold sm:text-lg">{{ rating?.toFixed(1) }}</span>
        </div>
        <p class="line-clamp-1 text-xs font-medium sm:text-sm">{{ genre }}</p>
      </div>
      <p class="sm:text-md mt-2 text-center text-sm font-semibold">{{ formattedPriceLabel }}</p>
    </div>

    <button
      @click="toggleCart"
      class="mt-2 w-full rounded-b-sm py-1 text-xs font-semibold text-white transition-colors sm:py-2 sm:text-sm"
      :class="isInCart ? 'bg-red-500 hover:bg-red-600' : 'bg-[#6558f5] hover:bg-[#584ec5]'"
    >
      {{ isInCart ? 'Remover' : 'Adicionar' }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useCart } from '../composables/useCart'
import { useFavorites } from '../composables/useFavorites'
import ImageNotFound from '@/assets/icons/ImageNotFound.vue'
import SolidStar from '@/assets/icons/SolidStar.vue'
import SolidHeart from '@/assets/icons/SolidHeart.vue'
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

    const formattedPriceLabel = computed(() => formattedPrice(props.price || 0))

    const formattedReleaseDate = computed(() => {
      if (!props.releaseDate) return 'Data desconhecida'

      const date = new Date(props.releaseDate)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(date)
    })

    return {
      isInCart,
      toggleCart,
      isInFavorites,
      toggleFavorites,
      formattedPriceLabel,
      formattedReleaseDate
    }
  }
})
</script>
