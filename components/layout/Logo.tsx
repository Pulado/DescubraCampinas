import React from 'react'
import { MapPin } from 'lucide-react'

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }
  
  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
  }
  
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <div className="relative flex-shrink-0">
        <MapPin className="text-primary" size={iconSizes[size]} />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
      </div>
      <span className={`${sizes[size]} font-heading font-bold text-text leading-tight`}>
        Descubra<span className="text-primary">Campinas</span>
      </span>
    </div>
  )
}
