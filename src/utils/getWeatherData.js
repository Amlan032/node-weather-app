const request = require("request")

const getWeatherData = (latitude, longitude, callback) => {
    const apiKey = "8244f1ed76d164c80544139bc6947bbb"
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+apiKey+"&units=metric"
    request({url : weatherUrl, json : true}, (error, response) => {
        if(error){
            callback("Error occurred while fetching the weather data", undefined)
            return
        }
        try{
            const data = {
                temp : response.body.main.temp,
                feelTemp : response.body.main.feels_like,
                description : response.body.weather[0].description
            }
            callback(undefined, data)
        }
        catch(ex){
            callback("Exception while getting weather data", undefined)
        }
    })
}

module.exports = getWeatherData