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
      <button @click="clearFavorites" class="text-decoration-line underline font-medium text-[#6558f5] hover:text-[#584ec5]">
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

    const favoriteItems = computed(() => store.getters.favoriteItems)

    const removeFromFavorites = (title: string) => {
      store.commit('REMOVE_FROM_FAVORITES', title)
    }

    const clearFavorites = () => {
      store.commit('CLEAR_FAVORITES')
    }

    const formattedPrice = (price: number) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

    return {
      favoriteItems,
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
