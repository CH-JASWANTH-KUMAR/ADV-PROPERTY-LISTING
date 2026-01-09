import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils'; // I need to create this utility or just inline it for now. I'll create it.

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white";
    
    const variants = {
      primary: "bg-blue-950 hover:bg-blue-900 text-white shadow-md",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "border-2 border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white",
      ghost: "hover:bg-gray-100 hover:text-blue-950",
      white: "bg-white text-blue-950 hover:bg-gray-50 border-2 border-gray-200"
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-10 py-2 px-4",
      lg: "h-12 px-8 text-lg"
    };
    
    // Simple class merger since I don't have clsx/tailwind-merge installed yet, I'll just template string it carefully or install them.
    // For now I will assume simple usage.
    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`;

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
