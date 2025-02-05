<template>
  <div class="h-screen">
    <HeaderComponent :search="searchQuery" @update:search="searchQuery = $event" />
    <main class="flex h-full items-start justify-center gap-4 py-32">
      <div class="flex justify-center gap-16">
        <VerticalCard
          v-for="movie in movies"
          :key="movie.id"
          :title="movie.title"
          :genre="movie.genre"
          :image="movie.image"
          :releaseDate="movie.releaseDate"
          :rating="movie.rating"
          :price="movie.price"
        />
      </div>
    </main>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import VerticalCard from '../components/VerticalCard.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    VerticalCard
  },
  data() {
    return {
      searchQuery: '',
      movies: [
        {
          id: 1,
          title: 'O Poderoso Chefão',
          genre: 'Crime/Drama',
          image: '',
          releaseDate: '1972',
          rating: 9,
          price: 29.9
        },
        {
          id: 2,
          title: 'Interestelar',
          genre: 'Sci-Fi',
          image: '',
          releaseDate: '2014',
          rating: 8,
          price: 19.9
        },
        {
          id: 3,
          title: 'Vingadores: Ultimato',
          genre: 'Ação',
          image: '',
          releaseDate: '2019',
          rating: 8,
          price: 39.9
        },
        {
          id: 4,
          title: 'Coringa',
          genre: 'Drama',
          image: '',
          releaseDate: '2019',
          rating: 8,
          price: 24.9
        }
      ]
    }
  }
}
</script>
