<template>
  <div
    v-motion
    :initial="{ x: '100%', opacity: 0 }"
    :enter="{ x: '0', opacity: 1 }"
    :leave="{ x: '100%', opacity: 0 }"
    transition="ease-in-out"
    class="custom-h fixed bottom-0 right-0 w-1/4 overflow-x-hidden border-l border-gray-300 bg-white p-4 shadow-lg"
  >
    <h2 class="mb-4 text-xl font-semibold">Meus Favoritos</h2>
    <div v-if="favoriteItems.length > 0" class="absolute right-4 top-4">
      <button @click="clearFavorites" class="text-decoration-line text-blue-600 underline">
        Esvaziar
      </button>
    </div>

    <div v-if="favoriteItems.length === 0">Não há favoritos.</div>

    <div v-else class="flex w-full flex-col gap-4">
      <HorizontalCard
        v-for="item in favoriteItems"
        :key="item.id"
        :item="item"
        :formattedPrice="formattedPrice"
        @remove="removeFromFavorites"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import HorizontalCard from './HorizontalCard.vue'

export default defineComponent({
  components: {
    HorizontalCard
  },
  setup() {
    const store = useStore()

    const isFavoritesVisible = computed(() => store.getters.isFavoritesVisible)
    const favoriteItems = computed(() => store.getters.favoriteItems)
    const totalPrice = computed(() => store.getters.totalPrice)

    const toggleFavorites = () => {
      store.commit(
        isFavoritesVisible.value ? 'favorites/HIDE_FAVORITES' : 'favorites/SHOW_FAVORITES'
      )
    }

    const removeFromFavorites = (title: string) => {
      store.commit('favorites/REMOVE_FROM_FAVORITES', title)
    }

    const clearFavorites = () => {
      store.commit('favorites/CLEAR_FAVORITES')
    }

    const formattedPrice = (price: number) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

    return {
      isFavoritesVisible,
      favoriteItems,
      totalPrice,
      toggleFavorites,
      removeFromFavorites,
      clearFavorites,
      formattedPrice
    }
  }
})
</script>

<style scoped>
.custom-h {
  height: calc(100% - 72px);
}
</style>
