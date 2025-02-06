import axios from 'axios'

const apiKey = import.meta.env.VITE_TMDB_API_KEY

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
    language: 'pt-BR'
  }
})

export const fetchPopularMovies = async () => {
  try {
    const response = await api.get('/movie/popular')
    return response.data.results
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error)
    throw error
  }
}

export const fetchGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list')
    return response.data.genres
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error)
    throw error
  }
}

export const searchMovies = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query: query
      }
    })
    return response.data.results
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    throw error
  }
}
