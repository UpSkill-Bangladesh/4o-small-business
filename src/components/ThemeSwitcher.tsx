
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ThemeSwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
  className?: string;
}

export function ThemeSwitcher({ 
  variant = 'outline', 
  size = 'icon', 
  showLabel = false,
  className = ''
}: ThemeSwitcherProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
  
  // Add animation effect when theme changes
  useEffect(() => {
    setShowAnimation(true);
    const timeout = setTimeout(() => setShowAnimation(false), 1000);
    return () => clearTimeout(timeout);
  }, [theme]);

  // Handle theme cycling (light -> dark -> system -> light)
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  // Get the icon based on current theme
  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className={`h-[1.2rem] w-[1.2rem] transition-all ${showAnimation ? 'animate-pulse' : ''}`} />;
    }
    
    return (
      <>
        <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${showAnimation && !isDark ? 'animate-spin' : ''}`} />
        <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${showAnimation && isDark ? 'animate-spin' : ''}`} />
      </>
    );
  };

  // Get the label text based on current theme
  const getLabelText = () => {
    if (theme === 'system') return systemTheme === 'dark' ? 'System (Dark)' : 'System (Light)';
    return isDark ? 'Dark Mode' : 'Light Mode';
  };
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button 
            variant={variant} 
            size={size} 
            onClick={cycleTheme}
            className={`hover-scale relative ${className} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-all duration-300`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative">
              {getIcon()}
            </div>
            <span className="sr-only">Toggle theme</span>
            {(showLabel || isHovering) && (
              <span className={`ml-2 opacity-0 scale-95 absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap bg-background border border-border px-2 py-1 rounded-md text-xs ${isHovering ? 'animate-fade-in opacity-100' : ''} z-10`}>
                {getLabelText()}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
