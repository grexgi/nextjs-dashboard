import WeatherInfo from '@/app/ui/dashboard/weather-info';
import { CropDailyCard } from '@/app/ui/dashboard/crop-daily-card';

async function getData() {
  const res = await fetch(`https://api.thingspeak.com/channels/2495370/feeds.json?api_key=SH0R26GMJVP5Q3IB&results=1`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData();
  return (
    <main className="mb-5 flex flex-col-reverse gap-5 xl:flex-row">
      
      {/* Main container with flex column on small screens, flex row on larger */}
      <div className="flex-grow">
        {/* Grow to fill available space */}
        <CropDailyCard cropCode="B1-U1" cropClass="Sehat" NDVI={0.7} EC={data.feeds[0].field3} temperature={data.feeds[0].field2} humidity={data.feeds[0].field1} pH={data.feeds[0].field4} cropTall={20} leafCount={24} n={30} p={39} k={80}/>
        <CropDailyCard cropCode="B1-U1" cropClass="Sehat" NDVI={0.7} EC={1} temperature={24} humidity={30} pH={6} cropTall={20} leafCount={24} n={30} p={39} k={80}/>
        
      </div>
      <div className="w-full flex-grow rounded-xl bg-green-50 bg-opacity-70 xl:w-1/4">
        <WeatherInfo />
      </div>
      <div className="w-full flex-grow rounded-xl bg-green-50 bg-opacity-70 xl:w-1/4">
        <WeatherInfo />
      </div>
    </main>
  );
}
