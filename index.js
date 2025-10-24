const emptyInput = document.getElementById("empty-input");
const searchBtn = document.getElementById("search-button");
document.getElementById("search-city").addEventListener("keypress", (Event) => {
    if (Event.key === "Enter"){
        searchBtn.click();
    }
});

const searchButton = () => {
    const searchInput = document.getElementById("search-city");
    const cityName = searchInput.value.trim();
    emptyInput.textContent = "";
    if (cityName === "") {
        emptyInput.innerHTML =`
        <h4 class="text-start text-danger mt-2">Please enter a city name to search...</h4>
        `;
        return;
    }
    //clear search
    searchInput.value = "";
    loadsearch(cityName);
};

//load weather url
const loadsearch = async (city) => {
    const container = document.getElementById("container");
    
    // Show loading indicator
    container.innerHTML = `
        <div class="loading text-white">
            <h4>🌤️ Loading weather data...</h4>
            <div class="spinner-border text-light mt-3" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
    
    try {
        const api = "82ab3b9966d7de1b8bbcfab43ab72df1";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        displayweather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        container.innerHTML = `
            <div class="text-white">
                <h4 class="text-danger">❌ Error loading weather data</h4>
                <p>Please check your internet connection and try again.</p>
            </div>
        `;
    }
};

// display weather 
const displayweather = (temparature) => {
    //console.log(temparature);
    if (temparature.cod === "404" || temparature.message === "city not found") {
        emptyInput.innerHTML =`
        <h4 class="text-start text-danger mt-2">No results found !</h4>
        `;
        return;
    }
    const container = document.getElementById("container");
    container.textContent = "";
    const localDate = convertUnixTimeToLocal(temparature.dt);
    const sunriseTime = convertUnixTimeToLocal(temparature.sys.sunrise);
    const sunsetTime = convertUnixTimeToLocal(temparature.sys.sunset);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="weather-info">
            <h4 class="fs-2">📍 ${temparature.name}, ${temparature.sys.country}</h4>
            <h6>📅 ${localDate.fullDate}</h6>
            <div class="weather-icon-temp">
                <img src="https://openweathermap.org/img/wn/${temparature.weather[0].icon}@2x.png" alt="${temparature.weather[0].description}">
                <h5 class="fs-1">${Math.round(temparature.main.temp)}&deg;C</h5>
            </div>
            <h5 class="weather-description">☁️ ${temparature.weather[0].main} - ${temparature.weather[0].description}</h5>
            
            <div class="weather-stats mt-4">
                <div class="row text-center">
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <small>🌡️ Feels Like</small>
                            <div><strong>${Math.round(temparature.main.feels_like)}&deg;C</strong></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <small>💧 Humidity</small>
                            <div><strong>${temparature.main.humidity}%</strong></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <small>💨 Wind Speed</small>
                            <div><strong>${temparature.wind?.speed || 0} m/s</strong></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <small>🌊 Pressure</small>
                            <div><strong>${temparature.main.pressure} hPa</strong></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="sun-times mt-4">
                <h6>🌅 <span class="me-3">Sunrise: ${sunriseTime.time12h}</span> | 🌇 <span class="ms-3">Sunset: ${sunsetTime.time12h}</span></h6>
            </div>
        </div>
    `;
    container.appendChild(div);
};

loadsearch("Dhaka");

//convert unix time to local  format
const convertUnixTimeToLocal = (unixTime) => {
    const milliseconds = unixTime * 1000;
    const humanDateFormat = new Date(milliseconds);
    const convertedTimeObject = {
        fullDate: humanDateFormat.toLocaleDateString("en-us" , {
          day: "numeric" ,
          month: "short" ,
          year: "numeric" ,
        }),
        time12h: humanDateFormat.toLocaleTimeString("en-us" , {
            hour12: true,
            hour: "numeric",
            minute: "2-digit"
        }),
    };
    return convertedTimeObject;
}