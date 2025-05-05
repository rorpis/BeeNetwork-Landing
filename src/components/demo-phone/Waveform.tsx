import React, { useEffect, useRef, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

interface WaveformProps {
  className?: string;
  width?: number;
  height?: number;
  // Audio element reference for visualization
  audioRef?: React.RefObject<HTMLAudioElement>;
  // Use microphone as fallback if no audio element provided
  useMicrophone?: boolean;
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
  audioRef,
  useMicrophone = false,
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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const timeRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const prevValueRef = useRef<Float32Array | null>(null);
  
  // Realistic speech patterns - these create a more natural looking waveform
  // Based on common frequency distribution in human speech
  const generateSpeechPattern = useCallback((bufferLength: number, time: number) => {
    const dataArray = new Float32Array(bufferLength);
    
    // Speech has more energy in lower-mid frequencies with occasional peaks
    // We'll simulate this with a combination of sine waves and noise
    
    // Base frequency - slow oscillation that forms the "rhythm" of speech
    const rhythmFreq = 2.5;
    const rhythmAmplitude = isAudioPlaying ? 0.4 : 0.1;
    
    // Speaking pulse - faster oscillation that represents syllable patterns
    const syllableFreq = 8;
    const syllableAmplitude = isAudioPlaying ? 0.3 : 0.05;
    
    // Micro variations - fast changes that give texture to speech
    const microFreq = 20;
    const microAmplitude = isAudioPlaying ? 0.15 : 0.02;
    
    // Baseline value - minimum energy across the spectrum
    const baseline = isAudioPlaying ? 0.2 : 0.05;
    
    // Variance for each frequency band - makes certain frequencies more active
    const frequencyVariance = 0.6;
    
    // For more realistic transitions between frames
    let prevValues = prevValueRef.current;
    if (!prevValues || prevValues.length !== bufferLength) {
      prevValues = new Float32Array(bufferLength);
      for (let i = 0; i < bufferLength; i++) prevValues[i] = 0;
    }
    
    // Smoothing factor for transitions - higher = smoother
    const smoothingFactor = 0.7;
    
    for (let i = 0; i < bufferLength; i++) {
      // Create frequency-dependent behavior
      const normalizedFreq = i / bufferLength;
      
      // Human speech energy distribution - mid frequencies most active
      const frequencyEnvelope = Math.sin(normalizedFreq * Math.PI) * frequencyVariance;
      
      // Combined oscillations to create pattern
      const rhythm = Math.sin(time * rhythmFreq) * rhythmAmplitude;
      const syllable = Math.sin(time * syllableFreq + i * 0.2) * syllableAmplitude;
      const micro = Math.sin(time * microFreq + i * 0.7) * microAmplitude;
      
      // Add some randomness for texture
      const noise = Math.random() * (isAudioPlaying ? 0.1 : 0.02);
      
      // Combine all factors
      let rawValue = baseline + (rhythm + syllable + micro) * frequencyEnvelope + noise;
      
      // Make sure center frequencies are generally more active
      const centerBoost = 1 - Math.abs(normalizedFreq - 0.5) * 2;
      rawValue *= 0.6 + centerBoost * 0.4;
      
      // Smooth transitions from previous frame
      if (prevValues) {
        rawValue = prevValues[i] * smoothingFactor + rawValue * (1 - smoothingFactor);
      }
      
      // Add occasional peaks for plosives (p, b, t sounds)
      if (isAudioPlaying && Math.random() < 0.001) {
        rawValue += 0.5;
      }
      
      // Clamp value between 0 and 1
      dataArray[i] = Math.max(0, Math.min(1, rawValue));
      
      // Save for next frame
      if (prevValues) prevValues[i] = dataArray[i];
    }
    
    prevValueRef.current = prevValues;
    
    // Create some "speech-like" patterns
    // Occasional pauses and emphasis
    if (isAudioPlaying) {
      // Simulate pauses between words
      if (Math.sin(time * 0.3) > 0.8) {
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] *= 0.3; // Reduce overall amplitude during pauses
        }
      }
      
      // Simulate emphasis on certain syllables
      if (Math.sin(time * 0.7) > 0.7) {
        for (let i = Math.floor(bufferLength * 0.3); i < Math.floor(bufferLength * 0.7); i++) {
          dataArray[i] *= 1.5; // Boost middle frequencies for emphasis
        }
      }
    }
    
    return dataArray;
  }, [isAudioPlaying]);
  
  // Draw visualization based on data array
  const drawVisualization = useCallback((dataArray: Float32Array) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barCount = dataArray.length;
    const centerY = canvas.height / 2;
    const maxPossibleHalfHeight = centerY * Math.max(0.1, Math.min(1.0, maxHeightRatio));
    
    // Bar spacing calculations
    const totalBarSpace = canvas.width / barCount;
    const barWidth = totalBarSpace * Math.max(0.1, Math.min(0.9, barWidthRatio));
    const gap = totalBarSpace - barWidth;
    const radius = barWidth / 2;
    
    // Start drawing position
    let x = gap / 2;
    
    const centerIndex = barCount / 2;
    const maxDistance = centerIndex;
    
    ctx.shadowBlur = 8;
    
    for (let i = 0; i < barCount; i++) {
      const value = dataArray[i]; // 0-1 normalized
      
      // Calculate emphasis & fade
      const distanceFromCenter = Math.abs(i - centerIndex);
      const normalizedDistance = maxDistance > 0 ? Math.min(1.0, distanceFromCenter / maxDistance) : 0;
      
      // Cosine interpolation for smooth falloff
      const cosFactor = (Math.cos(normalizedDistance * Math.PI) + 1) / 2;
      
      const emphasisScale = edgeEmphasis + (centerEmphasis - edgeEmphasis) * cosFactor;
      const edgeFadeAlpha = edgeAlpha + (centerAlpha - edgeAlpha) * cosFactor;
      
      // Calculate bar height
      const scaledValue = value * emphasisScale;
      const barHalfHeight = Math.max(radius, scaledValue * maxPossibleHalfHeight);
      
      // Calculate coordinates
      const topY = centerY - barHalfHeight;
      const bottomY = centerY + barHalfHeight;
      
      // Set style
      const currentBarColor = `rgba(${barColor.r}, ${barColor.g}, ${barColor.b}, ${edgeFadeAlpha})`;
      const currentGlowColor = `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${edgeFadeAlpha * 0.8})`;
      
      ctx.fillStyle = currentBarColor;
      ctx.shadowColor = currentGlowColor;
      
      // Draw bar with rounded ends
      if (barHalfHeight >= radius) {
        ctx.beginPath();
        ctx.moveTo(x, topY + radius);
        ctx.arc(x + radius, topY + radius, radius, Math.PI, 0);
        ctx.lineTo(x + barWidth, bottomY - radius);
        ctx.arc(x + radius, bottomY - radius, radius, 0, Math.PI);
        ctx.lineTo(x, topY + radius);
        ctx.closePath();
        ctx.fill();
      } else if (barHalfHeight > 0) {
        ctx.beginPath();
        ctx.arc(x + radius, centerY, barHalfHeight, 0, Math.PI * 2);
        ctx.fill();
      }
      
      x += totalBarSpace;
    }
  }, [barColor, barWidthRatio, centerAlpha, centerEmphasis, edgeAlpha, edgeEmphasis, glowColor, maxHeightRatio]);
  
  // Main animation loop
  const animate = useCallback((timestamp: number) => {
    // Calculate delta time
    const deltaTime = (timestamp - lastUpdateRef.current) / 1000;
    lastUpdateRef.current = timestamp;
    
    // Update time counter - controls animation speed
    timeRef.current += deltaTime * (isAudioPlaying ? 5 : 1.5);
    
    // Generate animation data using speech patterns
    const dataArray = generateSpeechPattern(fftSize / 2, timeRef.current);
    
    // Draw the visualization
    drawVisualization(dataArray);
    
    // Continue the animation loop
    animationFrameId.current = requestAnimationFrame(animate);
  }, [drawVisualization, fftSize, generateSpeechPattern, isAudioPlaying]);
  
  // Set up and clean up animation
  useEffect(() => {
    // Start animation
    lastUpdateRef.current = performance.now();
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Clean up on unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate]);
  
  // Monitor audio element state
  useEffect(() => {
    if (!audioRef?.current) return;
    
    const audioElement = audioRef.current;
    
    const handlePlay = () => {
      setIsAudioPlaying(true);
      // Reset the time counter to create a fresh animation pattern 
      timeRef.current = 0;
    };
    
    const handlePause = () => {
      setIsAudioPlaying(false);
    };
    
    const handleEnded = () => {
      setIsAudioPlaying(false);
    };
    
    // Initial state
    setIsAudioPlaying(!audioElement.paused && !audioElement.ended);
    
    // Add event listeners
    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handleEnded);
    
    // Clean up
    return () => {
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioRef]);
  
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={cn("bg-transparent", className)}
    />
  );
};

export default Waveform;