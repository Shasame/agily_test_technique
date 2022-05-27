<template>
  <div class="container">
      <NuxtLink :to="'/'" class="button">Home</NuxtLink>
      <div class="weather-container">
          <div class="sidebar-container">
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            lat : 0,
            lon : 0,
            weather : null
        }
    },

    async fetch(){
        await this.cityCoord()
    },

    methods: {
        async cityCoord(){
            const data = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.$route.params.city}&limit=1&appid=db988691faf182dfc3750cd1e57f3718`)
            try {
                const result = await data
                this.lat = result.data[0].lat
                this.lon = result.data[0].lon
                console.log("lat :" + this.lat)
                console.log("lon :"+ this.lon)

                const weather_data = axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=minutely,hourly,alerts&appid=db988691faf182dfc3750cd1e57f3718`)
                try {
                    const weather_result = await weather_data
                    this.weather = weather_result.data
                    console.log(this.weather)
                } catch (error) {
                    this.$router.push('/')
                }

            } catch (error) {
                this.$router.push('/')
            }
        }
    }

}
</script>

<style>

</style>