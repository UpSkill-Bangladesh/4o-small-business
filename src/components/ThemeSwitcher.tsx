
import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ThemeSwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export function ThemeSwitcher({ 
  variant = 'outline', 
  size = 'icon', 
  showLabel = false 
}: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={variant} 
            size={size} 
            onClick={toggleTheme}
            className="hover-scale relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
            {(showLabel || isHovering) && (
              <span className="ml-2 opacity-0 scale-95 absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap bg-background border border-border px-2 py-1 rounded-md text-xs animate-fade-in">
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle {isDark ? 'light' : 'dark'} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
