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
        const direction = getDirection(data.wind.deg);
        //outputting data to app
        document.getElementById("temperatureData").textContent = `${temp}°F`;
        document.getElementById("desc").textContent = description;
        document.getElementById(
          "wind"
        ).textContent = `${wind} mph ${direction}`;
        document.getElementById("humid").textContent = `${humidity}% humidity`;
      })
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  const getDirection = (degrees) => {
    if (
      (degrees >= 0 && degrees < 22.5) ||
      (degrees >= 337.5 && degrees < 360)
    ) {
      return "N";
    } else if (degrees >= 22.5 && degrees < 67.5) {
      return "NE";
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return "E";
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return "SE";
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return "S";
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return "SW";
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return "W";
    } else if (degrees >= 292.5 && degrees < 337.5) {
      return "NW";
    } else {
      return "Invalid degrees";
    }
  };
});
