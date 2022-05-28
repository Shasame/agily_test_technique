<template>
  <div :style="{backgroundImage: picture}" class="container">
      <NuxtLink :to="'/'" class="button home">Home</NuxtLink>
      <div class="weather-container">
          <div class="focus-weather" v-if="focused">
            <img :src="`https://openweathermap.org/img/wn/${daily[0].weather[0].icon}@4x.png`" alt="" class="weather-img">
            <h1 class="date text">{{ getDate(focused.dt) }}</h1>
            <h2 class="jour text">Jour - {{ focused.temp.day }}°C</h2>
            <h2 class="nuit text">Nuit - {{ focused.temp.night }}°C</h2>
            <h2 class="humidite text">Humidité - {{ focused.humidity }}%</h2>
            <h2 class="pression text">Pression - {{ focused.pressure }}hPa</h2>
            <h2 class="vent text">Vent - {{ focused.wind_speed }}Km/h</h2>
          </div>
          <div class="sidebar-container">
              <div class="forecast" v-for="(day,index) in daily" :key="index">
                  <button v-if="day !== daily[0]" @click="focused === day ? focused=daily[0] : focused=day" class="side-buttons">
                      <div class="button-container">
                        <img :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`" alt="" class="weather-img">
                        <div class="date-container">
                            <h1 class="day text">{{ getOnlyDay(day.dt) }}</h1>
                            <h3 class="restDate text">{{ getRestDate(day.dt) }}</h3>
                        </div>
                        <h1 class="temp text">{{ Math.round((day.temp.min + day.temp.max) /2) }}°C</h1>
                      </div>
                  </button>
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
            focused : null,
            daily : null,
            picture : null,
            weekdays : ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],
            months : ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre']
        }
    },

    async fetch(){
        await this.cityCoord()
        await this.getCityPicture()
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
                    this.daily = weather_result.data.daily
                    this.focused = this.daily[0]  

                //Dirty way to redirect to home page if the city does not exist 
                //but it is the only way i know
                
                } catch (error) {
                    this.$router.push('/')
                }

            } catch (error) {
                this.$router.push('/')
            }
        },

        async getCityPicture(){
            const data = axios.get(`https://api.teleport.org/api/urban_areas/slug:${this.$route.params.city}/images/`)
            try {
                const result = await data
                this.picture = result.data.photos[0].image.web

            } catch (error) {
                console.log(error)
            }
        },

        getDate(x){
            const date = new Date(x*1000)
            var day = this.weekdays[date.getDay()]
            var nb = date.getDate()
            var month = this.months[date.getMonth()]
            return day + " " + nb + " " + month
        },
        getOnlyDay(x){
            const date = new Date(x*1000)
            var day = this.weekdays[date.getDay()]
            return day
        },
        getRestDate(x){
            const date = new Date(x*1000)
            var nb = date.getDate()
            var month = this.months[date.getMonth()]
            return nb + " " + month
        }

    }

}
</script>

<style>
.sidebar-container {
    height: 100%;
    width: 400px;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    overflow-x: hidden;
    padding-top: 4%;
    padding-right: 20px;
}

.button-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
}

.side-buttons {
    background-color: green;
    width: 400px;
    height: 115px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.focus-weather {
    display: grid;
    grid-template-columns: 200px 200px;

    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    padding-bottom: 5%;
    padding-left: 5%;

}

.home {
    position: fixed;
    background-color: green;
}

.date-container {
    grid-column: 2;
    grid-row: 1;

    display: grid;
    grid-template-rows: 1fr 1fr;
}

.day{
    grid-row: 1;
}
.restDate{
    grid-row: 2;
}

.weather-img{
    height: 100px;
    width: auto;
    grid-column: 1;
    grid-row: 1;
}

.date {
    grid-column: 2;
    grid-row: 1;
}



.temp {
    grid-column: 3;
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