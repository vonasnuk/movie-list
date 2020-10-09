export default {
    state: {
        movie: null,
        trailer: ''
    },
    mutations: {
        updateMovie(state, movie){
            state.movie = movie
        },
        updateTrailer(state, trailer){
            state.trailer = trailer
        }
    },
    actions: {
        async fetchGetOneMovie(ctx, id){
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=67c483abc1115236d5285a3cfe214caa&language=uk`);
            const results = await res.json();
            const movie = await results

            ctx.commit('updateMovie', movie)
        },
        async fetchGetTrailer(ctx, id){
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=67c483abc1115236d5285a3cfe214caa&language=uk`);
            const results = await res.json();
            let trailer
            if(results.results.length > 0){
                trailer = results.results[0].key
            }
            else{
                trailer = ''
            }
            ctx.commit('updateTrailer', trailer)
        }
    },
    getters: {
        getOneMovie(state){
            return state.movie
        },
        getGenres(state){
            let allGenres = state.movie.genres
            let genres = []
            allGenres.forEach(e => genres.push(e.name))
            genres = genres.join(', ')
            return genres
        },
        getReleaseDate(state){
            let releaseDate = state.movie.release_date
            let releaseYear = /^\d\d\d\d/.exec(releaseDate)
            releaseYear = releaseYear.join('')
            return releaseYear
        },
        getCountries(state){
            let allCountries = state.movie.production_countries
            let countries = []
            allCountries.forEach(e => countries.push(e.name))
            countries = countries.join(', ')
            return countries
        },
        getCompanies(state){
            let allCompanies= state.movie.production_companies
            let companies = []
            allCompanies.forEach(e => companies.push(e.name))
            companies = companies.join(', ')
            return companies
        },
        getTrailer(state){
            return state.trailer
        }
    }
}