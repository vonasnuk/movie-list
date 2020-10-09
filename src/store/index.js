import Vue from 'vue'
import Vuex from 'vuex'
import movies from './modules/movies'
import movieDetails from './modules/movieDetails'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movies,
    movieDetails
  }
})
