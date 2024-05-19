import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DatePick from './datepicker';

export default function HistoricalGraphFilter() {
  const [code, setCode] = React.useState('');

  const codeChange = (event: SelectChangeEvent) => {
    setCode(event.target.value as string);
  };

  const [sensor, setSensor] = React.useState('');

  const sensorChange = (event: SelectChangeEvent) => {
    setSensor(event.target.value as string);
  };

  return (
    <div className="flex flex-col gap-y-2 pt-12">
      <Box sx={{ minWidth: 180 }}>
        <FormControl fullWidth>
          <InputLabel id="select-code-label">Kode</InputLabel>
          <Select
            labelId="select-code-label"
            id="select-code"
            value={code}
            label="Code"
            onChange={codeChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 180 }}>
        <FormControl fullWidth>
          <InputLabel id="select-sensor-label">Sensor</InputLabel>
          <Select
            labelId="select-sensor-label"
            id="select-sensor"
            value={sensor}
            label="Sensor"
            onChange={sensorChange}
          >
            <MenuItem value={'NDVI'}>NDVI</MenuItem>
            <MenuItem value={'Tinggi Tanaman'}>Tinggi Tanaman</MenuItem>
            <MenuItem value={'Jumlah Daun'}>Jumlah Daun</MenuItem>
            <MenuItem value={'Konduktivitas Elektrik'}>
              Konduktivitas Elektrik
            </MenuItem>
            <MenuItem value={'Suhu'}>Suhu</MenuItem>
            <MenuItem value={'Kelembapan'}>Kelembapan</MenuItem>
            <MenuItem value={'pH'}>pH</MenuItem>
            <MenuItem value={'Nitrogen (n)'}>Nitrogen (n)</MenuItem>
            <MenuItem value={'Fosfor (p)'}>Fosfor (p)</MenuItem>
            <MenuItem value={'Pottasium (k)'}>Pottasium (k)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DatePick />
      <DatePick />
    </div>
  );
}
