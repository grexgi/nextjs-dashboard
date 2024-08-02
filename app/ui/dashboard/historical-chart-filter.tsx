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
            <MenuItem value={'B2-N2P1(3)'}>B2-N2P1(3)</MenuItem>
            <MenuItem value={'B2-N2P3(2)'}>B2-N2P3(2)</MenuItem>
            <MenuItem value={'B2-N2P2(3)'}>B2-N2P2(3)</MenuItem>
            <MenuItem value={'B3-N2P1(3)'}>B3-N2P1(3)</MenuItem>
            <MenuItem value={'B3-N2P3(1)'}>B3-N2P3(1)</MenuItem>
            <MenuItem value={'B3-N2P2(4)'}>B3-N2P2(4)</MenuItem>
            <MenuItem value={'B4-N3P2(4)'}>B4-N3P2(4)</MenuItem>
            <MenuItem value={'B4-N3P3(4)'}>B4-N3P3(4)</MenuItem>
            <MenuItem value={'B6-N2P1(6)'}>B6-N2P1(6)</MenuItem>
            <MenuItem value={'B8-N2P2(1)'}>B8-N2P2(1)</MenuItem>
            <MenuItem value={'B8-N2P3(1)'}>B8-N2P3(1)</MenuItem>
            <MenuItem value={'B9-N3P3(3)'}>B9-N3P3(3)</MenuItem>
            <MenuItem value={'B10-N2P3(5)'}>B10-N2P3(5)</MenuItem>
            <MenuItem value={'B11-N3P1(2)'}>B11-N3P1(2)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 180 }}>
        <FormControl fullWidth>
          <InputLabel id="select-sensor-label">Parameter</InputLabel>
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
            <MenuItem value={'Kalium (k)'}>Pottasium (k)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* <DatePick />
      <DatePick /> */}
    </div>
  );
}
