<template>
  <header class="flex items-center justify-between bg-green-200 p-4">
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

    <div class="flex gap-4 text-2xl">
      <div
        class="h-10 w-10 cursor-pointer rounded-r-md fill-white stroke-none"
        @click="$emit('favorites')"
      >
        <SolidHeart />
      </div>
      <div class="h-10 w-10 cursor-pointer rounded-r-md fill-white stroke-none" @click="$emit('cart')">
        <CartShopping />
      </div>
    </div>
  </header>
</template>

<script>
import MagnifyingGlass from '../assets/icons/MagnifyingGlass.vue'
import SolidHeart from '../assets/icons/SolidHeart.vue'
import CartShopping from '../assets/icons/CartShopping.vue'

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
  }
}
</script>

<style scoped>
.custom-width {
  width: calc(100% - 10px);
}
</style>
