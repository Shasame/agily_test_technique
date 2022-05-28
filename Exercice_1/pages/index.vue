<template>
<div class="main-container">
    <h1 class="title">The Forecast Weather App</h1>
    <div class="searchbar-container">
      <input type="text" placeholder="Search" v-model.lazy="searchInput" @keyup.enter="search()" class="searchbar"/>
      <NuxtLink :to="{ name:'weather-city', params:{city: searchInput} }" v-if="searchInput" class="button side"
      >
        Go
      </NuxtLink>
    </div>
</div>
</template>

<script>
export default {
  name: 'IndexPage',
  data(){
    return {
      searchInput : '',
    }
  },

  methods: {
    search(){
      if(this.searchInput !== '')
        this.$router.push("/weather/"+this.searchInput)
    }
  }
}
</script>

<style>

body{
  background-color: green;
  background-repeat: no-repeat;
  background-size: cover;

}

.title {
  font-size: 3em;
}

.searchbar{

  font-size: 1.5em;
  border: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.main-container {
  display: fixed;
  width: 325px;
  text-align: center;
  justify-content: center;

  position: fixed;
  top: 35%;
  right: 45%;
}

.side {
  position: fixed;
  width: 50px;
  border: none;
  top: 52.8%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.button {
  padding: 5px 10px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s;
  background-color: white;
  color:black;
  font-weight: 500;
  text-decoration: none;
  font-size: medium;

  flex: 1 auto;
  justify-content: space-around;
}

</style>
