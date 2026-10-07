import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CinematicBackground() {
  const canvasRef = useRef(null);
  const timecodeRef = useRef(null);
  const [hudVisible] = useState(true);

  // High-performance timecode update via direct DOM ref (0 React re-renders)
  useEffect(() => {
    let frame = 16;
    let sec = 28;
    let min = 14;
    let hr = 0;

    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
          if (min >= 60) {
            min = 0;
            hr++;
          }
        }
      }
      const pad = (n) => n.toString().padStart(2, '0');
      if (timecodeRef.current) {
        timecodeRef.current.textContent = `${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(frame)}`;
      }
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  // Ambient Canvas: Bokeh Orbs, Anamorphic Flares, Dust Motes & Film Light Leaks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating Bokeh Orbs (camera lens blur)
    const bokehParticles = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 65 + 25,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      baseAlpha: Math.random() * 0.05 + 0.015,
      hue: Math.random() > 0.6 ? 38 : 210, // Warm gold or anamorphic cyan
      pulseSpeed: Math.random() * 0.015 + 0.005,
      pulse: Math.random() * Math.PI,
    }));

    // Floating Camera Focus Boxes (simulating camera autofocus points searching & locking)
    const focusBoxes = Array.from({ length: 4 }, () => ({
      x: Math.random() * (width - 200) + 100,
      y: Math.random() * (height - 200) + 100,
      targetX: Math.random() * (width - 200) + 100,
      targetY: Math.random() * (height - 200) + 100,
      size: Math.random() * 30 + 35,
      alpha: 0,
      state: 'searching', // 'searching' | 'locked'
      timer: 0,
    }));

    // Anamorphic horizontal light beam streaks
    const lightStreaks = [
      { y: height * 0.25, width: width * 0.7, opacity: 0.03, speed: 0.001, offset: 0 },
      { y: height * 0.65, width: width * 0.9, opacity: 0.025, speed: 0.0015, offset: Math.PI }
    ];

    let lastTime = 0;

    const render = (currentTime) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Anamorphic Horizontal Flares
      lightStreaks.forEach((streak) => {
        streak.offset += streak.speed;
        const currentY = streak.y + Math.sin(streak.offset) * 40;
        const grad = ctx.createRadialGradient(
          width / 2, currentY, 0,
          width / 2, currentY, width * 0.55
        );
        grad.addColorStop(0, `rgba(230, 185, 128, ${streak.opacity * (1 + Math.sin(streak.offset * 2) * 0.4)})`);
        grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.015)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, currentY - 60, width, 120);
      });

      // 2. Draw Floating Lens Bokeh Orbs
      bokehParticles.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.pulse += b.pulseSpeed;

        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        const currentAlpha = b.baseAlpha * (0.8 + Math.sin(b.pulse) * 0.4);

        const radGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        if (b.hue === 38) {
          // Warm cinematic amber/gold
          radGrad.addColorStop(0, `rgba(245, 158, 11, ${currentAlpha * 1.5})`);
          radGrad.addColorStop(0.7, `rgba(230, 185, 128, ${currentAlpha * 0.5})`);
          radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          // Anamorphic cyan flare
          radGrad.addColorStop(0, `rgba(6, 182, 212, ${currentAlpha * 1.3})`);
          radGrad.addColorStop(0.7, `rgba(14, 165, 233, ${currentAlpha * 0.4})`);
          radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();
      });

      // 3. Draw Camera Autofocus Tracking Reticles
      focusBoxes.forEach((f) => {
        f.x += (f.targetX - f.x) * 0.02;
        f.y += (f.targetY - f.y) * 0.02;
        f.timer += 0.02;

        if (Math.abs(f.x - f.targetX) < 10 && Math.abs(f.y - f.targetY) < 10) {
          f.targetX = Math.random() * (width - 240) + 120;
          f.targetY = Math.random() * (height - 240) + 120;
          f.state = Math.random() > 0.5 ? 'locked' : 'searching';
        }

        const isLocked = f.state === 'locked';
        const strokeColor = isLocked ? 'rgba(230, 185, 128, 0.22)' : 'rgba(255, 255, 255, 0.12)';
        const bracketLen = 8;
        const half = f.size / 2;

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1;

        // Top-Left Corner
        ctx.beginPath();
        ctx.moveTo(f.x - half, f.y - half + bracketLen);
        ctx.lineTo(f.x - half, f.y - half);
        ctx.lineTo(f.x - half + bracketLen, f.y - half);
        ctx.stroke();

        // Top-Right Corner
        ctx.beginPath();
        ctx.moveTo(f.x + half - bracketLen, f.y - half);
        ctx.lineTo(f.x + half, f.y - half);
        ctx.lineTo(f.x + half, f.y - half + bracketLen);
        ctx.stroke();

        // Bottom-Left Corner
        ctx.beginPath();
        ctx.moveTo(f.x - half, f.y + half - bracketLen);
        ctx.lineTo(f.x - half, f.y + half);
        ctx.lineTo(f.x - half + bracketLen, f.y + half);
        ctx.stroke();

        // Bottom-Right Corner
        ctx.beginPath();
        ctx.moveTo(f.x + half - bracketLen, f.y + half);
        ctx.lineTo(f.x + half, f.y + half);
        ctx.lineTo(f.x + half, f.y + half - bracketLen);
        ctx.stroke();

        // Tiny center crosshair dot
        if (isLocked) {
          ctx.fillStyle = 'rgba(230, 185, 128, 0.4)';
          ctx.fillRect(f.x - 1, f.y - 1, 2, 2);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Background Interactive Ambient Canvas (behind page content) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-70"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Floating Studio Spotlight Rays from Top */}
      <div className="fixed -top-40 left-1/4 w-[50vw] h-[60vh] bg-gradient-to-b from-[#e6b980]/[0.035] via-[#e6b980]/[0.008] to-transparent transform -rotate-12 blur-3xl pointer-events-none z-0" />
      <div className="fixed -top-40 right-1/4 w-[40vw] h-[65vh] bg-gradient-to-b from-[#06b6d4]/[0.025] via-transparent to-transparent transform rotate-12 blur-3xl pointer-events-none z-0" />

      {/* Cinematic Camera Viewfinder Framing Overlays */}
      {hudVisible && (
        <div className="fixed inset-0 pointer-events-none z-20 select-none overflow-hidden text-[10px] font-mono text-neutral-400">
          {/* Top-Left: Blinking REC Tally & Timecode */}
          <div className="fixed top-24 left-6 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] backdrop-blur-md shadow-lg">
            <span className="flex items-center gap-1.5 text-red-500 font-bold tracking-widest text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
              <span>REC</span>
            </span>
            <span ref={timecodeRef} className="text-white font-mono tracking-wider font-semibold">00:14:28:16</span>
            <span className="text-[#e6b980] border-l border-white/10 pl-2">8K RAW</span>
          </div>

          {/* Top-Right: Cinema Exposure & Audio VU Meters */}
          <div className="fixed top-24 right-6 hidden md:flex items-center gap-4 px-3.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">FPS:</span>
              <span className="text-white font-semibold">24.00</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">SHTR:</span>
              <span className="text-white font-semibold">1/48</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">ISO:</span>
              <span className="text-[#e6b980] font-semibold">800</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-3">
              <span className="text-neutral-500">WB:</span>
              <span className="text-white font-semibold">5600K</span>
            </div>

            {/* Simulated Live Audio VU meter bars */}
            <div className="flex items-center gap-0.5 h-3 ml-1">
              <span className="w-1 h-3 bg-emerald-500/80 rounded-sm animate-pulse" />
              <span className="w-1 h-2 bg-emerald-500/80 rounded-sm animate-pulse delay-75" />
              <span className="w-1 h-3.5 bg-emerald-500/80 rounded-sm animate-pulse delay-150" />
              <span className="w-1 h-2.5 bg-amber-400/80 rounded-sm animate-pulse delay-200" />
              <span className="w-1 h-1 bg-red-500/60 rounded-sm animate-pulse delay-300" />
            </div>
          </div>

          {/* Viewfinder 4-Corner Framing Brackets */}
          <div className="fixed top-20 left-4 w-6 h-6 border-t-2 border-l-2 border-[#e6b980]/20 pointer-events-none hidden lg:block" />
          <div className="fixed top-20 right-4 w-6 h-6 border-t-2 border-r-2 border-[#e6b980]/20 pointer-events-none hidden lg:block" />
          <div className="fixed bottom-20 left-4 w-6 h-6 border-b-2 border-l-2 border-[#e6b980]/20 pointer-events-none hidden lg:block" />
          <div className="fixed bottom-20 right-4 w-6 h-6 border-b-2 border-r-2 border-[#e6b980]/20 pointer-events-none hidden lg:block" />

          {/* Rule of Thirds Subtle Center Focus Mark */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-20 hidden md:block">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white" />
          </div>

          {/* Bottom Left Film Strip Gauge */}
          <div className="fixed bottom-6 left-6 hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-white/[0.06] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">
              AVSR VISION PRO MONITOR • 2.39:1 CINEMASCOPE
            </span>
          </div>
        </div>
      )}
    </>
  );
}
