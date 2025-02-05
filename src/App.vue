<template>
  <div class="h-screen">
    <HeaderComponent :search="searchQuery" @update:search="searchQuery = $event" />
    <!-- <router-view /> -->
    <LateralCart v-if="isCartVisible" />
    <LateralFavorites v-if="isFavoritesVisible" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import HeaderComponent from './components/HeaderComponent.vue'
import LateralCart from './components/LateralCart.vue'
import LateralFavorites from './components/LateralFavorites.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    LateralCart,
    LateralFavorites
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  setup() {
    const store = useStore()
    const isCartVisible = computed(() => store.getters.isCartVisible)
    const isFavoritesVisible = computed(() => store.getters.isFavoritesVisible)

    return { isCartVisible, isFavoritesVisible }
  }
}
</script>
