import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({ icon, className = '', ...props }) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-surface border border-card rounded-xl px-4 py-3 text-text placeholder:text-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${icon ? 'pl-12' : ''} ${className}`}
        {...props}
      />
    </div>
  )
}
