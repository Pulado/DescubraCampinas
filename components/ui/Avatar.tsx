import React from 'react'

interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  }
  
  return (
    <img
      src={src}
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover border-2 border-card ${className}`}
    />
  )
}
