<template>
<div class="main-container">
    <h1 class="title">The Forecast Weather App</h1>
    <div class="searchbar-container">
      <input type="text" placeholder="Search" v-model="searchInput" class="searchbar"/>
      <NuxtLink class="button" v-if="searchInput !== ''"
      :to="{ name:'weather-city', params:{city: searchInput} }"
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
}
</script>

<style>

body{
  background-color: green;
}

.main-container {
  display: block;
  text-align: center;
  justify-content: center;
}

.button {
  padding: 5px 10px;
  border-radius: 5px;
  border-radius: 5px;
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

.button:hover {
  padding: 10px 12px;
  color: #E55E5B;
  background-color: white;
  border: 1px solid #E55E5B;
}
</style>
