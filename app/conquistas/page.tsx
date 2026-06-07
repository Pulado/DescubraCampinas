'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { User } from '@/lib/types'
import { Award, Lock, Star, Zap } from 'lucide-react'

export default function ConquistasPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    } else {
      router.push('/login')
    }
  }, [])

  if (!currentUser) {
    return null
  }

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
            <h1 className="text-2xl sm:text-3xl font-bold text-text mb-1 flex items-center gap-2">
              <Award className="w-8 h-8 text-purple" />
              Conquistas
            </h1>
            <p className="text-text-secondary mb-6">
              Colete badges e evolua no jogo
            </p>

            {/* Level Progress */}
            {currentUser && (
              <div className="glass rounded-2xl p-6 mb-8 shadow-glow-purple">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-text">Nível {currentUser.level}</div>
                    <div className="text-text-secondary">
                      {currentUser.xp} / {(currentUser.level + 1) * 500} XP
                    </div>
                  </div>
                  <div className="text-6xl">🎖️</div>
                </div>
                <Progress 
                  value={currentUser.xp} 
                  max={(currentUser.level + 1) * 500}
                  color="accent"
                />
              </div>
            )}

            {/* Unlocked Badges */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Desbloqueados
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentUser?.badges.filter(b => b.unlocked).map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-4 text-center"
                  >
                    <div className="text-5xl mb-2">{badge.icon}</div>
                    <div className="font-bold text-text text-sm mb-1">{badge.name}</div>
                    <div className="text-xs text-text-secondary">{badge.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Locked Badges */}
            <div>
              <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-text-secondary" />
                Para Desbloquear
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentUser?.badges.filter(b => !b.unlocked).map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-4 text-center opacity-60"
                  >
                    <div className="text-5xl mb-2 grayscale">{badge.icon}</div>
                    <div className="font-bold text-text text-sm mb-1">{badge.name}</div>
                    <div className="text-xs text-text-secondary mb-2">{badge.description}</div>
                    {badge.progress !== undefined && badge.maxProgress !== undefined && (
                      <div>
                        <Progress 
                          value={badge.progress} 
                          max={badge.maxProgress}
                          color="secondary"
                        />
                        <div className="text-xs text-text-secondary mt-1">
                          {badge.progress}/{badge.maxProgress}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* XP Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-card rounded-2xl p-6"
            >
              <h3 className="font-bold text-text mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Como ganhar XP
              </h3>
              <ul className="text-sm text-text-secondary space-y-2">
                <li>• +10 XP por visita a novo local</li>
                <li>• +5 XP por avaliação</li>
                <li>• +20 XP por coleta AR</li>
                <li>• +50 XP por badge desbloqueada</li>
                <li>• +100 XP por indicar amigo</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
    </>
  )
}
