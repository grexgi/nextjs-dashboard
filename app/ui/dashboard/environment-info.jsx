'use client';

import React, { useState, useEffect } from 'react';

export default function EnvironmentInfo() {
  const [envData, setEnvData] = useState(null);
  const pollingInterval = 60000 * 0;

  useEffect(() => {
    const fetchEnv = async () => {
      const apiUrl = `https://api.thingspeak.com/channels/2573098/feeds/last.json?api_key=Z0EEZDKQOX77J6DZ&timezone=Asia/Jakarta`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      setEnvData(data);
    };

    const intervalId = setInterval(fetchEnv, pollingInterval);
    return () => clearInterval(intervalId);
  }, []);

  if (!envData) {
    return <p>Loading environment data...</p>;
  }

  return (
    <div className="flex flex-row flex-wrap gap-1 p-4">
      <h1 className="w-full text-lg font-bold md:text-xl">Lingkungan</h1>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        {/* {(envData.created_at)} */}
        Suhu : {roundToDecimals(envData.field1)}°C
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        Kelembapan : {roundToDecimals(envData.field2)}%
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        TDS : {roundToDecimals(envData.field3)} ppm
      </p>
    </div>
  );
}

function roundToDecimals(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
