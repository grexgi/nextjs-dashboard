'use client';

import SensorGauges from '@/app/ui/dashboard/sensor-daily-chart';

export function CropDailyCard() {
  return (
    <div className="flex h-min w-full flex-col overflow-auto rounded-xl bg-green-50 p-3 shadow-lg mb-4">
      <div className="flex flex-col pt-8 text-center">
        <h1 className="text-xl font-bold">B1-U1</h1>
        <p className="text-lg font-medium text-green-700">Sehat</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
        <SensorGauges />
        <SensorGauges />
        <SensorGauges />
        <SensorGauges />
        <SensorGauges />
        <SensorGauges />
        <SensorGauges />
        <SensorGauges />
        <SensorGauges />
        <SensorGauges />
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
