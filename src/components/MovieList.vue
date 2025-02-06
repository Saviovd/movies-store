<template>
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
</template>

<script>
import VerticalCard from './VerticalCard.vue'

export default {
  name: 'MovieList',
  components: {
    VerticalCard
  },
  props: {
    movies: {
      type: Array,
      required: true
    }
  }
}
</script>
