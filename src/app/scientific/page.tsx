"use client";

import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { Delete, RotateCcw } from 'lucide-react';

// Secure Mathematical Evaluation Engine
const calculateExpression = (expression: string) => {
  try {
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/\^/g, '^')
      .replace(/√\(/g, 'sqrt(');
    
    const result = evaluate(sanitized);
    return parseFloat(result.toFixed(8)).toString();
  } catch (error) {
    return "Syntax Error";
  }
};

export default function ScientificPage() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

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
    const isOperator = ['+', '-', '×', '÷', '^'].includes(val);
    if (result !== "" && !isOperator) {
      setDisplay(val);
      setResult("");
    } else {
      setDisplay((prev) => prev + val);
    }
  };

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

  // UPDATED BUTTON COMPONENT: Dimmer colors, higher contrast
  const Button = ({ label, onClick, className = "", variant = "default" }: any) => {
    const styles: any = {
      // Standard Numbers (Darker Gray, White Text)
      default: "bg-slate-700 text-slate-100 hover:bg-slate-600 shadow-[0_4px_0_rgb(30,41,59)]",
      // Functions like Sin/Cos (Dark Slate, slightly different tone)
      function: "bg-slate-800 text-slate-300 hover:bg-slate-700 shadow-[0_4px_0_rgb(15,23,42)] border border-slate-700",
      // Action keys like Clear (Dimmed Red/Orange)
      danger: "bg-red-900/80 text-red-100 hover:bg-red-800 shadow-[0_4px_0_rgb(69,10,10)]",
      warning: "bg-amber-900/80 text-amber-100 hover:bg-amber-800 shadow-[0_4px_0_rgb(67,20,7)]",
      // Equals button (Dimmed Blue)
      primary: "bg-blue-900 text-blue-100 hover:bg-blue-800 shadow-[0_4px_0_rgb(30,58,138)] border border-blue-800",
    };

    const baseClass = className.includes('bg-') ? className : styles[variant] || styles.default;

    return (
      <button
        onClick={onClick}
        className={`
          h-12 sm:h-14 rounded-md font-bold text-lg transition-all duration-100 active:scale-95 flex items-center justify-center select-none
          active:shadow-none translate-y-0 active:translate-y-1
          ${baseClass}
          ${className} 
        `}
      >
        {label}
      </button>
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-800">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
          <h1 className="text-slate-500 font-mono text-sm tracking-widest">SC-30XII EMULATOR</h1>
          <div className="h-2 w-16 bg-blue-900/50 rounded-full animate-pulse"></div>
        </div>

        {/* LCD Display - High Contrast */}
        <div className="bg-[#9ea792] p-4 rounded-lg mb-6 shadow-inner border-4 border-slate-800 font-mono relative">
          <div className="h-6 text-right text-slate-800 text-sm overflow-hidden whitespace-nowrap opacity-75">
            {display || "0"}
          </div>
          <div className="h-10 text-right text-black text-3xl font-bold overflow-hidden whitespace-nowrap">
            {result || (display ? "..." : "0")}
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button label="2nd" variant="function" className="text-yellow-500" onClick={() => {}} />
          <Button label="π" variant="function" onClick={() => handleInput('π')} />
          <Button label="sin" variant="function" onClick={() => handleInput('sin(')} />
          <Button label="cos" variant="function" onClick={() => handleInput('cos(')} />
          <Button label="tan" variant="function" onClick={() => handleInput('tan(')} />
          
          {/* Row 2 */}
          <Button label="x²" variant="function" onClick={() => handleInput('^2')} />
          <Button label="√" variant="function" onClick={() => handleInput('√(')} />
          <Button label="(" variant="function" onClick={() => handleInput('(')} />
          <Button label=")" variant="function" onClick={() => handleInput(')')} />
          
          {/* Editing Keys */}
          <Button 
            label={<RotateCcw size={20}/>} 
            variant="danger"
            onClick={clearAll} 
          />
          <Button label="^" variant="function" onClick={() => handleInput('^')} />
          <Button label="÷" variant="function" onClick={() => handleInput('÷')} />
          <Button 
             label={<Delete size={20}/>} 
             variant="warning"
             onClick={handleBackspace} 
           />

          {/* Numpad */}
          <Button label="7" onClick={() => handleInput('7')} />
          <Button label="8" onClick={() => handleInput('8')} />
          <Button label="9" onClick={() => handleInput('9')} />
          <Button label="×" variant="function" onClick={() => handleInput('×')} />

          <Button label="4" onClick={() => handleInput('4')} />
          <Button label="5" onClick={() => handleInput('5')} />
          <Button label="6" onClick={() => handleInput('6')} />
          <Button label="-" variant="function" onClick={() => handleInput('-')} />

          <Button label="1" onClick={() => handleInput('1')} />
          <Button label="2" onClick={() => handleInput('2')} />
          <Button label="3" onClick={() => handleInput('3')} />
          <Button label="+" variant="function" onClick={() => handleInput('+')} />

          <Button label="0" onClick={() => handleInput('0')} />
          <Button label="." onClick={() => handleInput('.')} />
          <Button label="(-)" onClick={() => handleInput('-')} />
          <Button 
            label="=" 
            variant="primary" 
            onClick={handleEquals} 
          />
        </div>
      </div>
    </main>
  );
}