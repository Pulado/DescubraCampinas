'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { MapPin, Star, Navigation, Heart } from 'lucide-react'
import { Location } from '@/lib/types'

interface LocationCardProps {
  location: Location
  onVisit?: (id: string) => void
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, onVisit }) => {
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(location.id))
  }, [location.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
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

  return (
    <Link href={`/local/${location.id}`}>
      <Card className="overflow-hidden cursor-pointer p-0" glowColor="green">
        <div className="relative h-64">
          <img
            src={location.images[0]}
            alt={location.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={toggleFavorite}
              className={`p-2.5 glass-strong backdrop-blur rounded-full transition-all ${isFavorite ? 'text-red-500 shadow-glow-red' : 'text-text hover:text-red-400'}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="primary" className="text-xs px-2.5 py-1 rounded-lg">{location.category}</Badge>
          </div>
          {location.featured && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="accent" className="text-xs px-2.5 py-1 rounded-lg">Destaque</Badge>
            </div>
          )}
        </div>
        
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-text mb-1.5 font-heading">{location.name}</h3>
            <p className="text-sm text-text-secondary line-clamp-2">{location.description}</p>
          </div>
          
          <div className="flex items-center gap-5 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow fill-yellow" />
              <span className="font-semibold text-text">{location.rating}</span>
              <span className="text-text-secondary text-xs">({location.reviews})</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <MapPin className="w-4 h-4" />
              <span className="text-xs">{location.distance} km</span>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {location.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm" className="text-xs px-2 py-1 rounded-md">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button variant="primary" className="w-full rounded-xl py-2.5 text-sm font-semibold">
            <Navigation className="w-4 h-4 mr-2" />
            Ver Detalhes
          </Button>
        </div>
      </Card>
    </Link>
  )
}
