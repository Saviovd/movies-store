<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="rounded-sm border-2 border-gray-400 bg-white p-8 shadow-lg">
      <h2 class="mb-4 text-center text-xl font-semibold">Obrigado Uzumaki Naruto!</h2>
      <p class="mb-6 text-center">Sua compra foi finalizada com sucesso.</p>
      <a
        href="/"
        class="block w-full rounded-sm bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700"
        @click="clearCart"
      >
        Ir para a loja
      </a>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'ConfirmModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const store = useStore()

    return {
      clearCart: () => store.commit('CLEAR_CART')
    }
  }
}
</script>

<style scoped></style>
