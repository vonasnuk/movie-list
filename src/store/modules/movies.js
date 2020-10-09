export default {
    state: {
        movies: [],
        pages: 1
    },
    mutations: {
        updateMovies(state, movies){
            state.movies = movies
        }
    },
    actions: {
        async fetchMovies(ctx, page){
            const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=67c483abc1115236d5285a3cfe214caa&language=uk&page=`+page);
            const results = await res.json();
            const movies = results.results

            ctx.commit('updateMovies', movies)
        }
    },
    getters: {
        getBestMovies(state){
            const result = state.movies.filter(m => m.backdrop_path!=null && m.overview!=null)
            return result
        }
    }
}