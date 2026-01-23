"use client";

import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { Delete, RotateCcw } from 'lucide-react';

// Secure Mathematical Evaluation Engine
// We use mathjs to prevent arbitrary code execution (no eval())
const calculateExpression = (expression: string) => {
  try {
    // Replace visual symbols with mathjs compatible operators
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/\^/g, '^')
      .replace(/√\(/g, 'sqrt(');
    
    // Evaluate safely
    const result = evaluate(sanitized);
    
    // Format to avoid floating point errors (e.g. 0.1 + 0.2)
    return parseFloat(result.toFixed(8)).toString();
  } catch (error) {
    return "Syntax Error";
  }
};

export default function TI30Emulator() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");
  const [memory, setMemory] = useState<string | null>(null);

  // Keyboard support for accessibility and speed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleInput(e.key);
      if (e.key === '.') handleInput('.');
      if (e.key === '+') handleInput('+');
      if (e.key === '-') handleInput('-');
      if (e.key === '*') handleInput('×');
      if (e.key === '/') handleInput('÷');
      if (e.key === 'Enter') handleEquals();
      if (e.key === 'Backspace') handleBackspace();
      if (e.key === 'Escape') clearAll();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display]);

  const handleInput = (val: string) => {
    if (result !== "" && !isOperator(val)) {
      setDisplay(val);
      setResult("");
    } else {
      setDisplay((prev) => prev + val);
    }
  };

  const isOperator = (val: string) => ['+', '-', '×', '÷', '^'].includes(val);

  const handleEquals = () => {
    if (!display) return;
    const res = calculateExpression(display);
    setResult(res);
  };

  const clearAll = () => {
    setDisplay("");
    setResult("");
  };

  const handleBackspace = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const Button = ({ label, onClick, className = "", secondary = false }: any) => (
    <button
      onClick={onClick}
      className={`
        h-12 sm:h-14 rounded-md font-bold text-lg transition-all duration-100 active:scale-95 flex items-center justify-center select-none
        ${secondary 
          ? 'bg-slate-600 text-white hover:bg-slate-500 shadow-[0_4px_0_rgb(51,65,85)] active:shadow-none translate-y-0 active:translate-y-1' 
          : 'bg-slate-200 text-slate-900 hover:bg-slate-300 shadow-[0_4px_0_rgb(148,163,184)] active:shadow-none translate-y-0 active:translate-y-1'}
        ${className}
      `}
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-700">
        
        {/* Header / Model Name */}
        <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
          <h1 className="text-slate-400 font-mono text-sm tracking-widest">SC-30XII EMULATOR</h1>
          <div className="h-2 w-16 bg-blue-500 rounded-full animate-pulse"></div>
        </div>

        {/* LCD Display Area */}
        
        <div className="bg-[#9ea792] p-4 rounded-lg mb-6 shadow-inner border-4 border-slate-700 font-mono relative">
          <div className="h-6 text-right text-slate-800 text-sm overflow-hidden whitespace-nowrap">
            {display || "0"}
          </div>
          <div className="h-10 text-right text-slate-900 text-3xl font-bold overflow-hidden whitespace-nowrap">
            {result || (display ? "..." : "0")}
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1: Scientific Functions */}
          <Button label="2nd" secondary onClick={() => {}} className="text-yellow-400" />
          <Button label="π" secondary onClick={() => handleInput('π')} />
          <Button label="sin" secondary onClick={() => handleInput('sin(')} />
          <Button label="cos" secondary onClick={() => handleInput('cos(')} />
          <Button label="tan" secondary onClick={() => handleInput('tan(')} />
          
          {/* Row 2: More Functions & Clear */}
          <Button label="x²" secondary onClick={() => handleInput('^2')} />
          <Button label="√" secondary onClick={() => handleInput('√(')} />
          <Button label="(" secondary onClick={() => handleInput('(')} />
          <Button label=")" secondary onClick={() => handleInput(')')} />
          
           {/* Editing Keys */}
          <Button 
            label={<RotateCcw size={20}/>} 
            className="bg-red-600 text-white hover:bg-red-500 shadow-[0_4px_0_rgb(153,27,27)]" 
            onClick={clearAll} 
          />
          <Button label="^" secondary onClick={() => handleInput('^')} />
          <Button label="÷" secondary onClick={() => handleInput('÷')} />
          <Button 
             label={<Delete size={20}/>} 
             className="bg-orange-600 text-white hover:bg-orange-500 shadow-[0_4px_0_rgb(154,52,18)]" 
             onClick={handleBackspace} 
           />

          {/* Numpad */}
          <Button label="7" onClick={() => handleInput('7')} />
          <Button label="8" onClick={() => handleInput('8')} />
          <Button label="9" onClick={() => handleInput('9')} />
          <Button label="×" secondary onClick={() => handleInput('×')} />

          <Button label="4" onClick={() => handleInput('4')} />
          <Button label="5" onClick={() => handleInput('5')} />
          <Button label="6" onClick={() => handleInput('6')} />
          <Button label="-" secondary onClick={() => handleInput('-')} />

          <Button label="1" onClick={() => handleInput('1')} />
          <Button label="2" onClick={() => handleInput('2')} />
          <Button label="3" onClick={() => handleInput('3')} />
          <Button label="+" secondary onClick={() => handleInput('+')} />

          <Button label="0" onClick={() => handleInput('0')} />
          <Button label="." onClick={() => handleInput('.')} />
          <Button label="(-)" onClick={() => handleInput('-')} />
          <Button 
            label="=" 
            className="bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_0_rgb(30,58,138)]" 
            onClick={handleEquals} 
          />
        </div>
      </div>
    </main>
  );
}