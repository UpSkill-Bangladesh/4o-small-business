
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

const HeroBackground: React.FC = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxOffset = {
    x: mousePosition.x * 20,
    y: mousePosition.y * 20
  };

  return (
    <>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-nyc-primary via-nyc-secondary to-nyc-accent dark:from-gray-900 dark:via-nyc-primary/80 dark:to-nyc-accent/80 overflow-hidden">
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Shape 1 */}
          <div 
            className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-white/5 backdrop-blur-3xl"
            style={{ 
              transform: `translate(${parallaxOffset.x * -1}px, ${parallaxOffset.y * -1}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          ></div>
          
          {/* Shape 2 */}
          <div 
            className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-white/5 backdrop-blur-xl"
            style={{ 
              transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          ></div>
          
          {/* Shape 3 */}
          <div 
            className="absolute bottom-[15%] left-[25%] w-64 h-64 rounded-full bg-white/5 backdrop-blur-lg"
            style={{ 
              transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          ></div>
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-nyc-primary/60 to-transparent dark:from-gray-900/70"></div>
        
        {/* Mesh grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiNmZmZmZmYxMCIgZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>
    </>
  );
};

export default HeroBackground;
