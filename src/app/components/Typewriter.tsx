"use client";
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  mode?: 'once' | 'loop' | 'complete';  // 'complete' mode for terminal-like effect
  eraseDelay?: number | null; 
  eraseSpeed?: number;
  cursorCharacter?: string;
  completeDelay?: number;  // Time to keep cursor blinking after completion (in ms)
  startDelay?: number;     // Delay before starting the typing animation (in ms)
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
  completeDelay = 2000,  // Default to 2 seconds of blinking before stopping
  startDelay = 0        // Default to no delay
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);  // Start as false to handle delay
  const [isComplete, setIsComplete] = useState(false);
  const [cursorActive, setCursorActive] = useState(true);  // Whether cursor should be active
  
  // Handle start delay and initialize typing
  useEffect(() => {
    // Set a timeout to start typing after the delay
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);
    
    return () => clearTimeout(startTimer);
  }, [startDelay]); // Only run this effect once on mount and when startDelay changes
  
  // Typing animation effect
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
          // For 'complete' mode, set a timer to stop the cursor after completeDelay
          setTimeout(() => {
            setCursorActive(false);
            if (onComplete) {
              setTimeout(onComplete, 100);
            }
          }, completeDelay);
        } else if (eraseDelay !== null) {
          // Schedule erasing after delay
          setTimeout(() => {
            setIsTyping(false);
          }, eraseDelay);
        } else if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, isTyping, eraseDelay, onComplete, mode, completeDelay]);

  // Erasing animation effect
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

  // Cursor blink effect
  useEffect(() => {
    if (!cursorActive) return;
    
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, [cursorActive]);

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor && cursorActive ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        {cursorCharacter}
      </span>
    </span>
  );
} 