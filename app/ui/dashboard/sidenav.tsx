import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="fixed md:flex w-full md:w-64 md:h-full flex-nowrap md:flex-col p-1 md:py-4 md:px-2 bg-green-500 md:bg-transparent bottom-0 z-10">
      <Link
        className="mb-2 items-end justify-start rounded-md bg-green-600 p-4 hidden md:block"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
