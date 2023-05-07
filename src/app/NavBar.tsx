'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="flex pb-8   text-sm justify-between items-center">
      <div className="flex gap-3">
        <Link
          className={` ${pathname === '/activity' ? 'underline' : ''}`}
          href={'/activity'}
        >
          Activities
        </Link>
        <Link
          className={`${pathname === '/track' ? 'underline' : ''}`}
          href={'/track'}
        >
          Track
        </Link>
        <Link
          className={`${pathname === '/visualize' ? 'underline' : ''}`}
          href={'/visualize'}
        >
          Visualize
        </Link>
      </div>
      <button>Logout</button>
    </header>
  );
}
