const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("button");
const cityName = document.getElementById("city_name"); 
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");

const activityText = document.getElementById("activity-text");

const api_key = "d5e9fd39100b2a5f366439bdfccdbd16";
const url = "https://api.openweathermap.org/data/2.5/weather";
 
async function weather() {
    const city_name = cityInput.value.trim();
    
    if (city_name === "") {
        if (cityName) cityName.innerHTML = "Please enter a city name";
        return;
    }
    // show loading state and clear previous results
    if (cityName) cityName.innerHTML = "Loading...";
    if (temp) temp.innerHTML = "";
    if (desc) desc.innerHTML = "";
    
    const target = `${url}?q=${city_name}&appid=${api_key}&units=metric`;
    console.log("My Final URL is: ", target); 
    
    try {
        const response = await fetch(target);
        const data = await response.json(); 
        
        if (response.ok) {
            console.log("Server Response:", data);
            if (cityName) cityName.innerHTML = `${data.name}${data.sys && data.sys.country ? ', ' + data.sys.country : ''}`;
            if (temp) temp.innerHTML = `${Math.round(data.main.temp)}°C`;
            if (desc) desc.innerHTML = data.weather[0].description;
            
            const mainCondition = data.weather[0].main; 
            const recommendation = generateActivity(mainCondition);
            if (activityText) activityText.innerHTML = recommendation;
 
        } else {
            if (cityName) cityName.innerHTML = ` ${data.message}`;
            if (temp) temp.innerHTML = "";
            if (desc) desc.innerHTML = "";
        }
    
    } catch(error) {
        console.error("Error fetching weather data:", error);
        if (cityName) cityName.innerHTML = "Network connection issue.";
        if (temp) temp.innerHTML = "";
        if (desc) desc.innerHTML = "";
    }
}
 
searchButton.addEventListener("click", () => {
    weather();
});
 
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        weather();
    }
});
 
function generateActivity(weatherCondition) {
    const condition = weatherCondition.toLowerCase();
    if (condition.includes("clear") || condition.includes("sunny")) {
        return " The weather is beautiful! Perfect day to go on a walk, run in the park, or grab an ice cream.";
    } 
    else if (condition.includes("rain") || condition.includes("drizzle")) {
        return " It's raining outside! It's the perfect time to stay in and work on a hobby like drawing or listening to music. If you absolutely must go out, don't forget to take your umbrella or raincoat!";
    } 
    else if (condition.includes("cloud")) {
        return " It's a bit cloudy or overcast. A cozy day for a cafe visit, reading a book by the window, or a casual photography session.";
    } 
    else if (condition.includes("snow")) {
        return " Fresh snow! Time to build a snowman, drink hot cocoa, or enjoy a cozy movie marathon indoors.";
    } 
    else if (condition.includes("thunderstorm")) {
        return " Thunderstorm warning! Stay safely indoors, unplug sensitive electronics, and enjoy a board game with family.";
    } 
    else {
        return " Atmospheric conditions are unusual right now. It might be best to plan indoor activities today!";
    }
}


















