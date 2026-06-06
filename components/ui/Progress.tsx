import React from 'react'
import { motion } from 'framer-motion'

interface ProgressProps {
  value: number
  max: number
  className?: string
  color?: 'primary' | 'secondary' | 'accent'
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max,
  className = '',
  color = 'primary',
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    purple: 'bg-purple',
    orange: 'bg-orange',
  }
  
  return (
    <div className={`w-full bg-surface rounded-full h-2 overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
        className={`h-full ${colors[color]} rounded-full`}
      />
    </div>
  )
}
