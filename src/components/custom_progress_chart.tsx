'use client';
import { useEffect, useRef, useState } from 'react';

interface CircleProgressProps {
  percent: number; // 0 ~ 100
  size?: number; // px
  strokeWidth?: number;
  className?: string;
  gradient?: [string, string]; // [startColor, endColor]
  duration?: number; // 動畫時間（毫秒）
}

export default function CircleProgress({
  percent,
  size = 160,
  strokeWidth = 10,
  className = '',
  gradient = ['#00a1ff', '#00ff95'],
  duration = 1500,
}: CircleProgressProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    let startAngle = -Math.PI / 2; // 從正上方開始
    let currentPercent = 0;
    let startTime: number | null = null;

    const gradientFill = ctx.createLinearGradient(0, 0, size, size);
    gradientFill.addColorStop(0, gradient[0]);
    gradientFill.addColorStop(1, gradient[1]);

    const draw = (progress: number) => {
      ctx.clearRect(0, 0, size, size);

      // 背景圓
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#e5e7eb'; // Tailwind gray-200
      ctx.lineWidth = strokeWidth;
      ctx.stroke();

      // 外圈進度
      ctx.beginPath();
      ctx.arc(center, center, radius, startAngle, startAngle + (2 * Math.PI * progress) / 100);
      ctx.strokeStyle = gradientFill;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      // 中間文字
      ctx.font = `bold ${size / 4}px sans-serif`;
      ctx.fillStyle = '#374151'; // Tailwind gray-700
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(progress)}%`, center, center);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min((elapsed / duration) * percent, percent);
      currentPercent = progress;
      draw(progress);
      setDisplayPercent(progress);
      if (progress < percent) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percent, size, strokeWidth, gradient, duration]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`block ${className}`}
    />
  );
}
