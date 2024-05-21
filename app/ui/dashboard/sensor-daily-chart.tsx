import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';


export default function SensorGauges({ label, value, valueMin, valueMax }:
  {label: string; value: number; valueMin: number; valueMax: number}) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <div className="flex flex-col items-center">
        <Gauge
          width={90}
          height={90}
          value={value}
          startAngle={-110}
          endAngle={110}
          valueMin={valueMin}
          valueMax={valueMax}
          aria-labelledby={`sensor-type-${label}`}
          aria-valuetext={label} // Use label prop for aria-valuetext
          sx={(theme) => ({
            [`& .${gaugeClasses.valueArc}`]: {
              fill: '#52b202',
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.text.disabled,
            },
          })}
        />
        <label id={`sensor-type-${label}`} className="mt-2 text-center text-xs font-semibold">
          {label}
        </label>
      </div>
    </Stack>
  );
}
