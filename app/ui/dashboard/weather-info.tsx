import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function Info() {
  return (
    <>
      <div className="flex flex-row flex-wrap gap-1 md:flex-row">
        <h1 className="w-full text-2xl font-bold">Cuaca</h1>
        <p id="date" className="w-full text-lg font-semibold">
          Sabtu, 20 Januari 2024
        </p>
        <p id="info" className="flex-1 text-lg font-normal">
          Cerah
        </p>
        <p id="temp" className="flex-1 text-2xl font-bold">
          29
        </p>
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-bold leading-none tracking-tight">
          Tanaman
        </h1>
        <p className="font-lg text-lg">Cabai</p>
        <p className="font-lg text-lg">Rabu, 24 April 2024</p>
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-bold leading-none tracking-tight">
          Perlakuan
        </h1>
        {/* <p className="font-lg text-lg">Cabai</p> */}
        {/* <p className="font-lg text-lg">Rabu, 24 April 2024</p> */}
      </div>
    </>
  );
}
