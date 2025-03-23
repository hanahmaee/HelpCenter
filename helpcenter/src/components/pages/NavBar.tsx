'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from '@/components/custom/dark_toggle';

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full shadow-md z-30 transition-colors duration-300 bg-background">
      <div className="px-5 md:px-14 py-3 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            width={100}
            height={50}
            alt="Logo"
            className="mt-[-3px]"
          />
        </Link>

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
