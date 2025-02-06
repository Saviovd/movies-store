<template>
  <div
    class="cart-item item relative flex items-start justify-start border-b pb-2"
    :class="{
      'gap-4': size === 'large',
      'gap-2': size === 'small'
    }"
  >
    <div
      class="flex-shrink-0 overflow-hidden rounded-sm"
      :class="{
        'h-16 w-16 md:h-24 md:w-24': size === 'large',
        'h-12 w-12': size === 'small'
      }"
    >
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.title"
        class="h-full w-full object-cover object-top"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-gray-300">
        <ImageNotFound
          class="fill-gray-500"
          :class="{
            'h-10 w-10': size === 'large',
            'h-5 w-5': size === 'small'
          }"
        />
      </div>
    </div>

    <div class="flex w-full items-center justify-between">
      <h3
        :class="{ 'md:text-md text-sm': size === 'large', 'text-sm': size === 'small' }"
        class="max-w-16 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-2 sm:max-w-20 md:max-w-24 lg:max-w-28 xl:max-w-48"
      >
        {{ item.title }}
      </h3>

      <span v-if="!isFavorite" class="flex-shrink-0 px-3 text-center"> 1 </span>

      <p
        :class="{ 'text-sm md:text-lg': size === 'large', 'text-sm': size === 'small' }"
        class="w-max flex-shrink-0"
      >
        {{ formattedPrice(item.price) }}
      </p>

      <div
        class="flex flex-shrink-0 items-center justify-end gap-2"
        :class="isFavorite && 'absolute bottom-2 right-0 md:static'"
      >
        <button @click="toggleCart" class="font-se'mi'bold rounded-sm text-white transition-colors">
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
