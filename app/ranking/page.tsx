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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2 flex items-center gap-3 font-heading">
              <Trophy className="w-10 h-10 text-orange" />
              Ranking Comunitário
            </h1>
            <p className="text-text-secondary mb-8 text-base">
              Competição amigável entre exploradores
            </p>

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Top 3 Podium */}
            <div className="flex items-end justify-center gap-6 my-12">
              {rankingUsers.slice(0, 3).map((user, index) => {
                const heights = ['h-40', 'h-52', 'h-44']
                const medals = [
                  <Medal key="silver" className="w-10 h-10 text-gray-400" />,
                  <Crown key="gold" className="w-10 h-10 text-yellow" />,
                  <Medal key="bronze" className="w-10 h-10 text-amber-700" />,
                ]
                const colors = ['bg-orange/20', 'bg-orange/30', 'bg-orange/20']
                
                const orderClass = index === 1 ? 'order-2' : index === 0 ? 'order-1' : 'order-3'
                const marginClass = index === 1 ? 'mb-6' : 'mb-4'
                
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={'flex flex-col items-center ' + orderClass}
                  >
                    <div className={'relative ' + marginClass}>
                      <Avatar src={user.avatar} alt={`${user.firstName} ${user.lastName}`} size="2xl" />
                      <div className="absolute -top-3 -right-3">
                        {medals[index]}
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <div className="font-bold text-text text-lg">{user.firstName} {user.lastName}</div>
                      <div className="text-sm text-text-secondary font-medium">{user.points} pts</div>
                    </div>
                    <div className={colors[index] + ' ' + heights[index] + ' w-24 rounded-t-2xl flex items-end justify-center pb-3 shadow-glow-orange'}>
                      <span className="text-3xl font-bold text-text">#{user.position}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Full Ranking */}
            <div className="glass rounded-3xl p-6 space-y-3 shadow-glow">
              {rankingUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={currentUser && user.id === currentUser.id ? 'flex items-center gap-4 p-4 rounded-2xl bg-orange/20 shadow-glow-orange' : 'flex items-center gap-4 p-4 rounded-2xl bg-card hover:bg-card/80 transition-colors'}
                >
                  <div className="w-10 text-center font-bold text-text-secondary text-lg">
                    #{user.position}
                  </div>
                  <Avatar src={user.avatar} alt={`${user.firstName} ${user.lastName}`} size="lg" />
                  <div className="flex-1">
                    <div className="font-semibold text-text text-lg">{user.firstName} {user.lastName}</div>
                    <div className="text-sm text-text-secondary">
                      Nível {user.level} • {user.badges} badges
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary text-xl">{user.points}</div>
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
              className="mt-8 gradient-orange rounded-3xl p-8 shadow-glow-orange"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-5xl font-bold text-text font-heading">#{currentUser?.level || '-'}</div>
                  <div>
                    <div className="text-text font-semibold text-xl">Sua posição</div>
                    <div className="text-text/80 text-base">Continue explorando!</div>
                  </div>
                </div>
                <TrendingUp className="w-10 h-10 text-text" />
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
