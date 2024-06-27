import WeatherInfo from '@/app/ui/dashboard/weather-info';
import { CropDailyCard } from '@/app/ui/dashboard/crop-daily-card';

const sensors = [
  { polybag:'Auto 1', channelID: '2573088', apiKey: '2EUPVXHC5QO8ZPOY'},
  { polybag:'Auto 2', channelID: '2573089', apiKey: 'CYTZ5PANCCUVVCMT'},
  { polybag:'Auto 3', channelID: '2573090', apiKey: 'WJF8BQGGMR6JA9AE'},
  { polybag:'Auto 4', channelID: '2573092', apiKey: 'AOSOFGA4WVDQCL04'},
  { polybag:'Auto 5', channelID: '2573093', apiKey: 'BO3FWSZVUSMHFLH1'},
  { polybag:'Auto 6', channelID: '2573094', apiKey: 'LBX668AWWPMJAM2J'},
  // { polybag:'Auto 7', channelID: '2573096', apiKey: 'SVMLCJ53ABB2K0IP'}, // belum ada entry 
  // sensor Auto tidak ada tds field5-7=npk
  // sensor Time field5=tds && field6-8=npk
  { polybag:'Time 1', channelID: '2580652', apiKey: 'VCD4PPD4ZVAMOAJG'},
  { polybag:'Time 2', channelID: '2580653', apiKey: 'WYPUBPC0DLJWPNKC'},
  { polybag:'Time 3', channelID: '2580655', apiKey: 'LQEI4ENFE68DWD75'},
  { polybag:'Time 4', channelID: '2580656', apiKey: 'YPPQMF5T2F1HH6B0'},
  { polybag:'Time 5', channelID: '2580657', apiKey: 'U0D3LFQTEOND6L9O'},
  { polybag:'Time 6', channelID: '2580659', apiKey: 'IUM51GU125UVW9B4'},
  { polybag:'Time 7', channelID: '2580664', apiKey: 'TTX87BGPJK2KTFCT'},
  { polybag:'Time 8', channelID: '2580665', apiKey: '8HWN2H29SBPJ0JAD'},
  // { polybag:'Ardi 1', channelID: '2495370', apiKey: 'SH0R26GMJVP5Q3IB'},
];

async function getData(crop:any) {
  const CHANNEL_ID = crop.channelID;
  const API_KEY = crop.apiKey;
  const TIMEZONE = 'Asia/Jakarta';
  const res = await fetch(`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${API_KEY}&timezone=${TIMEZONE}`)
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

function roundToDecimals(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round((value * factor)) / factor;
}

export default async function Page() {
  const allCropData = await Promise.all(sensors.map(getData)); // Fetch data concurrently
  return (
    <main className="mb-5 flex flex-wrap gap-5 flex-col lg:flex-row">
      <div className='flex-grow'>
      {allCropData.map((cropData, index) => {
        const isCrop1To8 = index < 6; // Adjust condition based on actual crop division

        return (
          <CropDailyCard
            key={index}
            // cropCode={sensors[index].polybag} 
            cropCode={cropData.entry_id} 
            cropClass={cropData.created_at}
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
      <div className="w-full flex-grow rounded-xl bg-green-50 bg-opacity-70 xl:w-1/4">
        <div className="flex flex-row flex-wrap gap-1 p-4 font-bold text-red-500">    
          *Parameter NDVI, Tinggi Tanaman, dan Jumlah daun masih belum berjalan* 
        </div>
      </div>
      <div className="w-full flex-grow rounded-xl bg-green-50 bg-opacity-70 xl:w-1/4">
        <WeatherInfo />
      </div>
    </main>
  );
}