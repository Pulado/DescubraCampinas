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
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {showMenu && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <Logo size="md" />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-surface rounded-lg transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            
            {user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-surface rounded-lg transition-colors"
                >
                  <Avatar src={user.avatar} alt={fullName} size="sm" />
                  <ChevronDown className="w-4 h-4 text-text-secondary hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 glass rounded-xl shadow-glow border border-card overflow-hidden z-50">
                      <div className="p-3 border-b border-card">
                        <p className="font-medium text-text">{fullName}</p>
                        <p className="text-sm text-text-secondary truncate">{user.email}</p>
                      </div>
                      
                      <div className="p-1">
                        <button
                          onClick={handleProfile}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left text-text hover:bg-card rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Meu Perfil</span>
                        </button>
                        
                        <button
                          onClick={handleEditProfile}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left text-text hover:bg-card rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Editar Perfil</span>
                        </button>
                        
                        <button
                          onClick={handleFavorites}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left text-text hover:bg-card rounded-lg transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          <span>Favoritos</span>
                        </button>
                        
                        <button
                          onClick={handleSettings}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left text-text hover:bg-card rounded-lg transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Configurações</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-card p-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-500 hover:bg-card rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sair</span>
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
