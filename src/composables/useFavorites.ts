import { computed } from 'vue'
import { useStore } from 'vuex'

export function useFavorites(title: string, image: string, price: number) {
  const store = useStore()

  const isInFavorites = computed(() => store.getters['favorites/isInFavorites'](title))

  const toggleFavorites = () => {
    if (isInFavorites.value) {
      store.commit('favorites/REMOVE_FROM_FAVORITES', title)
      return
    }
    store.commit('favorites/ADD_TO_FAVORITES', { title, image, price })
  }

  return { isInFavorites, toggleFavorites }
}
