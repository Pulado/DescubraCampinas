'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { locations } from '@/lib/data'
import { User } from '@/lib/types'
import { 
  MapPin, 
  Calendar, 
  Award, 
  Settings, 
  Edit,
  TrendingUp,
  Heart,
  History,
  Mail,
  Phone,
  MapPin as LocationIcon,
  User as UserIcon,
  LogOut
} from 'lucide-react'

export default function PerfilPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      
      // Load favorites count
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      setFavoritesCount(favorites.length)
    } else {
      // Redirect to login if no user is found
      router.push('/login')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const handleEditProfile = () => {
    router.push('/editar-perfil')
  }

  const handleSettings = () => {
    router.push('/configuracoes')
  }

  if (!user) {
    return null
  }

  const visitedLocations = locations.filter(l => user.visitedLocations.includes(l.id))
  const fullName = `${user.firstName} ${user.lastName}`.trim()

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 pb-24 lg:pb-8 overflow-x-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-text">
                Perfil
              </h1>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleSettings}>
                  <Settings className="w-5 h-5" />
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Profile Card */}
            <div className="glass rounded-2xl p-6 mb-6 shadow-glass">
              <div className="flex items-start gap-4 mb-6">
                <Avatar src={user.avatar} alt={fullName} size="xl" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-text">{fullName}</h2>
                    <Badge variant="primary">Nível {user.level}</Badge>
                  </div>
                  <p className="text-text-secondary mb-1">{user.email}</p>
                  <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                    {user.city && (
                      <div className="flex items-center gap-1">
                        <LocationIcon className="w-4 h-4" />
                        <span>{user.city}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Membro desde {new Date(user.joinDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleEditProfile}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar perfil
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              {(user.phone || user.bio) && (
                <div className="border-t border-card pt-4 mb-6 space-y-3">
                  {user.phone && (
                    <div className="flex items-center gap-3 text-text-secondary">
                      <Phone className="w-5 h-5" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user.bio && (
                    <div className="flex items-start gap-3 text-text-secondary">
                      <UserIcon className="w-5 h-5 mt-0.5" />
                      <p>{user.bio}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="glass rounded-xl p-4 text-center shadow-glow">
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-text">{user.visits}</div>
                  <div className="text-xs text-text-secondary">Locais Visitados</div>
                </div>
                <div className="glass rounded-xl p-4 text-center shadow-glow-blue">
                  <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-text">{favoritesCount}</div>
                  <div className="text-xs text-text-secondary">Favoritos</div>
                </div>
                <div className="glass rounded-xl p-4 text-center shadow-glow-yellow">
                  <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-text">{user.xp}</div>
                  <div className="text-xs text-text-secondary">XP Total</div>
                </div>
                <div className="glass rounded-xl p-4 text-center shadow-glow">
                  <Award className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-text">{user.badges.filter(b => b.unlocked).length}</div>
                  <div className="text-xs text-text-secondary">Conquistas</div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="glass rounded-2xl p-6 mb-6 shadow-glass">
              <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Conquistas
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {user.badges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className={`flex-shrink-0 bg-surface rounded-xl p-3 text-center min-w-[80px] ${
                      !badge.unlocked ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <div className="text-xs text-text-secondary">{badge.name}</div>
                    {badge.progress !== undefined && badge.maxProgress && (
                      <div className="w-full bg-card rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Visit History */}
            <div className="glass rounded-2xl p-6 shadow-glass">
              <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Histórico de Visitas
              </h3>
              
              {visitedLocations.length > 0 ? (
                <div className="space-y-3">
                  {visitedLocations.map((location, index) => (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-surface rounded-xl"
                    >
                      <img
                        src={location.images[0]}
                        alt={location.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-text">{location.name}</div>
                        <div className="text-sm text-text-secondary">{location.category}</div>
                      </div>
                      <Calendar className="w-5 h-5 text-text-secondary" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary text-center py-8">
                  Você ainda não visitou nenhum local
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
    </>
  )
}
