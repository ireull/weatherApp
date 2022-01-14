import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

	const apiKey = 'f4ba855920eeca6d4e7d53d6cefa46d8'

	const [weatherData, setWeatherData] = useState([{}])
	const [city, setCity] = useState("")

	const getWeather = (event) => {
		if (event.key === "Enter") {
			fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
				.then(response => response.json())
				.then(
					data => {
						setWeatherData(data);
						setCity("");
					}
				)
		}
	}

	useEffect(() => {

	}, [])

	return (
		<div className="container">
			<input className='input'
				placeholder='Enter City...'
				onChange={e => setCity(e.target.value)}
				value={city}
				onKeyPress={getWeather}
			/>
			{typeof weatherData.main === 'undefined' ? (
				<div>
					<p>Welcome to weather app! Enter in a city to get weather of</p>
				</div>
			) : (
				<div className='weather-data'>
					<p className='city'>{weatherData.name.toUpperCase()}</p>
					<p className='temp'>{Math.round(weatherData.main.temp - 273.15) + ` ℃`}</p>
					<p className='weather'>{weatherData.weather[0].main.toUpperCase()}</p>
				</div>
			)}

			{weatherData.cod === "404" ? (
				<p>City is not found</p>
			) : (
				<>
				</>
			)}
		</div>
	);
}

export default App;
