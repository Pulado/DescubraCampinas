'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo'
import { Avatar } from '../ui/Avatar'
import { 
  Home, 
  Compass, 
  Camera, 
  Gift, 
  Trophy, 
  User,
  BarChart3,
  X,
  Heart,
  LogOut,
  Settings
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
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Usuário'

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-screen w-[85vw] max-w-[320px] bg-surface/95 backdrop-blur-xl border-r border-card z-[60] shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-card shrink-0">
                <Logo size="md" />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-card rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center mr-2"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User Section */}
              {user && (
                <div className="p-4 border-b border-card shrink-0">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={fullName} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text truncate">{fullName}</p>
                      <p className="text-sm text-text-secondary truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation - Scrollable */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all min-h-[44px] ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-card hover:text-text'
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Footer - Fixed at bottom */}
              <div className="p-4 border-t border-card shrink-0 space-y-2 pb-safe-bottom">
                <Link
                  href="/configuracoes"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-text-secondary hover:bg-card hover:text-text min-h-[44px]"
                >
                  <Settings className="w-5 h-5 shrink-0" />
                  <span className="font-medium">Configurações</span>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full min-h-[44px]"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 xl:w-80 bg-surface border-r border-card h-screen shrink-0">
        <div className="p-6 border-b border-card">
          <Logo size="lg" />
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.id}
                href={item.href}
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
        
        <div className="p-4 border-t border-card space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>
    </>
  )
}
