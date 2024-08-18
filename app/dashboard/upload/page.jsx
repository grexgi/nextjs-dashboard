'use client';

import { DatePicker } from '@nextui-org/date-picker';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Select, SelectItem } from '@nextui-org/select';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

import { useState } from 'react';
import axios from 'axios';
import supabase from "@/utils/supabase";
import Image from 'next/image';

export default function Page() {
  const [formData, setFormData] = useState({
    file: null,
    selectedOption: '',
    kodePolybag: '',
    tanggal: null,
  });
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.set(key, formData[key]);
        }
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
        insertToDatabase(res.data.class_label);
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
    } catch (e) {
      setError(e.message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000); // hide error after 5 seconds
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
    if (key === 'file') {
      setImagePreview(URL.createObjectURL(value));
    }
  };
  
  async function insertToDatabase(label) {
    try {
      const tanggal = formData.tanggal;
      const year = tanggal.year;
      const month = tanggal.month < 10 ? `0${tanggal.month}` : tanggal.month;
      const day = tanggal.day < 10 ? `0${tanggal.day}` : tanggal.day;

      const formattedDate = `${year}-${month}-${day}`;
      let table = '';

      if (formData.selectedOption == 'disease') {
        table = 'disease_monitor'
      } else if (formData.selectedOption == 'ndvi') {
        table = 'ndvi_monitor'
      }
      const { data, error } = await supabase
        .from(table)
        .insert([
          {
            captured_at: formattedDate, // format as YYYY-MM-DD
            label: label,
            id_polybag: formData.kodePolybag
          },
        ]);

      if (error) {
        console.error(error);
        throw error;
      }

    } catch (error) {
      setError(error.message);
      setShowError(true);
      console.error(error);
    }
  }

  return (
    <div className='justify-items-center lg:px-64'>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className='max-h-64 overflow-auto'>
          {imagePreview && (
            <Image
              height={500}
              width={1000}
              src={imagePreview} alt="Image Preview" className="w-full object-cover rounded-xl" />
          )}
        </div>
        <Input type="file" label="File" variant='bordered' isRequired
          startContent={<PhotoIcon className='h-5' />}
          className='rounded-xl '
          onChange={(e) => handleInputChange('file', e.target.files?.[0])} />

        <Select label='Prediksi' placeholder='Pilih jenis prediksi' variant='bordered' isRequired labelPlacement='outside' value={formData.selectedOption} onChange={(e) => handleInputChange('selectedOption', e.target.value)}>
          <SelectItem key='disease'>Penyakit Tanaman</SelectItem>
          <SelectItem key='ndvi'>Indeks Vegetasi</SelectItem>
        </Select>

        <Select label='Kode Polybag' placeholder='Pilih tanaman' variant='bordered' isRequired labelPlacement='outside' value={formData.kodePolybag} onChange={(e) => handleInputChange('kodePolybag', e.target.value)}>
          <SelectItem key='B2-N2P1(3)'>B2-N2P1(3)</SelectItem>
          <SelectItem key='B8-N2P3(1)'>B8-N2P3(1)</SelectItem>
          <SelectItem key='B8-N2P2(1)'>B8-N2P2(1)</SelectItem>
        </Select>

        <DatePicker label="Tanggal" variant='bordered' isRequired labelPlacement='outside' className='rounded-xl'
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