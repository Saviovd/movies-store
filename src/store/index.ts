import { createStore } from 'vuex'
import cart from './modules/cart'
import favorites from './modules/favorites'

export default createStore({
  modules: {
    cart,
    favorites
  }
})
