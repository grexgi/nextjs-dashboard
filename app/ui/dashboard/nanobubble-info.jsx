'use client';

import React, { useState, useEffect } from 'react';

export default function NanobubbleInfo() {
  const [envData, setEnvData] = useState(null);
  const pollingInterval = 60000; // 1 minute in milliseconds

  useEffect(() => {
    const fetchEnv = async () => {
      const apiUrl = `https://api.thingspeak.com/channels/2587768/feeds/last.json?api_key=E7ZIKJVE7JIZ6XCJ&timezone=Asia/Jakarta`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      setEnvData(data);
    };

    const intervalId = setInterval(fetchEnv, pollingInterval);

    return () => clearInterval(intervalId);
  }, [pollingInterval]);

  if (!envData) {
    return <p>Loading nanobubble data...</p>;
  }

  return (
    <div className="flex flex-row flex-wrap gap-1 p-4">
      <h1 className="w-full text-lg font-bold md:text-xl">Nanobubble</h1>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        {envData.created_at}
        DO : {roundToDecimals(envData.field1)}
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        EC : {roundToDecimals(envData.field2)}
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        Res : {roundToDecimals(envData.field3)}
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        Suhu : {roundToDecimals(envData.field4)}°C
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        TDS : {roundToDecimals(envData.field5)}/ppm
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        Sal : {roundToDecimals(envData.field6)}/ppm
      </p>
    </div>
  );
}

function roundToDecimals(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
