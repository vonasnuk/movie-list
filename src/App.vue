<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>


<script>
import Navbar from '../src/components/Navbar'
export default{
  components:{
    Navbar
  }
}

</script>

<style lang="scss">
@import '../node_modules/materialize-css/dist/css/materialize.min.css';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&family=Russo+One&display=swap');

  #app{
    font-family: 'Roboto', sans-serif;
    font-family: 'Russo One', sans-serif; 
  }
</style>
