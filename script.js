const apiKey = "602eaed65cff407a8b78a5b1341005e8";
const apiUrl = "https://api.weatherbit.io/v2.0/current";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}&city=${city}`);
    const data = await response.json();

    console.log("Full API response:", data);  

    if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      document.querySelector(".city").innerHTML = data.data[0].city_name;
      document.querySelector(".temp").innerHTML = Math.round(data.data[0].temp) + "°F";
      document.querySelector(".humidity").innerHTML = data.data[0].rh + "%";
      document.querySelector(".wind").innerHTML = data.data[0].wind_spd + "mph";

      if (data.weather && Array.isArray(data.weather) && data.weather.length > 0) {
        switch (data.weather[0].main) {
          case "Clouds":
            weatherIcon.src = "images/cloudy.png";
            break;
          case "Clear":
            weatherIcon.src = "images/sun.png";
            break;
          case "Rain":
            weatherIcon.src = "images/rain.png"; 
            break;
          case "Drizzle":
            weatherIcon.src = "images/Drizzle.png"; 
            break;
          case "Mist":
            weatherIcon.src = "images/mist.png";  
            break;
          case "Snow":
            weatherIcon.src = "images/snow.png"; 
            break;
          default:
            console.warn("Unexpected weather condition:", data.weather[0].main);
            break;
        }
      } else {
        console.error("Invalid data structure in API response (weather array missing):", data);
      }

      document.querySelector(".weather").style.display = "block";
    } else {
      console.error("Invalid data structure in API response (data array missing or empty):", data);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
