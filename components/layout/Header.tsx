'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from './Logo'
import { Avatar } from '../ui/Avatar'
import { Bell, Menu, User, Settings, Heart, LogOut, ChevronDown } from 'lucide-react'
import { User as UserType } from '@/lib/types'

interface HeaderProps {
  showMenu?: boolean
  onMenuClick?: () => void
}

export const Header: React.FC<HeaderProps> = ({ showMenu = true, onMenuClick }) => {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setDropdownOpen(false)
    router.push('/login')
  }

  const handleProfile = () => {
    setDropdownOpen(false)
    router.push('/perfil')
  }

  const handleEditProfile = () => {
    setDropdownOpen(false)
    router.push('/editar-perfil')
  }

  const handleFavorites = () => {
    setDropdownOpen(false)
    router.push('/favoritos')
  }

  const handleSettings = () => {
    setDropdownOpen(false)
    router.push('/configuracoes')
  }

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Usuário'

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            {showMenu && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-3 hover:bg-card rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6 text-text-secondary" />
              </button>
            )}
            <Logo size="md" />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-3 hover:bg-card rounded-xl transition-colors group">
              <Bell className="w-6 h-6 text-text-secondary group-hover:text-text transition-colors" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full shadow-glow" />
            </button>
            
            {user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-card rounded-xl transition-colors"
                >
                  <Avatar src={user.avatar} alt={fullName} size="md" />
                  <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-3 w-64 glass-strong rounded-2xl shadow-glow border border-border overflow-hidden z-50">
                      <div className="p-4 border-b border-border">
                        <p className="font-semibold text-text text-lg">{fullName}</p>
                        <p className="text-sm text-text-secondary truncate">{user.email}</p>
                      </div>
                      
                      <div className="p-2 space-y-1">
                        <button
                          onClick={handleProfile}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-text hover:bg-card rounded-xl transition-colors"
                        >
                          <User className="w-5 h-5 text-text-secondary" />
                          <span className="font-medium">Meu Perfil</span>
                        </button>
                        
                        <button
                          onClick={handleEditProfile}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-text hover:bg-card rounded-xl transition-colors"
                        >
                          <User className="w-5 h-5 text-text-secondary" />
                          <span className="font-medium">Editar Perfil</span>
                        </button>
                        
                        <button
                          onClick={handleFavorites}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-text hover:bg-card rounded-xl transition-colors"
                        >
                          <Heart className="w-5 h-5 text-text-secondary" />
                          <span className="font-medium">Favoritos</span>
                        </button>
                        
                        <button
                          onClick={handleSettings}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-text hover:bg-card rounded-xl transition-colors"
                        >
                          <Settings className="w-5 h-5 text-text-secondary" />
                          <span className="font-medium">Configurações</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-border p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-500 hover:bg-card rounded-xl transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Sair</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
