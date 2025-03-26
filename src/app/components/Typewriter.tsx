"use client";
import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  mode?: 'once' | 'loop' | 'complete';
  eraseDelay?: number | null;
  eraseSpeed?: number;
  cursorCharacter?: string;
  completeDelay?: number;
  startDelay?: number;
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
  startDelay = 0
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cursorActive, setCursorActive] = useState(true);
  const [hasStarted, setHasStarted] = useState(false); // Only start once per in-view

  const ref = useRef<HTMLSpanElement | null>(null);

  // 👁️ Intersection Observer to trigger when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true); // Prevent retrigger
          setTimeout(() => setIsTyping(true), startDelay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [startDelay, hasStarted]);

  // ⌨️ Typing animation
  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    setDisplayText('');

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsComplete(true);

        if (mode === 'complete') {
          setTimeout(() => {
            setCursorActive(false);
            if (onComplete) setTimeout(onComplete, 100);
          }, completeDelay);
        } else if (eraseDelay !== null) {
          setTimeout(() => setIsTyping(false), eraseDelay);
        } else if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, isTyping, eraseDelay, onComplete, mode, completeDelay]);

  // 🔙 Erase animation
  useEffect(() => {
    if (isTyping || !isComplete) return;

    let index = text.length;
    const actualEraseSpeed = eraseSpeed || speed;

    const timer = setInterval(() => {
      if (index > 0) {
        setDisplayText(text.substring(0, index - 1));
        index--;
      } else {
        clearInterval(timer);
        if (mode === 'loop') {
          setIsTyping(true);
          setIsComplete(false);
        } else if (onComplete) {
          onComplete();
        }
      }
    }, actualEraseSpeed);

    return () => clearInterval(timer);
  }, [text, speed, eraseSpeed, isTyping, isComplete, mode, onComplete]);

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
