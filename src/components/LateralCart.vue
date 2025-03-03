<template>
  <div
    v-motion
    :initial="{ x: '100%', opacity: 0 }"
    :enter="{ x: '0', opacity: 1 }"
    :leave="{ x: '100%', opacity: 0 }"
    transition="ease-in-out"
    class="fixed bottom-0 right-0 h-[calc(100%-108px)] w-3/4 overflow-x-hidden border-l border-gray-300 bg-white p-4 shadow-lg sm:h-[calc(100%-68px)] sm:w-1/2 sm:min-w-[380px] lg:w-1/4"
  >
    <div>
      <h2 class="mb-2 text-xl font-semibold sm:mb-4">Meu Carrinho</h2>

      <button
        v-if="cartItems.length > 0"
        @click="clearCart"
        class="absolute right-4 top-4 text-sm font-medium text-[#6558f5] underline hover:text-[#584ec5] sm:text-base"
      >
        Esvaziar
      </button>

      <p v-else>O carrinho está vazio.</p>

      <div v-if="cartItems.length > 0" class="flex w-full flex-col gap-2">
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
        @click="goToCheckout"
        class="mt-4 w-full rounded-sm bg-[#6558f5] py-2 font-semibold text-white hover:bg-[#584ec5]"
      >
        Finalizar compra
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import HorizontalCard from './HorizontalCard.vue'
import { usePriceFormatter } from '../composables/usePriceFormatter'

export default defineComponent({
  components: { HorizontalCard },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { formattedPrice } = usePriceFormatter()

    const goToCheckout = () => {
      if (store.getters.cartItems.length === 0) {
        alert('o carrinho não pode estar vazio!')
        return
      }
      store.commit('HIDE_CART')
      router.push('/checkout')
    }

    return {
      cartItems: computed(() => store.getters.cartItems),
      totalPrice: computed(() => store.getters.totalPrice),
      removeFromCart: (title: string) => store.commit('REMOVE_FROM_CART', title),
      clearCart: () => store.commit('CLEAR_CART'),
      formattedPrice,
      goToCheckout
    }
  }
})
</script>
