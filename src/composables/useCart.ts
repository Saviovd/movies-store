import { computed } from 'vue'
import { useStore } from 'vuex'

export function useCart(title: string, image: string, price: number) {
  const store = useStore()

  const isInCart = computed(() => store.getters.isInCart(title))

  const toggleCart = () => {
    if (isInCart.value) {
      store.commit('REMOVE_FROM_CART', title)
      return
    }
    store.commit('ADD_TO_CART', { title, image, price })
  }

  return { isInCart, toggleCart }
}
