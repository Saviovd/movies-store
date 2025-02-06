<template>
  <div class="min-h-screen bg-gray-50">
    <HeaderComponent :search="searchQuery" @update:search="handleSearch" />

    <main class="container mx-auto py-8 pt-40 sm:px-4 sm:pt-32">
      <MovieList :movies="movies" />
    </main>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import MovieList from '../components/MovieList.vue'
import { fetchPopularMovies, fetchGenres, searchMovies } from '../services/api'

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    MovieList
  },
  data() {
    return {
      searchQuery: '',
      movies: [],
      genres: []
    }
  },
  async mounted() {
    document.title = 'Home'
    await this.fetchGenres()
    await this.fetchMovies()
  },
  methods: {
    async fetchMovies() {
      try {
        const movies = await fetchPopularMovies()
        this.movies = this.mapMoviesWithGenres(movies)
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      }
    },
    async fetchGenres() {
      try {
        const genres = await fetchGenres()
        this.genres = genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name
          return acc
        }, {})
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error)
      }
    },
    async handleSearch(query) {
      this.searchQuery = query
      if (query) {
        try {
          const movies = await searchMovies(query)
          this.movies = this.mapMoviesWithGenres(movies)
        } catch (error) {
          console.error('Erro ao buscar filmes:', error)
        }
      } else {
        await this.fetchMovies()
      }
    },
    mapMoviesWithGenres(movies) {
      return movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        genre_names: this.genres[movie.genre_ids[0]],
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        price: 29.9
      }))
    }
  }
}
</script>
