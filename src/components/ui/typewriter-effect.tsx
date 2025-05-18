
import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  phrases: { text: string }[];
  delay?: number;
  cursor?: boolean;
  className?: string;
  cursorClassName?: string;
  speed?: { type: number; delete: number; pause: number };
}

const TypewriterEffect: React.FC<TypewriterProps> = ({ 
  phrases, 
  delay = 3000,
  cursor = true,
  className = '',
  cursorClassName = 'animate-pulse',
  speed = { type: 150, delete: 80, pause: 3000 }
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(speed.type);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charIndex = useRef(0);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    const currentPhrase = phrases[currentPhraseIndex].text;
    
    const typeNextChar = () => {
      if (!isDeleting) {
        // Typing
        charIndex.current += 1;
        setCurrentText(currentPhrase.substring(0, charIndex.current));
        
        // Check if done typing
        if (charIndex.current >= currentPhrase.length) {
          setIsPaused(true);
          setTypingSpeed(speed.pause);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
            setTypingSpeed(speed.delete);
          }, speed.pause);
          return;
        }
        
        // Random typing speed variation for realism
        const randomSpeed = Math.random() * 50 + speed.type;
        setTypingSpeed(randomSpeed);
      } else {
        // Deleting
        charIndex.current -= 1;
        setCurrentText(currentPhrase.substring(0, charIndex.current));
        
        // Check if done deleting
        if (charIndex.current <= 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(speed.type);
          return;
        }
        
        setTypingSpeed(speed.delete);
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, isDeleting, currentPhraseIndex, phrases, speed.delete, speed.pause, speed.type, isPaused]);

  return (
    <span className={`inline-block ${className}`}>
      {currentText}
      {cursor && <span className={cursorClassName}>|</span>}
    </span>
  );
};

export default TypewriterEffect;
