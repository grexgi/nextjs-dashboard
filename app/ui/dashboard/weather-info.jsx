'use client';

import React, { useState, useEffect } from 'react';

export default function WeatherInfo() {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'A4QErjFZb8PQFvAuZvaLBp7GNF8uzjon'; // Replace with your actual API key
  const locationKey = '208977'; // Replace with your desired location key

  useEffect(() => {
    const fetchWeather = async () => {
      const apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=id-id`;
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
    <div className="flex flex-row flex-wrap gap-1 p-4">
      <h1 className="w-full text-lg font-bold md:text-xl">Cuaca</h1>
      <p id="date" className="w-full text-xs font-medium md:text-lg">
        {DateFormatter(weatherData.LocalObservationDateTime)}
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        {weatherData.WeatherText}
      </p>
      <p id="temp" className="w-full text-right text-sm font-bold md:text-xl">
        {weatherData.Temperature.Metric.Value}°C
      </p>
    </div>
  );
}

function DateFormatter(date) {
  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long', // Display full weekday name (e.g., Senin)
    year: 'numeric',
    month: 'long', // Display full month name (e.g., Januari)
    day: 'numeric',
  });

  return formattedDate;
}
