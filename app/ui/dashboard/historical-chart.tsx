'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { LineSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import HistoricalGraphFilter from './historical-chart-filter';

// X Axis Label
const timeData = [
  new Date(2024, 3, 29),
  new Date(2024, 3, 30),
  new Date(2024, 4, 1),
  new Date(2024, 4, 2),
  new Date(2024, 4, 3),
  new Date(2024, 4, 4),
  new Date(2024, 4, 5),
  new Date(2024, 4, 6),
  new Date(2024, 4, 7),
];

// Data Series
const y1 = [-0.1, -0.26, 0.32, 0.46, 0.4, 0.59, 0.6, 0.8, 0.84];

const config = {
  series: [{ type: 'line', data: y1 }] as LineSeriesType[],
  height: 300,
  xAxis: [
    {
      data: timeData,
      scaleType: 'time',
      valueFormatter: (date: Date) =>
        date.toLocaleDateString('fr-FR', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        }),
    } as const,
  ],
};

export default function ReferenceLine() {
  return (
    <div className="flex flex-col rounded-xl bg-green-50 bg-opacity-70 p-4 xl:flex-row">
      <HistoricalGraphFilter />

      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <ResponsiveChartContainer {...config}>
          <LinePlot />
          <ChartsReferenceLine
            x={new Date(2024, 4, 5)}
            lineStyle={{ strokeDasharray: '10 5' }}
            labelStyle={{ fontSize: '10' }}
            label={`Predict`}
            labelAlign="start"
          />
          <ChartsReferenceLine y={0} label="min-NDVI" labelAlign="end" />
          <ChartsXAxis label="Tanggal" />
          <ChartsYAxis label="NDVI" />
        </ResponsiveChartContainer>
      </Box>
    </div>
  );
}
