import { TextField } from '@mui/material';
import { Input, Button, DatePicker } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  return (
    <div className=' flex flex-col gap-5 mx-36 my-52'>
      {/* <Input type="text" size='lg' className='' /> */}
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <DatePicker label="Tanggal" className='border border-black rounded-md' />
      <Button className=' bg-green-800 font-bold text-slate-100 rounded-md'>Unggah</Button>
    </div>

  );
}
