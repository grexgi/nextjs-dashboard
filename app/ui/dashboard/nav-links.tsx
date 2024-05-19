'use client';

import {
  ArrowUpTrayIcon,
  PresentationChartLineIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Historical Dashboard',
    href: '/dashboard',
    icon: PresentationChartLineIcon,
  },
  { name: 'Daily Dashboard', href: '/dashboard/daily', icon: ChartPieIcon },
  { name: 'Upload', href: '/dashboard/upload', icon: ArrowUpTrayIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-teal-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-teal-100 text-green-600': pathname === link.href,
              },
            )}
            key={link.name}
            href={link.href}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
