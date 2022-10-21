let currentTemperature = document.getElementById("currentTemperature");
let currentCity = document.getElementById("currentCity");
let icon = document.getElementById("weatherIcon");

let changeCityBtn = document.getElementById("changeCityBtn");
let findCityBox = document.getElementById("findCityBox");

function showInputBox() {
	changeCityBtn.classList.toggle("active-background");
	findCityBox.classList.toggle("show");
	// findCityBox.firstElementChild.value = "";
}

const APIKey = "ece19822df9d679525a51b5d1f8d566a";

function getWeatherData(long, lati) {
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=${APIKey}`;

	fetch(url)
		.then((response) => response.json())
		.then((weatherData) => {
			// console.log(weatherData);
			currentTemperature.innerText =
				Math.floor(weatherData.main.temp) + "°C";

			currentCity.innerText =
				weatherData.weather[0].main + " in " + weatherData.name;

			icon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
		});
}

navigator.geolocation.getCurrentPosition(
	(position) => {
		getWeatherData(position.coords.longitude, position.coords.latitude);
	},
	(positionError) => {
		fetch("https://api.ipify.org")
			.then((response) => response.text())
			.then((ip) => {
				fetch(`http://ip-api.com/json/${ip}`)
					.then((response) => response.json())
					.then((position) => {
						getWeatherData(position.lon, position.lat);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	}
);
