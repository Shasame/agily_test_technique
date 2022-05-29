//  Imports
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();

//Try to get port from the environement else put an arbitrary value
const PORT = (process.env.PORT ? process.env.PORT : 3000);
//Tyr to get OWA_API_KEY from th eenvironement else put this one ( to be removed )
const APIkey = process.env.OWA_API_KEY;

const cache = new NodeCache();

app.use( express.json() );

//Starting endpoint nothing to be done
app.get('/',(req,res) => {
    res.status(200).json({status : 'OK'});
});

//Error endpoint
app.get('/weather', (req,res)=>{
    const errout = 
    {
        status : 'KO',
        "error" : "Missing a city name for the search."
    };
    res.status(400).json(errout);
})

//Search city forecast endpoint with city name in params
app.get('/weather/:city', async (req,res) =>{
    const raw_city = req.params;
    //All city names in lowercase for easy access and no duplicate in the cache
    const city = raw_city.city.toString().toLowerCase();

    //Get if cached
    const in_cache = cache.get(city);
    if(in_cache)
        return res.status(200).json(in_cache);

    let lat = 0;
    let lon = 0;
    let daily = [];

    //First API call to get the lat and lon of the desired city 
    const data = axios.get(`http://api.openweathermap.org/geo/1.0/direct`,
    { 
        params : {
            q : city,
            limit : '1',
            appid : APIkey
        }
    });
    try {
        const result = await data;
        lat = result.data[0].lat;
        lon = result.data[0].lon;
        
        //Second API call to get the weather data
        const data_raw = axios.get(
            `https://api.openweathermap.org/data/2.5/onecall`,
            {
                params : {
                    lat : lat.toString(),
                    lon : lon.toString(),
                    exclude : "minutely,hourly,alerts",
                    units : "metric",
                    appid : APIkey
                }
            });
        try {
            const weather_raw = await data_raw;
            const daily_raw = weather_raw.data.daily;
            for (const i in daily_raw) {
                let raw_data = daily_raw[i];


                const icon = raw_data.weather[0].icon;
                let raw_date = raw_data.dt;
                
                //Formating the important data for easy access in the front-end
                let day = {
                    "img" : "https://openweathermap.org/img/wn/" + icon + "@4x.png",
                    "date" : getDate(raw_date),
                    "day" : raw_data.temp.day.toString(),
                    "night" : raw_data.temp.night.toString(),
                    "humidity" : raw_data.humidity.toString(),
                    "pressure" : raw_data.pressure.toString(),
                    "wind" : raw_data.wind_speed.toString() 
                };
                daily.push(day); 
            }
            //Errors in case anything fails
            } catch (error) {
                const errout= {
                    status : 'KO',
                    lat : lat,
                    lon :lon,
                    "error" : "API failed"
                };
            res.status(400).json(errout);
            return;
        }
    //Errors in case anything fails
    } catch (error) {
        const errout = {
            status : 'KO',
            city_name : city,
            "error" : 'City name not recognized !'
        };
        res.status(404).json(errout);
        return;
    }

    let out = {
        status : 'OK',
        lat : lat,
        lon : lon,
        weather : daily
    };

    //Put the output json with the city name as key in the cache for 120seconds / 2 minutes
    cache.set(city,out,120);
    
    res.status(200).json(out);

});
//Get date in a easy access format
function getDate(x){
    const weekdays = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const months =  ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
    const date = new Date(x * 1000);

    let ndate = 
    {
        "day" : weekdays[date.getDay()],
        "nb" : date.getDate(),
        "month" : months[date.getMonth()]
    }

    return ndate;
}

app.listen(PORT,() => {console.log("listening on port",PORT)});
