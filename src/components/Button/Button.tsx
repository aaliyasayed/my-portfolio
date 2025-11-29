import styles from './Button.module.scss'
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonBaseProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'medium' | 'small';
  className?: string;
};

type ButtonAsButton = ButtonBaseProps & 
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps & 
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ 
  children, 
  variant = 'primary',
  size = 'medium',
  href,
  className = '',
  ...props
}: ButtonProps) {
  const buttonClassName = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;
  
  if (href) {
    return (
      <a 
        className={buttonClassName} 
        href={href}
        {...(props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>)}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button 
      className={buttonClassName} 
      {...(props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)}
    >
      {children}
    </button>
  )
} 