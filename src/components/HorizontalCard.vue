<template>
  <div
    class="cart-item item flex items-center justify-start border-b pb-2"
    :class="{
      'w-full gap-4': size === 'large',
      'w-full gap-2': size === 'small'
    }"
  >
    <img
      :src="item.image"
      :alt="item.title"
      :class="{
        'h-10 w-10 rounded-sm object-contain': size === 'large',
        'w-9 rounded-sm object-cover': size === 'small'
      }"
      v-if="item.image"
    />
    <div
      v-else
      class="flex items-center justify-center rounded-sm bg-gray-300"
      :class="{
        'p-4': size === 'large',
        'p-2': size === 'small'
      }"
    >
      <ImageNotFound
        class="fill-gray-500"
        :class="{
          'h-16 w-16': size === 'large',
          'h-5 w-5': size === 'small'
        }"
      />
    </div>
    <div class="relative flex w-full flex-wrap items-center justify-between sm:flex-nowrap">
      <h3
        :class="{ 'text-xl': size === 'large', 'text-sm': size === 'small' }"
        class="min-w-[150px] overflow-visible text-ellipsis"
      >
        {{ item.title }}
      </h3>
      <span
        v-if="!isFavorite"
        class="text-right sm:text-center"
        :class="{ 'min-w-[40px]': size === 'large', 'w-1/3 min-w-[30px]': size === 'small' }"
        >1</span
      >
      <p
        :class="{ 'text-lg': size === 'large', 'w-2/3 max-w-20 text-sm': size === 'small' }"
        class="w-max"
      >
        {{ formattedPrice(item.price) }}
      </p>
      <div class="flex w-full items-center justify-end gap-2">
        <button @click="toggleCart" class="rounded-sm font-semibold text-white transition-colors">
          <CartShopping
            v-if="isFavorite"
            class="h-5 w-5 p-0 transition-colors"
            :class="
              isInCart ? 'fill-red-500 hover:fill-red-600' : 'fill-[#1aae9f] hover:fill-[#1a978b]'
            "
          />
        </button>
        <button @click="$emit('remove', item.title)" class="right-0 text-red-500">
          <SolidTrash class="h-4 w-4 transition-colors hover:fill-red-600" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ImageNotFound from '../assets/icons/ImageNotFound.vue'
import SolidTrash from '../assets/icons/SolidTrash.vue'
import CartShopping from '../assets/icons/CartShopping.vue'
import { useCart } from '../composables/useCart'

export default defineComponent({
  components: {
    ImageNotFound,
    SolidTrash,
    CartShopping
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    formattedPrice: {
      type: Function,
      required: true
    },
    size: {
      type: String,
      default: 'small',
      validator: (value: string) => ['small', 'large'].includes(value)
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { isInCart, toggleCart } = useCart(
      props.item.title!,
      props.item.image!,
      props.item.price!
    )

    return { isInCart, toggleCart }
  }
})
</script>

<style scoped>
.item:nth-last-child(1) {
  border: 0;
}
</style>
