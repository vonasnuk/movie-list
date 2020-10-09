<template>
  <div class="container">
    <h1>Популярні фільми</h1>
      <div class="row">
        <div v-for="(movie, idx) in getBestMovies" :key="idx">
          <div class="col s12 m4 l3 xl3">
            <div class="card">
              <div class="card-image">
                <img class="poster-image" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path">
              </div>
              <div class="card-content">
                <span class="card-title">{{movie.title}}</span>
                <div class="release">Середня оцінка: {{movie.vote_average}}</div>
                <div class="more">
                  <router-link class="more-link" :to="'/movie/' + movie.id">Детальніше</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
          <button class="first-button" v-bind:class="{ previousPage: countFirstPage }" @click="updatePage(1)">{{1}}</button>
          <button v-bind:class="{ previousPage: countShow }" @click="updatePage(page-1)">{{page-1}}</button>
          <button class="active-page">{{page}}</button>
          <button :class="{ previousPage: lastPage }" @click="updatePage(page+1)">{{page+1}}</button>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data(){
    return{
      page: 1,
      countShow: true,
      countFirstPage: true,
      lastPage: false
    }
  },
  name: 'Home',
  computed: mapGetters(['getBestMovies']),
  methods: {
    ...mapActions(['fetchMovies']),
    updatePage(page){
      if(page > 0){
        this.page = page
        this.fetchMovies(this.page);
      }
      
      if (page > 1){
        this.countShow = false
      }
      else this.countShow = true

      if (page > 2){
        this.countFirstPage = false
      }
      else this.countFirstPage = true

      if (page > 499){
        this.lastPage = true
      }
      else this.lastPage = false

      window.scrollTo(0, 100)
    }
  },
  created(){
    this.fetchMovies(this.page);
  },
  mounted(){
    this.updatePage(this.page)
  }
}
</script>


<style lang="scss" scoped>
  .card-title{
    text-overflow: ellipsis;  
    white-space: pre;
    overflow: hidden;
    font-size: 16px;
  }
  .poster-image{
    // min-height: 321px;
  }
  .card{
    min-height: 457px;
    position: relative;
    z-index: 1;
    .more{
      margin-top: 10px;
      .more-link{
      color: #ee6e73;
    }
    }
  }
  .card-panel{
    position: absolute;
    z-index: 55;
    top: 5px;
    display: none;
  }
  .description{
    display: block;;
  }
  .card-image{
    z-index: 1;
  }
  .release{
    color: #777;
    font-size: 11px;
  }
  
  .previousPage, .countFirstPage{
    display: none!important;
  }
  .pagination{
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    button{
      background-color: #ee6e73; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
    .active-page{
      background-color: white; 
      color: black; 
      border: 2px solid #ee6e73;
    }
    .first-button{
      margin-right: 40px;
    }
  }
</style>