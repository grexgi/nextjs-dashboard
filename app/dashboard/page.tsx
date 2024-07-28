import BasicLineChart from '@/app/ui/dashboard/historical-chart';
import BasicPie from '../ui/dashboard/pie-chart';
import WeatherInfo from '@/app/ui/dashboard/weather-info';
import CropInfo from '@/app/ui/dashboard/crop-info';
import Image from 'next/image';

export default async function Page() {
  return (
    <main>
      <div className="flex flex-col-reverse gap-5 xl:flex-row">
        <div className="flex-col mb-10">
          {/* Image */}
          <div className="rounded-xl xl:mb-5 bg-green-50 bg-opacity-70">
            <Image
              src="/ndvi.png"
              width={1000}
              height={700}
              alt="NDVI image of farm area"
              className="hidden md:block"
            />
          </div>
          <BasicLineChart />
        </div>

        <div className="col-span-4 rounded-xl bg-green-50 bg-opacity-70 xl:col-span-2">
          <WeatherInfo />
          <CropInfo />
          {/* <BasicPie /> */}
          <div className="p-4">
            {/* <p className="text-xs font-bold text-red-500 md:text-lg">
              *Data historis belum berjalan*
            </p> */}
          </div>
        </div>
      </div>
    </main>
  );
}
