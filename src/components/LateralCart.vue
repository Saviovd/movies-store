<template>
  <div
    v-motion
    :initial="{ x: '100%', opacity: 0 }"
    :enter="{ x: '0', opacity: 1 }"
    :leave="{ x: '100%', opacity: 0 }"
    transition="ease-in-out"
    class="fixed bottom-0 right-0 w-1/4 h-[calc(100%-72px)] overflow-x-hidden border-l border-gray-300 bg-white p-4 shadow-lg"
  >
    <div>
      <h2 class="mb-4 text-xl font-semibold">Meu Carrinho</h2>

      <button
        v-if="cartItems.length > 0"
        @click="clearCart"
        class="absolute right-4 top-4 text-blue-600 underline"
      >
        Esvaziar
      </button>

      <p v-else>O carrinho está vazio.</p>

      <div v-if="cartItems.length > 0" class="flex w-full flex-col gap-4">
        <HorizontalCard
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          :formattedPrice="formattedPrice"
          @remove="removeFromCart"
        />
      </div>
    </div>

    <div class="absolute bottom-6 left-0 w-full px-4">
      <div class="flex items-center justify-between">
        <span>Total:</span>
        <span class="pr-2 text-lg font-bold">{{ formattedPrice(totalPrice) }}</span>
      </div>
      <button
        @click="toggleCart"
        class="mt-4 w-full rounded-sm bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
      >
        Finalizar compra
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import HorizontalCard from './HorizontalCard.vue'
import { usePriceFormatter } from '../composables/usePriceFormatter'

export default defineComponent({
  components: { HorizontalCard },
  setup() {
    const store = useStore()
    const { formattedPrice } = usePriceFormatter()

    return {
      cartItems: computed(() => store.getters.cartItems),
      totalPrice: computed(() => store.getters.totalPrice),
      toggleCart: () => store.commit('TOGGLE_CART'),
      removeFromCart: (title: string) => store.commit('REMOVE_FROM_CART', title),
      clearCart: () => store.commit('CLEAR_CART'),
      formattedPrice
    }
  }
})
</script>
