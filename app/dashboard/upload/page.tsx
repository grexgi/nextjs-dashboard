'use client'

import { DatePicker } from '@nextui-org/date-picker';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Select, SelectItem } from '@nextui-org/select';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

import { useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [formData, setFormData] = useState({
    file: null,
    selectedOption: 'disease',
    kodePolybag: '',
    tanggal: null,
  });
  const [error, setError] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [showPrediction, setShowPrediction] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.set(key, formData[key]);
      });

      let url = '';
      if (formData.selectedOption === 'disease') {
        url = 'http://127.0.0.1:5000/predict_disease';
      } else if (formData.selectedOption === 'ndvi') {
        url = 'http://127.0.0.1:5000/predict_vegetation_class';
      }

      const res = await axios.post(url, data);

      if (res.status === 200) {
        setPrediction(res.data.class_label);
        setShowPrediction(true);
        setTimeout(() => {
          setShowPrediction(false);
        }, 5000); // hide prediction after 5 seconds
      } else {
        setError(res.data.error);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000); // hide error after 5 seconds
      }
    } catch (e: any) {
      setError(e.message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000); // hide error after 5 seconds
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
  };

  return (
    <div className='justify-items-center md:px-64 '>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Input type="file" label="File" variant='bordered'
          startContent=
          {<PhotoIcon className='h-5' />}
          className='rounded-xl '
          onChange={(e) => handleInputChange('file', e.target.files[0])} />

        <Select label='Prediksi' placeholder='Pilih jenis prediksi' variant='bordered' labelPlacement='outside' value={formData.selectedOption} onChange={(e) => handleInputChange('selectedOption', e.target.value)}>
          <SelectItem key='disease'>Penyakit Tanaman</SelectItem>
          <SelectItem key='ndvi'>Indeks Vegetasi</SelectItem>
        </Select>

        <Select label='Kode Polybag' placeholder='Pilih tanaman' variant='bordered' labelPlacement='outside' value={formData.kodePolybag} onChange={(e) => handleInputChange('kodePolybag', e.target.value)}>
          <SelectItem key='B2-N2P1(3)'>B2-N2P1(3)</SelectItem>
        </Select>

        <DatePicker label="Tanggal" variant='bordered' labelPlacement='outside' className='rounded-xl'
          maxValue={today(getLocalTimeZone())}
          value={formData.tanggal} onChange={(date) => handleInputChange('tanggal', date)} />
        <Button type='submit' variant='solid' className="rounded-xl bg-green-800 font-bold text-slate-100">
          Unggah
        </Button>
        {showError && <div className="py-2 px-3 rounded-xl text-center text-neutral-50 bg-red-500 justify-items-center">{error}</div>}
        {showPrediction && <div className="py-2 px-3 rounded-xl text-center text-neutral-50 bg-green-500 justify-items-center">{prediction}</div>}
      </form>
    </div>
  );
}