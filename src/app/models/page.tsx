"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Calculator, Binary, LineChart, Lock, Zap, ChevronRight } from 'lucide-react';

const MODELS = [
  {
    id: 'scientific',
    name: 'SC-30XII Standard',
    desc: 'General Math, Algebra I/II, Geometry. Handles trig & logs.',
    icon: <Calculator size={32} />,
    color: 'text-blue-400 bg-blue-400/10',
    border: 'hover:border-blue-500/50',
    path: '/scientific',
    active: true,
    tags: ['math', 'school', 'ti-30']
  },
  {
    id: 'graphing',
    name: 'Quantum Plotter 84',
    desc: 'Visualize functions, intercepts, and inequalities.',
    icon: <LineChart size={32} />,
    color: 'text-purple-400 bg-purple-400/10',
    border: 'hover:border-purple-500/50',
    path: '/graphing',
    active: false,
    tags: ['graph', 'calculus', 'ti-84']
  },
  {
    id: 'programmer',
    name: 'Bitwise Commander',
    desc: 'Hex/Bin/Oct conversion and logic gates.',
    icon: <Binary size={32} />,
    color: 'text-emerald-400 bg-emerald-400/10',
    border: 'hover:border-emerald-500/50',
    path: '/programmer',
    active: true,
    tags: ['cs', 'binary', 'hex']
  },
  {
    id: 'finance',
    name: 'Ledger Pro',
    desc: 'TVM Solver, amortization, and compound interest.',
    icon: <Zap size={32} />,
    color: 'text-amber-400 bg-amber-400/10',
    border: 'hover:border-amber-500/50',
    path: '/finance',
    active: false,
    tags: ['business', 'money', 'stats']
  },
];

export default function ModelsPage() {
  const [query, setQuery] = useState("");

  const filtered = MODELS.filter(m => 
    m.name.toLowerCase().includes(query.toLowerCase()) || 
    m.tags.some(t => t.includes(query.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12">
      
      {/* Search Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-4 text-white">Select a Device</h1>
        <p className="text-slate-400 mb-6">Choose from our library of specialized computational engines.</p>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search models (e.g. 'Graphing', 'Binary')..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-blue-500 focus:bg-slate-800 transition-all placeholder:text-slate-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filtered.map((model) => (
          <div key={model.id} className={`
            relative p-6 rounded-2xl border border-slate-800 bg-slate-900/50 
            ${model.active ? `${model.border} hover:bg-slate-900 cursor-pointer` : 'opacity-60 cursor-not-allowed'}
            transition-all group flex flex-col h-full
          `}>
            {/* Link Wrapper if active */}
            {model.active ? (
              <Link href={model.path} className="absolute inset-0 z-10" />
            ) : (
              <div className="absolute top-4 right-4 bg-slate-800 text-[10px] px-2 py-1 rounded border border-slate-700 flex items-center gap-1 uppercase tracking-wider text-slate-400 font-bold z-20">
                <Lock size={10} /> Locked
              </div>
            )}

            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${model.color}`}>
              {model.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-white">{model.name}</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{model.desc}</p>
            
            <div className="flex justify-between items-end mt-auto">
                <div className="flex gap-2 flex-wrap">
                {model.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-500 px-2 py-1 rounded border border-slate-700">
                    {tag}
                    </span>
                ))}
                </div>
                {model.active && <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" />}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}