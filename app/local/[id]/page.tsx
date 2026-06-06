'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { locations } from '@/lib/data'
import { 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Globe, 
  Navigation,
  Heart,
  Share2,
  ArrowLeft,
  ExternalLink
} from 'lucide-react'

export default function LocalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const location = locations.find(l => l.id === params.id)

  useEffect(() => {
    // Load favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(location?.id))
  }, [location?.id])

  if (!location) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-2">Local não encontrado</h1>
          <Button onClick={() => router.push('/')}>Voltar</Button>
        </div>
      </div>
    )
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isFavorite) {
      const newFavorites = favorites.filter((id: string) => id !== location.id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setIsFavorite(false)
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, location.id]))
      setIsFavorite(true)
    }
  }

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`
    window.open(url, '_blank')
  }

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`
    window.open(url, '_blank')
  }

  const shareLocation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: location.name,
          text: location.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share failed:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado para a área de transferência!')
    }
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
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-text-secondary hover:text-text mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>

            {/* Image Gallery */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6">
              <img
                src={location.images[currentImageIndex] || location.images[0]}
                alt={location.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
                }}
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={toggleFavorite}
                  className={`p-2 glass backdrop-blur rounded-full ${isFavorite ? 'text-red-500' : 'text-text'}`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={shareLocation}
                  className="p-2 glass backdrop-blur rounded-full"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <Badge variant="accent">{location.category}</Badge>
                {location.featured && (
                  <Badge variant="primary" className="ml-2">Destaque</Badge>
                )}
              </div>
              {location.images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex gap-1">
                  {location.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Title and Rating */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                {location.name}
              </h1>
              <div className="flex items-center gap-4 text-text-secondary flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-medium text-text">{location.rating}</span>
                  <span>({location.reviews} avaliações)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>{location.distance} km</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-2xl p-6 mb-6 shadow-glass">
              <h2 className="text-lg font-bold text-text mb-3">Sobre</h2>
              <p className="text-text-secondary leading-relaxed">
                {location.description}
              </p>
            </div>

            {/* Information */}
            <div className="glass rounded-2xl p-6 mb-6 space-y-4 shadow-glass">
              <h2 className="text-lg font-bold text-text mb-3">Informações</h2>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-text">Horário</div>
                  <div className="text-text-secondary">{location.hours}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-text">Endereço</div>
                  <div className="text-text-secondary">{location.address}</div>
                </div>
              </div>

              {location.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-text">Telefone</div>
                    <a href={`tel:${location.phone}`} className="text-primary hover:underline">
                      {location.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-text">Coordenadas</div>
                  <div className="text-text-secondary text-sm">
                    {location.coordinates.lat}, {location.coordinates.lng}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-text mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {location.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button 
                variant="primary" 
                className="flex items-center justify-center gap-2"
                onClick={openDirections}
              >
                <Navigation className="w-5 h-5" />
                Como Chegar
              </Button>
              <Button 
                variant="secondary" 
                className="flex items-center justify-center gap-2"
                onClick={openGoogleMaps}
              >
                <Globe className="w-5 h-5" />
                Google Maps
              </Button>
            </div>

            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' Campinas')}`, '_blank')}
            >
              <ExternalLink className="w-5 h-5" />
              Ver no Google Maps
            </Button>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
    </>
  )
}
