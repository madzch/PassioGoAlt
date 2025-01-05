function getWeather(){
    const apiKey = '7d89786af33bf02c0b72d1710c331c7d';
    const city = document.getElementById('city').ariaValueMax;

    if (!city){
        alert('Please enter a city');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    /*fetching data and passing as json*/ 
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

/*what if a city is typed in but is not a valid city? where would that go?*/