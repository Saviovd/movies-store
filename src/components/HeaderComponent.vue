<template>
  <header
    class="fixed left-0 right-0 top-0 flex flex-col flex-wrap items-center justify-between bg-[#d1efec] p-4 pb-8 sm:flex-row sm:px-8 sm:pb-4 md:px-12"
  >
    <a href="/" class="text-xl font-bold">MovieStore</a>

    <div class="my-3 mt-2 flex w-full justify-center sm:my-0 sm:w-1/3">
      <div class="flex w-full min-w-[320px] max-w-md rounded-sm shadow-2xl">
        <input
          type="text"
          placeholder="Pesquisa"
          class="w-full rounded-l-md bg-slate-100 px-4 py-1 text-black outline-none"
          v-model="searchQuery"
          @input="$emit('update:search', searchQuery)"
        />
        <div class="flex h-full items-center justify-center rounded-r-md bg-slate-100">
          <MagnifyingGlass class="w-8" />
        </div>
      </div>
    </div>

    <div class="absolute bottom-1 right-4 mt-4 flex sm:static sm:mt-0 sm:gap-2">
      <div class="cursor-pointer rounded-r-md fill-white stroke-none" @click="toggleFavorites">
        <SolidHeart class="w-8 transition-colors hover:fill-gray-800 sm:w-9" />
      </div>
      <div class="relative cursor-pointer rounded-r-md fill-white stroke-none" @click="toggleCart">
        <span
          class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#fdf3d3] text-sm font-medium text-gray-600 sm:h-5 sm:w-5"
          >{{ cartItems.length }}</span
        >
        <CartShopping class="w-8 transition-colors hover:fill-gray-800 sm:w-9" />
      </div>
    </div>
  </header>
</template>
''

<script>
import MagnifyingGlass from '../assets/icons/MagnifyingGlass.vue'
import SolidHeart from '../assets/icons/SolidHeart.vue'
import CartShopping from '../assets/icons/CartShopping.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    MagnifyingGlass,
    SolidHeart,
    CartShopping
  },
  props: {
    search: String
  },
  data() {
    return {
      searchQuery: this.search || ''
    }
  },
  setup() {
    const store = useStore()

    const cartItems = computed(() => store.getters.cartItems)
    const isCartVisible = computed(() => store.getters.isCartVisible)
    const isFavoritesVisible = computed(() => store.getters.isFavoritesVisible)

    const toggleCart = () => {
      if (!isCartVisible.value) {
        store.commit('SHOW_CART')
        store.commit('HIDE_FAVORITES')
      } else {
        store.commit('HIDE_CART')
      }
    }

    const toggleFavorites = () => {
      if (!isFavoritesVisible.value) {
        store.commit('SHOW_FAVORITES')
        store.commit('HIDE_CART')
      } else {
        store.commit('HIDE_FAVORITES')
      }
    }

    return { cartItems, toggleCart, toggleFavorites }
  }
}
</script>

<style scoped>
.custom-width {
  width: calc(100% - 10px);
}
</style>
