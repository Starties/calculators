"use client";
import Link from 'next/link';
import { Terminal, Calculator, Cpu, ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="w-full h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6 justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        {!isHome && (
          <Link href="/" className="text-slate-400 hover:text-white mr-4 transition-colors">
            <ChevronLeft size={24} />
          </Link>
        )}
        <Terminal className="text-blue-500" size={24} />
        <span className="text-white font-bold tracking-wider">CALC_HUB // <span className="text-slate-500 text-sm font-normal">SECURE.PRIVATE.V1</span></span>
      </div>
      
      <div className="flex gap-4">
        {/* We can add login/profile buttons here later if we want auth */}
        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
      </div>
    </nav>
  );
}