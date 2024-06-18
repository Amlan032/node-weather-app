document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    console.log("test")
    getWeather(city);
});

function getWeather(city) {
    // Placeholder for the actual API call
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p>Fetching weather for ${city}...</p>`;
    
    fetch("/weather/?address="+encodeURI(city)).then((resp) => {
        resp.json().then((data) => {
            if(data.errorMsg){
                weatherInfo.innerHTML = `<h2>Please enter a valid location</h2>`
            }
            else{
                weatherInfo.innerHTML = `
                    <h2>Weather in ${city}</h2>
                    <p>Weather description: ${data.description}</p>
                    <p>Actual Temperature: ${data.actual_Temp}°C</p>
                    <p>Feels like Temperature: ${data.feels_like}°C</p>
                    <p>Location : ${data.location} </p>
                `
            }
        })
    })
}