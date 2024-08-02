'use client';

import SensorGauges from '@/app/ui/dashboard/sensor-daily-chart';
import Link from 'next/link';

export function CropDailyCard({
  cropCode,
  cropClass,
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
  cropClass: string;
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
    <div className="mb-4 flex h-min w-full flex-col overflow-auto rounded-xl bg-green-50 p-3">
      <div className="flex flex-col pt-8 text-center">
        <h1 className="text-base font-bold md:text-xl">{cropCode}</h1>
        <p className="text-sm font-medium text-green-700 md:text-lg">
          {cropClass}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
        <SensorGauges label="NDVI" value={NDVI} valueMin={-1} valueMax={1} />
        <SensorGauges label="EC" value={EC} valueMin={0} valueMax={1500} />
        <SensorGauges
          label="Suhu"
          value={temperature}
          valueMin={0}
          valueMax={40}
        />
        <SensorGauges
          label="Kelembapan"
          value={humidity}
          valueMin={0}
          valueMax={100}
        />
        <SensorGauges label="pH" value={pH} valueMin={0} valueMax={14} />
        <SensorGauges
          label="Tinggi Tanaman"
          value={cropTall}
          valueMin={0}
          valueMax={100}
        />
        <SensorGauges
          label="Jumlah Daun"
          value={leafCount}
          valueMin={0}
          valueMax={125}
        />
        <SensorGauges
          label="Nitrogen (N)"
          value={n}
          valueMin={0}
          valueMax={1000}
        />
        <SensorGauges
          label="Fosfor (P)"
          value={p}
          valueMin={0}
          valueMax={1000}
        />
        <SensorGauges
          label="Kalium (K)"
          value={k}
          valueMin={0}
          valueMax={1000}
        />
      </div>

      <Link
        href={{
          pathname: 'dashboard/details/' + cropCode,
        }}
        className="me-12 mt-5 self-end rounded-md border border-blue-700 bg-blue-700 px-3 py-1 text-sm font-semibold text-slate-50 hover:bg-transparent hover:text-blue-700 md:text-base"
      >
        Detail
      </Link>
    </div>
  );
}
