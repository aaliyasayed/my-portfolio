import { ReactNode } from 'react';
import styles from './Tags.module.scss';

// For single tag
interface TagProps {
  children: ReactNode;
  size?: 'default' | 'large';
  color?: 'primary' | 'secondary';
  className?: string;
}

// For list of tags
interface TagsProps {
  tags?: string[];
  size?: 'default' | 'large';
  color?: 'primary' | 'secondary';
  className?: string;
  children?: ReactNode;
}

// Individual Tag component for internal use
function TagItem({ children, size = 'default', color = 'primary', className = '' }: TagProps) {
  return (
    <span 
      className={`${styles.tag} ${styles[size]} ${styles[color]} ${className}`}
    >
      {children}
    </span>
  );
} 

// Main Tags component that can render either a single tag or a list of tags
export function Tags({ tags, size = 'default', color = 'primary', className = '', children }: TagsProps) {
  // If there are no tags and no children, return null
  if ((!tags || tags.length === 0) && !children) return null;
  
  // If children are provided, render as a single tag
  if (children) {
    return (
      <TagItem size={size} color={color} className={className}>
        {children}
      </TagItem>
    );
  }
  
  // Otherwise render as a list of tags
  return (
    <div className={`${styles.tagList} ${className}`}>
      {tags?.map((tag, index) => (
        <TagItem 
          key={index}
          size={size}
          color={color}
        >
          {tag}
        </TagItem>
      ))}
    </div>
  );
} 