import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let gridOffset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      fadeDir: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 1.6 + 0.4;
        this.speedY = Math.random() * 0.22 + 0.06;
        this.opacity = Math.random() * 0.22 + 0.06;
        this.fadeDir = Math.random() > 0.5 ? 1 : -1;
      }

      update(canvasHeight: number) {
        this.y -= this.speedY;
        if (this.y < 0) {
          this.y = canvasHeight;
        }
        
        this.opacity += this.fadeDir * 0.005;
        if (this.opacity >= 0.28 || this.opacity <= 0.06) {
          this.fadeDir *= -1;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13, 187, 99, ${this.opacity})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 24000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const drawGrid = () => {
      const gridSize = 72;
      ctx.strokeStyle = 'rgba(90, 110, 140, 0.025)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines with slow scroll effect
      for (let y = (gridOffset % gridSize) - gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      gridOffset += 0.08;
    };

    const drawGlow = () => {
      // Top-right glow
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.85, canvas.height * 0.15, 0,
        canvas.width * 0.85, canvas.height * 0.15, canvas.width * 0.4
      );
      gradient1.addColorStop(0, 'rgba(13, 187, 99, 0.045)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bottom-left glow
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.1, canvas.height * 0.9, 0,
        canvas.width * 0.1, canvas.height * 0.9, canvas.width * 0.35
      );
      gradient2.addColorStop(0, 'rgba(45, 108, 223, 0.08)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawGlow();

      particles.forEach(p => {
        p.update(canvas.height);
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#000000' }}
    />
  );
}
