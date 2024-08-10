'use client'

import { DatePicker } from '@nextui-org/date-picker';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { getLocalTimeZone, today } from "@internationalized/date";
import { PhotoIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <div className='justify-items-center md:my-52 md:mx-48'>
      <form action={''} method='POST' className="flex flex-col gap-5">
        <Input type="file" label="File" variant='bordered'
          startContent=
          {<PhotoIcon className='h-5' />}
          className='rounded-xl ' />
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
        <DatePicker label="Tanggal" variant='bordered' labelPlacement='outside' className='rounded-xl'
          maxValue={today(getLocalTimeZone())}
        />
        <Button type='submit' variant='solid' className="rounded-xl bg-green-800 font-bold text-slate-100">
          Unggah
        </Button>
      </form>
    </div>
  );
}
