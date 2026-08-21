import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RefreshCw, Zap, Sliders, Layers, Eye } from 'lucide-react';

export const MicroNanoCanvas = () => {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(true);
  const [voltage, setVoltage] = useState(50); // 10kV to 100kV
  const [spotSize, setSpotSize] = useState(5); // 2nm to 30nm
  const [baseDose, setBaseDose] = useState(180); // uC/cm2
  const [pecEnabled, setPecEnabled] = useState(true);
  const [resistTone, setResistTone] = useState('positive'); // positive (PMMA) or negative (HSQ)
  const [viewMode, setViewMode] = useState('both'); // psf, resist, both

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const render = () => {
      time += 0.05;

      const width = canvas.width;
      const height = canvas.height;

      // ── DARK CLEANROOM GRID BACKDROP (#1a1d21) ──
      ctx.fillStyle = '#1a1d21';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ── TOP SECTION: E-BEAM POINT SPREAD FUNCTION (PSF) & PROXIMITY FOGGING ──
      if (viewMode === 'both' || viewMode === 'psf') {
        const topH = viewMode === 'both' ? height * 0.48 : height - 20;

        // Title
        ctx.fillStyle = '#00a3e0';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('1. MONTE CARLO PSF & E-BEAM PROXIMITY DOSE DISTRIBUTION', 20, 25);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(`Voltage: ${voltage} kV  |  Spot Size: ${spotSize} nm  |  Dose: ${baseDose} µC/cm²  |  PEC: ${pecEnabled ? 'ENABLED (BEAMER)' : 'DISABLED (FOGGING)'}`, 20, 42);

        // Center line
        const centerY = topH * 0.65;
        const centerX = width / 2;

        // Calculate forward scatter alpha and backscatter beta
        const alpha = spotSize * 0.4; // forward scatter
        const beta = 120 * (voltage / 50); // backscatter range
        const eta = 0.7; // backscatter ratio

        // Draw PSF Curve
        ctx.beginPath();
        ctx.strokeStyle = pecEnabled ? '#23b14d' : '#f37021';
        ctx.lineWidth = 2.5;

        for (let x = 30; x < width - 30; x++) {
          const r = Math.abs(x - centerX);
          // Dual Gaussian PSF
          const fwd = (1 / (Math.PI * alpha * alpha)) * Math.exp(-(r * r) / (alpha * alpha * 10));
          const bwd = (eta / (Math.PI * beta * beta)) * Math.exp(-(r * r) / (beta * beta * 4));
          let energy = (fwd + bwd) * (baseDose / 100) * 1800;

          if (pecEnabled) {
            // PEC flattening out-of-field proximity fogging
            if (r > spotSize * 3) energy *= 0.15;
          } else {
            // Ripple animation for uncorrected proximity fogging
            if (r > spotSize * 2) energy += Math.sin(r * 0.1 + time) * 8;
          }

          const y = centerY - Math.min(energy, topH * 0.45);
          if (x === 30) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Fill PSF energy envelope
        ctx.lineTo(width - 30, centerY);
        ctx.lineTo(30, centerY);
        ctx.closePath();
        ctx.fillStyle = pecEnabled ? 'rgba(35, 177, 77, 0.12)' : 'rgba(243, 112, 33, 0.15)';
        ctx.fill();

        // Baseline
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(30, centerY);
        ctx.lineTo(width - 30, centerY);
        ctx.stroke();
      }

      // ── BOTTOM SECTION: 3D RESIST BAKE & DEVELOPMENT CONTOUR (LAB 3D) ──
      if (viewMode === 'both' || viewMode === 'resist') {
        const startY = viewMode === 'both' ? height * 0.52 : 30;
        const bottomH = viewMode === 'both' ? height * 0.42 : height - 50;

        // Title
        ctx.fillStyle = '#ffc20e';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(`2. LAB 3D RESIST PROFILE CONTOUR — ${resistTone.toUpperCase()} TONE (${resistTone === 'positive' ? 'PMMA / ZEP' : 'HSQ / SU-8'})`, 20, startY + 20);

        const substrateY = startY + bottomH - 25;
        const resistTopY = startY + bottomH - 110;
        const centerX = width / 2;

        // Draw Substrate Block (Silicon / Glass)
        ctx.fillStyle = '#334155';
        ctx.fillRect(40, substrateY, width - 80, 25);
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText('Silicon Substrate (300mm Wafer)', 50, substrateY + 16);

        // Draw Resist Layer
        ctx.beginPath();
        ctx.moveTo(40, resistTopY);

        const featureWidth = spotSize * 6;

        for (let x = 40; x <= width - 40; x++) {
          const dist = Math.abs(x - centerX);

          let depth = 0;
          if (dist < featureWidth) {
            // Profile shape based on PEC and Tone
            const profileFactor = pecEnabled ? 1 : 0.65 + Math.sin(x * 0.05 + time) * 0.1;
            depth = (1 - (dist / featureWidth) ** 2) * 85 * profileFactor;
          }

          if (resistTone === 'positive') {
            // PMMA positive tone: exposed region is dissolved away
            const profileY = resistTopY + depth;
            ctx.lineTo(x, Math.min(profileY, substrateY));
          } else {
            // HSQ negative tone: unexposed region is dissolved away
            const profileY = (dist < featureWidth) ? resistTopY : substrateY;
            ctx.lineTo(x, profileY);
          }
        }

        ctx.lineTo(width - 40, substrateY);
        ctx.lineTo(40, substrateY);
        ctx.closePath();

        // Resist Color (PMMA blue-green vs HSQ amber)
        const resistGrad = ctx.createLinearGradient(0, resistTopY, 0, substrateY);
        if (resistTone === 'positive') {
          resistGrad.addColorStop(0, '#0066b2');
          resistGrad.addColorStop(1, '#00a3e0');
        } else {
          resistGrad.addColorStop(0, '#f37021');
          resistGrad.addColorStop(1, '#ffc20e');
        }
        ctx.fillStyle = resistGrad;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Line-width indicator annotations
        ctx.strokeStyle = '#23b14d';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - featureWidth, resistTopY - 10);
        ctx.lineTo(centerX + featureWidth, resistTopY - 10);
        ctx.stroke();

        ctx.fillStyle = '#23b14d';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`CD Line-Width: ${(featureWidth * 0.6).toFixed(1)} nm`, centerX, resistTopY - 14);
        ctx.textAlign = 'left';
      }

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning, voltage, spotSize, baseDose, pecEnabled, resistTone, viewMode]);

  return (
    <div className="bg-[#2d3136] rounded-2xl border border-slate-700 shadow-2xl p-4 sm:p-6 text-white">
      
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00a3e0]" />
            <h3 className="text-lg font-bold text-white">MicroNanoFab 2D Lithography &amp; PEC Physics Simulator</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time Point Spread Function (PSF), Proximity Effect Correction (BEAMER), and 3D Resist Development (LAB 3D).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${isRunning ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-[#23b14d] hover:bg-[#1e9942] text-white'}`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause Sim' : 'Run Sim'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#1a1d21] shadow-inner mb-6">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={420} 
          className="w-full h-auto block"
        />
      </div>

      {/* Control Sliders & Configuration Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-[#3f444a] p-4 rounded-xl border border-slate-700">
        
        {/* Voltage Selector */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1">
            <span className="text-slate-300">Acceleration Voltage</span>
            <span className="text-[#00a3e0] font-mono">{voltage} kV</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            step="5"
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full accent-[#00a3e0] cursor-pointer"
          />
        </div>

        {/* Beam Spot Size */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1">
            <span className="text-slate-300">Beam Spot Size</span>
            <span className="text-[#00a3e0] font-mono">{spotSize} nm</span>
          </div>
          <input 
            type="range" 
            min="2" 
            max="30" 
            step="1"
            value={spotSize}
            onChange={(e) => setSpotSize(Number(e.target.value))}
            className="w-full accent-[#00a3e0] cursor-pointer"
          />
        </div>

        {/* Base Exposure Dose */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1">
            <span className="text-slate-300">Base Dose</span>
            <span className="text-[#00a3e0] font-mono">{baseDose} µC/cm²</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="400" 
            step="10"
            value={baseDose}
            onChange={(e) => setBaseDose(Number(e.target.value))}
            className="w-full accent-[#00a3e0] cursor-pointer"
          />
        </div>

        {/* PEC Toggle & Resist Tone */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">PEC Correction (BEAMER)</span>
            <button 
              onClick={() => setPecEnabled(!pecEnabled)}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${pecEnabled ? 'bg-[#23b14d] text-white' : 'bg-slate-700 text-slate-400'}`}
            >
              {pecEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-semibold text-slate-300">Resist Tone</span>
            <select 
              value={resistTone}
              onChange={(e) => setResistTone(e.target.value)}
              className="bg-[#2d3136] text-white text-[11px] font-semibold border border-slate-600 rounded px-2 py-0.5 focus:outline-none"
            >
              <option value="positive">Positive (PMMA/ZEP)</option>
              <option value="negative">Negative (HSQ/SU-8)</option>
            </select>
          </div>
        </div>

      </div>

    </div>
  );
};
