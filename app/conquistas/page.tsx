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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2 flex items-center gap-3 font-heading">
              <Award className="w-10 h-10 text-purple" />
              Conquistas
            </h1>
            <p className="text-text-secondary mb-8 text-base">
              Colete badges e evolua no jogo
            </p>

            {/* Level Progress */}
            {currentUser && (
              <div className="glass rounded-3xl p-8 mb-10 shadow-glow-purple">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold text-text font-heading">Nível {currentUser.level}</div>
                    <div className="text-text-secondary text-lg">
                      {currentUser.xp} / {(currentUser.level + 1) * 500} XP
                    </div>
                  </div>
                  <div className="text-7xl">🎖️</div>
                </div>
                <Progress 
                  value={currentUser.xp} 
                  max={(currentUser.level + 1) * 500}
                  color="accent"
                />
              </div>
            )}

            {/* Unlocked Badges */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3 font-heading">
                <Star className="w-7 h-7 text-yellow" />
                Desbloqueados
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentUser?.badges.filter(b => b.unlocked).map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-3xl p-6 text-center shadow-glow-purple"
                  >
                    <div className="text-6xl mb-3">{badge.icon}</div>
                    <div className="font-bold text-text text-base mb-2">{badge.name}</div>
                    <div className="text-sm text-text-secondary">{badge.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Locked Badges */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3 font-heading">
                <Lock className="w-7 h-7 text-text-secondary" />
                Para Desbloquear
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentUser?.badges.filter(b => !b.unlocked).map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-3xl p-6 text-center opacity-60"
                  >
                    <div className="text-6xl mb-3 grayscale">{badge.icon}</div>
                    <div className="font-bold text-text text-base mb-2">{badge.name}</div>
                    <div className="text-sm text-text-secondary mb-3">{badge.description}</div>
                    {badge.progress !== undefined && badge.maxProgress !== undefined && (
                      <div>
                        <Progress 
                          value={badge.progress} 
                          max={badge.maxProgress}
                          color="secondary"
                        />
                        <div className="text-sm text-text-secondary mt-2">
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
              className="glass rounded-3xl p-8 shadow-glow"
            >
              <h3 className="font-bold text-text mb-4 flex items-center gap-3 text-xl font-heading">
                <Zap className="w-7 h-7 text-primary" />
                Como ganhar XP
              </h3>
              <ul className="text-base text-text-secondary space-y-3">
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
