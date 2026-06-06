'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { SearchBar } from '@/components/features/SearchBar'
import { CategoryFilter } from '@/components/features/CategoryFilter'
import { LocationCard } from '@/components/features/LocationCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { locations } from '@/lib/data'
import { MapPin, Navigation, Sparkles, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [user, setUser] = useState({
    firstName: 'Usuário',
    lastName: '',
    email: '',
    avatar: '',
    city: '',
    phone: '',
    bio: '',
    joinDate: '',
    level: 1,
    xp: 0,
    coins: 0,
    visits: 0,
    distance: 0,
    badges: [],
    visitedLocations: [],
  })

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
    }
  }, [])

  const featuredLocations = locations.filter(l => l.featured).slice(0, 4)
  const filteredLocations = selectedCategory
    ? locations.filter(l => l.category === selectedCategory)
    : locations

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Usuário'

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 pb-24 lg:pb-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text mb-1">
                  Olá, {fullName}! 👋
                </h1>
                <p className="text-text-secondary">
                  Descubra novos lugares em Campinas
                </p>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl shadow-glow">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="font-bold text-accent">{user.coins}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="glass rounded-xl p-4 text-center shadow-glow">
                <div className="text-2xl font-bold text-primary">{user.visits}</div>
                <div className="text-xs text-text-secondary">Visitas</div>
              </div>
              <div className="glass rounded-xl p-4 text-center shadow-glow-blue">
                <div className="text-2xl font-bold text-secondary">{user.level}</div>
                <div className="text-xs text-text-secondary">Nível</div>
              </div>
              <div className="glass rounded-xl p-4 text-center shadow-glow-yellow">
                <div className="text-2xl font-bold text-accent">{user.distance}</div>
                <div className="text-xs text-text-secondary">km</div>
              </div>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6"
          >
            <SearchBar />
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative h-64 bg-surface rounded-2xl overflow-hidden border border-card">
              {/* Simulated Dark Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-background">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-text-secondary rounded-full" />
                  <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-text-secondary rounded-full" />
                  <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-text-secondary rounded-full" />
                </div>
              </div>
              
              {/* Map Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-text font-medium">Mapa Interativo</p>
                  <p className="text-text-secondary text-sm">Encontre locais próximos</p>
                </div>
              </div>

              {/* Location Button */}
              <Button
                variant="primary"
                className="absolute bottom-4 right-4 shadow-lg"
              >
                <Navigation className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </motion.div>

          {/* Featured Section */}
          {!selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Destaques
                </h2>
                <Badge variant="primary">Populares</Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <LocationCard location={location} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-text mb-4">
              {selectedCategory ? 'Locais encontrados' : 'Todos os locais'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLocations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <LocationCard location={location} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
    </>
  )
}
