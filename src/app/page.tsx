import Link from 'next/link';
import { Calculator, Binary, LineChart, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <div className="inline-block px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono text-blue-400 mb-6">
            V1.0.4 STABLE // SECURE EXECUTION
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">
          Universal Math Protocol
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          A suite of private, client-side computation engines. No tracking. No server logs. 
          Pure mathematical execution for the modern student.
        </p>

        {/* Main Call to Action */}
        <div className="flex justify-center gap-4 mb-20">
            <Link href="/models">
                <button className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center gap-2">
                Browse All Models
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
        </div>

        {/* The Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          
          {/* Scientific Card */}
          <Link href="/scientific" className="group">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 hover:bg-slate-900 transition-all cursor-pointer h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Calculator size={100} />
              </div>
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                <Calculator size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Scientific</h2>
              <p className="text-slate-400 text-sm">Standard TI-30XII emulator. Trig functions, logarithms, and secure floating-point arithmetic.</p>
            </div>
          </Link>

          {/* Programmer Card */}
          <Link href="/models" className="group">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Binary size={100} />
              </div>
              <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                <Binary size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Programmer</h2>
              <p className="text-slate-400 text-sm">Hex, Bin, Oct converter. Bitwise operations and logic gates.</p>
            </div>
          </Link>

          {/* Graphing Card */}
          <Link href="/models" className="group">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-purple-500/50 hover:bg-slate-900 transition-all cursor-pointer h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <LineChart size={100} />
              </div>
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-400">
                <LineChart size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Graphing</h2>
              <p className="text-slate-400 text-sm">2D plotting engine. Function visualization and intersection analysis.</p>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Security Footer */}
      <footer className="text-center py-12 text-slate-700 flex items-center justify-center gap-2 border-t border-slate-900 mt-12">
        <ShieldCheck size={14} />
        <span className="text-[10px] uppercase tracking-widest font-bold">End-to-End Local Execution Encrypted</span>
      </footer>
    </main>
  );
}