import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  showIcon = false,
  className,
  style,
}: AnimatedButtonProps) {
  const baseStyles = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full font-medium',
    'transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.98]',
    {
      'bg-wine text-milk hover:bg-wine-700': variant === 'primary',
      'border border-cocoa/25 text-cocoa hover:border-cocoa hover:bg-cocoa/5': variant === 'secondary',
      'bg-milk text-cocoa hover:bg-milk-50': variant === 'light',
      'h-10 px-5 text-sm': size === 'sm',
      'h-12 px-6 text-[15px]': size === 'md',
      'h-14 px-8 text-base': size === 'lg',
    },
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showIcon && <ArrowRight className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.5} />}
    </>
  );

  if (href) {
    const external = href.startsWith('http');
    return (
      <a href={href} className={baseStyles} style={style} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles} style={style}>
      {content}
    </button>
  );
}
