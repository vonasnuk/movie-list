<template>
    <div ref='backgroundImg' class="backgroundImg">
        <div class="container">
            <div class="row">
                <div v-if="getOneMovie" class="film-details">
                    <h1>{{getOneMovie.title}}</h1>
                    <div class="col s12 m3">
                        <img class="poster" :src="'https://image.tmdb.org/t/p/w500' + getOneMovie.poster_path">
                    </div>
                    <div class="col s12 m9">
                        <p v-if="getOneMovie.overview">Опис: {{getOneMovie.overview}}</p>
                        <p>Жанри: {{getGenres}}</p>
                        <p>Середня оцінка: {{getOneMovie.vote_average}}</p>
                        <p>Рік релізу: {{getReleaseDate}}</p>
                        <p>Тривалість: {{getOneMovie.runtime}} хв</p>
                        <p v-if="getOneMovie.tagline">Слоган: {{getOneMovie.tagline}}</p>
                        <p v-if="getCountries">Країни: {{getCountries}}</p>
                        <p v-if="getCompanies">Компанії-виробники: {{getCompanies}}</p>
                    <hr>
                    </div>
                    <div v-if="trailerToggle" class="col s12 m9">
                        <div>  
                            <h3>Трейлер:</h3>
                            <iframe width="620" height="320" frameborder="0"
                                :src="'https://www.youtube.com/embed/' + getTrailer">>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    data(){
        return{
            genres: [],
            trailerToggle: false,
        }
    },
    methods: {
        ...mapActions(['fetchGetOneMovie', 'fetchGetTrailer'])
    },
    computed: mapGetters(['getOneMovie', 'getGenres', 'getReleaseDate', 'getCountries', 'getCompanies', 'getTrailer']),
    created(){
        this.fetchGetTrailer(this.$route.params.id)
        this.fetchGetOneMovie(this.$route.params.id)
    },
    mounted(){
    },
    updated(){
        this.$refs.backgroundImg.style.backgroundImage = `linear-gradient(rgba(238, 110, 115, 0.8), rgba(238, 110, 115, 0.8)), url("https://image.tmdb.org/t/p/w1280${this.getOneMovie.backdrop_path}" )`;
        if(this.getTrailer.length > 0){
            this.trailerToggle = true
        }
    }
}
</script>


<style lang="scss" scoped>
    .backgroundImg{
        background-size: cover
    }
    span, h1{
        color: white;
    }
    .poster{
        display: block;
        width: 100%;
    }
    .film-details{
        color: white;
        min-height: 500px;
    }
    @media (max-width: 700px) {
        iframe{
            width: 300px;
            height: 220px
        }
    }
</style>