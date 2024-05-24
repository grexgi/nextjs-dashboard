import WeatherInfo from '@/app/ui/dashboard/weather-info';
import { CropDailyCard } from '@/app/ui/dashboard/crop-daily-card';

export default async function Page() {
  return (
    <main>
      <div className="grid grid-cols-4 gap-3 xl:grid-cols-8">
        <div className="col-span-4">
          <CropDailyCard />
          <CropDailyCard />
          <CropDailyCard />
        </div>

        <div className="col-span-4 rounded-xl bg-green-50 bg-opacity-70 xl:col-span-2">
          <WeatherInfo />
        </div>

        <div className="col-span-4 rounded-xl bg-green-50 bg-opacity-70 xl:col-span-2">
          <WeatherInfo />
        </div>
      </div>
    </main>
  );
}
