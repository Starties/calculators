"use client";

import React, { useState, useEffect } from 'react';
import { Delete, Binary, Hash, Cpu, RefreshCcw } from 'lucide-react';

export default function ProgrammerPage() {
  const [value, setValue] = useState<number>(0);
  const [inputMode, setInputMode] = useState<"DEC" | "HEX" | "BIN" | "OCT">("DEC");

  // --- CONVERSION ENGINE ---
  const handleInput = (char: string) => {
    let currentStr = "";

    // Convert current value to string based on mode
    if (inputMode === "DEC") currentStr = value.toString(10);
    if (inputMode === "HEX") currentStr = value.toString(16).toUpperCase();
    if (inputMode === "OCT") currentStr = value.toString(8);
    if (inputMode === "BIN") currentStr = value.toString(2);

    // Prevent overflow (simple JS safe integer limit check)
    if (currentStr.length > 15) return;

    const newStr = currentStr + char;
    
    // Parse back to integer
    let newValue = parseInt(newStr, inputMode === "HEX" ? 16 : inputMode === "OCT" ? 8 : inputMode === "BIN" ? 2 : 10);
    
    if (!isNaN(newValue)) setValue(newValue);
  };

  const handleBackspace = () => {
    let currentStr = "";
    if (inputMode === "DEC") currentStr = value.toString(10);
    if (inputMode === "HEX") currentStr = value.toString(16).toUpperCase();
    if (inputMode === "OCT") currentStr = value.toString(8);
    if (inputMode === "BIN") currentStr = value.toString(2);

    const newStr = currentStr.slice(0, -1);
    if (newStr === "") {
      setValue(0);
    } else {
      let newValue = parseInt(newStr, inputMode === "HEX" ? 16 : inputMode === "OCT" ? 8 : inputMode === "BIN" ? 2 : 10);
      setValue(newValue);
    }
  };

  const clearAll = () => setValue(0);

  // Bitwise Operations
  const doBitwise = (op: "AND" | "OR" | "XOR" | "NOT" | "LSHIFT" | "RSHIFT") => {
    // For this simple version, we'll do immediate operations on the current value against a mask or shift
    // Real programmer calcs usually have a stack, but we'll do "Quick Actions" for now
    if (op === "NOT") setValue(~value);
    if (op === "LSHIFT") setValue(value << 1);
    if (op === "RSHIFT") setValue(value >> 1);
  };

  // --- UI COMPONENTS ---
  const DisplayRow = ({ label, val, mode, active }: any) => (
    <div 
      onClick={() => setInputMode(mode)}
      className={`
        flex items-center gap-4 p-3 rounded cursor-pointer transition-all border
        ${active 
          ? 'bg-emerald-900/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
          : 'bg-slate-900 border-transparent hover:bg-slate-800 opacity-60'}
      `}
    >
      <div className={`w-1 h-8 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
      <span className={`font-mono font-bold text-sm ${active ? 'text-emerald-400' : 'text-slate-500'}`}>{label}</span>
      <span className={`font-mono text-xl ml-auto tracking-widest ${active ? 'text-white' : 'text-slate-500'}`}>
        {val}
      </span>
    </div>
  );

  const Key = ({ char, onClick, disabled = false }: any) => (
    <button
      disabled={disabled}
      onClick={() => onClick(char)}
      className={`
        h-12 rounded bg-slate-800 border-b-2 border-slate-950 font-mono font-bold text-slate-200
        hover:bg-slate-700 active:border-b-0 active:translate-y-[2px] transition-all
        disabled:opacity-20 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:border-transparent
      `}
    >
      {char}
    </button>
  );

  // Determine which keys are valid for the current mode
  const isValid = (key: string) => {
    if (inputMode === "BIN") return ['0','1'].includes(key);
    if (inputMode === "OCT") return ['0','1','2','3','4','5','6','7'].includes(key);
    if (inputMode === "DEC") return ['0','1','2','3','4','5','6','7','8','9'].includes(key);
    return true; // HEX allows all
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-emerald-500 p-4 md:p-8 font-mono">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: THE DISPLAY STACK */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-4 opacity-50">
            <Cpu size={20} />
            <span className="text-sm tracking-widest uppercase">Bitwise Commander v1.0</span>
          </div>

          <DisplayRow label="HEX" val={value.toString(16).toUpperCase()} mode="HEX" active={inputMode === "HEX"} />
          <DisplayRow label="DEC" val={value.toString(10)} mode="DEC" active={inputMode === "DEC"} />
          <DisplayRow label="OCT" val={value.toString(8)} mode="OCT" active={inputMode === "OCT"} />
          <DisplayRow label="BIN" val={value.toString(2).padStart(8, '0')} mode="BIN" active={inputMode === "BIN"} />

          {/* Binary Visualization Grid */}
          <div className="mt-8 p-4 border border-emerald-900/50 rounded bg-black/50">
             <h3 className="text-xs uppercase tracking-widest text-emerald-700 mb-4">Memory Bitmap</h3>
             <div className="flex flex-wrap gap-1 justify-end">
               {value.toString(2).padStart(32, '0').split('').map((bit, i) => (
                 <div key={i} className={`
                    w-3 h-4 flex items-center justify-center text-[10px] rounded-[1px]
                    ${bit === '1' ? 'bg-emerald-500 text-black shadow-[0_0_5px_#10b981]' : 'bg-emerald-900/20 text-emerald-900'}
                    ${(i + 1) % 8 === 0 ? 'mr-2' : ''} 
                 `}>
                   {bit}
                 </div>
               ))}
             </div>
             <div className="flex justify-between text-[10px] text-emerald-800 mt-1 px-1">
                <span>31</span>
                <span>0</span>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE KEYPAD */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-4 gap-3">
            {/* Hex Keys (Row 1) */}
            <Key char="D" onClick={handleInput} disabled={!isValid('D')} />
            <Key char="E" onClick={handleInput} disabled={!isValid('E')} />
            <Key char="F" onClick={handleInput} disabled={!isValid('F')} />
            <button onClick={clearAll} className="bg-red-900/50 text-red-400 rounded border border-red-900 hover:bg-red-900 transition-colors flex items-center justify-center"><RefreshCcw size={18}/></button>

            {/* Hex Keys (Row 2) */}
            <Key char="A" onClick={handleInput} disabled={!isValid('A')} />
            <Key char="B" onClick={handleInput} disabled={!isValid('B')} />
            <Key char="C" onClick={handleInput} disabled={!isValid('C')} />
            <button onClick={handleBackspace} className="bg-amber-900/50 text-amber-400 rounded border border-amber-900 hover:bg-amber-900 transition-colors flex items-center justify-center"><Delete size={18}/></button>

            {/* Numbers */}
            <Key char="7" onClick={handleInput} disabled={!isValid('7')} />
            <Key char="8" onClick={handleInput} disabled={!isValid('8')} />
            <Key char="9" onClick={handleInput} disabled={!isValid('9')} />
            <button onClick={() => doBitwise('NOT')} className="bg-slate-700 text-slate-400 text-xs">NOT</button>

            <Key char="4" onClick={handleInput} disabled={!isValid('4')} />
            <Key char="5" onClick={handleInput} disabled={!isValid('5')} />
            <Key char="6" onClick={handleInput} disabled={!isValid('6')} />
            <button onClick={() => doBitwise('LSHIFT')} className="bg-slate-700 text-slate-400 text-xs">{'<<'}</button>

            <Key char="1" onClick={handleInput} disabled={!isValid('1')} />
            <Key char="2" onClick={handleInput} disabled={!isValid('2')} />
            <Key char="3" onClick={handleInput} disabled={!isValid('3')} />
            <button onClick={() => doBitwise('RSHIFT')} className="bg-slate-700 text-slate-400 text-xs">{'>>'}</button>

            <Key char="0" onClick={handleInput} disabled={!isValid('0')} />
            <div className="col-span-3 flex items-center justify-center text-xs text-slate-600 uppercase tracking-widest border border-slate-800 rounded">
               Select Mode to Unlock Keys
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}