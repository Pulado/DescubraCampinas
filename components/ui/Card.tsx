import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  glowColor?: 'green' | 'blue' | 'purple' | 'orange' | 'yellow' | 'red'
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, glowColor = 'green' }) => {
  const getGlowClass = (color: string) => {
    switch(color) {
      case 'green': return 'shadow-glow'
      case 'blue': return 'shadow-glow-blue'
      case 'purple': return 'shadow-glow-purple'
      case 'orange': return 'shadow-glow-orange'
      case 'yellow': return 'shadow-glow-yellow'
      case 'red': return 'shadow-glow-red'
      default: return 'shadow-glow'
    }
  }

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02, y: -4 } : { y: -2 }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`card-premium rounded-2xl p-6 border border-border/50 ${getGlowClass(glowColor)} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
