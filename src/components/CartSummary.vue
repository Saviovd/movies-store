<template>
  <div class="relative flex h-full w-2/5 flex-col pb-64">
    <div class="flex items-center justify-start gap-4">
      <div class="cart-item flex w-16 items-center justify-start gap-2">Imagem</div>
      <h3 class="min-w-[180px]">Nome</h3>
      <span class="min-w-[40px] text-center">Qtd</span>
      <p class="w-max">Preço</p>
    </div>
    <div v-if="cartItems.length > 0" class="flex w-full flex-col">
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
        <span>Total:</span>
        <span class="pr-2 text-3xl font-semibold">{{ formattedPrice(totalPrice) }}</span>
      </div>
      <button
        type="submit"
        class="w-full rounded-md px-4 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#6558f5] hover:bg-[#584ec5]"
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
