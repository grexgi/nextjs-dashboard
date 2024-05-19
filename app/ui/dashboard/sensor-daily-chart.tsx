import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function SensorGauges() {
  return (
    <>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
        <div className="flex flex-col items-center">
          <Gauge
            width={90}
            height={90}
            value={60}
            startAngle={-110}
            endAngle={110}
            valueMin={20}
            valueMax={100}
            aria-labelledby="sensor-type"
            aria-valuetext="Type of Sensor"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#52b202',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
          <label
            id="sensor-type"
            className="mt-2 text-center text-xs font-semibold"
          >
            NDVI
          </label>
        </div>
      </Stack>
    </>
  );
}
