'use client'

import { useState, useEffect } from 'react';
import supabase from "@/utils/supabase";

const polybags = [
  {
    polybag: 'B2-N2P1(3)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Pupuk Kandang',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B2-N2P3(2)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Amelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B2-N2P2(3)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Bioamelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B3-N2P1(3)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Pupuk Kandang',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B3-N2P3(1)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Amelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B3-N2P2(4)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Bioamelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B4-N3P2(4)',
    nutrisi: '2580652',
    pembenah_tanah: 'Bioamelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B4-N3P3(4)',
    nutrisi: '2580664',
    pembenah_tanah: 'Amelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B6-N2P1(6)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Pupuk Kandang',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B8-N2P2(1)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Bioamelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B8-N2P3(1)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Amelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B9-N3P3(3)',
    nutrisi: '2580653',
    pembenah_tanah: 'Amelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B10-N2P3(5)',
    nutrisi: 'Larutan Hara',
    pembenah_tanah: 'Amelioran',
    tingkat_kesehatan: 'Cukup Sehat',
  },
  {
    polybag: 'B11-N3P1(2)',
    nutrisi: '2580655',
    pembenah_tanah: 'Pupuk Kandang',
    tingkat_kesehatan: 'Cukup Sehat',
  },
]

export default function QuickInfo({ cropCode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundPolybag = polybags.find(item => item.polybag === cropCode);

    setData(foundPolybag);
    setLoading(false);
  }, [cropCode, polybags]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit p-2 rounded-full'>{data.tingkat_kesehatan}</p>
      <p className='font-semibold p-2'>Penyakit</p>
      <p className='p-2 w-auto'>:</p>
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit p-2 rounded-full'>{'Tidak ada'}</p>
    </div>
  );
}
