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
        <div className="relative h-56">
          <img
            src={location.images[0]}
            alt={location.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleFavorite}
              className={`p-3 glass-strong backdrop-blur rounded-full transition-all ${isFavorite ? 'text-red-500 shadow-glow-red' : 'text-text hover:text-red-400'}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="absolute top-4 left-4">
            <Badge variant="primary" className="text-sm px-3 py-1.5">{location.category}</Badge>
          </div>
          {location.featured && (
            <div className="absolute bottom-4 left-4">
              <Badge variant="accent" className="text-sm px-3 py-1.5">Destaque</Badge>
            </div>
          )}
        </div>
        
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-text mb-2">{location.name}</h3>
            <p className="text-sm text-text-secondary line-clamp-2">{location.description}</p>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow fill-yellow" />
              <span className="font-semibold text-text">{location.rating}</span>
              <span className="text-text-secondary">({location.reviews})</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <MapPin className="w-5 h-5" />
              <span>{location.distance} km</span>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {location.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button variant="primary" className="w-full rounded-2xl py-3 text-base font-semibold">
            <Navigation className="w-5 h-5 mr-2" />
            Ver Detalhes
          </Button>
        </div>
      </Card>
    </Link>
  )
}
