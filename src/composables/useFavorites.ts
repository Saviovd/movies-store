import { computed } from 'vue'
import { useStore } from 'vuex'

export function useFavorites(title: string, image: string, price: number) {
  const store = useStore()

  const isInFavorites = computed(() => store.getters.isInFavorites(title))

  const toggleFavorites = () => {
    if (isInFavorites.value) {
      store.commit('REMOVE_FROM_FAVORITES', title)
      return
    }
    store.commit('ADD_TO_FAVORITES', { title, image, price })
  }

  return { isInFavorites, toggleFavorites }
}
