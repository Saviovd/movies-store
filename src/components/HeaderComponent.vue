<template>
  <header
    class="fixed left-0 right-0 top-0 flex items-center justify-between bg-green-200 px-12 py-4"
  >
    <h1 class="text-xl font-bold">MovieStore</h1>

    <div class="flex w-1/3 rounded-sm shadow-2xl">
      <input
        type="text"
        placeholder="Buscar filmes..."
        class="custom-width rounded-l-md bg-slate-100 px-4 py-2 text-black outline-none"
        v-model="searchQuery"
        @input="$emit('update:search', searchQuery)"
      />
      <div class="h-10 w-10 rounded-r-md bg-slate-100">
        <MagnifyingGlass />
      </div>
    </div>

    <div class="flex gap-4">
      <div
        class="h-10 w-10 cursor-pointer rounded-r-md fill-white stroke-none"
        @click="toggleFavorites"
      >
        <SolidHeart />
      </div>
      <div
        class="relative h-10 w-10 cursor-pointer rounded-r-md fill-white stroke-none"
        @click="toggleCart"
      >
        <span
          class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-sm font-medium text-gray-600"
          >{{ cartItems.length }}</span
        >
        <CartShopping />
      </div>
    </div>
  </header>
</template>

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
