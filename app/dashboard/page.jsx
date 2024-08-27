'use client'

import React, { useState, useEffect } from 'react';
import WeatherInfo from '@/app/ui/dashboard/weather-info';
import { CropDailyCard } from '@/app/ui/dashboard/crop-daily-card';
import EnvironmentInfo from '../ui/dashboard/environment-info';
import NanobubbleInfo from '../ui/dashboard/nanobubble-info';
import Sensor from '@/model/sensor'

const sensor = new Sensor();

async function getData(sensor) {
  const CHANNEL_ID = sensor.channel_id;
  const API_KEY = sensor.read_key;
  const TIMEZONE = 'Asia/Jakarta';
  const res = await fetch(
    `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${API_KEY}&timezone=${TIMEZONE}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

function roundToDecimals(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export default function Page() {
  const [sensorData, setSensorData] = useState([]);
  const [soilSensors, setSoilSensors] = useState([]); // Add a new state variable
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const soilSensorsData = await sensor.getAllSoilSensor();
        setSoilSensors(soilSensorsData); // Store the soilSensors data in the state variable
        const data = await Promise.all(soilSensorsData.map(getData));
        setSensorData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }
  return (
    <main className="mb-5 flex flex-col-reverse gap-5 lg:flex-row">
      {/* Gauge chart */}
      <div className="flex flex-col w-full">
        {sensorData.map((cropData, index) => {
          const isCrop1To8 = index < 6; // Adjust condition based on actual crop division

          return (
            <CropDailyCard
              key={index}
              cropCode={soilSensors[index].polybag} // Use the polybag from soilSensors
              NDVI={0}
              EC={cropData.field3}
              temperature={roundToDecimals(cropData.field2)}
              humidity={roundToDecimals(cropData.field1)}
              pH={roundToDecimals(cropData.field4)}
              cropTall={0}
              leafCount={0}
              n={isCrop1To8 ? cropData.field5 : cropData.field6} // Nitrogen for crops 1-8
              p={isCrop1To8 ? cropData.field6 : cropData.field7} // Phosphorus for crops 1-8 and Nitrogen for crops 9-16
              k={isCrop1To8 ? cropData.field7 : cropData.field8} // Potassium for crops 1-8 and Phosphorus for crops 9-16
            />
          );
        })}
      </div>

      {/* info */}
      <div className="flex flex-row overflow-auto gap-4 lg:flex-col lg:w-1/4">
        <div className="rounded-xl bg-green-50 bg-opacity-70">
          <WeatherInfo />
        </div>
        <div className="rounded-xl bg-green-50 bg-opacity-70">
          <EnvironmentInfo />
        </div>
        <div className="rounded-xl bg-green-50 bg-opacity-70">
          <NanobubbleInfo />
        </div>
      </div>
    </main>
  );
}