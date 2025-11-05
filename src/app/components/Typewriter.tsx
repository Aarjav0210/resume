"use client";
import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  onComplete?: () => void;
  className?: string;
  mode?: 'once' | 'loop' | 'complete';
  eraseDelay?: number | null;
  eraseSpeed?: number;
  cursorCharacter?: string;
  completeDelay?: number;
  startDelay?: number;
  shuffleStrings?: boolean; // Whether to shuffle the array order
}

export default function Typewriter({ 
  text, 
  speed = 100, 
  onComplete, 
  className = "",
  mode = 'once',
  eraseDelay = null,
  eraseSpeed,
  cursorCharacter = "▋",
  completeDelay = 2000,
  startDelay = 0,
  shuffleStrings = false
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cursorActive, setCursorActive] = useState(true);
  const [hasStarted, setHasStarted] = useState(false); // Only start once per in-view
  const [currentStringIndex, setCurrentStringIndex] = useState(0);

  const ref = useRef<HTMLSpanElement | null>(null);
  const textsArray = useRef<string[]>(
    Array.isArray(text) 
      ? (shuffleStrings ? [...text].sort(() => Math.random() - 0.5) : text)
      : [text]
  );

  // Get current text to type
  const currentText = textsArray.current[currentStringIndex];

  // 👁️ Intersection Observer to trigger when in view
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setTimeout(() => setIsTyping(true), startDelay);
        }
      },
      { threshold: 0.5 }
    );

    obs.observe(node);
    return () => {
      obs.unobserve(node);
    };
  }, [startDelay, hasStarted]);

  // ⌨️ Typing animation
  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    setDisplayText('');

    const timer = setInterval(() => {
      if (index < currentText.length) {
        setDisplayText(currentText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsComplete(true);

        if (mode === 'complete' && currentStringIndex === textsArray.current.length - 1) {
          // Only complete if we're on the last string
          setTimeout(() => {
            setCursorActive(false);
            if (onComplete) setTimeout(onComplete, 100);
          }, completeDelay);
        } else if (eraseDelay !== null) {
          setTimeout(() => setIsTyping(false), eraseDelay);
        } else if (textsArray.current.length > 1) {
          setTimeout(() => {
            setIsTyping(false);
          }, eraseDelay || 1000);
        } else if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [currentText, speed, isTyping, eraseDelay, onComplete, mode, completeDelay, currentStringIndex]);

  // 🔙 Erase animation
  useEffect(() => {
    if (isTyping || !isComplete) return;

    let index = currentText.length;
    const actualEraseSpeed = eraseSpeed || speed;

    const timer = setInterval(() => {
      if (index > 0) {
        setDisplayText(currentText.substring(0, index - 1));
        index--;
      } else {
        clearInterval(timer);
        
        // Move to next string in the array
        const nextIndex = (currentStringIndex + 1) % textsArray.current.length;
        const isLastString = currentStringIndex === textsArray.current.length - 1;
        
        if (mode === 'loop' || !isLastString) {
          setCurrentStringIndex(nextIndex);
          setIsTyping(true);
          setIsComplete(false);
        } else if (mode === 'once' && isLastString) {
          if (onComplete) onComplete();
        } else if (onComplete) {
          onComplete();
        }
      }
    }, actualEraseSpeed);

    return () => clearInterval(timer);
  }, [currentText, speed, eraseSpeed, isTyping, isComplete, mode, onComplete, currentStringIndex]);

  // ✨ Cursor blink
  useEffect(() => {
    if (!cursorActive) return;

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, [cursorActive]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      <span className={`${showCursor && cursorActive ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        {cursorCharacter}
      </span>
    </span>
  );
}
