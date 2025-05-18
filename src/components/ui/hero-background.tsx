
import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';

const HeroBackground: React.FC = () => {
  const { theme, systemTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };

    // Handle scroll for additional effects
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animate background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Handle resize
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();

    // Create particles
    const particlesArray: Particle[] = [];
    const numberOfParticles = 80;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = isDark 
          ? `rgba(255, 255, 255, ${Math.random() * 0.2})`
          : `rgba(0, 121, 193, ${Math.random() * 0.2})`;
      }

      update() {
        this.x += this.speedX + mousePosition.x * 2;
        this.y += this.speedY + mousePosition.y * 2;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create initial particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Connect nearby particles
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${0.2 - distance/500})`
              : `rgba(0, 121, 193, ${0.2 - distance/500})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [isDark, mousePosition]);

  const parallaxOffset = {
    x: mousePosition.x * 20,
    y: mousePosition.y * 20
  };

  // Get gradient colors based on theme
  const getGradientClasses = () => {
    return isDark 
      ? "from-gray-900 via-nyc-primary/60 to-nyc-accent/70" 
      : "from-nyc-primary via-nyc-secondary to-nyc-accent";
  };

  return (
    <>
      {/* Canvas for particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClasses()} opacity-80 z-0`}>
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Shape 1 */}
          <div 
            className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-white/5 backdrop-blur-3xl"
            style={{ 
              transform: `translate(${parallaxOffset.x * -1}px, ${parallaxOffset.y * -1}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          
          {/* Shape 2 */}
          <div 
            className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-white/5 backdrop-blur-xl"
            style={{ 
              transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          
          {/* Shape 3 */}
          <div 
            className="absolute bottom-[15%] left-[25%] w-64 h-64 rounded-full bg-white/5 backdrop-blur-lg"
            style={{ 
              transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
        </div>
        
        {/* Overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-900/70' : 'from-nyc-primary/60'} to-transparent z-0`}></div>
        
        {/* Mesh grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiNmZmZmZmYxMCIgZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')] opacity-30 z-0"></div>
      </div>
    </>
  );
};

export default HeroBackground;
