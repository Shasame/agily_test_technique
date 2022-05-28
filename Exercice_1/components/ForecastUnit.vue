<template>
  <div class="forecast_unit">
      <img :src="img" alt="" class="weather-img">
      <div class="date-container">
          <h1 class="day text">{{ day }}</h1>
          <h3 class="Date text">{{ date }}</h3>
      </div>
      <h1 class="temp text">{{ temp }}°C</h1>
  </div>
</template>

<script>
export default {
    name: "ForecastUnit",
    props: {
            "img" : String,
            "day" : String,
            "date" : String,
            "temp" : String
    }
}
</script>

<style scoped>
    .forecast_unit {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 5px;

        background-color: darkgreen;
        width: 400px;
        height: 115px;
        margin-top: 2px;
        margin-bottom: 2px;
        border: 2px solid darkgreen;
        border-radius: 25px;
        cursor: pointer;

        opacity: 85%;
    }

    .weather-img{
        height: 100px;
        width: auto;
    }

    .temp {
        font-size: 3em;
        padding-left: 20px;
    }
    .date-container {
    text-align: center;
    }
</style>