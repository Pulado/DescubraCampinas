'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { rewards } from '@/lib/data'
import { User } from '@/lib/types'
import { Gift, Coins, History, TrendingUp, CheckCircle } from 'lucide-react'

export default function RecompensasPage() {
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
              <Gift className="w-10 h-10 text-yellow" />
              Recompensas
            </h1>
            <p className="text-text-secondary mb-8 text-base">
              Resgate seus benefícios
            </p>

            {/* Balance Card */}
            {currentUser && (
              <div className="gradient-yellow rounded-3xl p-8 mb-10 shadow-glow-yellow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-text-secondary text-base mb-2">Seu saldo</div>
                    <div className="text-4xl font-bold text-text flex items-center gap-3 font-heading">
                      <Coins className="w-10 h-10" />
                      {currentUser.coins}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-text-secondary text-base mb-2">Nível {currentUser.level}</div>
                    <div className="text-text font-semibold text-lg">
                      {currentUser.xp} / {(currentUser.level + 1) * 500} XP
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Available Rewards */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3 font-heading">
                <Gift className="w-7 h-7 text-primary" />
                Recompensas Disponíveis
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {rewards.filter(r => !r.claimed).map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-3xl p-6 shadow-glow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-5xl">{reward.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-text text-lg mb-2">{reward.title}</h3>
                        <p className="text-text-secondary text-sm mb-3">
                          {reward.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant={reward.type === 'cashback' ? 'secondary' : 'primary'} className="text-sm px-3 py-1.5">
                            {reward.type === 'coupon' ? 'Cupom' : reward.type === 'cashback' ? 'Cashback' : 'Desconto'}
                          </Badge>
                          {reward.coins > 0 && (
                            <div className="flex items-center gap-2 text-yellow">
                              <Coins className="w-5 h-5" />
                              <span className="font-bold text-text">{reward.coins}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="primary" className="w-full rounded-2xl py-3 text-base font-semibold">
                      Resgatar
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Claimed Rewards */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3 font-heading">
                <CheckCircle className="w-7 h-7 text-secondary" />
                Resgatados
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {rewards.filter(r => r.claimed).map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-3xl p-6 opacity-60"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl grayscale">{reward.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-text text-lg mb-2">{reward.title}</h3>
                        <p className="text-text-secondary text-sm mb-3">
                          {reward.description}
                        </p>
                        <Badge variant="secondary" className="text-sm px-3 py-1.5">
                          Já resgatado
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cashback Info */}
            <div className="glass rounded-3xl p-8 shadow-glow">
              <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3 font-heading">
                <TrendingUp className="w-7 h-7 text-yellow" />
                Cashback Local
              </h2>
              <p className="text-text-secondary mb-6 text-base">
                Ganhe cashback em suas compras em produtores locais parceiros
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary font-heading">5%</div>
                  <div className="text-base text-text-secondary mt-2">Cashback padrão</div>
                </div>
                <div className="bg-card rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-yellow font-heading">10%</div>
                  <div className="text-base text-text-secondary mt-2">Nível 20+</div>
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
