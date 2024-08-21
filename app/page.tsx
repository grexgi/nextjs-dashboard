import AcmeLogo from '@/app/ui/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-green-600 p-4 md:h-32">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-green-50 px-6 py-10 opacity-70 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-lg text-gray-800 md:text-3xl md:leading-normal`}
          >
            Selamat datang di dashboard yang memantau kebun cabai
            <strong> Bale Tatanen Universitas Padjajaran</strong>
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-800 md:text-base"
          >
            <span>Dashboard</span> <ArrowRightIcon className="w-5 md:w-8" />
          </Link>
        </div>
        <div className="flex h-full items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/bibit_cabai.jpg"
            width={1000}
            height={820}
            className="hidden rounded-xl md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}
