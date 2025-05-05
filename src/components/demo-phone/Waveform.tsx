import React, { useEffect, useRef, useCallback } from 'react';

interface WaveformProps {
  className?: string;
  width?: number;
  height?: number;
  // --- Style & Behavior Controls ---
  barColor?: { r: number; g: number; b: number }; // Base color RGB
  glowColor?: { r: number; g: number; b: number }; // Glow color RGB
  barWidthRatio?: number; // Ratio of bar width to total space (bar+gap)
  fftSize?: number; // Must be power of 2 (e.g., 64, 128, 256) - controls bar count
  smoothingTimeConstant?: number; // 0 to 1, higher is smoother
  centerEmphasis?: number; // Multiplier for center bar height (e.g., 1.0)
  edgeEmphasis?: number; // Multiplier for edge bar height (e.g., 0.3)
  centerAlpha?: number; // Opacity for center bars (0 to 1)
  edgeAlpha?: number; // Opacity for edge bars (0 to 1)
  maxHeightRatio?: number; // Max bar height as ratio of canvas height/2
}

const Waveform: React.FC<WaveformProps> = ({
  className,
  width = 300,
  height = 100,
  // --- Default calm theme ---
  barColor = { r: 118, g: 215, b: 196 }, // Soft Teal (#76d7c4)
  glowColor = { r: 163, g: 228, b: 215 }, // Lighter Teal Glow (#a3e4d7)
  barWidthRatio = 0.7, // 70% bar, 30% gap
  fftSize = 128, // Number of bars = fftSize / 2
  smoothingTimeConstant = 0.8,
  centerEmphasis = 1.0, // Center bars can reach full height multiplier
  edgeEmphasis = 0.3,  // Edge bars reach only 30% of full height multiplier
  centerAlpha = 1.0,   // Center bars fully opaque
  edgeAlpha = 0.2,     // Edge bars fade to 20% opacity
  maxHeightRatio = 0.8, // Max bar half-height is 80% of canvas half-height
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const audioContextRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();
  const dataArrayRef = useRef<Uint8Array>();
  const sourceRef = useRef<MediaStreamAudioSourceNode>();
  const streamRef = useRef<MediaStream>();

  const draw = useCallback(() => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const canvas = canvasRef.current;

    if (!analyser || !dataArray || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    analyser.getByteFrequencyData(dataArray); // Get frequency data

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barCount = analyser.frequencyBinCount;
    const centerY = canvas.height / 2;
    const maxPossibleHalfHeight = centerY * Math.max(0.1, Math.min(1.0, maxHeightRatio)); // Clamp ratio

    // Bar spacing calculations
    const totalBarSpace = canvas.width / barCount;
    const barWidth = totalBarSpace * Math.max(0.1, Math.min(0.9, barWidthRatio));
    const gap = totalBarSpace - barWidth;
    const radius = barWidth / 2;

    // Start drawing position (centers the group)
    let x = gap / 2; // Start with half a gap

    const centerIndex = barCount / 2;
    const maxDistance = centerIndex; // Max distance from center index

    ctx.shadowBlur = 8; // Example glow blur

    for (let i = 0; i < barCount; i++) {
      const value = dataArray[i]; // 0-255

      // --- Calculate Emphasis & Fade ---
      const distanceFromCenter = Math.abs(i - centerIndex);
      const normalizedDistance = maxDistance > 0 ? Math.min(1.0, distanceFromCenter / maxDistance) : 0;

      // Cosine interpolation for smooth falloff
      const cosFactor = (Math.cos(normalizedDistance * Math.PI) + 1) / 2; // 1 at center, 0 at edges

      const emphasisScale = edgeEmphasis + (centerEmphasis - edgeEmphasis) * cosFactor;
      const edgeFadeAlpha = edgeAlpha + (centerAlpha - edgeAlpha) * cosFactor;

      // --- Calculate Bar Height ---
      const scaledValue = (value / 255) * emphasisScale;
      const barHalfHeight = Math.max(radius, scaledValue * maxPossibleHalfHeight); // Ensure min height is radius for caps
      // Use Math.max(0, ...) if you want bars to disappear completely instead of minimum radius height
      // const barHalfHeight = Math.max(0, scaledValue * maxPossibleHalfHeight);

      // --- Calculate Bar Coordinates ---
      const topY = centerY - barHalfHeight;
      const bottomY = centerY + barHalfHeight;

      // --- Set Style (Color, Glow, Opacity) ---
      const currentBarColor = `rgba(${barColor.r}, ${barColor.g}, ${barColor.b}, ${edgeFadeAlpha})`;
      const currentGlowColor = `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${edgeFadeAlpha * 0.8})`; // Glow slightly less opaque

      ctx.fillStyle = currentBarColor;
      ctx.shadowColor = currentGlowColor;


      // --- Draw Bar with Rounded Ends ---
      // Only draw if height is sufficient (at least radius for caps)
      if (barHalfHeight >= radius) {
          ctx.beginPath();
          // Start near top-left, go over the top arc
          ctx.moveTo(x, topY + radius);
          ctx.arc(x + radius, topY + radius, radius, Math.PI, 0); // Top arc
          // Right side
          ctx.lineTo(x + barWidth, bottomY - radius);
          // Bottom arc
          ctx.arc(x + radius, bottomY - radius, radius, 0, Math.PI); // Bottom arc
          // Left side
          ctx.lineTo(x, topY + radius);
          ctx.closePath();
          ctx.fill();
      } else if (barHalfHeight > 0) {
          // Optional: Draw a small circle or thin line if height is very small but non-zero
          // Example: Draw a small circle
          ctx.beginPath();
          ctx.arc(x + radius, centerY, barHalfHeight, 0, Math.PI * 2); // Use barHalfHeight as radius
          ctx.fill();
      }


      // Move to next bar position
      x += totalBarSpace;
    }

    // Request next frame
    animationFrameId.current = requestAnimationFrame(draw);

  // Add relevant props to dependency array
  }, [height, width, barColor, glowColor, barWidthRatio, centerEmphasis, edgeEmphasis, centerAlpha, edgeAlpha, maxHeightRatio]);

  useEffect(() => {
    let isMounted = true;

    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        streamRef.current = stream;
        if (!isMounted) { stream.getTracks().forEach(track => track.stop()); return; };

        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = context;

        const src = context.createMediaStreamSource(stream);
        sourceRef.current = src;
        const anl = context.createAnalyser();

        // --- Configuration ---
        anl.fftSize = fftSize;
        anl.smoothingTimeConstant = Math.max(0, Math.min(1, smoothingTimeConstant)); // Clamp 0-1

        const bufferLength = anl.frequencyBinCount;
        const dataArr = new Uint8Array(bufferLength);

        src.connect(anl);
        analyserRef.current = anl;
        dataArrayRef.current = dataArr;

        draw(); // Start drawing

      } catch (err) {
        console.error('Error setting up audio:', err);
      }
    };

    setupAudio();

    // Cleanup
    return () => {
      isMounted = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      streamRef.current?.getTracks().forEach(track => track.stop());
      sourceRef.current?.disconnect();
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close().catch(console.warn);
      }
      // Clear refs
      audioContextRef.current = undefined;
      analyserRef.current = undefined;
      dataArrayRef.current = undefined;
      sourceRef.current = undefined;
      streamRef.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw, fftSize, smoothingTimeConstant]); // Effect depends on draw and setup params

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`${className} bg-transparent`}
    />
  );
};

export default Waveform;