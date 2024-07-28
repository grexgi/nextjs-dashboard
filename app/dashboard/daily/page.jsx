'use client';

import React, { useState, useEffect } from 'react';
import WeatherInfo from '@/app/ui/dashboard/weather-info';
import { CropDailyCard } from '@/app/ui/dashboard/crop-daily-card';

const sensors = [
  {
    polybag: 'B2-N2P1(3)',
    channelID: '2573088',
    apiKey: '2EUPVXHC5QO8ZPOY',
    sensor: 'Auto 1',
  },
  {
    polybag: 'B2-N2P3(2)',
    channelID: '2573089',
    apiKey: 'CYTZ5PANCCUVVCMT',
    sensor: 'Auto 2',
  },
  {
    polybag: 'B2-N2P2(3)',
    channelID: '2573090',
    apiKey: 'WJF8BQGGMR6JA9AE',
    sensor: 'Auto 3',
  },
  {
    polybag: 'B3-N2P1(3)',
    channelID: '2573092',
    apiKey: 'AOSOFGA4WVDQCL04',
    sensor: 'Auto 4',
  },
  {
    polybag: 'B3-N2P3(1)',
    channelID: '2573093',
    apiKey: 'BO3FWSZVUSMHFLH1',
    sensor: 'Auto 5',
  },
  {
    polybag: 'B3-N2P2(4)',
    channelID: '2573094',
    apiKey: 'LBX668AWWPMJAM2J',
    sensor: 'Auto 6',
  },
  // { polybag:'Auto 7', channelID: '2573096', apiKey: 'SVMLCJ53ABB2K0IP'}, // belum ada entry
  // sensor Auto tidak ada tds field5-7=npk
  // sensor Time field5=tds && field6-8=npk
  {
    polybag: 'B4-N3P2(4)',
    channelID: '2580652',
    apiKey: 'VCD4PPD4ZVAMOAJG',
    sensor: 'Time 1',
  },
  {
    polybag: 'B9-N3P3(3)',
    channelID: '2580653',
    apiKey: 'WYPUBPC0DLJWPNKC',
    sensor: 'Time 2',
  },
  {
    polybag: 'B11-N3P1(2)',
    channelID: '2580655',
    apiKey: 'LQEI4ENFE68DWD75',
    sensor: 'Time 3',
  },
  {
    polybag: 'B6-N2P1(6)',
    channelID: '2580656',
    apiKey: 'YPPQMF5T2F1HH6B0',
    sensor: 'Time 4',
  },
  {
    polybag: 'B8-N2P2(1)',
    channelID: '2580657',
    apiKey: 'U0D3LFQTEOND6L9O',
    sensor: 'Time 5',
  },
  {
    polybag: 'B10-N2P3(5)',
    channelID: '2580659',
    apiKey: 'IUM51GU125UVW9B4',
    sensor: 'Time 6',
  },
  {
    polybag: 'B4-N3P3(4)',
    channelID: '2580664',
    apiKey: 'TTX87BGPJK2KTFCT',
    sensor: 'Time 7',
  },
  {
    polybag: 'B8-N2P3(1)',
    channelID: '2580665',
    apiKey: '8HWN2H29SBPJ0JAD',
    sensor: 'Time 8',
  },
  // { polybag:'Ardi 1', channelID: '2495370', apiKey: 'SH0R26GMJVP5Q3IB'},
];

async function getData(crop) {
  const CHANNEL_ID = crop.channelID;
  const API_KEY = crop.apiKey;
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all(sensors.map(getData));
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
    <main className="mb-5 flex flex-col-reverse flex-wrap gap-5 lg:flex-row">
      <div className="flex-grow">
        {sensorData.map((cropData, index) => {
          const isCrop1To8 = index < 6; // Adjust condition based on actual crop division

          return (
            <CropDailyCard
              key={index}
              cropCode={sensors[index].polybag}
              // cropCode={cropData.entry_id}
              cropClass={"Sehat"}
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
      {/* Weather cards can remain similar */}
      {/* <div className="w-full flex-grow rounded-xl bg-green-50 bg-opacity-70 xl:w-1/4">
        <div className="flex flex-row flex-wrap gap-1 p-4 font-bold text-red-500">
          *Parameter NDVI, Tinggi Tanaman, dan Jumlah daun masih belum berjalan*
        </div>
      </div> */}
      <div className="w-full rounded-xl bg-green-50 bg-opacity-70 xl:w-1/4">
        <WeatherInfo />
      </div>
    </main>
  );
}
