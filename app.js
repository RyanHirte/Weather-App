document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "b67bfd5ea3cb0a7ca5128826cb92cb7d";
  const cityInput = document.getElementById("cityInput");
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
      getWeather(cityName);
    } else {
      alert("Enter a valid city!");
    }
  });

  const getWeather = (cityName) => {
    const geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    fetch(geocodingURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          retrieveWeatherData(lat, lon);
        } else {
          alert("City not found!");
        }
      })
      .catch((error) => {
        console.error("Error", error);
        alert("Error fetching city coordinates");
      });
  };

  const retrieveWeatherData = (lat, lon) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
    fetch(weatherURL)
      .then((response) => response.json())
      .then((data) => {
        //getting data from response
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const wind = data.wind.speed;
        const humidity = data.main.humidity;
        //outputting data to app
        document.getElementById("temperatureData").textContent = `${temp}°F`;
        document.getElementById("desc").textContent = description;
        document.getElementById("wind").textContent = `${wind} mph`;
        document.getElementById("humid").textContent = `${humidity}% humidity`;
      })
      .catch((error) => {
        console.error("Error", error.message);
      });
  };
});
