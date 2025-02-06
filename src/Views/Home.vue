<template>
  <div class="min-h-screen bg-gray-50">
    <HeaderComponent :search="searchQuery" @update:search="searchQuery = $event" />

    <main class="container mx-auto py-8 pt-40 sm:px-4 sm:pt-32">
      <div class="flex flex-wrap items-start justify-center gap-4">
        <VerticalCard
          v-for="movie in movies"
          :key="movie.id"
          :title="movie.title"
          :genre="movie.genre_names"
          :image="movie.poster_path"
          :releaseDate="movie.release_date"
          :rating="movie.vote_average"
          :price="movie.price"
          class="w-[calc(50%-0.5rem)] max-w-[300px] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
        />
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
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
      movies: []
    }
  },
  mounted() {
    document.title = 'Home'
    this.fetchMovies()
  },
  methods: {
    async fetchMovies() {
      const apiKey = 'f507cc8a9a8d78ad57aaf86b43957b7d'
      const moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`
      const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`

      try {
        const [moviesResponse, genresResponse] = await Promise.all([
          axios.get(moviesUrl),
          axios.get(genresUrl)
        ])

        const genres = genresResponse.data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name
          return acc
        }, {})

        this.movies = moviesResponse.data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          genre_names: genres[movie.genre_ids[0]], // Pegando o nome do primeiro gênero
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          price: 29.9
        }))
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      }
    }
  }
}
</script>
