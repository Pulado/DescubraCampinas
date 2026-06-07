'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { Tabs } from '@/components/ui/Tabs'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { rankingUsers } from '@/lib/data'
import { User } from '@/lib/types'
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react'

export default function RankingPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('weekly')
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
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

  const tabs = [
    { id: 'weekly', label: 'Semanal' },
    { id: 'monthly', label: 'Mensal' },
  ]

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
              <Trophy className="w-8 h-8 text-orange" />
              Ranking Comunitário
            </h1>
            <p className="text-text-secondary mb-6">
              Competição amigável entre exploradores
            </p>

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Top 3 Podium */}
            <div className="flex items-end justify-center gap-4 my-8">
              {rankingUsers.slice(0, 3).map((user, index) => {
                const heights = ['h-32', 'h-40', 'h-36']
                const medals = [
                  <Medal key="silver" className="w-8 h-8 text-gray-400" />,
                  <Crown key="gold" className="w-8 h-8 text-accent" />,
                  <Medal key="bronze" className="w-8 h-8 text-amber-700" />,
                ]
                const colors = ['bg-orange/20', 'bg-orange/30', 'bg-orange/20']
                
                const orderClass = index === 1 ? 'order-2' : index === 0 ? 'order-1' : 'order-3'
                const marginClass = index === 1 ? 'mb-4' : 'mb-2'
                
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={'flex flex-col items-center ' + orderClass}
                  >
                    <div className={'relative ' + marginClass}>
                      <Avatar src={user.avatar} alt={`${user.firstName} ${user.lastName}`} size="xl" />
                      <div className="absolute -top-2 -right-2">
                        {medals[index]}
                      </div>
                    </div>
                    <div className="text-center mb-2">
                      <div className="font-bold text-text">{user.firstName} {user.lastName}</div>
                      <div className="text-sm text-text-secondary">{user.points} pts</div>
                    </div>
                    <div className={colors[index] + ' ' + heights[index] + ' w-20 rounded-t-xl flex items-end justify-center pb-2'}>
                      <span className="text-2xl font-bold text-text">#{user.position}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Full Ranking */}
            <div className="glass rounded-2xl p-4 space-y-3 shadow-glass">
              {rankingUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={currentUser && user.id === currentUser.id ? 'flex items-center gap-4 p-3 rounded-xl bg-orange/20' : 'flex items-center gap-4 p-3 rounded-xl bg-surface/50'}
                >
                  <div className="w-8 text-center font-bold text-text-secondary">
                    #{user.position}
                  </div>
                  <Avatar src={user.avatar} alt={`${user.firstName} ${user.lastName}`} size="md" />
                  <div className="flex-1">
                    <div className="font-medium text-text">{user.firstName} {user.lastName}</div>
                    <div className="text-sm text-text-secondary">
                      Nível {user.level} • {user.badges} badges
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{user.points}</div>
                    <div className="text-xs text-text-secondary">pontos</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Your Position */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 gradient-orange rounded-2xl p-6 shadow-glow-orange"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-text">#{currentUser?.level || '-'}</div>
                  <div>
                    <div className="text-text font-medium">Sua posição</div>
                    <div className="text-text/80 text-sm">Continue explorando!</div>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-text" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
    </>
  )
}
