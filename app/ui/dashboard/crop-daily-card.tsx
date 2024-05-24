'use client';

import SensorGauges from '@/app/ui/dashboard/sensor-daily-chart';
// Import API untuk isi value gaugeChart

export function CropDailyCard({cropCode, cropClass}:{cropCode: string; cropClass:string}) {
  return (
    <div className="mb-4 flex h-min w-full flex-col overflow-auto rounded-xl bg-green-50 p-3">
      <div className="flex flex-col pt-8 text-center">
        <h1 className="text-xl font-bold">{cropCode}</h1>
        <p className="text-lg font-medium text-green-700">{cropClass}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
        <SensorGauges label="NDVI" value={0.2} valueMin={-1} valueMax={1} />
        <SensorGauges label="EC" value={0.2} valueMin={-1} valueMax={1} />
        <SensorGauges label="Suhu" value={18} valueMin={0} valueMax={40} />
        <SensorGauges
          label="Kelembapan"
          value={78}
          valueMin={0}
          valueMax={100}
        />
        <SensorGauges label="pH" value={6.2} valueMin={0} valueMax={14} />
        <SensorGauges
          label="Tinggi Tanaman"
          value={45}
          valueMin={70}
          valueMax={1}
        />
        <SensorGauges
          label="Jumlah Daun"
          value={55}
          valueMin={0}
          valueMax={125}
        />
        <SensorGauges
          label="Nitrogen (N)"
          value={120}
          valueMin={0}
          valueMax={150}
        />
        <SensorGauges
          label="Phospat (P)"
          value={80}
          valueMin={0}
          valueMax={150}
        />
        <SensorGauges
          label="Kalium (K)"
          value={60}
          valueMin={0}
          valueMax={150}
        />
      </div>

      <a
        href="#"
        className="me-8 mt-5 self-end font-semibold text-blue-700 underline"
      >
        Detail
      </a>
    </div>
  );
}
