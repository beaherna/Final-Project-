const apiKey = "602eaed65cff407a8b78a5b1341005e8";
const apiUrl = "https://api.weatherbit.io/v2.0/current";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}&city=${city}`);
    const data = await response.json();
    const tempFahrenheit = Math.round(data.data[0].temp * 9/5 + 32);

    console.log("Full API response:", data);

    if (data && data.data && Array.isArray(data.data) && data.data.length > 0 && data.data[0].weather) {
      document.querySelector(".city").innerHTML = data.data[0].city_name;
      document.querySelector(".temp").innerHTML = tempFahrenheit + "°F";
      document.querySelector(".humidity").innerHTML = data.data[0].rh + "%";
      document.querySelector(".wind").innerHTML = Math.round(data.data[0].wind_spd) + "mph";

      switch (data.data[0].weather.description) {
        case "Scattered clouds":
        case "Broken clouds":
        case "Few clouds":
        case "Overcast clouds":
          weatherIcon.src = "images/cloudy.png";
          break;
        case "Clear sky":
          weatherIcon.src = "images/sun.png";
          break;
        case "Light rain":
        case "Drizzle":
          weatherIcon.src = "images/rain.png";
          break;
        case "Light drizzle":
          weatherIcon.src = "images/Drizzle.png";
          break;
        case "Mist":
        case"Fog":
        case"Haze":
        case"smoke":
          weatherIcon.src = "images/mist.png";
          break;
        case "Snow":
        case"Light snow":
          weatherIcon.src = "images/snow.png";
          break;
        default:
          console.warn("Unexpected weather condition:", data.data[0].weather.description);
          break;
      }
      let clothesRecommendation;
      if (data.data[0].weather.description.includes("rain")) {
        clothesRecommendation = "It's raining, don't forget your umbrella!<ul>Also recommended:<li>Rain boots</li><li>Rain coat</li>";
      } else if (tempFahrenheit <= 32) {
        clothesRecommendation = "It's freezing outside, wear a heavy coat!<ul>Also recommended:<li>Winter Jacket</li><li>Gloves</li><li>Scarf</li> <li>Ear Warmers</li> <li>Winter Boots</li></ul>";
      } else if (tempFahrenheit <= 50) {
        clothesRecommendation = "It's cold outside, wear a coat!<ul>Also recommended:<li>Winter jacket</li><li>beanie</li><li>boots</li><li>Ear warmers</li> <li>scarf</li></ul>";
      } else if (tempFahrenheit <= 70) {
        clothesRecommendation = "It's a bit chilly, wear a jacket!<ul>Also recommended:<li>hoodie</li><li>long sleeve shirt</li><li>jean jacket</li></ul>";
      } else {
        clothesRecommendation = "It's warm outside, a t-shirt is fine!<ul>Also recommended:<li>sandals</li><li>shorts</li><li>baseball hat</li> <li>skirt</li> <li>dress</li><li>sunglasses</li></ul>";
      }

      document.querySelector(".recommendation").innerHTML = clothesRecommendation;
      document.querySelector(".recommendation").style.display = "block";
      document.querySelector(".weather").style.display = "block";
    } else {
      console.error("Invalid data structure in API response:", data);
    }
    

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
