'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { 
  Home, 
  Compass, 
  Camera, 
  Gift, 
  Trophy, 
  User,
  BarChart3,
  X,
  Heart
} from 'lucide-react'
import { Button } from '../ui/Button'

const sidebarItems = [
  { id: 'home', label: 'Início', icon: Home, href: '/' },
  { id: 'discover', label: 'Descobertas', icon: Compass, href: '/descobertas' },
  { id: 'ar', label: 'Realidade Aumentada', icon: Camera, href: '/ar' },
  { id: 'rewards', label: 'Recompensas', icon: Gift, href: '/recompensas' },
  { id: 'ranking', label: 'Ranking', icon: Trophy, href: '/ranking' },
  { id: 'achievements', label: 'Conquistas', icon: Trophy, href: '/conquistas' },
  { id: 'impact', label: 'Impacto ODS', icon: BarChart3, href: '/impacto' },
  { id: 'favorites', label: 'Favoritos', icon: Heart, href: '/favoritos' },
  { id: 'profile', label: 'Perfil', icon: User, href: '/perfil' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname()
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-surface border-r border-card z-50 transform transition-transform duration-300 glass-strong ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-72 md:w-64 lg:w-72 xl:w-80 lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-card">
            <Logo size="lg" />
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-card rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => onClose()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-card hover:text-text'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-card space-y-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                localStorage.removeItem('user')
                window.location.href = '/login'
              }}
            >
              Sair
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
