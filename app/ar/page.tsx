'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Camera, Sparkles, Target, Gift, Coins } from 'lucide-react'

interface Collectible {
  id: string
  type: 'coupon' | 'coin' | 'badge'
  icon: string
  x: number
  y: number
  collected: boolean
}

export default function ARPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [collectibles, setCollectibles] = useState<Collectible[]>([
    { id: '1', type: 'coin', icon: '🪙', x: 20, y: 30, collected: false },
    { id: '2', type: 'coupon', icon: '🎫', x: 70, y: 50, collected: false },
    { id: '3', type: 'badge', icon: '🏆', x: 45, y: 70, collected: false },
    { id: '4', type: 'coin', icon: '🪙', x: 80, y: 25, collected: false },
    { id: '5', type: 'coupon', icon: '🎁', x: 30, y: 80, collected: false },
  ])
  const [collectedCount, setCollectedCount] = useState(0)

  const handleCollect = (id: string) => {
    setCollectibles(prev => prev.map(c => 
      c.id === id ? { ...c, collected: true } : c
    ))
    setCollectedCount(prev => prev + 1)
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
              <Camera className="w-10 h-10 text-purple" />
              Realidade Aumentada
            </h1>
            <p className="text-text-secondary mb-8 text-base">
              Caça a cupons e recompensas virtuais
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass rounded-2xl p-6 text-center shadow-glow-purple">
                <div className="text-3xl font-bold text-purple font-heading">{collectedCount}</div>
                <div className="text-sm text-text-secondary mt-1">Coletados</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center shadow-glow-purple">
                <div className="text-3xl font-bold text-purple font-heading">{collectibles.filter(c => !c.collected).length}</div>
                <div className="text-sm text-text-secondary mt-1">Restantes</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center shadow-glow-purple">
                <div className="text-3xl font-bold text-purple font-heading">5</div>
                <div className="text-sm text-text-secondary mt-1">Total</div>
              </div>
            </div>

            {!cameraActive ? (
              <div className="glass rounded-3xl p-12 text-center shadow-glow-purple">
                <Camera className="w-32 h-32 text-purple mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-text mb-3 font-heading">
                  Ative a Câmera AR
                </h2>
                <p className="text-text-secondary mb-8 text-base">
                  Encontre objetos virtuais e colete recompensas exclusivas
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-2xl py-4 px-8 text-lg font-semibold"
                  onClick={() => setCameraActive(true)}
                >
                  <Camera className="w-6 h-6 mr-3" />
                  Ativar Câmera
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* AR View */}
                <div className="relative h-[500px] glass rounded-3xl overflow-hidden shadow-glow-purple">
                  {/* Simulated Camera View */}
                  <div className="absolute inset-0 bg-gradient-to-br from-surface to-background">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-purple rounded-full animate-pulse shadow-glow-purple" />
                      <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-accent rounded-full animate-pulse delay-100 shadow-glow-yellow" />
                      <div className="absolute bottom-1/4 left-1/3 w-36 h-36 border-2 border-secondary rounded-full animate-pulse delay-200 shadow-glow-blue" />
                    </div>
                  </div>

                  {/* Collectibles */}
                  {collectibles.map((item) => (
                    !item.collected && (
                      <motion.button
                        key={item.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCollect(item.id)}
                        className="absolute text-5xl cursor-pointer"
                        style={{ left: `${item.x}%`, top: `${item.y}%` }}
                      >
                        <motion.div
                          animate={{ y: [0, -15, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {item.icon}
                        </motion.div>
                      </motion.button>
                    )
                  ))}

                  {/* AR Overlay */}
                  <div className="absolute top-6 left-6 flex gap-3">
                    <Badge variant="primary" className="text-sm px-4 py-2">
                      <Target className="w-4 h-4 mr-2" />
                      {collectibles.filter(c => !c.collected).length} objetos
                    </Badge>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <Button
                      variant="secondary"
                      className="w-full rounded-2xl py-4 text-base font-semibold"
                      onClick={() => setCameraActive(false)}
                    >
                      Fechar Câmera
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass rounded-2xl p-6 text-center shadow-glow">
                    <div className="text-3xl font-bold text-accent font-heading">{collectedCount}</div>
                    <div className="text-sm text-text-secondary mt-1">Coletados</div>
                  </div>
                  <div className="glass rounded-2xl p-6 text-center shadow-glow">
                    <div className="text-3xl font-bold text-primary font-heading">
                      {collectibles.filter(c => c.type === 'coin' && c.collected).length * 10}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">Moedas</div>
                  </div>
                  <div className="glass rounded-2xl p-6 text-center shadow-glow">
                    <div className="text-3xl font-bold text-secondary font-heading">
                      {collectibles.filter(c => c.type === 'coupon' && c.collected).length}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">Cupons</div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="glass rounded-3xl p-8 shadow-glow">
                  <h3 className="font-bold text-text mb-4 flex items-center gap-3 text-xl font-heading">
                    <Sparkles className="w-7 h-7 text-yellow" />
                    Como funciona
                  </h3>
                  <ul className="text-base text-text-secondary space-y-3">
                    <li>• Toque nos objetos virtuais para coletá-los</li>
                    <li>• Cada coleta ganha moedas do app</li>
                    <li>• Encontre cupons exclusivos</li>
                    <li>• Desbloqueie badges especiais</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
    </>
  )
}
