<template>
  <div class="container">
      <div @click="BackHome()" class="home">Home</div>
      <div class="weather-container">

          <FocusedWeather v-if="focused" :img="`https://openweathermap.org/img/wn/${focused.weather[0].icon}@4x.png`"
          :date="getDate(focused.dt)" :day="focused.temp.day.toString()" :night="focused.temp.night.toString()"
          :humidity="focused.humidity.toString()" :pressure="focused.pressure.toString()" :wind="focused.wind_speed.toString()" />
          
          <div class="sidebar-container">
              <div class="forecast" v-for="(day,index) in daily" :key="index">
                  <div v-if="day !== daily[0]" @click="focused === day ? focused=daily[0] : focused=day">
                      
                      <ForecastUnit :img="`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`" :day="getOnlyDay(day.dt)"
                      :date="getRestDate(day.dt)" :temp="Math.round((day.temp.min + day.temp.max) /2).toString()" class="hov"  />
                      
                  </div>
              </div>

          </div>
      </div>
  </div>
</template>


<script>
import axios from 'axios'
import ForecastUnit from '../../components/ForecastUnit.vue'
import FocusedWeather from '../../components/FocusedWeather.vue';
export default {
    data() {
        return {
            lat: 0,
            lon: 0,
            focused: null,
            daily: null,
            picture: null,
            weekdays: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
            months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]
        };
    },
    async fetch() {
        await this.cityCoord();
        await this.getCityPicture();
    },
    methods: {
        async cityCoord() {
            const data = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.$route.params.city}&limit=1&appid=db988691faf182dfc3750cd1e57f3718`);
            try {
                const result = await data;
                this.lat = result.data[0].lat;
                this.lon = result.data[0].lon;
                const weather_data = axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=minutely,hourly,alerts&units=metric&appid=db988691faf182dfc3750cd1e57f3718`);
                try {
                    const weather_result = await weather_data;
                    this.daily = weather_result.data.daily;
                    this.focused = this.daily[0];
                }
                catch (error) {
                    this.BackHome();
                }
            }
            catch (error) {
                this.BackHome();
            }
        },
        async getCityPicture() {
            const data = axios.get('https://www.flickr.com/services/rest/',
            {
                params :{
                    api_key: "8f439df206eeab184057b47534934c50",
                    format: "json",
                    nojsoncallback: 1,
                    method: "flickr.photos.search",
                    tags: "cityscape",
                    title: this.$route.params.city,
                    accuracy: 11,
                    lat: this.lat,
                    lon: this.lon
                }
            });

            const result = await data;
            try {
                var id = Math.floor(Math.random()*result.data.photos.photo.length);
                var background = result.data.photos.photo[id];
                var bgurl = "https://farm" + background.farm + ".staticflickr.com/" + background.server + "/" + background.id + "_" + background.secret + ".jpg";
                document.body.style.backgroundImage="url("+bgurl+")";
            } catch (error) {
                document.body.style.backgroundImage="url('https://wallpapertag.com/wallpaper/full/9/b/7/919883-english-countryside-wallpaper-1920x1080-meizu.jpg')";
            }

        },

        getDate(x) {
            const date = new Date(x * 1000);
            var day = this.weekdays[date.getDay()];
            var nb = date.getDate();
            var month = this.months[date.getMonth()];
            return day + " " + nb + " " + month;
        },
        getOnlyDay(x) {
            const date = new Date(x * 1000);
            var day = this.weekdays[date.getDay()];
            return day;
        },
        getRestDate(x) {
            const date = new Date(x * 1000);
            var nb = date.getDate();
            var month = this.months[date.getMonth()];
            return nb + " " + month;
        },
        //Dirty way to redirect to home page if the city does not exist 
        //but it is the only way i know
        BackHome() {
            this.$router.push("/");
            document.body.style.backgroundImage = "none";
        }
    },
    components: { ForecastUnit, FocusedWeather }
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
    padding-top: 2%;
    padding-right: 20px;
}

.home {
    position: fixed;
    background-color: darkgreen;
    color: white;
    cursor: pointer;
    border-radius: 50%;
    padding: 20px;
    text-align: center;
    display: inline-block;

    top: 4%;
    left: 100px;

    opacity: 85%;
}
.home:hover{
    border-color: white;
}

.hov:hover{
    border-color: white;
}

.text {
    color: white;
    font: large;
    opacity: 100%;
}

</style>