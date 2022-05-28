const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use( express.json() );

app.get('/weather/:city', (req,res) =>{
    const { city } = req.params;
    let lat = 0;
    let lon = 0;
    let daily = [];

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=db988691faf182dfc3750cd1e57f3718`)
    .then(function (result){
            this.lat = result.data[0].lat;
            this.lon = result.data[0].lon;
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=db988691faf182dfc3750cd1e57f3718`)
        .then(function (weather_data){
            const daily_raw = weather_data.data.daily;
            
            daily_raw.forEach(raw_data => {
                let day = {
                    "img" : `https://openweathermap.org/img/wn/${raw_data.weather[0].icon}@4x.png`,
                    //"date" :
                    "day" : raw_data.temp.day.toString(),
                    "night" : raw_data.temp.night.toString(),
                    "humidity" : raw_data.humidity.toString(),
                    "presure" : raw_data.presure.toString(),
                    "wind" : raw_data.wind_speed.toString() 
                };
                this.daily.push(day);
            });

        })
        .catch(function (error){
            res.status(400).send();
        });
    })
    .catch(function (error) {
        res.status(400).send();
    });
    
    res.status(200).send({
        "city" : city,
        "lat" : this.lat,
        "lon" : this.lon,
        "daily" : this.daily
    });

});

app.listen(PORT, function(err) {
    if(err) console.log(err);
    console.log("Server listening on PORT",PORT);
});