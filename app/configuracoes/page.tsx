'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/Button'
import { 
  Settings, 
  User, 
  Camera, 
  Trash2, 
  LogOut, 
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  Shield
} from 'lucide-react'
import { User as UserType } from '@/lib/types'

export default function ConfiguracoesPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      router.push('/login')
    }
    
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light'
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const handleClearFavorites = () => {
    if (confirm('Tem certeza que deseja limpar todos os seus favoritos?')) {
      localStorage.removeItem('favorites')
      alert('Favoritos limpos com sucesso!')
    }
  }

  const handleClearProgress = () => {
    if (confirm('Tem certeza que deseja limpar todo o seu progresso? Isso não pode ser desfeito.')) {
      if (user) {
        const resetUser = {
          ...user,
          level: 1,
          xp: 0,
          coins: 100,
          visits: 0,
          distance: 0,
          badges: [],
          visitedLocations: [],
        }
        localStorage.setItem('user', JSON.stringify(resetUser))
        setUser(resetUser)
        alert('Progresso limpo com sucesso!')
      }
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('user')
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const filteredUsers = registeredUsers.filter((u: any) => u.id !== user?.id)
      localStorage.setItem('registeredUsers', JSON.stringify(filteredUsers))
      router.push('/login')
    }
  }

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    // In a real app, this would toggle a theme class on the document
  }

  const handleNotificationsToggle = () => {
    setNotifications(!notifications)
  }

  const handleEditProfile = () => {
    router.push('/editar-perfil')
  }

  if (!user) {
    return null
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim()

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 pb-24 lg:pb-8 overflow-x-hidden">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={() => router.back()}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl sm:text-3xl font-bold text-text">
                  Configurações
                </h1>
              </div>

              {/* Settings Card */}
              <div className="space-y-4">
                {/* Account Section */}
                <div className="glass rounded-2xl p-6 shadow-glass">
                  <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Conta
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-surface rounded-xl">
                      <div>
                        <p className="font-medium text-text">{fullName}</p>
                        <p className="text-sm text-text-secondary">{user.email}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleEditProfile}>
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Appearance Section */}
                <div className="glass rounded-2xl p-6 shadow-glass">
                  <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                    {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    Aparência
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-surface rounded-xl">
                      <div>
                        <p className="font-medium text-text">Tema</p>
                        <p className="text-sm text-text-secondary">
                          {theme === 'dark' ? 'Escuro' : 'Claro'}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleThemeToggle}
                      >
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Notifications Section */}
                <div className="glass rounded-2xl p-6 shadow-glass">
                  <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notificações
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-surface rounded-xl">
                      <div>
                        <p className="font-medium text-text">Notificações push</p>
                        <p className="text-sm text-text-secondary">
                          Receber alertas sobre novos locais e eventos
                        </p>
                      </div>
                      <button
                        onClick={handleNotificationsToggle}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${
                          notifications ? 'bg-primary' : 'bg-card'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            notifications ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Privacy Section */}
                <div className="glass rounded-2xl p-6 shadow-glass">
                  <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacidade e Segurança
                  </h2>
                  
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleClearFavorites}
                    >
                      <Trash2 className="w-4 h-4 mr-3 text-text-secondary" />
                      Limpar favoritos
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleClearProgress}
                    >
                      <Trash2 className="w-4 h-4 mr-3 text-text-secondary" />
                      Limpar progresso
                    </Button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="glass rounded-2xl p-6 shadow-glass border border-red-500/20">
                  <h2 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
                    <LogOut className="w-5 h-5" />
                    Zona de Perigo
                  </h2>
                  
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-3 text-text-secondary" />
                      Sair da conta
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-500 text-red-500 hover:bg-red-500/10"
                      onClick={handleDeleteAccount}
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      Excluir conta permanentemente
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <BottomNav />
      </div>
    </>
  )
}
