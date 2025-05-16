
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  phrases: { text: string }[];
  delay?: number;
  cursor?: boolean;
}

const TypewriterEffect: React.FC<TypewriterProps> = ({ 
  phrases, 
  delay = 3000,
  cursor = true 
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPhrase = phrases[currentPhraseIndex].text;
      
      if (!isDeleting && currentText === currentPhrase) {
        // Pause at complete phrase
        setTypingSpeed(delay);
        setIsDeleting(true);
        return;
      } 
      
      if (isDeleting && currentText === '') {
        // Move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(150);
        return;
      }

      // Calculate next text
      const delta = isDeleting ? 80 : 150;
      setTypingSpeed(delta);
      
      if (isDeleting) {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, delay, typingSpeed]);

  return (
    <span className="inline-block min-w-[180px]">
      {currentText}
      {cursor && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default TypewriterEffect;
