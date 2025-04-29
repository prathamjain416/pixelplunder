
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-pixel border-4 transform transition-transform active:translate-y-1 focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-game-primary text-white border-game-secondary hover:bg-game-secondary',
    secondary: 'bg-game-secondary text-white border-game-tertiary hover:bg-game-tertiary',
    tertiary: 'bg-game-coin text-game-bg border-game-character hover:bg-orange-400',
  };
  
  const sizeStyles = {
    sm: 'text-xs py-1 px-3',
    md: 'text-sm py-2 px-5',
    lg: 'text-base py-3 px-8',
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

PixelButton.displayName = 'PixelButton';

export default PixelButton;
