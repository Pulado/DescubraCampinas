'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { LocationCard } from '@/components/features/LocationCard'
import { locations } from '@/lib/data'
import { Heart, MapPin } from 'lucide-react'

export default function FavoritosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const favoriteLocations = locations.filter(loc => favorites.includes(loc.id))

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 pb-24 lg:pb-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2 flex items-center gap-3 font-heading">
                  <Heart className="w-10 h-10 text-red-500" />
                  Meus Favoritos
                </h1>
                <p className="text-text-secondary text-base">
                  {favoriteLocations.length} {favoriteLocations.length === 1 ? 'local favorito' : 'locais favoritos'}
                </p>
              </div>
            </div>

            {favoriteLocations.length === 0 ? (
              <div className="glass rounded-3xl p-16 text-center shadow-glow">
                <Heart className="w-20 h-20 text-text-secondary mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-text mb-3 font-heading">
                  Nenhum favorito ainda
                </h2>
                <p className="text-text-secondary mb-8 text-base">
                  Explore os locais e adicione seus favoritos clicando no ícone de coração
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <LocationCard location={location} />
                  </motion.div>
                ))}
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
