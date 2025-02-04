import { Module } from 'vuex'
import { Product } from '../../types/movie'

interface CartState {
  cart: Product[]
}

const cart: Module<CartState, unknown> = {
  state: {
    cart: JSON.parse(localStorage.getItem('cart') || '[]')
  },
  mutations: {
    ADD_TO_CART(state, product: Product) {
      state.cart.push(product)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    REMOVE_FROM_CART(state, title: string) {
      state.cart = state.cart.filter((item) => item.title !== title)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    CLEAR_CART(state) {
      state.cart = []
      localStorage.clear()
    }
  },
  getters: {
    cartItems: (state) => state.cart,
    isInCart: (state) => (title: string) => state.cart.some((item) => item.title === title)
  }
}

export default cart
