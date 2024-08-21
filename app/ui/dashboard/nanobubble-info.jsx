'use client';

import React, { useState, useEffect } from 'react';

export default function NanobubbleInfo() {
  const [envData, setEnvData] = useState(null);
  
  useEffect(() => {
    const fetchEnv = async () => {
      const apiUrl = `https://api.thingspeak.com/channels/2587768/feeds/last.json?api_key=E7ZIKJVE7JIZ6XCJ&timezone=Asia/Jakarta`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      setEnvData(data);
    };

    fetchEnv();
  }, []);

  if (!envData) {
    return <p>Loading environment data...</p>;
  }

  return (
    <div className="flex flex-row flex-wrap gap-1 p-4">
      <h1 className="w-full text-lg font-bold md:text-xl">Torn Nanobubble</h1>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        DO : <strong>
        {roundToDecimals(envData.field1)}
        </strong>
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        EC : <strong>
        {roundToDecimals(envData.field2)}
        </strong>
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        Res : <strong>
        {roundToDecimals(envData.field3)}
        </strong>
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        Suhu : <strong>
        {roundToDecimals(envData.field4)}°C
        </strong>
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        TDS : <strong>
        {roundToDecimals(envData.field5)}/ppm
        </strong>
      </p>
      <p id="info" className="w-full text-xs font-normal md:text-lg">
        Sal : <strong>
        {roundToDecimals(envData.field6)}/ppm
        </strong>
      </p>
      
    </div>
  );
}

function roundToDecimals(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
