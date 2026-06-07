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
  Settings,
  Building2,
  Trees,
  Landmark
} from 'lucide-react'
import { Button } from '../ui/Button'

const sidebarItems = [
  { id: 'home', label: 'Início', icon: Home, href: '/', color: 'primary' },
  { id: 'discover', label: 'Descobertas', icon: Compass, href: '/descobertas', color: 'primary' },
  { id: 'ar', label: 'Realidade Aumentada', icon: Camera, href: '/ar', color: 'purple' },
  { id: 'rewards', label: 'Recompensas', icon: Gift, href: '/recompensas', color: 'yellow' },
  { id: 'ranking', label: 'Ranking', icon: Trophy, href: '/ranking', color: 'orange' },
  { id: 'achievements', label: 'Conquistas', icon: Trophy, href: '/conquistas', color: 'purple' },
  { id: 'impact', label: 'Impacto ODS', icon: BarChart3, href: '/impacto', color: 'primary' },
  { id: 'favorites', label: 'Favoritos', icon: Heart, href: '/favoritos', color: 'red' },
  { id: 'profile', label: 'Perfil', icon: User, href: '/perfil', color: 'primary' },
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

  const getActiveColor = (color: string) => {
    switch(color) {
      case 'primary': return 'shadow-glow'
      case 'purple': return 'shadow-glow-purple'
      case 'orange': return 'shadow-glow-orange'
      case 'yellow': return 'shadow-glow-yellow'
      case 'red': return 'shadow-glow-red'
      default: return 'shadow-glow'
    }
  }

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
              className="fixed top-0 left-0 h-screen w-[85vw] max-w-[320px] bg-sidebar/95 backdrop-blur-xl border-r border-border z-[60] shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
                <Logo size="md" />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-card rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6 text-text-secondary" />
                </button>
              </div>

              {/* User Section */}
              {user && (
                <div className="p-5 border-b border-border shrink-0">
                  <div className="flex items-center gap-4">
                    <Avatar src={user.avatar} alt={fullName} size="lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text truncate text-lg">{fullName}</p>
                      <p className="text-sm text-text-secondary truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation - Scrollable */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all min-h-[52px] group ${
                        isActive
                          ? `bg-primary/10 text-primary ${getActiveColor(item.color)}`
                          : 'text-text-secondary hover:bg-card hover:text-text'
                      }`}
                    >
                      <Icon className={`w-6 h-6 shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                      <span className="font-medium text-base">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Footer - Fixed at bottom */}
              <div className="p-4 border-t border-border shrink-0 space-y-2 pb-safe-bottom">
                <Link
                  href="/configuracoes"
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all text-text-secondary hover:bg-card hover:text-text min-h-[52px]"
                >
                  <Settings className="w-6 h-6 shrink-0" />
                  <span className="font-medium text-base">Configurações</span>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full min-h-[52px] rounded-2xl"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sair
                </Button>
              </div>

              {/* Campinas Illustration */}
              <div className="p-4 border-t border-border shrink-0">
                <div className="relative h-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="absolute inset-0 flex items-center justify-center gap-2 text-primary/30">
                    <Building2 className="w-8 h-8" />
                    <Trees className="w-6 h-6" />
                    <Landmark className="w-7 h-7" />
                  </div>
                </div>
                <p className="text-xs text-text-secondary text-center mt-2">Campinas, SP</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-sidebar border-r border-border h-screen shrink-0">
        <div className="p-6 border-b border-border">
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
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
                  isActive
                    ? `bg-primary/10 text-primary ${getActiveColor(item.color)}`
                    : 'text-text-secondary hover:bg-card hover:text-text'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                <span className="font-medium text-base">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-border space-y-2">
          <Button 
            variant="outline" 
            className="w-full rounded-2xl min-h-[52px]"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair
          </Button>
        </div>

        {/* Campinas Illustration */}
        <div className="p-4 border-t border-border">
          <div className="relative h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
            <div className="absolute inset-0 flex items-center justify-center gap-3 text-primary/30">
              <Building2 className="w-12 h-12" />
              <Trees className="w-10 h-10" />
              <Landmark className="w-11 h-11" />
            </div>
          </div>
          <p className="text-sm text-text-secondary text-center mt-3 font-medium">Campinas, SP</p>
        </div>
      </aside>
    </>
  )
}
