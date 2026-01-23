"use client";

import React, { useState, useEffect, useRef } from 'react';
import { evaluate, format, fraction } from 'mathjs';
import { RotateCcw, Delete, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScientificPage() {
  const [display, setDisplay] = useState("");      // Current input equation
  const [result, setResult] = useState("");        // Calculated result
  const [isSecond, setIsSecond] = useState(false); // State for the "2nd" key
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG"); // DEG vs RAD
  const [memory, setMemory] = useState<string>("0");

  // --- ENGINE: The Math Logic ---
  
  const handleCalculate = () => {
    if (!display) return;
    try {
      // 1. Sanitize for MathJS
      let sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/√\(/g, 'sqrt(')
        .replace(/\^/g, '^')
        .replace(/log\(/g, 'log10(') // TI-30 'log' is base 10
        .replace(/ln\(/g, 'log(');   // TI-30 'ln' is natural log

      // 2. Handle Degrees vs Radians for Trig
      // MathJS defaults to Rad. If DEG mode, we convert inputs: sin(90 deg)
      if (angleMode === "DEG") {
        sanitized = sanitized.replace(/sin\(([^)]+)\)/g, 'sin($1 deg)');
        sanitized = sanitized.replace(/cos\(([^)]+)\)/g, 'cos($1 deg)');
        sanitized = sanitized.replace(/tan\(([^)]+)\)/g, 'tan($1 deg)');
      }

      const res = evaluate(sanitized);
      
      // Format: remove trailing zeros, limit precision
      const finalString = format(res, { precision: 10, lowerExp: -9, upperExp: 9 });
      setResult(finalString);
      setIsSecond(false); // Reset shift after calculation
    } catch (e) {
      setResult("Syntax Error");
    }
  };

  // --- ACTIONS: Special Buttons ---

  const handleInput = (val: string) => {
    // If we just calculated something and type a number, start new.
    // If we type an operator, append to result.
    const isOperator = ['+', '-', '×', '÷', '^', 'x²'].includes(val);
    
    if (result && !isOperator) {
      setDisplay(val);
      setResult("");
    } else if (result && isOperator) {
      setDisplay(result + val);
      setResult("");
    } else {
      setDisplay(prev => prev + val);
    }
  };

  const toggleSecond = () => setIsSecond(!isSecond);

  const handleClear = () => {
    setDisplay("");
    setResult("");
    setIsSecond(false);
  };

  const handleBackspace = () => {
    setDisplay(prev => prev.slice(0, -1));
  };

  // The "F<>D" (Fraction to Decimal) Feature
  const handleFractionToggle = () => {
    if (!result) return;
    try {
      if (result.includes('/')) {
        // Is fraction -> convert to decimal
        const res = evaluate(result);
        setResult(res.toString());
      } else {
        // Is decimal -> convert to fraction
        const f = fraction(parseFloat(result));
        setResult(`${f.n}/${f.d}`); // Returns improper fractions (e.g., 5/2 instead of 2 1/2) which is standard for web math
      }
    } catch (e) {
      // ignore
    }
  };

  // --- UI COMPONENTS ---

  // The Calculator Button with "Shift" Label Support
  const CalcBtn = ({ 
    primary, 
    secondary, 
    onClick, 
    variant = "gray",
    className = "" 
  }: { 
    primary: React.ReactNode; 
    secondary?: string; // The yellow text above
    onClick: () => void;
    variant?: "gray" | "black" | "blue" | "accent";
    className?: string;
  }) => {
    
    // Logic: If 'isSecond' is active and this button has a secondary function,
    // the click might need to handle the secondary action.
    // For this UI demo, we assume the parent 'onClick' handles the logic branching 
    // or we simply pass the logic in.
    
    const colors = {
      gray: "bg-slate-300 text-slate-900 border-b-4 border-slate-400 active:border-b-0 active:translate-y-1",
      black: "bg-slate-800 text-white border-b-4 border-slate-950 active:border-b-0 active:translate-y-1", // Number keys
      blue: "bg-blue-600 text-white border-b-4 border-blue-800 active:border-b-0 active:translate-y-1",
      accent: "bg-cyan-700 text-white border-b-4 border-cyan-900 active:border-b-0 active:translate-y-1", // The "2nd" key itself
    };

    return (
      <div className={`flex flex-col items-center justify-end h-full gap-1 ${className}`}>
        {/* The Secondary Label (Yellow Text) */}
        <span className={`text-[10px] font-bold tracking-tighter h-3 ${isSecond ? 'text-yellow-400 animate-pulse' : 'text-yellow-600'}`}>
          {secondary || "\u00A0"}
        </span>
        
        {/* The Physical Button */}
        <button
          onClick={onClick}
          className={`
            w-full h-12 rounded-lg font-bold text-lg transition-all shadow-lg
            flex items-center justify-center
            ${colors[variant]}
          `}
        >
          {primary}
        </button>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      
      {/* CASE CHASSIS */}
      <div className="w-full max-w-md bg-slate-800 rounded-[30px] shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 border border-slate-700 relative overflow-hidden">
        
        {/* SOLAR PANEL / BRANDING */}
        <div className="flex justify-between items-end mb-6 px-2">
          <div>
            <h1 className="text-slate-400 font-bold tracking-widest text-xs">TEXAS INSTRUMENTS</h1>
            <h2 className="text-slate-200 font-bold tracking-widest text-lg">TI-30X <span className="text-yellow-500 italic">II</span>S</h2>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-8 bg-[#3a2f28] rounded border border-slate-600 shadow-inner opacity-80 mb-1"></div>
            <span className="text-[9px] text-slate-500 uppercase">Solar</span>
          </div>
        </div>

        {/* LCD DISPLAY */}
        <div className="bg-[#c2cbad] p-3 rounded-lg mb-6 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] border-8 border-slate-700 relative">
          {/* Status Indicators */}
          <div className="h-4 flex justify-between text-[10px] font-mono text-slate-800 px-1 opacity-80">
            <span>{isSecond ? "2nd" : ""}</span>
            <span>{angleMode}</span>
            <span>{memory !== "0" ? "MEM" : ""}</span>
          </div>
          
          {/* Input Line (Scrolling) */}
          <div className="h-6 text-left text-slate-900 font-mono text-sm whitespace-nowrap overflow-hidden border-b border-slate-800/10">
            {display || ""}
            <span className="animate-pulse">_</span>
          </div>
          
          {/* Result Line */}
          <div className="h-10 text-right text-slate-900 font-mono text-4xl font-bold overflow-hidden whitespace-nowrap mt-1">
            {result || "0"}
          </div>
        </div>

        {/* KEYPAD AREA */}
        <div className="grid grid-cols-5 gap-x-2 gap-y-1">
          
          {/* ROW 1: 2nd, Mode, Delete, Arrows */}
          <CalcBtn 
            primary="2nd" 
            variant="accent"
            onClick={toggleSecond} 
          />
          <CalcBtn 
            primary="DRG" 
            secondary="DRG>" 
            onClick={() => setAngleMode(prev => prev === "DEG" ? "RAD" : "DEG")} 
          />
          <CalcBtn 
            primary="DEL" 
            secondary="INS" 
            onClick={handleBackspace} 
          />
          <CalcBtn 
            primary={<ChevronLeft size={20} />} 
            onClick={() => {}} 
          />
           <CalcBtn 
            primary={<ChevronRight size={20} />} 
            onClick={() => {}} 
          />

          {/* ROW 2: Functions */}
          <CalcBtn 
            primary="π" 
            secondary="e"
            variant="black" 
            onClick={() => handleInput(isSecond ? 'e' : 'π')} 
          />
          <CalcBtn 
            primary="SIN" 
            secondary="SIN⁻¹" 
            variant="black"
            onClick={() => handleInput(isSecond ? 'asin(' : 'sin(')} 
          />
          <CalcBtn 
            primary="COS" 
            secondary="COS⁻¹" 
            variant="black"
            onClick={() => handleInput(isSecond ? 'acos(' : 'cos(')} 
          />
          <CalcBtn 
            primary="TAN" 
            secondary="TAN⁻¹" 
            variant="black"
            onClick={() => handleInput(isSecond ? 'atan(' : 'tan(')} 
          />
          <CalcBtn 
            primary="÷" 
            secondary="K" 
            variant="blue"
            onClick={() => handleInput('÷')} 
          />

          {/* ROW 3: More Functions & 789 */}
          <CalcBtn 
            primary="x²" 
            secondary="√" 
            variant="black"
            onClick={() => handleInput(isSecond ? '√(' : '^2')} 
          />
          <CalcBtn 
            primary="7" 
            secondary="Σ" 
            variant="gray"
            onClick={() => handleInput('7')} 
          />
          <CalcBtn 
            primary="8" 
            variant="gray"
            onClick={() => handleInput('8')} 
          />
          <CalcBtn 
            primary="9" 
            variant="gray"
            onClick={() => handleInput('9')} 
          />
          <CalcBtn 
            primary="×" 
            secondary="" 
            variant="blue"
            onClick={() => handleInput('×')} 
          />

          {/* ROW 4: 456 */}
          <CalcBtn 
            primary="10ⁿ" 
            secondary="LOG" 
            variant="black"
            onClick={() => handleInput(isSecond ? 'log(' : '10^')} 
          />
          <CalcBtn 
            primary="4" 
            variant="gray"
            onClick={() => handleInput('4')} 
          />
          <CalcBtn 
            primary="5" 
            variant="gray"
            onClick={() => handleInput('5')} 
          />
          <CalcBtn 
            primary="6" 
            variant="gray"
            onClick={() => handleInput('6')} 
          />
          <CalcBtn 
            primary="-" 
            variant="blue"
            onClick={() => handleInput('-')} 
          />

          {/* ROW 5: 123 */}
          <CalcBtn 
            primary="LN" 
            secondary="eⁿ" 
            variant="black"
            onClick={() => handleInput(isSecond ? 'e^' : 'ln(')} 
          />
          <CalcBtn 
            primary="1" 
            variant="gray"
            onClick={() => handleInput('1')} 
          />
          <CalcBtn 
            primary="2" 
            variant="gray"
            onClick={() => handleInput('2')} 
          />
          <CalcBtn 
            primary="3" 
            variant="gray"
            onClick={() => handleInput('3')} 
          />
          <CalcBtn 
            primary="+" 
            secondary="MEMVAR" 
            variant="blue"
            onClick={() => handleInput('+')} 
          />

          {/* ROW 6: Bottom */}
          <CalcBtn 
            primary="ON/AC" 
            variant="black"
            onClick={handleClear} 
          />
          <CalcBtn 
            primary="0" 
            variant="gray"
            onClick={() => handleInput('0')} 
          />
          <CalcBtn 
            primary="." 
            secondary="F<>D" 
            variant="gray"
            onClick={() => isSecond ? handleFractionToggle() : handleInput('.')} 
          />
          <CalcBtn 
            primary="(-)" 
            secondary="%" 
            variant="gray"
            onClick={() => isSecond ? handleInput('%') : handleInput('-')} 
          />
          <CalcBtn 
            primary="ENTER" 
            variant="blue"
            onClick={handleCalculate} 
          />

        </div>
      </div>
    </main>
  );
}