<template>
  <div class="container">
      <NuxtLink :to="'/'" class="button">Home</NuxtLink>
      <div class="weather-container">
          <div class="focus-weather" v-if="daily">
            <img :src="`https://openweathermap.org/img/wn/${daily[0].weather[0].icon}@4x.png`" alt="" class="weather-img">
            <div class="date text">{{ getDate(daily[0].dt) }}</div>
            <div class="jour text">Jour - {{ daily[0].temp.day }}°C</div>
            <div class="nuit text">Nuit - {{ daily[0].temp.night }}°C</div>
            <div class="humidite text">Humidité - {{ daily[0].humidity }}%</div>
            <div class="pression text">Pression - {{ daily[0].pressure }}hPa</div>
            <div class="vent text">Vent - {{ daily[0].wind_speed }}Km/h</div>
          </div>
          <div class="sidebar-container">
              <div class="forecast" v-for="(day,index) in daily" :key="index = 1">
                <img :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`" alt="" class="weather-img">
                <div class="date text">{{ getDate(day.dt) }}</div>
                <div class="temp text">{{ (day.temp.min + day.temp.max) /2 }}</div>
              </div>

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
            weather : null,
            daily : null,
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

                const weather_data = axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=minutely,hourly,alerts&units=metric&appid=db988691faf182dfc3750cd1e57f3718`)
                try {
                    const weather_result = await weather_data
                    this.weather = weather_result.data
                    this.daily = weather_result.data.daily  
                    console.log(this.daily)

                //Dirty way to redirect to home page if the city does not exist 
                //but it is the only way i know
                
                } catch (error) {
                    this.$router.push('/')
                }

            } catch (error) {
                this.$router.push('/')
            }
        },

        getDate(x){
            const date = new Date(x)
            return date.getDate()
        }
    }

}
</script>

<style>
.sidebar-container {
    height: 100%;
    width: 100px;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    overflow-x: hidden;
    padding-top: 20px;
}

.focus-weather {
    display: grid;
    grid-template-columns: 200px 200px;
}

.weather-img{
    height: 100px;
    width: auto;
    grid-column: 1;
    grid-row: 1;
}

.jour{
    grid-column: 1;
    grid-row: 2;
}
.nuit{
    grid-column: 1;
    grid-row: 3;
}
.humidite{
    grid-column: 1;
    grid-row: 4;
}
.pression{
    grid-column: 2;
    grid-row: 2;
}
.vent{
    grid-column: 2;
    grid-row: 3;
}

.text {
    color: white;
    font: large;
}

</style>