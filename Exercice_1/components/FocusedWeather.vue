<template>
  <div class="focused">
        <img :src="img" alt="" class="weather-img">
        <h1 class="date text">{{ date }}</h1>
        <h2 class="day text">Jour - {{ day }}°C</h2>
        <h2 class="night text">Nuit - {{ night }}°C</h2>
        <h2 class="humidity text">Humidité - {{ humidity }}%</h2>
        <h2 class="presure text">Pression - {{ pressure }}hPa</h2>
        <h2 class="wind text">Vent - {{ wind }}Km/h</h2>
  </div>
</template>

<script>
export default {
    name: "FocusedWeather",
    props: {
        img : String,
        date : String,
        day : String,
        night : String,
        humidity : String,
        pressure : String,
        wind : String
    }

}
</script>

<style scoped>
.focused {
    display: grid;
    grid-template-columns: 250px 250px;

    background-color: darkgreen;
    opacity: 85%;

    border-radius: 25px;
    position: fixed;
    z-index: 1;
    bottom: 50px;
    left: 100px;
    overflow-x: hidden;
    padding-left: 2%;
    padding-right: 2%;

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
    padding-top: 20px;
}

.day{
    grid-column: 1;
    grid-row: 2;
}
.night{
    grid-column: 1;
    grid-row: 3;
}
.humidity{
    grid-column: 1;
    grid-row: 4;
}
.presure{
    grid-column: 2;
    grid-row: 2;
}
.wind{
    grid-column: 2;
    grid-row: 3;
}

</style>