
function getWeather(){
    const apiKey = '7d89786af33bf02c0b72d1710c331c7d';
    const city = document.getElementById('city').value;

    if (!city){
        alert('Please enter a city');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    /*fetching data and passing as json*/
    //not catching the error correctly (why is is saying there is an error fetching current data, then showing hourly only?) 
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast:', error);
            alert('Error fetching hourly forecast. Please try again.');
        });
}
function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    //then we have to fill out the code for the weatherIcon, 
    //then the rest of the null HTML elements(above)
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round((data.main.temp - 273.15) * 1.8 + 32) // keep in Farenheit
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°F</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }

}
function displayHourlyForecast(hourlyData){
const hourlyForecastDiv = document.getElementById('hourly-forecast');
const next24Hours = hourlyData.slice(0,8); //for every three hours (FOR 24 hours) display the weather throughout the day.
next24Hours.forEach(item => 
    { const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
    const hour = dateTime.getHours();
    const temperature = Math.round((item.main.temp - 273.15) * 1.8 + 32);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°F</span>
        </div>
    `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
});

}
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
/*what if a city is typed in but is not a valid city? where would that go?, I mean how could you possibly be able to tell?*/