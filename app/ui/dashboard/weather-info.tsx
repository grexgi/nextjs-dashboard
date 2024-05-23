'use client';

import React, { useState, useEffect } from 'react';

export default function WeatherInfo() {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'A4QErjFZb8PQFvAuZvaLBp7GNF8uzjon'; // Replace with your actual API key
  const locationKey = '208977'; // Replace with your desired location key

  useEffect(() => {
    const fetchWeather = async () => {
      const apiUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=id-id`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data[0]); // Assuming the first element in the response contains the current conditions
    };

    fetchWeather();
  }, []);

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="flex flex-row flex-wrap gap-1 p-4 md:flex-row">
      <h1 className="w-full text-2xl font-bold">Cuaca</h1>
      <p id="date" className="w-full text-lg font-semibold">
        {new Date(weatherData.LocalObservationDateTime).toLocaleDateString(
          'id-ID',
          {
            weekday: 'long', // Display full weekday name (e.g., Senin)
            year: 'numeric',
            month: 'long', // Display full month name (e.g., Januari)
            day: 'numeric',
          },
        )}
      </p>
      <p id="info" className="flex-1 text-lg font-normal">
        {weatherData.WeatherText}
      </p>
      <p id="temp" className="flex-1 text-2xl font-bold">
        {weatherData.Temperature.Metric.Value}°C
      </p>
      <p id="temp" className="flex text-2xl font-bold">
        {weatherData.WeatherIcon}
      </p>
    </div>
  );
}
