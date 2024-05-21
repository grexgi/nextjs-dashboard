"use client";

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <div className='p-4'>
    <PieChart
    colors={["#008000", "#A1E620", "#ffc107", "#660033"]}
      series={[
        {
          data: [
            { id: 0, value: 7, label: 'Sangat Sehat' },
            { id: 1, value: 4, label: 'Cukup Sehat' },
            { id: 2, value: 3, label: 'Kurang Sehat' },
            { id: 3, value: 2, label: 'Tanaman Mati' },
          ],
          innerRadius: 30
        },
      ]}
      width={400}
      height={200}
    />
    </div>
  );
}
