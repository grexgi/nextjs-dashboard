import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="fixed bottom-0 z-10 w-full flex-nowrap bg-green-500 p-1 md:flex md:h-full md:w-64 md:flex-col md:bg-transparent md:px-2 md:py-4">
      <Link
        className="mb-2 hidden items-end justify-start rounded-md bg-green-600 p-4 md:block"
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
