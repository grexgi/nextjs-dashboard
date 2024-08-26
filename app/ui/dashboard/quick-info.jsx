'use client'

import { useState, useEffect } from 'react';
import supabase from "@/utils/supabase";

export default function QuickInfo({ cropCode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('polybag')
          .select('id_polybag, nutrisi, pembenah_tanah, ndvi_monitor(label), disease_monitor(label)')
          .like('id_polybag', cropCode);

        if (error) {
          throw error;
        }

        setData(data[0]); // Assuming you always get a single item
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [cropCode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='grid grid-cols-3 my-5 mx-3 gap-2 text-xs md:text-base'>
      <p className='font-semibold p-2'>Nutrisi</p>
      <p className='p-2 w-auto'>:</p>
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit md:p-2 rounded-full'>{data.nutrisi}</p>
      <p className='font-semibold p-2'>Pembenah Tanah</p>
      <p className='p-2 w-auto'>:</p>
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit p-2 rounded-full'>{data.pembenah_tanah}</p>
      <p className='font-semibold p-2'>Tingkat Kesehatan</p>
      <p className='p-2 w-auto'>:</p>
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit p-2 rounded-full'>{data.ndvi_monitor[data.ndvi_monitor.length - 1].label}</p>
      <p className='font-semibold p-2'>Penyakit</p>
      <p className='p-2 w-auto'>:</p>
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit p-2 rounded-full'>{data.disease_monitor[data.disease_monitor.length - 1].label}</p>
    </div>
  );
}
