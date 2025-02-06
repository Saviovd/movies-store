<template>
  <div class="relative flex h-full w-full flex-col p-4 pb-56 md:w-1/2 md:max-w-[450px]">
    <div class="mb-2 grid w-full grid-cols-4 gap-2 text-sm">
      <p class="text-start">Imagem</p>
      <p class="text-start">Nome</p>
      <p class="px-3 text-center">Qtd</p>
      <p class="text-end">Preço</p>
    </div>

    <div v-if="cartItems.length > 0" class="flex w-full flex-col gap-2">
      <HorizontalCard
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        :formattedPrice="formattedPrice"
        @remove="removeFromCart"
        size="large"
        class="item border-b-2 border-gray-300"
      />
    </div>

    <div class="absolute bottom-6 left-0 w-full px-4">
      <div class="mb-10 flex items-center justify-between">
        <span class="text-lg font-semibold">Total:</span>
        <span class="pr-2 text-3xl font-semibold">{{ formattedPrice(totalPrice) }}</span>
      </div>
      <button
        type="submit"
        class="w-full rounded-md bg-[#6558f5] px-4 py-2 font-medium text-white hover:bg-[#584ec5] focus:outline-none focus:ring-2 focus:ring-offset-2"
        @click.prevent="handleSubmit"
      >
        Finalizar
      </button>
    </div>
  </div>
</template>

<script>
import HorizontalCard from '../components/HorizontalCard.vue'

export default {
  name: 'CartSummary',
  components: { HorizontalCard },
  props: {
    cartItems: {
      type: Array,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    formattedPrice: {
      type: Function,
      required: true
    },
    handleSubmit: {
      type: Function,
      required: true
    },
    removeFromCart: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
.item:nth-last-child(1) {
  border: 0;
}
</style>
