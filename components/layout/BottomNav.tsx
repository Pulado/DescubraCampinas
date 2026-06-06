'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Compass, 
  Camera, 
  Gift, 
  Trophy, 
  User,
  BarChart3,
  Heart
} from 'lucide-react'

const navItems = [
  { id: 'home', label: 'Início', icon: Home, href: '/' },
  { id: 'discover', label: 'Descobrir', icon: Compass, href: '/descobertas' },
  { id: 'favorites', label: 'Favoritos', icon: Heart, href: '/favoritos' },
  { id: 'profile', label: 'Perfil', icon: User, href: '/perfil' },
]

export const BottomNav: React.FC = () => {
  const pathname = usePathname()
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-card lg:hidden z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
                isActive ? 'text-primary' : 'text-text-secondary hover:text-text'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
