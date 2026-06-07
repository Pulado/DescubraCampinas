import React from 'react'
import { MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const Logo: React.FC<{ 
  size?: 'sm' | 'md' | 'lg'
  city?: string
  loading?: boolean
}> = ({ size = 'md', city = 'Campinas', loading = false }) => {
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
  
  const displayCity = loading ? '...' : city
  
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <div className="relative flex-shrink-0">
        <MapPin className="text-primary" size={iconSizes[size]} />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
      </div>
      <span className={`${sizes[size]} font-heading font-bold text-text leading-tight`}>
        Descubra
        <AnimatePresence mode="wait">
          <motion.span
            key={displayCity}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className="text-primary inline-block"
          >
            {displayCity}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}
