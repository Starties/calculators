import Link from 'next/link';
import { Calculator, Binary, LineChart, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Universal Math Protocol
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Private, client-side computation engines. No tracking. No history logging. 
          Pure mathematical execution for the modern student.
        </p>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Scientific Card */}
          <Link href="/scientific" className="group">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-pointer h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Calculator size={100} />
              </div>
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                <Calculator size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Scientific</h2>
              <p className="text-slate-400">Standard TI-30XII emulator. Trig functions, logarithms, and secure floating-point arithmetic.</p>
            </div>
          </Link>

          {/* Programmer Card (Placeholder) */}
          <div className="group opacity-75">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl transition-all h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Binary size={100} />
              </div>
              <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                <Binary size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Programmer</h2>
              <p className="text-slate-400">Hex, Bin, Oct converter. Bitwise operations. <span className="text-xs border border-emerald-900 bg-emerald-900/50 px-2 py-1 rounded text-emerald-400 ml-2">COMING SOON</span></p>
            </div>
          </div>

          {/* Graphing Card (Placeholder) */}
          <div className="group opacity-75">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl transition-all h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <LineChart size={100} />
              </div>
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-400">
                <LineChart size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Graphing</h2>
              <p className="text-slate-400">2D plotting engine. Function visualization and intersection analysis.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Footer */}
      <footer className="text-center py-8 text-slate-600 flex items-center justify-center gap-2">
        <ShieldCheck size={16} />
        <span className="text-xs uppercase tracking-widest">End-to-End Local Execution Encrypted</span>
      </footer>
    </main>
  );
}