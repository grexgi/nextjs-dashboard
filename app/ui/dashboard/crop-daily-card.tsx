'use client';

import SensorGauges from '@/app/ui/dashboard/sensor-daily-chart';
import Link from 'next/link';
import GaugeChart from './gauge-chart';

export function CropDailyCard({
  cropCode,
  NDVI,
  EC,
  temperature,
  humidity,
  pH,
  cropTall,
  leafCount,
  n,
  p,
  k,
}: {
  cropCode: string;
  NDVI: number;
  EC: number;
  temperature: number;
  humidity: number;
  pH: number;
  cropTall: number;
  leafCount: number;
  n: number;
  p: number;
  k: number;
}) {
  return (
    <div className="mb-4 flex flex-grow h-min md:ps-24 flex-col overflow-x-clip rounded-xl bg-green-50 p-3">
      <div className="flex flex-col pt-8 text-center">
        <h1 className="text-base font-bold md:text-xl">{cropCode}</h1>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {/* <GaugeChart title='NDVI' index={NDVI} minValue={-1} maxValue={1} minSafe={0.65} maxSafe={1} /> */}
        <GaugeChart title='EC' index={EC} minValue={0} maxValue={1500} minSafe={109 / 1500} maxSafe={900 / 1500} />
        <GaugeChart title='Suhu' index={temperature} minValue={0} maxValue={40} minSafe={19 / 40} maxSafe={34 / 40} />
        <GaugeChart title='Kelembapan' index={humidity} minValue={0} maxValue={100} minSafe={0.41} maxSafe={0.8} />
        <GaugeChart title='pH' index={pH} minValue={0} maxValue={14} minSafe={6.4 / 14} maxSafe={7.5 / 14} />
        {/* <GaugeChart title='Tinggi' index={cropTall} minValue={0} maxValue={150} minSafe={0.4} maxSafe={1} /> */}
        {/* <GaugeChart title='Daun' index={leafCount} minValue={0} maxValue={300} minSafe={0.4} maxSafe={1} /> */}
        <GaugeChart title='Nitrogen' index={n} minValue={0} maxValue={1000} minSafe={100 / 1000} maxSafe={300 / 1000} />
        <GaugeChart title='Fosfor' index={p} minValue={0} maxValue={1000} minSafe={300 / 1000} maxSafe={500 / 1000} />
        <GaugeChart title='Kalium' index={k} minValue={0} maxValue={1000} minSafe={300 / 1000} maxSafe={500 / 1000} />
      </div>

      <Link
        href={{
          pathname: 'dashboard/details/' + cropCode,
        }}
        className="mt-6 me-5 md:me-28 self-end rounded-md border border-blue-700 bg-blue-700 px-3 py-1 text-sm font-semibold text-slate-50 hover:bg-transparent hover:text-blue-700 md:text-base"
      >
        Detail
      </Link>
    </div>
  );
}
