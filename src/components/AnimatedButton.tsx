import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white';
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
    'relative font-geist-mono inline-flex items-center justify-center gap-2',
    'transition-all duration-300 ease-out-quad',
    'hover:opacity-90 active:scale-[0.97]',
    {
      'bg-psych-green text-white hover:bg-psych-green-dark hover:opacity-100': variant === 'primary',
      'bg-white text-exvia-black border border-exvia-border hover:border-psych-green hover:opacity-100': variant === 'secondary',
      'bg-transparent text-exvia-black border border-exvia-black hover:bg-exvia-black hover:text-white hover:opacity-100': variant === 'outline',
      'bg-transparent text-white border border-white/60 hover:bg-white hover:text-exvia-black hover:opacity-100': variant === 'outline-white',
      'px-4 py-2 text-xs rounded': size === 'sm',
      'px-6 py-3 text-sm rounded': size === 'md',
      'px-8 py-4 text-base rounded': size === 'lg',
    },
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showIcon && <ArrowRight className="w-4 h-4 flex-shrink-0" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseStyles} style={style} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
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
