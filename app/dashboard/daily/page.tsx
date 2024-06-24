import WeatherInfo from '@/app/ui/dashboard/weather-info';
import { CropDailyCard } from '@/app/ui/dashboard/crop-daily-card';

const cropData = [
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
];

async function getData(crop:any) {
  const apiKey = crop.apiKey;
  const channelID = crop.channelID;
  const res = await fetch(`https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&results=1`)
  
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
  const allCropData = await Promise.all(cropData.map(getData)); // Fetch data concurrently
  return (
    <main className="mb-5 flex flex-wrap gap-5 flex-col lg:flex-row">
      <div className='flex-grow'>
      {allCropData.map((cropData, index) => (
        
        <CropDailyCard
          key={index}
          cropCode={cropData.channel.name} // Modify crop code based on your logic
          cropClass="Sehat" // Assuming "Sehat" is a default class
          NDVI={0.7} // Assuming a constant NDVI for now
          EC={cropData.feeds[0].field3}
          temperature={roundToDecimals(cropData.feeds[0].field2)}
          humidity={roundToDecimals(cropData.feeds[0].field1)}
          pH={roundToDecimals(cropData.feeds[0].field4)}
          cropTall={20}
          leafCount={24}
          n={cropData.feeds[0].field5}
          p={cropData.feeds[0].field6}
          k={cropData.feeds[0].field7}
        />
      ))}
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