import WeatherInfo from '@/app/ui/dashboard/weather-info';
import EnvironmentInfo from '@/app/ui/dashboard/environment-info';
import NanobubbleInfo from '@/app/ui/dashboard/nanobubble-info';
import LineChart from '@/app/ui/dashboard/line-chart';
import StackedLineChart from '@/app/ui/dashboard/stacked-line-chart';

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

export default async function Page({ params }) {
  const foundSensor = findSensorByCropCode(params.cropCode);

  let sensorData;
  try {
    sensorData = await getSensorData(foundSensor, 1440/5);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    // Handle error - display message, redirect, etc.
    return <div>Error fetching sensor data</div>;
  }

  return (
    <div className="flex flex-col-reverse mb-10 gap-4 md:flex-row">
      {/* detail */}
      <div className="grow flex-col rounded-xl bg-green-50 px-2 py-5">
        <h1 className=" text-sm md:text-2xl font-bold text-green-800 px-10">
          Detail Tanaman {params.cropCode} - Sensor: {foundSensor.sensor}
        </h1>

        <div className=' flex flex-col md:flex-row flex-wrap'>
          <section className='mt-5 md:w-1/2'>
            <StackedLineChart data={sensorData} />
          </section>

          <section className='mt-5 md:w-1/2'>
            <LineChart title='Kelembapan' data={sensorData} />
          </section>

          <section className='mt-5 md:w-1/2'>
            <LineChart title='Suhu' data={sensorData} />
          </section>

          <section className='mt-5 md:w-1/2'>
            <LineChart title='Konduktivitas' data={sensorData} />
          </section>

          <section className='mt-5 md:w-1/2'>
            <LineChart title='pH' data={sensorData} />
          </section>
          
        </div>

      </div>

      {/* environment sensor */}
      <div className="flex flex-row gap-4 md:w-1/4 md:flex-col">
        {/* <div className="rounded-xl bg-green-50 bg-opacity-70">
          <WeatherInfo />
        </div> */}
        <div className="rounded-xl bg-green-50 bg-opacity-70">
          <EnvironmentInfo />
        </div>
        <div className="rounded-xl bg-green-50 bg-opacity-70">
          <NanobubbleInfo />
        </div>
      </div>
    </div>
  );
}

function findSensorByCropCode(cropCode) {
  return sensors.find(sensor => sensor.polybag === cropCode);
}

const getSensorData = async(foundSensor, results = 3) => {
  const res = await fetch(
    `https://api.thingspeak.com/channels/${foundSensor.channelID}/feeds.json?api_key=${foundSensor.apiKey}&timezone=Asia/Jakarta&results=${results}`,
    {
      method: 'GET'
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const sensorData = await res.json();
  return sensorData.feeds;
}