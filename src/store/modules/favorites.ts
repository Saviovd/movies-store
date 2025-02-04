import { Module } from 'vuex'
import { Product } from '../../types/movie'

interface FavoriteState {
  favorites: Product[]
}

const favorites: Module<FavoriteState, unknown> = {
  namespaced: true,
  state: {
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
  },
  mutations: {
    ADD_TO_FAVORITES(state, product: Product) {
      state.favorites.push(product)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    REMOVE_FROM_FAVORITES(state, title: string) {
      state.favorites = state.favorites.filter((item) => item.title !== title)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    CLEAR_FAVORITES(state) {
      state.favorites = []
      localStorage.clear()
    }
  },
  getters: {
    favoriteItems: (state) => state.favorites,
    isInFavorites: (state) => (title: string) =>
      state.favorites.some((item) => item.title === title)
  }
}

export default favorites
