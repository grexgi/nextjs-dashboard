'use client';

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import HistoricalGraphFilter from './historical-chart-filter';

export default function HistoricalChart() {
  return (
    <div className="flex flex-col rounded-xl bg-green-50 bg-opacity-70 p-4 xl:flex-row">
      <HistoricalGraphFilter />
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
        series={[
          {
            data: [-0.7, -0.1, -0.26, 0.32, 0.46, 0.4, 0.59, 0.6, 0.8, 0.84],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}
